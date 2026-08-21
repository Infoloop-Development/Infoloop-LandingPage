import type { CollectionConfig } from 'payload'
import { authenticated, publishedOrAuthenticated } from '../access'
import { rebuildAfterChange, rebuildAfterDelete } from '../hooks/revalidate'
import { strings, seo } from '../fields'

const TILES = ['erp', 'attendance', 'shopify', 'copilot', 'garage', 'webflow', 'lms', 'verko']

/**
 * One document per service page (/<slug>), mirroring web/src/content/services.ts
 * (ServiceDetail): the approved 7Span service-page format. Slug must match the
 * menu item href in Site settings > Navigation. Published docs merge over the
 * repo copy by slug at build time.
 */
export const Services: CollectionConfig = {
  slug: 'services',
  labels: { singular: 'Service page', plural: 'Service pages' },
  access: { read: publishedOrAuthenticated, create: authenticated, update: authenticated, delete: authenticated },
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'slug', 'group', '_status', 'updatedAt'], group: 'Solutions', description: 'One per Solutions menu item. Slug = menu href without the slash.' },
  versions: { drafts: { autosave: true }, maxPerDoc: 20 },
  hooks: { afterChange: [rebuildAfterChange], afterDelete: [rebuildAfterDelete] },
  fields: [
    { name: 'name', type: 'text', required: true, admin: { description: 'Menu label, e.g. "Custom applications".' } },
    { name: 'slug', type: 'text', required: true, unique: true, index: true, admin: { position: 'sidebar', description: 'e.g. custom-software-development' } },
    { name: 'group', type: 'select', required: true, options: ['build', 'grow', 'transform', 'consulting'], admin: { position: 'sidebar' } },
    { name: 'order', type: 'number', admin: { position: 'sidebar' } },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            { name: 'h1', type: 'text', admin: { description: 'About 8 to 10 words, one [[highlight]].' } },
            { name: 'lede', type: 'textarea', admin: { description: '30 to 39 words, ends with a concrete promise.' } },
            { name: 'button', type: 'text', admin: { description: 'Hero button label (differs from the CTA button).' } },
            {
              name: 'proof',
              type: 'group',
              label: 'Proof panel',
              fields: [
                { name: 'metrics', type: 'array', maxRows: 3, fields: [{ name: 'value', type: 'text', required: true }, { name: 'label', type: 'text', required: true }, { name: 'href', type: 'text', required: true }] },
                { name: 'tile', type: 'select', options: TILES },
                { name: 'caption', type: 'text' },
                { name: 'href', type: 'text' },
              ],
            },
            strings('band', { label: 'Marquee (two parts, second is orange)', maxRows: 2 }),
          ],
        },
        {
          label: 'Sections',
          fields: [
            {
              name: 'industryFit',
              type: 'group',
              label: '<Service> built for your industry',
              fields: [{ name: 'h2', type: 'text' }, { name: 'lede', type: 'text' }, { name: 'items', type: 'array', maxRows: 8, fields: [{ name: 'title', type: 'text', required: true }, { name: 'body', type: 'text' }] }],
            },
            {
              name: 'process',
              type: 'group',
              fields: [{ name: 'eyebrow', type: 'text' }, { name: 'h2', type: 'text' }, { name: 'lede', type: 'text' }, { name: 'steps', type: 'array', maxRows: 4, fields: [{ name: 'n', type: 'text', required: true }, { name: 'title', type: 'text', required: true }, { name: 'body', type: 'textarea' }] }],
            },
            { name: 'why', type: 'group', fields: [{ name: 'h2', type: 'text' }, strings('items', { maxRows: 7 }), { name: 'photoAlt', type: 'text' }] },
            { name: 'industries', type: 'group', fields: [{ name: 'h2', type: 'text' }, { name: 'lede', type: 'textarea' }] },
            { name: 'tech', type: 'group', fields: [{ name: 'h2', type: 'text' }, { name: 'rows', type: 'array', fields: [{ name: 'label', type: 'text', required: true }, strings('items')] }] },
            { name: 'quotes', type: 'array', maxRows: 3, fields: [{ name: 'text', type: 'textarea', required: true }, { name: 'role', type: 'text', required: true }, { name: 'caseSlug', type: 'text', required: true }] },
            { name: 'cta', type: 'group', fields: [{ name: 'h2', type: 'text' }, { name: 'lede', type: 'textarea' }, { name: 'button', type: 'text' }] },
            { name: 'other', type: 'group', fields: [{ name: 'h2', type: 'text' }] },
          ],
        },
        {
          label: 'FAQ and SEO',
          fields: [
            { name: 'faq', type: 'array', admin: { description: 'Kept for answer engines; rendered only when the page shows a FAQ block.' }, fields: [{ name: 'q', type: 'text', required: true }, { name: 'a', type: 'textarea', required: true }] },
            seo,
          ],
        },
      ],
    },
  ],
}
