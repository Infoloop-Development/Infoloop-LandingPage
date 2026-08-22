import type { GlobalConfig } from 'payload'
import { anyone } from '../access'
import { editorAccess, hideUnlessCategory } from '../access/permissions'
import { link, strings, seo } from '../fields'
import { INDUSTRY_KEYS, SERVICE_KEYS, TILES } from '../fields/workKeys'

/** /work index copy. Mirrors web/src/content/work.ts (WorkIndex). */
export const WorkPage: GlobalConfig = {
  slug: 'work-page',
  label: 'Work page',
  access: { read: anyone, update: editorAccess('work') },
  admin: { group: 'Pages', hidden: hideUnlessCategory('work') },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'h1', type: 'text', admin: { description: 'One H1, e.g. "Work".' } },
    { name: 'lede', type: 'textarea' },
    {
      name: 'featured',
      type: 'array',
      label: 'Featured tabs (up to 6)',
      maxRows: 6,
      fields: [
        { name: 'label', type: 'text', required: true, admin: { description: 'Short tab label, e.g. "Machinery ERP".' } },
        { name: 'slug', type: 'text', required: true },
      ],
    },
    {
      name: 'browser',
      type: 'group',
      label: 'Toolbar and grid labels',
      fields: [
        { name: 'searchPlaceholder', type: 'text' },
        { name: 'filterLabel', type: 'text' },
        { name: 'allLabel', type: 'text' },
        { name: 'loadMore', type: 'text' },
        { name: 'empty', type: 'textarea' },
        { name: 'featuredButton', type: 'text' },
      ],
    },
    {
      name: 'band',
      type: 'group',
      label: 'CTA band under the grid',
      fields: [{ name: 'h2', type: 'text' }, { name: 'lede', type: 'textarea' }, link('button')],
    },
    link('heroButton', { label: 'Hero and case-page button' }),
    {
      name: 'filters',
      type: 'group',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'allLabel', type: 'text' },
        { name: 'industryLabel', type: 'text' },
        { name: 'serviceLabel', type: 'text' },
        { name: 'industries', type: 'array', fields: [{ name: 'key', type: 'select', required: true, options: INDUSTRY_KEYS }, { name: 'label', type: 'text', required: true }] },
        { name: 'services', type: 'array', admin: { description: 'Leave empty to filter by industry only (7Span pattern).' }, fields: [{ name: 'key', type: 'select', required: true, options: SERVICE_KEYS }, { name: 'label', type: 'text', required: true }] },
      ],
    },
    {
      name: 'snapshots',
      type: 'array',
      admin: { description: 'Outcomes without a full case page; the card links out.' },
      fields: [
        { name: 'slug', type: 'text', required: true },
        { name: 'client', type: 'text' },
        { name: 'industry', type: 'text' },
        { name: 'industryKey', type: 'select', options: INDUSTRY_KEYS },
        { name: 'serviceKeys', type: 'select', hasMany: true, options: SERVICE_KEYS },
        { name: 'tags', type: 'text' },
        { name: 'tile', type: 'select', options: TILES },
        { name: 'card', type: 'group', fields: [{ name: 'title', type: 'text' }, { name: 'blurb', type: 'textarea' }, { name: 'metric', type: 'text' }, { name: 'metricLabel', type: 'text' }] },
        { name: 'href', type: 'text' },
        { name: 'linkLabel', type: 'text' },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      fields: [{ name: 'eyebrow', type: 'text' }, { name: 'h2', type: 'text' }, { name: 'lede', type: 'textarea' }, link('button'), link('secondary')],
    },
    seo,
  ],
}
