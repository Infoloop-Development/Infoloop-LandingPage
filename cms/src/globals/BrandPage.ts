import type { GlobalConfig } from 'payload'
import { anyone } from '../access'
import { editorAccess, hideUnlessCategory } from '../access/permissions'
import { link, strings, seo } from '../fields'

/** /brand-assets copy. Mirrors web/src/content/brand.ts (BrandContent). */
export const BrandPage: GlobalConfig = {
  slug: 'brand-page',
  label: 'Brand assets page',
  access: { read: anyone, update: editorAccess('brand') },
  admin: { group: 'Pages', hidden: hideUnlessCategory('brand') },
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [{ name: 'h1', type: 'text' }, { name: 'lede', type: 'textarea' }, link('button', { admin: { description: 'The ZIP, e.g. /downloads/infoloop-brand-assets.zip' } })],
    },
    {
      name: 'logo',
      type: 'group',
      label: 'Logo and mark',
      fields: [
        { name: 'h2', type: 'text' },
        strings('paragraphs'),
        { name: 'formatsIntro', type: 'text' },
        strings('formats', { label: 'Colorways (one line each)' }),
        strings('donts', { label: 'Do not (one line each)' }),
      ],
    },
    {
      name: 'tiles',
      type: 'array',
      label: 'Asset tiles (ink band)',
      maxRows: 6,
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'sub', type: 'text' },
        { name: 'src', type: 'text', required: true, admin: { description: 'Preview image path, e.g. /brand/lockup-horizontal-twotone.png' } },
        { name: 'download', type: 'text', required: true },
        { name: 'dark', type: 'checkbox', defaultValue: false, admin: { description: 'Show the preview on an ink swatch.' } },
        { name: 'kind', type: 'select', required: true, options: ['lockup', 'mark'] },
      ],
    },
    {
      name: 'tagline',
      type: 'group',
      fields: [
        { name: 'h2', type: 'text' },
        strings('text', { label: 'Tagline (two parts, second is orange)', maxRows: 2 }),
        { name: 'paragraph', type: 'textarea' },
        { name: 'whenH3', type: 'text' },
        strings('when'),
        { name: 'dontH3', type: 'text' },
        strings('donts'),
        { name: 'download', type: 'text', admin: { description: 'Tagline graphic file path.' } },
      ],
    },
    { name: 'team', type: 'group', fields: [{ name: 'h2', type: 'text' }, { name: 'lede', type: 'textarea' }] },
    { name: 'closing', type: 'group', fields: [{ name: 'statement', type: 'textarea' }] },
    seo,
  ],
}
