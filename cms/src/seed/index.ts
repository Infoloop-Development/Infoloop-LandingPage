/**
 * Seed the CMS with the copy that ships in the repo (web/src/content), so
 * editors start from the approved landing page rather than a blank form.
 *
 *   npm run seed                      # fills the home + site globals
 *   SEED_ADMIN_EMAIL=you@infoloop.co SEED_ADMIN_PASSWORD=... npm run seed
 *                                     # also creates the first admin user
 *
 * Safe to re-run: globals are overwritten with the repo copy; the admin user
 * is only created when none exists.
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'
import * as HOME from '../../../web/src/content/home'
import * as SITE from '../../../web/src/content/site'
import { CASES, WORK } from '../../../web/src/content/work'
import { PRODUCTS, PRODUCTS_INDEX } from '../../../web/src/content/products'
import { ABOUT } from '../../../web/src/content/about'
import { BRAND } from '../../../web/src/content/brand'
import { SOLUTIONS } from '../../../web/src/content/solutions'
import { INDUSTRIES_DETAIL } from '../../../web/src/content/industries'
import { HIRE_DETAIL } from '../../../web/src/content/hire'
import { SERVICES_DETAIL } from '../../../web/src/content/services'

type Json = Record<string, unknown>

/** Inverse of the Astro adapter's normalize(): string[] -> [{ value }]. */
function toPayload(v: unknown): unknown {
  if (Array.isArray(v)) return v.map((x) => (typeof x === 'string' ? { value: x } : toPayload(x)))
  if (v && typeof v === 'object') {
    const out: Json = {}
    for (const [k, val] of Object.entries(v as Json)) out[k] = toPayload(val)
    return out
  }
  return v
}

async function run() {
  const payload = await getPayload({ config })

  const home = toPayload({
    hero: HOME.HERO,
    trust: HOME.TRUST,
    stats: HOME.COMPANY_STATS,
    band: HOME.BAND_WORDS,
    industries: HOME.INDUSTRIES,
    services: HOME.SERVICES_SECTION,
    process: HOME.PROCESS,
    proof: HOME.PROOF,
    why: HOME.WHY,
    products: HOME.PRODUCTS,
    about: HOME.ABOUT,
    faq: HOME.FAQ,
    cta: HOME.CTA,
  }) as Json
  await payload.updateGlobal({ slug: 'home', data: home as never })
  payload.logger.info('Seeded global: home')

  const site = toPayload({
    site: SITE.SITE,
    services: SITE.SERVICES,
    industries: SITE.INDUSTRIES,
    hire: SITE.HIRE,
    products: SITE.PRODUCT_LINKS,
    company: SITE.COMPANY_LINKS,
    offices: SITE.OFFICES,
    social: SITE.SOCIAL,
    ratings: SITE.RATINGS,
  }) as Json
  await payload.updateGlobal({ slug: 'site', data: site as never })
  payload.logger.info('Seeded global: site')

  const workPage = toPayload(WORK) as Json
  ;(workPage.snapshots as Json[] | undefined)?.forEach((sn, i) => { sn.serviceKeys = WORK.snapshots[i]?.serviceKeys })
  await payload.updateGlobal({ slug: 'work-page', data: workPage as never })
  payload.logger.info('Seeded global: work-page')

  // Case studies: upsert by slug, published. `related` (slugs) is resolved
  // after all docs exist.
  const ids = new Map<string, number | string>()
  for (const c of CASES) {
    const { related, ...rest } = c
    // serviceKeys is a multi-select (plain string[]), not a { value } list.
    // Dates: store at noon UTC so the calendar day survives any timezone.
    const day = (d?: string) => (d ? `${d.slice(0, 10)}T12:00:00.000Z` : undefined)
    const data = { ...(toPayload(rest) as Json), serviceKeys: c.serviceKeys, datePublished: day(c.datePublished), dateModified: day(c.dateModified), _status: 'published', order: CASES.indexOf(c) + 1 }
    const existing = await payload.find({ collection: 'work', where: { slug: { equals: c.slug } }, limit: 1, draft: true })
    const doc = existing.docs[0]
      ? await payload.update({ collection: 'work', id: existing.docs[0].id, data: data as never })
      : await payload.create({ collection: 'work', data: data as never })
    ids.set(c.slug, doc.id)
  }
  for (const c of CASES) {
    if (!c.related?.length) continue
    await payload.update({ collection: 'work', id: ids.get(c.slug)!, data: { related: c.related.map((r) => ids.get(r)).filter(Boolean) } as never })
  }
  payload.logger.info(`Seeded ${CASES.length} case studies`)

  await payload.updateGlobal({ slug: 'products-page', data: toPayload(PRODUCTS_INDEX) as never })
  for (const p of PRODUCTS) {
    const data = { ...(toPayload(p) as Json), _status: 'published', order: PRODUCTS.indexOf(p) + 1 }
    const existing = await payload.find({ collection: 'products', where: { slug: { equals: p.slug } }, limit: 1, draft: true })
    if (existing.docs[0]) await payload.update({ collection: 'products', id: existing.docs[0].id, data: data as never })
    else await payload.create({ collection: 'products', data: data as never })
  }
  payload.logger.info(`Seeded products-page and ${PRODUCTS.length} products`)

  await payload.updateGlobal({ slug: 'about-page', data: toPayload(ABOUT) as never })
  payload.logger.info('Seeded about-page')

  await payload.updateGlobal({ slug: 'brand-page', data: toPayload(BRAND) as never })
  payload.logger.info('Seeded brand-page')

  await payload.updateGlobal({ slug: 'solutions-pages', data: toPayload({ groups: SOLUTIONS }) as never })
  payload.logger.info('Seeded solutions-pages')

  await payload.updateGlobal({ slug: 'industry-pages', data: toPayload({ pages: INDUSTRIES_DETAIL }) as never })
  await payload.updateGlobal({ slug: 'hire-pages', data: toPayload({ pages: HIRE_DETAIL }) as never })
  payload.logger.info(`Seeded ${INDUSTRIES_DETAIL.length} industry pages and ${HIRE_DETAIL.length} hire pages`)

  for (const d of SERVICES_DETAIL) {
    const data = { ...(toPayload(d) as Json), _status: 'published', order: SERVICES_DETAIL.indexOf(d) + 1 }
    const existing = await payload.find({ collection: 'services', where: { slug: { equals: d.slug } }, limit: 1, draft: true })
    if (existing.docs[0]) await payload.update({ collection: 'services', id: existing.docs[0].id, data: data as never })
    else await payload.create({ collection: 'services', data: data as never })
  }
  payload.logger.info(`Seeded ${SERVICES_DETAIL.length} service pages`)

  await payload.updateGlobal({
    slug: 'analytics',
    data: {
      google: { ga4Id: '', gtmId: '', gscVerification: '' },
      other: {
        plausibleDomain: '',
        clarityId: '',
        linkedinPartnerId: '',
        posthogKey: '',
        posthogHost: 'https://eu.i.posthog.com',
      },
      compliance: { privacyDisclosed: false, consentRequired: true },
    } as never,
  })
  payload.logger.info('Seeded global: analytics (empty / off)')

  const email = process.env.SEED_ADMIN_EMAIL
  const password = process.env.SEED_ADMIN_PASSWORD
  if (email && password) {
    const existing = await payload.find({ collection: 'users', limit: 1 })
    if (existing.totalDocs === 0) {
      await payload.create({
        collection: 'users',
        data: {
          email,
          password,
          role: 'admin',
          name: 'Admin',
          accessMode: 'full',
          mustChangePassword: false,
        },
      })
      payload.logger.info(`Created admin user ${email}`)
    } else {
      payload.logger.info('Users exist; admin not created')
    }
  }
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
