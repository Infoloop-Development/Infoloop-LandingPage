import type { GlobalConfig } from 'payload'
import { anyone } from '../access'
import { editorAccess, hideUnlessCategory } from '../access/permissions'
import { link, strings, seo } from '../fields'

const VALUE_KEYS = ['clarity', 'ownership', 'transparency', 'simplicity', 'speed', 'craft', 'partnership']
const PRIORITY_KEYS = ['people', 'clarity', 'door', 'words']

/** /about copy. Mirrors web/src/content/about.ts (AboutContent), section for section. */
export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  label: 'About page',
  access: { read: anyone, update: editorAccess('about') },
  admin: { group: 'Pages', hidden: hideUnlessCategory('about') },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Story and about',
          fields: [
            {
              name: 'story',
              type: 'group',
              label: 'Our story (hero)',
              fields: [
                { name: 'h1', type: 'text', admin: { description: 'One H1, e.g. "Our story".' } },
                { name: 'sub', type: 'text', label: 'Sub heading' },
                strings('paragraphs'),
                { name: 'photoAlt', type: 'text' },
              ],
            },
            { name: 'about', type: 'group', fields: [{ name: 'h2', type: 'text' }, strings('paragraphs')] },
            strings('band', { label: 'Tagline band (two parts, second is orange)', maxRows: 2 }),
            {
              name: 'vision',
              type: 'group',
              fields: [
                { name: 'h2', type: 'text' },
                { name: 'statement', type: 'textarea', admin: { description: 'Two short lines. A line break in the text is kept on desktop.' } },
                { name: 'body', type: 'textarea' },
              ],
            },
          ],
        },
        {
          label: 'Values and life',
          fields: [
            {
              name: 'values',
              type: 'group',
              fields: [
                { name: 'h2', type: 'text' },
                { name: 'sub', type: 'text' },
                {
                  name: 'items',
                  type: 'array',
                  maxRows: 7,
                  fields: [
                    { name: 'key', type: 'select', required: true, options: VALUE_KEYS, admin: { description: 'Picks the drawn tile.' } },
                    { name: 'title', type: 'text', required: true },
                    { name: 'tag', type: 'text', label: 'Grey tag line' },
                    { name: 'body', type: 'textarea' },
                  ],
                },
              ],
            },
            {
              name: 'life',
              type: 'group',
              label: 'Life @ Infoloop band',
              fields: [{ name: 'h2', type: 'text' }, { name: 'sub', type: 'text' }, link('button')],
            },
            {
              name: 'priorities',
              type: 'group',
              fields: [
                { name: 'h2', type: 'text' },
                { name: 'sub', type: 'textarea' },
                {
                  name: 'items',
                  type: 'array',
                  maxRows: 6,
                  fields: [
                    { name: 'key', type: 'select', required: true, options: PRIORITY_KEYS, admin: { description: 'Picks the thumbnail.' } },
                    { name: 'text', type: 'text', required: true },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Team and closing',
          fields: [
            {
              name: 'team',
              type: 'group',
              fields: [
                { name: 'h2', type: 'text' },
                { name: 'sub', type: 'text' },
                {
                  name: 'members',
                  type: 'array',
                  fields: [
                    { name: 'name', type: 'text', required: true },
                    { name: 'role', type: 'text', required: true, admin: { description: 'Shown in small caps, e.g. "Founder".' } },
                    { name: 'country', type: 'select', options: ['in', 'us'], admin: { description: 'Small flag under the name.' } },
                    { name: 'photo', type: 'text', admin: { description: 'Square photo URL (media library or CDN). Empty shows the silhouette.' } },
                    { name: 'founder', type: 'checkbox', defaultValue: false, admin: { description: 'Marks the founder for the Organization schema.' } },
                    { name: 'linkedin', type: 'text', admin: { description: 'Personal LinkedIn URL (icon on the team card).' } },
                    { name: 'x', type: 'text', label: 'X (Twitter) URL' },
                    { name: 'placeholder', type: 'checkbox', defaultValue: false, admin: { description: 'Tick while the real details are pending (dashed card).' } },
                    {
                      name: 'profile',
                      type: 'group',
                      label: 'Personal page (/<slug>)',
                      admin: { description: 'The page a business-card QR opens (7Span: 7span.com/kaushal). Leave the slug empty for no page.' },
                      fields: [
                        { name: 'slug', type: 'text', admin: { description: 'Short, e.g. "nimit" → infoloop.co/nimit' } },
                        strings('tags', { maxRows: 6, admin: { description: 'Small caps chips next to the photo.' } }),
                        { name: 'bio', type: 'textarea' },
                        {
                          name: 'socials',
                          type: 'array',
                          maxRows: 6,
                          fields: [
                            { name: 'kind', type: 'select', required: true, options: ['linkedin', 'x', 'github', 'instagram', 'whatsapp', 'mail', 'phone'] },
                            { name: 'href', type: 'text', required: true, admin: { description: 'URL, mailto: or tel:' } },
                            { name: 'label', type: 'text', required: true },
                            { name: 'personal', type: 'checkbox', defaultValue: false, admin: { description: 'Tick for the person\'s own profile (feeds Person.sameAs). Leave off for company pages.' } },
                          ],
                        },
                        {
                          name: 'links',
                          type: 'array',
                          maxRows: 10,
                          fields: [
                            { name: 'icon', type: 'select', required: true, options: ['infoloop', 'opsdeck', 'garagezone', 'loopiq', 'verko', 'work', 'contact', 'globe'] },
                            { name: 'title', type: 'text', required: true },
                            { name: 'sub', type: 'text' },
                            { name: 'href', type: 'text', required: true },
                          ],
                        },
                        strings('photoAlts', { maxRows: 3, label: 'Photo strip alt texts (3)' }),
                        seo,
                      ],
                    },
                  ],
                },
              ],
            },
            {
              name: 'closing',
              type: 'group',
              fields: [strings('band', { label: 'Closing band (two parts)', maxRows: 2 }), { name: 'statement', type: 'textarea' }],
            },
            seo,
          ],
        },
      ],
    },
  ],
}
