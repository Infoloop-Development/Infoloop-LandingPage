import type { GlobalConfig } from 'payload'
import { anyone } from '../access'
import { editorAccess, hideUnlessCategory } from '../access/permissions'
import { seo, strings } from '../fields'

/**
 * /technologies copy. Mirrors web/src/content/technologies.ts (TECHNOLOGIES),
 * section for section: hero, marquee band, the tabbed panel of groups (each
 * group carries its own list of tools), how we choose a technology, and the
 * closing call to action.
 */
export const TechnologiesPage: GlobalConfig = {
  slug: 'technologies-page',
  label: 'Technologies page',
  access: { read: anyone, update: editorAccess('technologies') },
  admin: { group: 'Pages', hidden: hideUnlessCategory('technologies') },
  fields: [
    { name: 'eyebrow', type: 'text', admin: { description: 'Small line above the H1, e.g. "Technologies".' } },
    { name: 'h1', type: 'text', admin: { description: 'The one H1 on the page. Wrap one phrase in [[double brackets]] to give it the orange highlight.' } },
    { name: 'sub', type: 'text', admin: { description: 'The large line under the H1. One short sentence.' } },
    { name: 'lede', type: 'textarea', admin: { description: 'Opening paragraph under the sub heading. Two or three sentences.' } },
    { name: 'button', type: 'text', label: 'Hero button label', admin: { description: 'Label only. This button always goes to /contact.' } },
    strings('band', {
      label: 'Marquee band (two parts, second is orange)',
      maxRows: 2,
      admin: { description: 'The scrolling band under the hero. Two short lines, the second one is shown in orange.' },
    }),
    {
      name: 'panel',
      type: 'group',
      label: 'Tabbed panel heading',
      admin: { description: 'The heading above the group tabs. The tabs themselves come from Technology groups below.' },
      fields: [
        { name: 'h2', type: 'text', admin: { description: 'Heading above the tabs, e.g. "What we build with".' } },
        { name: 'lede', type: 'textarea', admin: { description: 'One line under the H2. If it names a number of groups, update it when you add or remove one below.' } },
      ],
    },
    {
      name: 'groups',
      type: 'array',
      label: 'Technology groups (the tabs)',
      admin: { description: 'One row per tab, in the order they appear on the rail. Each row holds the tools shown when that tab is selected. The tool count next to each tab label is counted for you.' },
      fields: [
        { name: 'key', type: 'text', admin: { description: 'Stable id for this group, lowercase and no spaces (frontend, backend, mobile). Never shown on the page, so leave it alone once set.' } },
        { name: 'label', type: 'text', admin: { description: 'Short name on the tab rail. One or two words keeps the rail tidy.' } },
        { name: 'h2', type: 'text', admin: { description: 'Heading at the top of the pane for this tab. Usually the same as the tab label.' } },
        { name: 'lede', type: 'textarea', admin: { description: 'One line under the pane heading: what this group of tools is for, in plain words a client would use.' } },
        {
          name: 'items',
          type: 'array',
          label: 'Tools in this group',
          admin: { description: 'One tile per technology. The order here is the order on the page, so put the ones you most want to sell first.' },
          fields: [
            { name: 'name', type: 'text', admin: { description: 'The tool written the way its makers write it, e.g. Next.js, React Native.' } },
            { name: 'what', type: 'textarea', admin: { description: 'One line a business owner understands: what this is for, not what it is. Keep it to a single sentence, the tile is small.' } },
            { name: 'badge', type: 'text', maxLength: 3, admin: { description: 'The short mark in the black square, up to 3 characters (JS, Re, Fig). It stands in for a vendor logo until logo use is cleared.' } },
            { name: 'hire', type: 'text', admin: { description: 'The hire page for this technology, e.g. /hire-react-developers. Leave it empty and the tile links to /contact instead.' } },
          ],
        },
      ],
    },
    {
      name: 'choose',
      type: 'group',
      label: 'How we choose a technology (dark section)',
      admin: { description: 'The dark section between the tabs and the closing call to action.' },
      fields: [
        { name: 'h2', type: 'text', admin: { description: 'Heading for the dark section, e.g. "How we choose a technology".' } },
        { name: 'lede', type: 'textarea', admin: { description: 'One or two lines setting up the questions below.' } },
        {
          name: 'items',
          type: 'array',
          label: 'Questions we ask',
          admin: { description: 'One card each, laid out on a two column grid, so an even number sits best.' },
          fields: [
            { name: 'title', type: 'text', admin: { description: 'The question, e.g. "Could another team take this over?"' } },
            { name: 'body', type: 'textarea', admin: { description: 'The honest answer, two or three sentences.' } },
          ],
        },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      label: 'Closing call to action',
      admin: { description: 'The last panel on the page, above the ratings row.' },
      fields: [
        { name: 'h2', type: 'text', admin: { description: 'Closing heading. Wrap one phrase in [[double brackets]] to give it the orange highlight.' } },
        { name: 'lede', type: 'textarea', admin: { description: 'One line under the closing heading.' } },
        { name: 'button', type: 'text', label: 'Button label', admin: { description: 'Label only. This button always goes to /contact.' } },
      ],
    },
    seo,
  ],
}
