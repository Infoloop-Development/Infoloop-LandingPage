import type { GlobalConfig } from 'payload'
import { anyone } from '../access'
import { editorAccess, hideUnlessCategory } from '../access/permissions'
import { seo, strings } from '../fields'

/**
 * /careers, /testimonials and /trust-center copy. Mirrors the three exports of
 * web/src/content/company.ts (CAREERS, TESTIMONIALS, TRUST), one top-level
 * group each. Anything left empty here falls back to the copy committed in
 * that file, so an empty field is safe: it means "keep what is on the site".
 */
export const CompanyPages: GlobalConfig = {
  slug: 'company-pages',
  label: 'Company pages (careers, testimonials, trust center)',
  access: { read: anyone, update: editorAccess('company') },
  admin: { group: 'Pages', hidden: hideUnlessCategory('company') },
  fields: [
    {
      name: 'careers',
      type: 'group',
      label: 'Careers page (/careers)',
      admin: { description: 'The careers page. Every button on this page opens a mail to the careers address in Site settings, so you write the label only, never a link.' },
      fields: [
        { name: 'eyebrow', type: 'text', admin: { description: 'Small caps line above the H1, e.g. "Careers".' } },
        { name: 'h1', type: 'text', admin: { description: 'The one H1 on the page. Wrap one phrase in [[double brackets]] to give it the orange highlight.' } },
        { name: 'lede', type: 'textarea', admin: { description: 'The paragraph under the H1. Two or three sentences.' } },
        { name: 'button', type: 'text', label: 'Hero button label', admin: { description: 'Label only, e.g. "Send us your work". It opens the careers email from Site settings.' } },
        strings('band', { label: 'Marquee band (two parts, second is orange)', maxRows: 2, admin: { description: 'The scrolling band under the hero. Exactly two lines: the first shows in white, the second in orange.' } }),
        {
          name: 'life',
          type: 'group',
          label: 'What working here is like (dark section)',
          fields: [
            { name: 'h2', type: 'text' },
            { name: 'lede', type: 'textarea' },
            {
              name: 'items',
              type: 'array',
              label: 'Cards',
              admin: { description: 'Shown two per row on desktop, so an even number looks best. Four is the current design.' },
              fields: [
                { name: 'title', type: 'text', admin: { description: 'Card heading, one short line.' } },
                { name: 'body', type: 'textarea', admin: { description: 'Two or three sentences under the heading.' } },
              ],
            },
          ],
        },
        {
          name: 'how',
          type: 'group',
          label: 'How hiring works (four steps)',
          fields: [
            { name: 'eyebrow', type: 'text', admin: { description: 'Small caps line above the H2, e.g. "How hiring works".' } },
            { name: 'h2', type: 'text', admin: { description: 'Wrap one phrase in [[double brackets]] to give it the orange highlight.' } },
            { name: 'lede', type: 'text' },
            {
              name: 'steps',
              type: 'array',
              maxRows: 4,
              admin: { description: 'The step strip is designed for four steps.' },
              fields: [
                { name: 'n', type: 'text', label: 'Step number', admin: { description: 'Typed as text so the leading zero is kept, e.g. 01.' } },
                { name: 'title', type: 'text', admin: { description: 'Wrap one phrase in [[double brackets]] to give it the orange highlight.' } },
                { name: 'body', type: 'textarea' },
              ],
            },
          ],
        },
        {
          name: 'roles',
          type: 'array',
          label: 'Open roles',
          admin: {
            description:
              'Intentionally empty. While there are no rows here the page shows the "nothing open" panel below instead of inventing a job. Add one row and the page lists that real opening instead of the panel, and the row is also published as a Google for Jobs posting, so fill in every field before you save.',
          },
          fields: [
            { name: 'title', type: 'text', admin: { description: 'Job title as a candidate would search for it, e.g. "Full-stack engineer".' } },
            { name: 'team', type: 'text', admin: { description: 'Shown in small caps beside the title, e.g. "Engineering".' } },
            { name: 'place', type: 'text', admin: { description: 'Where the job sits, e.g. "Surat, India". Also the job location in the search listing.' } },
            { name: 'type', type: 'text', admin: { description: 'Employment type, e.g. "Full-time" or "Contract". Also sent to Google for Jobs.' } },
            { name: 'blurb', type: 'text', admin: { description: 'One line under the title, and the description in the job listing.' } },
            { name: 'href', type: 'text', label: 'Where to apply', admin: { description: 'Optional. A path or full URL for this role. Leave empty and it uses the careers email from Site settings.' } },
          ],
        },
        {
          name: 'openings',
          type: 'group',
          label: 'Open roles section (headings and the "nothing open" panel)',
          fields: [
            { name: 'h2', type: 'text' },
            { name: 'lede', type: 'textarea' },
            { name: 'emptyTitle', type: 'text', label: 'Nothing open: heading', admin: { description: 'Only shown while Open roles above has no rows.' } },
            { name: 'emptyBody', type: 'textarea', label: 'Nothing open: paragraph', admin: { description: 'Only shown while Open roles above has no rows.' } },
            { name: 'button', type: 'text', label: 'Nothing open: button label', admin: { description: 'Label only. It opens the careers email.' } },
          ],
        },
        {
          name: 'where',
          type: 'group',
          label: 'Where we work',
          fields: [
            { name: 'h2', type: 'text' },
            {
              name: 'items',
              type: 'array',
              label: 'Offices',
              admin: { description: 'One card per office, two per row on desktop.' },
              fields: [
                { name: 'title', type: 'text', admin: { description: 'City and country, e.g. "Surat, India".' } },
                { name: 'body', type: 'text', admin: { description: 'One line on what happens there.' } },
              ],
            },
          ],
        },
        {
          name: 'cta',
          type: 'group',
          label: 'Closing panel',
          fields: [
            { name: 'h2', type: 'text', admin: { description: 'Wrap one phrase in [[double brackets]] to give it the orange highlight.' } },
            { name: 'lede', type: 'textarea' },
            { name: 'button', type: 'text', admin: { description: 'Label only. It opens the careers email.' } },
          ],
        },
        seo,
      ],
    },
    {
      name: 'testimonials',
      type: 'group',
      label: 'Testimonials page (/testimonials)',
      admin: { description: 'Headings only. The quotes and the case studies both come from the Work collection (each case study carries the client quote behind it), and the review scores come from Site settings, so this group is what wraps around them.' },
      fields: [
        { name: 'eyebrow', type: 'text', admin: { description: 'Small caps line above the H1, e.g. "Testimonials".' } },
        { name: 'h1', type: 'text', admin: { description: 'The one H1 on the page. Wrap one phrase in [[double brackets]] to give it the orange highlight.' } },
        { name: 'lede', type: 'textarea', admin: { description: 'The paragraph under the H1.' } },
        { name: 'button', type: 'text', label: 'Hero button label', admin: { description: 'Label only, e.g. "See the work". It goes to /work.' } },
        strings('band', { label: 'Marquee band (two parts, second is orange)', maxRows: 2, admin: { description: 'The scrolling band under the hero. Exactly two lines.' } }),
        { name: 'ratingsH2', type: 'text', label: 'Ratings heading', admin: { description: 'Not shown on the page today: the ratings row carries a hidden heading for screen readers only. Kept so the wording is ready if that row gets a visible heading. The scores themselves are edited in Site settings.' } },
        { name: 'ratingsLede', type: 'text', label: 'Ratings lede', admin: { description: 'Not shown on the page today, for the same reason as the ratings heading above.' } },
        { name: 'quotesH2', type: 'text', label: 'Quotes heading', admin: { description: 'Heading over the client quotes. The quotes themselves live on each case study in the Work collection.' } },
        { name: 'quotesLede', type: 'text', label: 'Quotes lede' },
        { name: 'casesH2', type: 'text', label: 'Case studies heading', admin: { description: 'Heading over the case studies behind the quotes. The cases are edited in the Work collection.' } },
        { name: 'casesLede', type: 'text', label: 'Case studies lede' },
        {
          name: 'cta',
          type: 'group',
          label: 'Closing panel',
          fields: [
            { name: 'h2', type: 'text', admin: { description: 'Wrap one phrase in [[double brackets]] to give it the orange highlight.' } },
            { name: 'lede', type: 'textarea' },
            { name: 'button', type: 'text', admin: { description: 'Label only. It goes to /contact.' } },
          ],
        },
        seo,
      ],
    },
    {
      name: 'trust',
      type: 'group',
      label: 'Trust center (/trust-center)',
      admin: { description: 'The page a careful buyer reads before signing. Only claim what is true today: if a certification or a number is not in hand, it does not go on this page.' },
      fields: [
        { name: 'eyebrow', type: 'text', admin: { description: 'Small caps line above the H1, e.g. "Trust center".' } },
        { name: 'h1', type: 'text', admin: { description: 'The one H1 on the page. Wrap one phrase in [[double brackets]] to give it the orange highlight.' } },
        { name: 'lede', type: 'textarea', admin: { description: 'The paragraph under the H1.' } },
        { name: 'button', type: 'text', label: 'Hero button label', admin: { description: 'Label only, e.g. "Ask a security question". It goes to /contact.' } },
        strings('band', { label: 'Marquee band (two parts, second is orange)', maxRows: 2, admin: { description: 'The scrolling band under the hero. Exactly two lines.' } }),
        {
          name: 'ownership',
          type: 'group',
          label: 'Ownership section',
          fields: [
            { name: 'h2', type: 'text' },
            { name: 'lede', type: 'textarea' },
            {
              name: 'items',
              type: 'array',
              label: 'Cards',
              admin: { description: 'What the client owns: code, accounts, data, and the right to leave. Two per row on desktop.' },
              fields: [
                { name: 'title', type: 'text' },
                { name: 'body', type: 'textarea' },
              ],
            },
          ],
        },
        {
          name: 'practice',
          type: 'group',
          label: 'How we work day to day (dark section)',
          fields: [
            { name: 'h2', type: 'text' },
            { name: 'lede', type: 'textarea' },
            {
              name: 'items',
              type: 'array',
              label: 'Cards',
              admin: { description: 'Practices we can demonstrate on a call. Do not add one we cannot show.' },
              fields: [
                { name: 'title', type: 'text' },
                { name: 'body', type: 'textarea' },
              ],
            },
          ],
        },
        {
          name: 'honest',
          type: 'group',
          label: 'What we do not claim',
          admin: { description: 'The section that says no. Keep it short and keep it true: it is the reason the rest of the page is believed.' },
          fields: [
            { name: 'h2', type: 'text' },
            { name: 'lede', type: 'textarea' },
            strings('items', { label: 'Statements', admin: { description: 'One statement per row, a sentence or two each. Written in full, not as bullet fragments.' } }),
          ],
        },
        {
          name: 'report',
          type: 'group',
          label: 'Report a security problem',
          fields: [
            { name: 'h2', type: 'text' },
            { name: 'lede', type: 'textarea', admin: { description: 'Includes the reply time we promise. Only change it to a time we will actually meet.' } },
            { name: 'button', type: 'text', admin: { description: 'Label only. It opens the general email address from Site settings.' } },
            {
              name: 'include',
              type: 'group',
              label: 'Please include',
              fields: [
                { name: 'title', type: 'text', admin: { description: 'Small heading over the checklist, e.g. "Please include".' } },
                strings('items', { label: 'Checklist lines', admin: { description: 'One short line per row: what the reporter should send us.' } }),
              ],
            },
          ],
        },
        {
          name: 'cta',
          type: 'group',
          label: 'Closing panel',
          fields: [
            { name: 'h2', type: 'text', admin: { description: 'Wrap one phrase in [[double brackets]] to give it the orange highlight.' } },
            { name: 'lede', type: 'textarea' },
            { name: 'button', type: 'text', admin: { description: 'Label only. It goes to /contact.' } },
          ],
        },
        seo,
      ],
    },
  ],
}
