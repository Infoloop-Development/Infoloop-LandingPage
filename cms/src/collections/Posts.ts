import type { CollectionConfig } from 'payload'
import { authenticated, publishedOrAuthenticated } from '../access'
import { rebuildAfterChange, rebuildAfterDelete } from '../hooks/revalidate'
import { seo, slug } from '../fields'

/** Blog posts. */
export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Post', plural: 'Blog posts' },
  access: { read: publishedOrAuthenticated, create: authenticated, update: authenticated, delete: authenticated },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'publishedAt', '_status', 'updatedAt'], group: 'Work and blog' },
  versions: { drafts: { autosave: true }, maxPerDoc: 20 },
  hooks: { afterChange: [rebuildAfterChange], afterDelete: [rebuildAfterDelete] },
  fields: [
    { name: 'title', type: 'text', required: true },
    slug,
    { name: 'excerpt', type: 'textarea', admin: { description: 'One or two sentences. Used in lists and as the default meta description.' } },
    { name: 'cover', type: 'upload', relationTo: 'media' },
    { name: 'author', type: 'relationship', relationTo: 'users' },
    { name: 'publishedAt', type: 'date', admin: { position: 'sidebar', date: { pickerAppearance: 'dayOnly' } } },
    { name: 'topics', type: 'array', fields: [{ name: 'value', type: 'text', required: true }] },
    { name: 'body', type: 'richText' },
    {
      name: 'faq',
      type: 'array',
      fields: [
        { name: 'q', type: 'text', required: true },
        { name: 'a', type: 'textarea', required: true },
      ],
    },
    { name: 'relatedServices', type: 'relationship', relationTo: 'services', hasMany: true },
    seo,
  ],
}
