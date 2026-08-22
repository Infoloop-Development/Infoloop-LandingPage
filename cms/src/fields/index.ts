import type { ArrayField, Field, GroupField, TextField, UploadField } from 'payload'

/** A link with a label, an href and an optional one-line blurb. */
export const link = (name = 'link', overrides: Partial<GroupField> = {}): GroupField => ({
  name,
  type: 'group',
  fields: [
    { name: 'label', type: 'text', required: true },
    { name: 'href', type: 'text', required: true, admin: { description: 'Site path (/contact) or full URL.' } },
    { name: 'blurb', type: 'text' },
  ],
  ...overrides,
})

/** A list of links (label + href + optional blurb). */
export const links = (name: string, overrides: Partial<ArrayField> = {}): ArrayField => ({
  name,
  type: 'array',
  fields: [
    { name: 'label', type: 'text', required: true },
    { name: 'href', type: 'text', required: true },
    { name: 'blurb', type: 'text' },
  ],
  ...overrides,
})

/**
 * A list of plain strings. Payload stores it as rows of { value }; the Astro
 * adapter flattens it back to string[].
 */
export const strings = (name: string, overrides: Partial<ArrayField> = {}): ArrayField => ({
  name,
  type: 'array',
  fields: [{ name: 'value', type: 'text', required: true }],
  ...overrides,
})

/** Section header: eyebrow, H2, lede. */
export const heading = (opts: { eyebrow?: boolean; lede?: boolean } = {}): Field[] => [
  ...(opts.eyebrow === false ? [] : [{ name: 'eyebrow', type: 'text' } as TextField]),
  {
    name: 'h2',
    type: 'text',
    admin: { description: 'Wrap one phrase in [[double brackets]] to give it the orange highlight.' },
  },
  ...(opts.lede === false ? [] : [{ name: 'lede', type: 'textarea' } as Field]),
]

/** Groups of links: title, optional href and blurb, then items. Used for the mega-menu. */
export const navGroups = (name: string, description?: string): ArrayField => ({
  name,
  type: 'array',
  admin: { description },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'href', type: 'text' },
    { name: 'blurb', type: 'text' },
    links('items'),
  ],
})

/**
 * Media upload with a clear reminder that alt text lives on the Media file
 * (required there). Use everywhere images are attached on pages.
 */
export const mediaUpload = (name: string, overrides: Partial<UploadField> = {}): UploadField => {
  const { admin: adminOverrides, ...rest } = overrides
  return {
    name,
    type: 'upload',
    relationTo: 'media',
    ...rest,
    name,
    type: 'upload',
    relationTo: 'media',
    admin: {
      description:
        'After choosing or uploading, open the Media item and set Alt text (required). That text shows if the image fails to load and is used for accessibility.',
      ...(adminOverrides as object),
    },
  } as UploadField
}

/**
 * Image row for galleries / screenshot lists: media file + optional alt
 * override (falls back to the Media file’s alt on the site).
 */
export const mediaWithAlt = (
  opts: { imageName?: string; imageRequired?: boolean; caption?: boolean; label?: string } = {},
): Field[] => {
  const imageName = opts.imageName ?? 'image'
  const fields: Field[] = [
    mediaUpload(imageName, {
      required: opts.imageRequired !== false,
      label: opts.label ?? 'Image',
    }),
    {
      name: 'alt',
      type: 'text',
      label: 'Alt text override',
      admin: {
        description:
          'Optional. Overrides the Media file’s alt for this placement only. Leave blank to use the Media alt. Shown when the image does not load.',
      },
    },
  ]
  if (opts.caption) {
    fields.push({ name: 'caption', type: 'text', label: 'Caption' })
  }
  return fields
}

/** SEO / social / LLM fields shared by page-like documents and globals. */
export const seo: GroupField = {
  name: 'seo',
  type: 'group',
  label: 'SEO & social',
  admin: {
    description:
      'Meta title and description also drive Open Graph (link previews). Upload a 1200×630 image for a per-page social preview; leave empty to use the site default.',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      maxLength: 60,
      label: 'Meta title',
      admin: { description: 'Browser tab and OG title. Max 60 characters.' },
    },
    {
      name: 'description',
      type: 'textarea',
      maxLength: 158,
      label: 'Meta description',
      admin: { description: 'Search snippet and OG description. Aim for 110 to 158 characters.' },
    },
    mediaUpload('image', {
      label: 'OG / social image',
      admin: {
        description:
          'Optional. 1200×630 recommended. Set Alt text on the Media file (used for og:image:alt).',
      },
    }),
    {
      name: 'llmSummary',
      type: 'textarea',
      label: 'LLM / answer-engine summary',
      admin: {
        description:
          'Optional plain-text blurb for AI crawlers. Appended to the site /llms.txt for this page when set.',
      },
    },
    {
      name: 'noindex',
      type: 'checkbox',
      defaultValue: false,
      label: 'Hide from search engines (noindex)',
    },
  ],
}

/** URL slug, unique per collection. */
export const slug: TextField = {
  name: 'slug',
  type: 'text',
  required: true,
  unique: true,
  index: true,
  admin: { position: 'sidebar', description: 'URL path segment, e.g. custom-software-development.' },
}
