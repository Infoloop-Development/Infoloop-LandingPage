import type { GlobalConfig } from 'payload'
import { anyone } from '../access'
import { editorAccess, hideUnlessCategory } from '../access/permissions'
import { strings, seo } from '../fields'

/**
 * The four Solutions group pages (/solutions/build|grow|transform|consulting).
 * Mirrors web/src/content/solutions.ts (SolutionGroup); the offer list per
 * group comes from Site settings > Navigation (Services groups) so the menu
 * and the page never disagree, only the one-line body per service is here.
 */
export const SolutionsPages: GlobalConfig = {
  slug: 'solutions-pages',
  label: 'Solutions group pages',
  access: { read: anyone, update: editorAccess('solutions') },
  admin: { group: 'Pages', hidden: hideUnlessCategory('solutions') },
  fields: [
    {
      name: 'groups',
      type: 'array',
      maxRows: 4,
      fields: [
        { name: 'slug', type: 'select', required: true, options: ['build', 'grow', 'transform', 'consulting'] },
        { name: 'name', type: 'text', required: true },
        { name: 'h1', type: 'text', admin: { description: 'One [[highlight]].' } },
        { name: 'lede', type: 'textarea' },
        { name: 'button', type: 'text', label: 'Hero button label' },
        {
          name: 'proof',
          type: 'group',
          label: 'Hero proof panel (three numbers + one case screen)',
          fields: [
            {
              name: 'metrics',
              type: 'array',
              maxRows: 3,
              fields: [{ name: 'value', type: 'text', required: true }, { name: 'label', type: 'text', required: true }, { name: 'href', type: 'text', required: true }],
            },
            { name: 'tile', type: 'select', options: ['erp', 'attendance', 'shopify', 'copilot', 'garage', 'webflow', 'lms', 'verko'], admin: { description: 'Drawn case screen until real screenshots exist.' } },
            { name: 'caption', type: 'text' },
            { name: 'href', type: 'text', admin: { description: 'Where the caption links, e.g. /work/dtc-shopify-rebuild' } },
          ],
        },
        strings('band', { label: 'Marquee (two parts, second is orange)', maxRows: 2 }),
        {
          name: 'offer',
          type: 'group',
          fields: [
            { name: 'h2', type: 'text' },
            { name: 'lede', type: 'text' },
            {
              name: 'items',
              type: 'array',
              admin: { description: 'One per service in this group; title must match the menu label.' },
              fields: [{ name: 'title', type: 'text', required: true }, { name: 'body', type: 'textarea' }, { name: 'href', type: 'text', required: true }],
            },
          ],
        },
        {
          name: 'process',
          type: 'group',
          fields: [
            { name: 'eyebrow', type: 'text' },
            { name: 'h2', type: 'text' },
            { name: 'lede', type: 'text' },
            { name: 'steps', type: 'array', maxRows: 4, fields: [{ name: 'n', type: 'text', required: true }, { name: 'title', type: 'text', required: true }, { name: 'body', type: 'textarea' }] },
          ],
        },
        { name: 'why', type: 'group', fields: [{ name: 'h2', type: 'text' }, strings('items', { maxRows: 7 }), { name: 'photoAlt', type: 'text' }] },
        { name: 'industries', type: 'group', fields: [{ name: 'h2', type: 'text' }, { name: 'lede', type: 'textarea' }] },
        {
          name: 'tech',
          type: 'group',
          label: 'Technologies we use (Build only)',
          fields: [{ name: 'h2', type: 'text' }, { name: 'rows', type: 'array', fields: [{ name: 'label', type: 'text', required: true }, strings('items')] }],
        },
        {
          name: 'beforeAfter',
          type: 'group',
          label: 'Before and after (Transform only)',
          fields: [
            { name: 'h2', type: 'text' },
            { name: 'lede', type: 'text' },
            { name: 'items', type: 'array', fields: [{ name: 'title', type: 'text', required: true }, { name: 'before', type: 'text' }, { name: 'after', type: 'text' }, { name: 'href', type: 'text', required: true }] },
          ],
        },
        {
          name: 'quotes',
          type: 'array',
          maxRows: 3,
          fields: [{ name: 'text', type: 'textarea', required: true }, { name: 'role', type: 'text', required: true }, { name: 'caseSlug', type: 'text', required: true }],
        },
        { name: 'cta', type: 'group', fields: [{ name: 'h2', type: 'text' }, { name: 'lede', type: 'textarea' }, { name: 'button', type: 'text' }] },
        { name: 'other', type: 'group', fields: [{ name: 'h2', type: 'text' }] },
        seo,
      ],
    },
  ],
}
