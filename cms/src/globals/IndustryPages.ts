import type { GlobalConfig } from 'payload'
import { anyone } from '../access'
import { editorAccess, hideUnlessCategory } from '../access/permissions'
import { strings, seo } from '../fields'
import { TILES } from '../fields/workKeys'

/** Industry pages (/industry/<slug>). Mirrors web/src/content/industries.ts. */
export const IndustryPages: GlobalConfig = {
  slug: 'industry-pages',
  label: 'Industry pages',
  access: { read: anyone, update: editorAccess('industries') },
  admin: { group: 'Pages', hidden: hideUnlessCategory('industries') },
  fields: [
    {
      name: 'pages',
      type: 'array',
      admin: { description: 'One row per industry page. Slug must match the menu link, e.g. manufacturing.' },
      fields: [
        { name: 'slug', type: 'text', required: true },
        { name: 'name', type: 'text', required: true },
        { name: 'eyebrow', type: 'text' },
        { name: 'h1', type: 'text', admin: { description: 'One [[highlight]], no full stop.' } },
        { name: 'lede', type: 'textarea' },
        { name: 'button', type: 'text', label: 'Hero button label' },
        { name: 'heroTile', type: 'select', options: TILES, admin: { description: 'Drawn case screen until a photo exists.' } },
        {
          name: 'context',
          type: 'group',
          fields: [{ name: 'h2', type: 'text' }, { name: 'lede', type: 'textarea' }, strings('paragraphs', { maxRows: 3 }), strings('bullets', { maxRows: 4 }), { name: 'close', type: 'textarea' }],
        },
        { name: 'numbers', type: 'array', maxRows: 4, fields: [{ name: 'value', type: 'text', required: true }, { name: 'label', type: 'text', required: true }, { name: 'href', type: 'text', required: true }] },
        {
          name: 'challenges',
          type: 'group',
          fields: [{ name: 'h2', type: 'text' }, { name: 'lede', type: 'textarea' }, { name: 'items', type: 'array', maxRows: 4, fields: [{ name: 'title', type: 'text', required: true }, { name: 'body', type: 'textarea' }] }, { name: 'tile', type: 'select', options: TILES }],
        },
        strings('band', { label: 'Marquee (two parts, second is orange)', maxRows: 2 }),
        {
          name: 'cases',
          type: 'group',
          fields: [{ name: 'h2', type: 'text' }, { name: 'lede', type: 'text' }, { name: 'items', type: 'array', maxRows: 4, fields: [{ name: 'slug', type: 'text', required: true }, { name: 'label', type: 'text', required: true }] }, { name: 'button', type: 'text' }],
        },
        {
          name: 'outcomes',
          type: 'group',
          fields: [{ name: 'h2', type: 'text' }, { name: 'lede', type: 'textarea' }, { name: 'items', type: 'array', maxRows: 6, fields: [{ name: 'title', type: 'text', required: true }, { name: 'body', type: 'text' }] }, { name: 'tile', type: 'select', options: TILES }],
        },
        { name: 'trust', type: 'group', fields: [{ name: 'h2', type: 'text' }, { name: 'sub', type: 'text' }] },
        { name: 'quote', type: 'group', fields: [{ name: 'text', type: 'textarea' }, { name: 'role', type: 'text' }, { name: 'caseSlug', type: 'text' }] },
        { name: 'faq', type: 'group', fields: [{ name: 'eyebrow', type: 'text' }, { name: 'h2', type: 'text' }, { name: 'lede', type: 'text' }, { name: 'items', type: 'array', fields: [{ name: 'q', type: 'text', required: true }, { name: 'a', type: 'textarea', required: true }] }] },
        { name: 'cta', type: 'group', fields: [{ name: 'h2', type: 'text' }, { name: 'lede', type: 'textarea' }, { name: 'button', type: 'text' }] },
        { name: 'blogCategory', type: 'text', admin: { description: 'Posts in this category are listed first.' } },
        seo,
      ],
    },
  ],
}
