import type { CollectionConfig } from 'payload'
import { publishedOrAuthenticated } from '../access'
import { rebuildAfterChange, rebuildAfterDelete } from '../hooks/revalidate'
import { seo, slug } from '../fields'
import { editorAccess, hideUnlessCategory } from '../access/permissions'

/** Blog posts. */
export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Post', plural: 'Blog posts' },
  access: {
    read: publishedOrAuthenticated,
    create: editorAccess('posts'),
    update: editorAccess('posts'),
    delete: editorAccess('posts'),
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'publishedAt', '_status', 'updatedAt'],
    group: 'Work and blog',
    hidden: hideUnlessCategory('posts'),
  },
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
