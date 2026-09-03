import type { GlobalConfig } from 'payload'
import { anyone } from '../access'
import { editorAccess, hideUnlessCategory } from '../access/permissions'
import { seo, strings } from '../fields'

/**
 * The three hub pages the menu links to: /services, /industries and /hire.
 * Mirrors web/src/content/hubs.ts (HUBS, one row per Hub, matched by slug).
 *
 * Only the hero copy, the group heading and the closing CTA live here. The
 * cards inside each group are generated from the detail pages themselves
 * (services from the Solutions group offer list, industries from their H1,
 * roles from their sub line), so a hub can never advertise a page that does
 * not exist and there is nothing to type twice.
 *
 * The rows sit under `pages` because that is the key the Astro adapter reads
 * when it merges an array global over local content by slug.
 *
 * Two wiring steps outside this file, or every edit here is silently ignored:
 * register HubPages in src/payload.config.ts (with the rebuild hook, like the
 * other page globals), and add a getHubs() to web/src/lib/cms.ts that runs
 * HUBS through mergeBySlug on `globals/hub-pages`. The three hub pages import
 * HUBS from the content file directly today.
 */
export const HubPages: GlobalConfig = {
  slug: 'hub-pages',
  label: 'Hub pages (all services / industries / roles)',
  access: { read: anyone, update: editorAccess('hubs') },
  admin: { group: 'Pages', hidden: hideUnlessCategory('hubs') },
  fields: [
    {
      name: 'pages',
      type: 'array',
      label: 'Hub pages',
      maxRows: 3,
      admin: {
        description:
          'One row per hub page: services, industries and hire. Anything you leave empty keeps the copy that ships with the site, so you can edit a single line without retyping the rest.',
      },
      fields: [
        {
          name: 'slug',
          type: 'select',
          required: true,
          options: ['services', 'industries', 'hire'],
          admin: {
            description:
              'Which hub this row edits: services is /services, industries is /industries, hire is /hire. Changing it repoints the whole row to a different page.',
          },
        },
        {
          name: 'eyebrow',
          type: 'text',
          admin: { description: 'Small line above the H1, two or three words, e.g. Services or Hire talent.' },
        },
        {
          name: 'h1',
          type: 'text',
          admin: {
            description:
              'The page H1. Wrap one phrase in [[double brackets]] to give it the orange highlight. No full stop.',
          },
        },
        {
          name: 'lede',
          type: 'textarea',
          admin: {
            description:
              'Paragraph under the H1. Two or three sentences saying what is on the page and how much of it there is.',
          },
        },
        {
          name: 'button',
          type: 'text',
          label: 'Hero button label',
          admin: { description: 'Label only. The hero button always links to /contact.' },
        },
        strings('band', {
          label: 'Marquee (two parts, second is orange)',
          maxRows: 2,
          admin: {
            description:
              'The scrolling band under the hero. Exactly two short lines: the first shows in ink, the second in orange.',
          },
        }),
        {
          name: 'groupsH2',
          type: 'text',
          label: 'Groups heading (H2)',
          admin: { description: 'Heading above the card groups, e.g. The four groups or Where we work.' },
        },
        {
          name: 'groupsLede',
          type: 'textarea',
          label: 'Groups lede',
          admin: {
            description:
              'Paragraph under that heading, telling the reader how to pick. The cards below it are built from the detail pages, so their titles and lines are edited on those pages, not here.',
          },
        },
        {
          name: 'cta',
          type: 'group',
          label: 'Closing CTA panel',
          fields: [
            { name: 'h2', type: 'text', admin: { description: 'Heading on the panel at the foot of the page, usually the "none of these fit" question.' } },
            { name: 'lede', type: 'textarea', admin: { description: 'Paragraph under it: what to do when the reader cannot find themselves in the list.' } },
            { name: 'button', type: 'text', admin: { description: 'Button label. It always links to /contact.' } },
          ],
        },
        seo,
      ],
    },
  ],
}
