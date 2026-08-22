import type { CollectionConfig } from 'payload'
import { publishedOrAuthenticated } from '../access'
import { rebuildAfterChange, rebuildAfterDelete } from '../hooks/revalidate'
import { seo, slug } from '../fields'
import { editorAccess, hideUnlessCategory } from '../access/permissions'

/** Free-form pages: About, Careers, Contact, Brand assets, Privacy, Terms, Trust center. */
export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Page', plural: 'Pages' },
  access: {
    read: publishedOrAuthenticated,
    create: editorAccess('pages'),
    update: editorAccess('pages'),
    delete: editorAccess('pages'),
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    group: 'Pages',
    hidden: hideUnlessCategory('pages'),
  },
  versions: { drafts: { autosave: true }, maxPerDoc: 20 },
  hooks: { afterChange: [rebuildAfterChange], afterDelete: [rebuildAfterDelete] },
  fields: [
    { name: 'title', type: 'text', required: true },
    slug,
    { name: 'eyebrow', type: 'text' },
    { name: 'h1', type: 'text' },
    { name: 'lede', type: 'textarea' },
    {
      name: 'sections',
      type: 'blocks',
      blocks: [
        {
          slug: 'richText',
          fields: [{ name: 'body', type: 'richText' }],
        },
        {
          slug: 'faq',
          fields: [
            { name: 'h2', type: 'text' },
            { name: 'items', type: 'array', fields: [{ name: 'q', type: 'text', required: true }, { name: 'a', type: 'textarea', required: true }] },
          ],
        },
        {
          slug: 'stats',
          fields: [
            { name: 'h2', type: 'text' },
            { name: 'items', type: 'array', fields: [{ name: 'value', type: 'text', required: true }, { name: 'label', type: 'text', required: true }] },
          ],
        },
        {
          slug: 'cta',
          fields: [
            { name: 'h2', type: 'text' },
            { name: 'lede', type: 'textarea' },
            { name: 'label', type: 'text' },
            { name: 'href', type: 'text' },
          ],
        },
        {
          slug: 'team',
          fields: [
            { name: 'h2', type: 'text' },
            {
              name: 'people',
              type: 'array',
              fields: [
                { name: 'name', type: 'text', required: true },
                { name: 'role', type: 'text' },
                { name: 'photo', type: 'upload', relationTo: 'media' },
                { name: 'linkedin', type: 'text' },
              ],
            },
          ],
        },
      ],
    },
    seo,
  ],
}
