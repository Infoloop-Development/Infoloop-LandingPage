import type { CollectionConfig } from 'payload'
import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'
import { publishedOrAuthenticated } from '../access'
import { rebuildAfterChange, rebuildAfterDelete } from '../hooks/revalidate'
import { seo, slug, strings, mediaUpload } from '../fields'
import { editorAccess, hideUnlessCategory } from '../access/permissions'

/**
 * Blog posts. Field names mirror the markdown front matter in
 * web/src/content/posts/*.md (web/src/content.config.ts), so a published post
 * here renders through the same /blog/<slug> page as a markdown one, and a CMS
 * post with the same slug replaces the markdown version.
 *
 * The site never parses Lexical JSON: `bodyHtml` is rendered here on save
 * (beforeChange) with Payload's own converter and read by the site as plain
 * HTML. Editors do not see it.
 */
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
    defaultColumns: ['title', 'publishedAt', 'featured', '_status', 'updatedAt'],
    group: 'Work and blog',
    hidden: hideUnlessCategory('posts'),
    description:
      'Published posts appear on /blog after the site rebuilds. Title, excerpt and slug are required for the page to exist; everything else has a sensible default.',
  },
  versions: { drafts: { autosave: true }, maxPerDoc: 20 },
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (!data) return data
        if (data.body && typeof data.body === 'object' && 'root' in data.body) {
          try {
            data.bodyHtml = convertLexicalToHTML({ data: data.body as never, disableContainer: true })
          } catch (err) {
            // A conversion failure must not block saving; the site falls back to an empty body and logs it.
            console.warn('[posts] bodyHtml conversion failed', err)
          }
        } else if (data.body === null) {
          data.bodyHtml = ''
        }
        return data
      },
    ],
    afterChange: [rebuildAfterChange],
    afterDelete: [rebuildAfterDelete],
  },
  fields: [
    { name: 'title', type: 'text', required: true, admin: { description: 'The H1 and the link text in lists.' } },
    slug,
    { name: 'heading', type: 'text', admin: { description: 'Optional longer H1 for the article page. Leave empty to use the title.' } },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      maxLength: 158,
      admin: { description: 'One or two sentences. Used in lists, the RSS feed, and as the meta description unless SEO below overrides it.' },
    },
    { name: 'dek', type: 'textarea', admin: { description: 'Optional standfirst shown under the H1 on the article page.' } },
    mediaUpload('cover', { label: 'Cover image' }),
    {
      name: 'kicker',
      type: 'text',
      admin: { description: 'One-word section label, e.g. Operations, AI, Web. Used as the category when Topics below is empty.' },
    },
    strings('topics', { label: 'Topics (categories)', admin: { description: 'One per row. The first row is the primary category on cards and in the filter buttons on /blog.' } }),
    {
      name: 'authorName',
      type: 'text',
      label: 'Author name',
      admin: { description: 'Shown on cards, the author card and in Article schema. Defaults to "Infoloop team" when empty.' },
    },
    { name: 'authorRole', type: 'text', label: 'Author role', admin: { description: 'e.g. "Head of Managed Delivery, Infoloop".' } },
    { name: 'author', type: 'relationship', relationTo: 'users', admin: { description: 'Optional. If Author name above is empty, this user\'s name is used.' } },
    { name: 'publishedAt', type: 'date', required: true, admin: { position: 'sidebar', date: { pickerAppearance: 'dayOnly' } } },
    { name: 'featured', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar', description: 'Featured posts fill the three cards at the top of /blog first.' } },
    { name: 'readingMinutes', type: 'number', min: 1, admin: { position: 'sidebar', description: 'Optional. Estimated from the text when empty.' } },
    strings('takeaways', { label: 'Key takeaways', admin: { description: 'Two to four one-line points shown near the top of the article.' } }),
    { name: 'body', type: 'richText' },
    {
      name: 'bodyHtml',
      type: 'textarea',
      admin: { hidden: true, readOnly: true, description: 'Rendered from Body on save. Read by the site; not edited by hand.' },
    },
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
