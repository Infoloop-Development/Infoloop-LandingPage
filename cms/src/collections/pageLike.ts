import type { CollectionConfig, Field } from 'payload'
import { publishedOrAuthenticated } from '../access'
import { rebuildAfterChange, rebuildAfterDelete } from '../hooks/revalidate'
import { seo, slug } from '../fields'
import { editorAccess, hideUnlessCategory, type ContentCategory } from '../access/permissions'

/**
 * Shared shape for the marketing page collections (services, industries,
 * hire, products): a title, slug, hero copy, rich body, FAQ and SEO, with
 * drafts and versions. Each collection adds its own fields on top.
 */
export function pageLike(
  config: Pick<CollectionConfig, 'slug' | 'labels'> & {
    group: string
    category: ContentCategory
    extraFields?: Field[]
    description?: string
  },
): CollectionConfig {
  const write = editorAccess(config.category)
  return {
    slug: config.slug,
    labels: config.labels,
    access: { read: publishedOrAuthenticated, create: write, update: write, delete: write },
    admin: {
      useAsTitle: 'title',
      defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
      group: config.group,
      description: config.description,
      hidden: hideUnlessCategory(config.category),
    },
    versions: { drafts: { autosave: true }, maxPerDoc: 20 },
    hooks: { afterChange: [rebuildAfterChange], afterDelete: [rebuildAfterDelete] },
    fields: [
      { name: 'title', type: 'text', required: true },
      slug,
      { name: 'eyebrow', type: 'text', admin: { description: 'Small gray label above the H1.' } },
      { name: 'h1', type: 'text', admin: { description: 'Defaults to the title. Wrap one phrase in [[double brackets]] to highlight it.' } },
      { name: 'lede', type: 'textarea', admin: { description: 'One or two plain sentences under the H1. Say who it is for and what they get.' } },
      { name: 'definition', type: 'textarea', admin: { description: 'One quotable sentence for answer engines: "X is ...".' } },
      ...(config.extraFields ?? []),
      { name: 'body', type: 'richText' },
      {
        name: 'faq',
        type: 'array',
        fields: [
          { name: 'q', type: 'text', required: true },
          { name: 'a', type: 'textarea', required: true },
        ],
      },
      { name: 'cta', type: 'group', fields: [{ name: 'label', type: 'text' }, { name: 'href', type: 'text' }] },
      seo,
    ],
  }
}
