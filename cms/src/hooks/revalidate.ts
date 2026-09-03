import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from 'payload'

/**
 * The public site is prerendered at build time (Astro, Node adapter on
 * Render). Publishing here does not change the site until it rebuilds, so
 * every publish/delete POSTs the host's deploy hook.
 *
 * Set SITE_BUILD_HOOK_URL in the CMS environment to the Render deploy hook
 * (Render dashboard > the web service > Settings > Deploy Hook). The old
 * NETLIFY_BUILD_HOOK_URL name is still honoured so an existing deployment
 * keeps working. Debounced: several saves inside 30s cause one build.
 */
let timer: ReturnType<typeof setTimeout> | null = null

export function triggerRebuild(reason: string) {
  const url = process.env.SITE_BUILD_HOOK_URL || process.env.NETLIFY_BUILD_HOOK_URL
  if (!url) return
  if (timer) clearTimeout(timer)
  timer = setTimeout(async () => {
    timer = null
    try {
      const res = await fetch(url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ trigger_title: reason }) })
      if (!res.ok) console.warn(`[revalidate] deploy hook responded ${res.status}`)
    } catch (err) {
      console.warn('[revalidate] deploy hook failed', err)
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
