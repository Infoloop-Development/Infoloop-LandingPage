import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from 'payload'

/**
 * The public site is static (Astro on Netlify). Publishing here does not
 * change the site until Netlify rebuilds, so every publish/delete pings the
 * Netlify build hook. Set NETLIFY_BUILD_HOOK_URL in the CMS environment.
 * Debounced: several saves inside 30s cause one build.
 */
let timer: ReturnType<typeof setTimeout> | null = null

export function triggerRebuild(reason: string) {
  const url = process.env.NETLIFY_BUILD_HOOK_URL
  if (!url) return
  if (timer) clearTimeout(timer)
  timer = setTimeout(async () => {
    timer = null
    try {
      const res = await fetch(url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ trigger_title: reason }) })
      if (!res.ok) console.warn(`[revalidate] Netlify hook responded ${res.status}`)
    } catch (err) {
      console.warn('[revalidate] Netlify hook failed', err)
    }
  }, 30_000)
}

export const rebuildAfterChange: CollectionAfterChangeHook = ({ doc, collection }) => {
  // Drafts do not affect the public site.
  if ('_status' in doc && doc._status !== 'published') return doc
  triggerRebuild(`${collection.slug} changed`)
  return doc
}

export const rebuildAfterDelete: CollectionAfterDeleteHook = ({ doc, collection }) => {
  triggerRebuild(`${collection.slug} deleted`)
  return doc
}

export const rebuildAfterGlobalChange: GlobalAfterChangeHook = ({ doc, global }) => {
  triggerRebuild(`${global.slug} changed`)
  return doc
}
