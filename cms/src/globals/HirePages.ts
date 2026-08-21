import type { GlobalConfig } from 'payload'
import { anyone, authenticated } from '../access'
import { strings } from '../fields'

/** Hire talent pages (/hire-<role>). Mirrors web/src/content/hire.ts. */
export const HirePages: GlobalConfig = {
  slug: 'hire-pages',
  label: 'Hire talent pages',
  access: { read: anyone, update: authenticated },
  admin: { group: 'Pages' },
  fields: [
    {
      name: 'pages',
      type: 'array',
      admin: { description: 'One row per role page. Slug must match the menu link, e.g. hire-react-developers.' },
      fields: [
        { name: 'slug', type: 'text', required: true },
        { name: 'role', type: 'text', required: true },
        { name: 'badge', type: 'text', admin: { description: 'Two or three letters for the orange tile, e.g. TS.' } },
        { name: 'h1', type: 'text', admin: { description: 'One [[highlight]], no full stop.' } },
        { name: 'sub', type: 'text' },
        { name: 'lede', type: 'textarea' },
        strings('bullets', { maxRows: 4 }),
        { name: 'buttons', type: 'group', fields: [{ name: 'primary', type: 'text' }, { name: 'secondary', type: 'text' }] },
        strings('band', { label: 'Marquee (two parts)', maxRows: 2 }),
        { name: 'why', type: 'group', fields: [{ name: 'h2', type: 'text' }, { name: 'lede', type: 'text' }, { name: 'items', type: 'array', maxRows: 5, fields: [{ name: 'title', type: 'text', required: true }, { name: 'body', type: 'textarea' }] }] },
        { name: 'how', type: 'group', fields: [{ name: 'eyebrow', type: 'text' }, { name: 'h2', type: 'text' }, { name: 'lede', type: 'text' }, { name: 'steps', type: 'array', maxRows: 4, fields: [{ name: 'n', type: 'text', required: true }, { name: 'title', type: 'text', required: true }, { name: 'body', type: 'textarea' }] }] },
        { name: 'expertise', type: 'group', fields: [{ name: 'h2', type: 'text' }, { name: 'rows', type: 'array', fields: [{ name: 'label', type: 'text', required: true }, strings('items')] }] },
        {
          name: 'models',
          type: 'group',
          fields: [
            { name: 'h2', type: 'text' },
            { name: 'lede', type: 'textarea' },
            { name: 'items', type: 'array', maxRows: 3, fields: [{ name: 'title', type: 'text', required: true }, strings('tags', { maxRows: 3 }), { name: 'body', type: 'textarea' }, { name: 'button', type: 'text' }, { name: 'tone', type: 'select', options: ['orange', 'ink', 'mist'], required: true }] },
          ],
        },
        { name: 'quote', type: 'group', fields: [{ name: 'text', type: 'textarea' }, { name: 'role', type: 'text' }, { name: 'caseSlug', type: 'text' }] },
        { name: 'cases', type: 'group', fields: [strings('slugs', { maxRows: 3 }), { name: 'button', type: 'text' }] },
        { name: 'meeting', type: 'group', fields: [{ name: 'h2', type: 'text' }, { name: 'lede', type: 'textarea' }] },
        { name: 'faq', type: 'group', fields: [{ name: 'eyebrow', type: 'text' }, { name: 'h2', type: 'text' }, { name: 'lede', type: 'text' }, { name: 'items', type: 'array', fields: [{ name: 'q', type: 'text', required: true }, { name: 'a', type: 'textarea', required: true }] }] },
        { name: 'cta', type: 'group', fields: [{ name: 'h2', type: 'text' }, { name: 'lede', type: 'textarea' }, { name: 'button', type: 'text' }] },
        { name: 'more', type: 'group', fields: [{ name: 'h2', type: 'text' }, strings('roles', { maxRows: 6, admin: { description: 'Six related role paths, e.g. /hire-react-developers' } })] },
        { name: 'seo', type: 'group', fields: [{ name: 'title', type: 'text', maxLength: 60 }, { name: 'description', type: 'textarea', maxLength: 158 }] },
      ],
    },
  ],
}
