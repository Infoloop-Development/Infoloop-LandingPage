import type { CollectionConfig, Field } from 'payload'
import { authenticated, publishedOrAuthenticated } from '../access'
import { rebuildAfterChange, rebuildAfterDelete } from '../hooks/revalidate'
import { seo, slug, strings } from '../fields'
import { INDUSTRY_KEYS } from '../fields/workKeys'

const features = (name: string, label: string, max: number): Field => ({
  name,
  type: 'array',
  label,
  maxRows: max,
  fields: [
    { name: 'h3', type: 'text', required: true },
    { name: 'body', type: 'textarea', required: true },
  ],
})

/**
 * Products (OpsDeck, GarageZone, LoopIQ). Fields mirror
 * web/src/content/products.ts (Product): the Vepaar-style page structure.
 */
export const Products: CollectionConfig = {
  slug: 'products',
  labels: { singular: 'Product', plural: 'Products' },
  access: { read: publishedOrAuthenticated, create: authenticated, update: authenticated, delete: authenticated },
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'kicker', '_status', 'updatedAt'], group: 'Products' },
  versions: { drafts: { autosave: true }, maxPerDoc: 20 },
  hooks: { afterChange: [rebuildAfterChange], afterDelete: [rebuildAfterDelete] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Overview',
          fields: [
            { name: 'name', type: 'text', required: true },
            slug,
            { name: 'order', type: 'number', admin: { position: 'sidebar' } },
            { name: 'industryKey', type: 'select', options: INDUSTRY_KEYS, admin: { position: 'sidebar' } },
            { name: 'tile', type: 'select', options: ['attendance', 'garage', 'lms', 'verko'], admin: { position: 'sidebar', description: 'Drawn screen style until real screenshots are uploaded.' } },
            { name: 'caseSlug', type: 'text', admin: { position: 'sidebar', description: 'Slug of the related case study, if any.' } },
            { name: 'website', type: 'text', admin: { position: 'sidebar', description: 'The product\'s own website (https://...). Shows the "Visit" button.' } },
            { name: 'kicker', type: 'text', admin: { description: 'Descriptor under the name, e.g. "Attendance software for manufacturing".' } },
            strings('tagline', { label: 'Banner tagline (2 or 3 short lines)', maxRows: 3 }),
            { name: 'h1', type: 'text', admin: { description: 'Name first, under 80 characters.' } },
            { name: 'lede', type: 'textarea', admin: { description: 'One sentence: what it is, for whom, the main outcome.' } },
            {
              name: 'screens',
              type: 'array',
              label: 'Screenshots (in order: idea, features, dark statement, automation)',
              maxRows: 4,
              fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }],
            },
          ],
        },
        {
          label: 'Story',
          fields: [
            { name: 'idea', type: 'group', label: 'The idea', fields: [{ name: 'h2', type: 'text' }, { name: 'paragraph', type: 'textarea' }] },
            { name: 'block1', type: 'group', label: 'Feature block one', fields: [{ name: 'h2', type: 'text' }, { name: 'sub', type: 'textarea' }, features('features', 'Features (4)', 4)] },
            { name: 'dark', type: 'group', label: 'Dark statement', fields: [{ name: 'h2', type: 'text', admin: { description: 'Two beats, e.g. "Clocking in was the first step. Catching the problems came next."' } }, { name: 'paragraph', type: 'textarea' }] },
            { name: 'block2', type: 'group', label: 'Feature block two (AI and automation)', fields: [{ name: 'h2', type: 'text' }, { name: 'sub', type: 'textarea' }, features('features', 'Features (3 to 4)', 4)] },
            strings('worksWith', { label: 'Works with (3 to 6)', maxRows: 6 }),
            {
              name: 'impact',
              type: 'group',
              label: 'The impact',
              fields: [
                { name: 'paragraph', type: 'textarea' },
                { name: 'metrics', type: 'array', maxRows: 4, fields: [{ name: 'value', type: 'text', required: true }, { name: 'label', type: 'text', required: true }] },
              ],
            },
            { name: 'faq', type: 'array', maxRows: 6, fields: [{ name: 'q', type: 'text', required: true }, { name: 'a', type: 'textarea', required: true }] },
            {
              name: 'cta',
              type: 'group',
              label: 'Closing CTA',
              fields: [
                { name: 'h2', type: 'text', admin: { description: 'One [[highlight]].' } },
                { name: 'lede', type: 'text' },
                { name: 'button', type: 'text', admin: { description: 'Product-specific, e.g. "Book an OpsDeck demo".' } },
              ],
            },
          ],
        },
        { label: 'SEO', fields: [seo] },
      ],
    },
  ],
}
