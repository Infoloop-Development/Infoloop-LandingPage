import type { ArrayField, Field, GroupField, TextField } from 'payload'

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

/** SEO fields shared by every page-like document. */
export const seo: GroupField = {
  name: 'seo',
  type: 'group',
  fields: [
    { name: 'title', type: 'text', maxLength: 60, admin: { description: 'Max 60 characters.' } },
    { name: 'description', type: 'textarea', maxLength: 158, admin: { description: '110 to 158 characters.' } },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'noindex', type: 'checkbox', defaultValue: false },
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
