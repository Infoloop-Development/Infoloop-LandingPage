import type { CollectionConfig, Field } from 'payload'
import { publishedOrAuthenticated } from '../access'
import { rebuildAfterChange, rebuildAfterDelete } from '../hooks/revalidate'
import { seo, slug, strings } from '../fields'

import { INDUSTRY_KEYS, SERVICE_KEYS, TILES } from '../fields/workKeys'
import { editorAccess, editorDocAccess, hideUnlessCategory } from '../access/permissions'

const h3Items = (name: string, label: string): Field => ({
  name,
  type: 'array',
  label,
  fields: [
    { name: 'h3', type: 'text', required: true },
    { name: 'body', type: 'textarea', required: true },
  ],
})

/**
 * Case studies. Field names mirror web/src/content/work.ts (CaseStudy) so a
 * document here overrides the local case with the same slug field by field.
 * Every number must already be published or approved by the client.
 */
export const Work: CollectionConfig = {
  slug: 'work',
  labels: { singular: 'Case study', plural: 'Work' },
  access: {
    read: publishedOrAuthenticated,
    create: editorAccess('work'),
    update: editorDocAccess('work', 'allowedWork'),
    delete: editorDocAccess('work', 'allowedWork'),
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'client', 'industry', 'featured', '_status', 'updatedAt'],
    group: 'Work and blog',
    hidden: hideUnlessCategory('work'),
  },
  versions: { drafts: { autosave: true }, maxPerDoc: 20 },
  hooks: { afterChange: [rebuildAfterChange], afterDelete: [rebuildAfterDelete] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Overview',
          fields: [
            { name: 'title', type: 'text', required: true, admin: { description: 'H1, outcome first: "$1.2M saved a year with predictive maintenance and a multi-plant ERP".' } },
            slug,
            { name: 'client', type: 'text', required: true, admin: { description: 'Named client, or "A machinery manufacturer" when under NDA.' } },
            { name: 'named', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar', description: 'Client name published with permission.' } },
            { name: 'featured', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
            { name: 'order', type: 'number', admin: { position: 'sidebar' } },
            { name: 'datePublished', type: 'date', admin: { position: 'sidebar', date: { pickerAppearance: 'dayOnly' }, description: 'First published date (Article schema).' } },
            { name: 'dateModified', type: 'date', admin: { position: 'sidebar', date: { pickerAppearance: 'dayOnly' } } },
            { name: 'industry', type: 'text', required: true },
            { name: 'industryKey', type: 'select', required: true, options: INDUSTRY_KEYS, admin: { position: 'sidebar' } },
            strings('services', { admin: { description: 'What we did, e.g. "Custom ERP", "Predictive maintenance".' } }),
            { name: 'serviceKeys', type: 'select', hasMany: true, options: SERVICE_KEYS, admin: { position: 'sidebar' } },
            { name: 'tags', type: 'text', admin: { description: 'Eyebrow, e.g. "ERP and manufacturing".' } },
            { name: 'tile', type: 'select', options: TILES, admin: { position: 'sidebar', description: 'Drawn cover style until a real screenshot is uploaded.' } },
            { name: 'cover', type: 'upload', relationTo: 'media' },
            { name: 'lede', type: 'textarea' },
            {
              name: 'card',
              type: 'group',
              label: 'Card (index page)',
              fields: [
                { name: 'title', type: 'text' },
                { name: 'blurb', type: 'textarea' },
                { name: 'metric', type: 'text', admin: { description: 'e.g. "$1.2M"' } },
                { name: 'metricLabel', type: 'text', admin: { description: 'e.g. "saved a year"' } },
              ],
            },
            {
              name: 'metrics',
              type: 'array',
              maxRows: 4,
              fields: [
                { name: 'value', type: 'text', required: true },
                { name: 'label', type: 'text', required: true },
              ],
            },
            {
              name: 'meta',
              type: 'group',
              fields: [
                { name: 'industry', type: 'text' },
                strings('services'),
                strings('stack'),
                { name: 'timeline', type: 'text' },
                { name: 'status', type: 'text', defaultValue: 'Live, run by Infoloop' },
              ],
            },
          ],
        },
        {
          label: 'Story',
          fields: [
            {
              name: 'intro',
              type: 'group',
              label: 'Introduction (7Span "Product Vision")',
              fields: [
                { name: 'sub', type: 'text', label: 'Subtitle line' },
                strings('paragraphs', { label: 'Paragraphs (1 to 2)', maxRows: 2 }),
              ],
            },
            strings('glance', { label: 'At a glance (3 bullets, not shown on the page)', maxRows: 3 }),
            strings('situation', { label: 'The challenge: intro (1 paragraph)' }),
            strings('challenges', { label: 'The challenge: bullet points (4 to 6)' }),
            { name: 'challengeClose', type: 'text', label: 'The challenge: closing line' },
            strings('approach', { label: 'Our approach (paragraphs)' }),
            h3Items('built', 'What we built (steps: title + one or two sentences)'),
            { name: 'resultsSub', type: 'textarea', label: 'The results: one or two sentences under the heading' },
            strings('results', { label: 'The results (paragraphs, not shown on the page)' }),
            {
              name: 'quote',
              type: 'group',
              fields: [
                { name: 'text', type: 'textarea' },
                { name: 'name', type: 'text' },
                { name: 'role', type: 'text' },
              ],
            },
            {
              name: 'dayToDay',
              type: 'group',
              label: 'Day to day (not shown on the page)',
              fields: [{ name: 'h2', type: 'text' }, { name: 'lede', type: 'text' }, h3Items('items', 'Items')],
            },
            {
              name: 'extra',
              type: 'group',
              label: 'How we did it (not shown on the page)',
              fields: [{ name: 'eyebrow', type: 'text' }, { name: 'h2', type: 'text' }, h3Items('items', 'Items')],
            },
            strings('tech', { label: 'Technology used' }),
            { name: 'note', type: 'text', admin: { description: 'Disclosure line under the results.' } },
            {
              name: 'links',
              type: 'array',
              label: 'Behind this build (service, product and industry pages)',
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'href', type: 'text', required: true },
              ],
            },
            {
              name: 'cta',
              type: 'group',
              label: 'Closing CTA (industry-specific)',
              fields: [
                { name: 'h2', type: 'text', admin: { description: 'One [[highlight]] allowed.' } },
                { name: 'lede', type: 'textarea' },
                {
                  name: 'button',
                  type: 'group',
                  label: 'Button (names the service we gave them, e.g. "Rebuild my Shopify store")',
                  fields: [{ name: 'label', type: 'text' }, { name: 'href', type: 'text', defaultValue: '/contact' }],
                },
              ],
            },
            {
              name: 'related',
              type: 'relationship',
              relationTo: 'work',
              hasMany: true,
              filterOptions: ({ id }) => (id ? { id: { not_equals: id } } : true),
            },
            { name: 'testimonial', type: 'relationship', relationTo: 'testimonials' },
            { name: 'gallery', type: 'array', fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }, { name: 'caption', type: 'text' }] },
          ],
        },
        { label: 'SEO', fields: [seo] },
      ],
    },
  ],
}
