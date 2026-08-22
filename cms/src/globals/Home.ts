import type { GlobalConfig } from 'payload'
import { anyone } from '../access'
import { editorAccess, hideUnlessCategory } from '../access/permissions'
import { heading, link, strings } from '../fields'

/**
 * Landing page content. Field names mirror ../../web/src/content/home.ts
 * one-to-one, so the Astro adapter can merge this global straight over the
 * local defaults. Every group is optional: whatever is left empty here falls
 * back to the copy in the repo.
 */
export const Home: GlobalConfig = {
  slug: 'home',
  label: 'Home page',
  access: { read: anyone, update: editorAccess('home') },
  admin: { group: 'Pages', hidden: hideUnlessCategory('home') },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            {
              name: 'hero',
              type: 'group',
              fields: [
                {
                  name: 'rating',
                  type: 'group',
                  fields: [
                    { name: 'score', type: 'text', admin: { description: 'e.g. "Rated 4.8"' } },
                    { name: 'label', type: 'text', admin: { description: 'e.g. "across four review platforms"' } },
                  ],
                },
                {
                  name: 'h1',
                  type: 'textarea',
                  admin: {
                    description:
                      'Two lines. Use [[double brackets]] for the one orange phrase and a line break for the second line.',
                  },
                },
                { name: 'lede', type: 'textarea' },
                link('primary', { label: 'Primary button' }),
                {
                  name: 'card',
                  type: 'group',
                  label: 'Quote panel and photo slots',
                  fields: [
                    { name: 'quote', type: 'textarea' },
                    { name: 'name', type: 'text' },
                    { name: 'role', type: 'text' },
                    { name: 'leftAlt', type: 'text', label: 'Left photo alt text' },
                    { name: 'rightAlt', type: 'text', label: 'Right photo alt text' },
                    { name: 'leftImage', type: 'upload', relationTo: 'media' },
                    { name: 'rightImage', type: 'upload', relationTo: 'media' },
                  ],
                },
                { name: 'trustedLine', type: 'text' },
              ],
            },
          ],
        },
        {
          label: 'Trusted by',
          fields: [
            {
              name: 'trust',
              type: 'group',
              fields: [
                { name: 'h2', type: 'text' },
                { name: 'sub', type: 'textarea' },
                strings('stack', { admin: { description: 'Names shown in the moving logo row.' } }),
                {
                  name: 'logos',
                  type: 'array',
                  admin: { description: 'Optional client logos (replace the platform names once cleared).' },
                  fields: [
                    { name: 'name', type: 'text', required: true },
                    { name: 'image', type: 'upload', relationTo: 'media', required: true },
                  ],
                },
              ],
            },
            {
              name: 'stats',
              type: 'array',
              label: 'Company numbers',
              admin: { description: 'Only numbers already published on infoloop.co.' },
              fields: [
                { name: 'value', type: 'text', required: true },
                { name: 'suffix', type: 'text' },
                { name: 'label', type: 'text', required: true },
              ],
            },
            strings('band', { label: 'Tagline band words', admin: { description: 'e.g. "We build." and "We run." (the last word is orange).' } }),
          ],
        },
        {
          label: 'Industries',
          fields: [
            {
              name: 'industries',
              type: 'group',
              fields: [
                ...heading(),
                link('cta'),
                {
                  name: 'items',
                  type: 'array',
                  fields: [
                    { name: 'name', type: 'text', required: true },
                    { name: 'linkLabel', type: 'text' },
                    { name: 'href', type: 'text', required: true },
                    { name: 'body', type: 'textarea' },
                    { name: 'proof', type: 'text' },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Services',
          fields: [
            {
              name: 'services',
              type: 'group',
              fields: [
                ...heading(),
                link('cta'),
                {
                  name: 'cards',
                  type: 'array',
                  fields: [
                    { name: 'title', type: 'text', required: true },
                    { name: 'href', type: 'text', required: true },
                    {
                      name: 'bullets',
                      type: 'array',
                      fields: [
                        { name: 'text', type: 'text', required: true },
                        { name: 'href', type: 'text' },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Process',
          fields: [
            {
              name: 'process',
              type: 'group',
              fields: [
                ...heading(),
                {
                  name: 'steps',
                  type: 'array',
                  maxRows: 4,
                  fields: [
                    { name: 'n', type: 'text', required: true, admin: { description: '01, 02, 03, 04' } },
                    { name: 'title', type: 'text', required: true },
                    { name: 'body', type: 'textarea' },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Proof',
          fields: [
            {
              name: 'proof',
              type: 'group',
              fields: [
                ...heading(),
                link('cta'),
                {
                  name: 'featured',
                  type: 'array',
                  maxRows: 3,
                  fields: [
                    { name: 'sector', type: 'text' },
                    { name: 'metric', type: 'text', required: true },
                    { name: 'unit', type: 'text' },
                    { name: 'title', type: 'text', required: true },
                    { name: 'what', type: 'textarea' },
                    { name: 'before', type: 'text' },
                    { name: 'after', type: 'text' },
                    { name: 'bar', type: 'number', min: 0, max: 100, admin: { description: 'Progress bar width, 0 to 100.' } },
                    { name: 'href', type: 'text' },
                  ],
                },
                {
                  name: 'more',
                  type: 'array',
                  fields: [
                    { name: 'metric', type: 'text', required: true },
                    { name: 'text', type: 'text', required: true },
                    { name: 'href', type: 'text' },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Why us',
          fields: [
            {
              name: 'why',
              type: 'group',
              fields: [
                ...heading(),
                {
                  name: 'items',
                  type: 'array',
                  fields: [
                    { name: 'title', type: 'text', required: true },
                    { name: 'body', type: 'textarea' },
                    {
                      name: 'icon',
                      type: 'select',
                      options: ['user', 'tag', 'bolt', 'grid', 'shield', 'pulse'],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Products',
          fields: [
            {
              name: 'products',
              type: 'group',
              fields: [
                ...heading(),
                link('cta'),
                {
                  name: 'items',
                  type: 'array',
                  fields: [
                    { name: 'name', type: 'text', required: true },
                    { name: 'kicker', type: 'text' },
                    { name: 'tile', type: 'select', options: ['attendance', 'garage', 'lms'], admin: { description: 'Thumbnail style.' } },
                    { name: 'image', type: 'upload', relationTo: 'media', admin: { description: 'Optional real screenshot, replaces the drawn tile.' } },
                    { name: 'href', type: 'text', required: true },
                    { name: 'body', type: 'textarea' },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'About',
          fields: [
            {
              name: 'about',
              type: 'group',
              fields: [
                ...heading({ lede: false }),
                strings('paragraphs'),
                {
                  name: 'facts',
                  type: 'array',
                  fields: [
                    { name: 'k', type: 'text', required: true, label: 'Label' },
                    { name: 'v', type: 'text', required: true, label: 'Value' },
                  ],
                },
                {
                  name: 'founder',
                  type: 'group',
                  fields: [
                    { name: 'name', type: 'text' },
                    { name: 'role', type: 'text' },
                    { name: 'note', type: 'text' },
                    { name: 'photo', type: 'upload', relationTo: 'media' },
                  ],
                },
                {
                  name: 'links',
                  type: 'array',
                  fields: [
                    { name: 'label', type: 'text', required: true },
                    { name: 'href', type: 'text', required: true },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'FAQ',
          fields: [
            {
              name: 'faq',
              type: 'group',
              fields: [
                ...heading(),
                {
                  name: 'items',
                  type: 'array',
                  fields: [
                    { name: 'q', type: 'text', required: true, label: 'Question' },
                    { name: 'a', type: 'textarea', required: true, label: 'Answer', admin: { description: 'Complete sentences: this feeds the FAQPage schema.' } },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'CTA',
          fields: [
            {
              name: 'cta',
              type: 'group',
              fields: [
                ...heading(),
                link('button'),
                strings('assurances'),
              ],
            },
          ],
        },
      ],
    },
  ],
}
