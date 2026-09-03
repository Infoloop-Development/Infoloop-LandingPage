import type { GlobalConfig } from 'payload'
import { anyone } from '../access'
import { editorAccess, hideUnlessCategory } from '../access/permissions'
import { link, seo } from '../fields'

/**
 * /blog index copy. Mirrors web/src/content/blog.ts (BLOG: BlogIndex).
 *
 * Wording only. The articles themselves are either markdown files in
 * web/src/content/posts/ or documents in the Blog posts collection (a CMS
 * post with the same slug replaces the markdown one); the category buttons
 * on /blog are built from the categories those articles carry.
 */
export const BlogPage: GlobalConfig = {
  slug: 'blog-page',
  label: 'Blog index page',
  access: { read: anyone, update: editorAccess('posts') },
  admin: {
    group: 'Pages',
    hidden: hideUnlessCategory('posts'),
    description:
      'Wording on /blog, plus the two blocks that repeat on every article page (the mid-article card and the related articles heading). Leave a field empty to keep the wording the site ships with.',
  },
  fields: [
    {
      name: 'h1',
      type: 'text',
      admin: { description: 'The single H1 at the top of /blog, e.g. "Our knowledge hub". Keep it short.' },
    },
    {
      name: 'lede',
      type: 'textarea',
      admin: { description: 'One line under the H1 that says what the reader gets from the blog.' },
    },
    {
      name: 'exploreH2',
      type: 'text',
      admin: {
        description:
          'Heading over the search box and the full article list, below the three featured cards, e.g. "Keep exploring".',
      },
    },
    {
      name: 'exploreSub',
      type: 'text',
      admin: { description: 'One short line under that heading.' },
    },
    {
      name: 'searchPlaceholder',
      type: 'text',
      admin: { description: 'Faint text inside the empty search box, e.g. "Search blog". Two or three words.' },
    },
    {
      name: 'categoriesLabel',
      type: 'text',
      admin: {
        description:
          'Label above the category filter buttons, e.g. "Top categories". The category names themselves come from the articles and are not edited here.',
      },
    },
    {
      name: 'allLabel',
      type: 'text',
      admin: { description: 'The first filter button, the one that clears the category filter, e.g. "All articles".' },
    },
    {
      name: 'loadMore',
      type: 'text',
      admin: { description: 'Button under the list that reveals the next batch of articles, e.g. "Load more".' },
    },
    {
      name: 'empty',
      type: 'textarea',
      admin: {
        description:
          'Shown in place of the list when a search or a category returns no articles. Tell the reader what to try next.',
      },
    },
    {
      name: 'articleCta',
      type: 'group',
      label: 'Mid-article call to action',
      admin: {
        description:
          'The card that sits part way down every article page, not on this index. Edit it once and it changes on every post.',
      },
      fields: [
        {
          name: 'h3',
          type: 'text',
          admin: { description: 'Card heading, usually a question the reader is already asking.' },
        },
        {
          name: 'body',
          type: 'textarea',
          admin: { description: 'One or two sentences under the heading. Say what happens when they get in touch.' },
        },
        link('button', {
          admin: {
            description:
              'The card button. Label is the words on the button, e.g. "Talk to our experts". Href is where it goes, e.g. /contact.',
          },
        }),
      ],
    },
    {
      name: 'moreH2',
      type: 'text',
      admin: {
        description:
          'Heading over the related articles at the foot of every article page, e.g. "More". Not shown on this index.',
      },
    },
    {
      name: 'moreSub',
      type: 'text',
      admin: { description: 'One short line under that heading.' },
    },
    seo,
  ],
}
