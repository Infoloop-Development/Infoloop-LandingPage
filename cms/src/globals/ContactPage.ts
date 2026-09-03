import type { GlobalConfig } from 'payload'
import { anyone } from '../access'
import { editorAccess, hideUnlessCategory } from '../access/permissions'
import { seo, strings } from '../fields'

/**
 * /contact copy. Mirrors web/src/content/contact.ts (CONTACT) key for key:
 * hero (h1, lede, photoAlt), the "Schedule a meeting" card and its form,
 * the "Up for a quick connect?" band, the brochure section with its gate,
 * and the page seo pair.
 */
export const ContactPage: GlobalConfig = {
  slug: 'contact-page',
  label: 'Contact page',
  access: { read: anyone, update: editorAccess('contact') },
  admin: { group: 'Pages', hidden: hideUnlessCategory('contact') },
  fields: [
    {
      name: 'h1',
      type: 'text',
      admin: {
        description:
          'The one H1 on the page. Wrap a phrase in [[double brackets]] to give it the orange highlight, e.g. "Dedicated to guiding you to the [[next level]]."',
      },
    },
    {
      name: 'lede',
      type: 'textarea',
      admin: { description: 'The paragraph under the H1, beside the photo. One or two sentences that tell a visitor what to send.' },
    },
    {
      name: 'photoAlt',
      type: 'text',
      admin: {
        description:
          'Alt text for the hero photo frame. Screen readers announce it and search engines read it, so describe what is in the picture rather than repeating the headline.',
      },
    },
    {
      name: 'form',
      type: 'group',
      label: 'Schedule a meeting form',
      admin: {
        description:
          'The white card inside the black band. The ten input labels (Name, Email, Phone number, Company, Country, Looking for, About project, Project budget (in USD), Project timeline, How did you hear about us?) are set in the page code and cannot be changed here. What you control below is the heading, the button, the thank you message and the four dropdown lists.',
      },
      fields: [
        { name: 'h2', type: 'text', admin: { description: 'Heading on the card, currently "Schedule a meeting".' } },
        {
          name: 'sub',
          type: 'text',
          admin: {
            description:
              'One line under that heading. It carries the reply promise ("within one business day"), so only change it to something the team can keep.',
          },
        },
        {
          name: 'submit',
          type: 'text',
          admin: {
            description:
              'Label on the send button, currently "Submit now". While the form is posting the button switches to "Sending" on its own, so you do not need a second label for that.',
          },
        },
        {
          name: 'success',
          type: 'group',
          label: 'Thank you message',
          admin: {
            description:
              'Replaces the whole form once a message goes through. The visitor reads this instead of the fields, so it is the last thing the page says to a brand new lead.',
          },
          fields: [
            { name: 'h3', type: 'text', admin: { description: 'Headline of the thank you state, shown where the form was.' } },
            {
              name: 'body',
              type: 'textarea',
              admin: { description: 'Sentence under the thank you headline. A good place to set expectations about who replies and how fast.' },
            },
          ],
        },
        strings('countries', {
          label: 'Country options',
          admin: {
            description:
              'Choices in the Country dropdown, one per row, in the order a visitor sees them. The dropdown opens on "Select", so no row is preselected. Keep a catch all such as "Other" in the last row.',
          },
        }),
        strings('lookingFor', {
          label: 'Looking for options',
          admin: {
            description:
              'Choices in the "Looking for" dropdown, one per row. The line a visitor picks is what lands in the sales inbox, so word each one the way you want leads reported, and keep the list matched to the services and products the site actually sells.',
          },
        }),
        strings('budgets', {
          label: 'Project budget options',
          admin: {
            description:
              'Choices in the "Project budget (in USD)" dropdown, one per row, lowest band first. Keep an option for people who have not set a number yet, otherwise they abandon the form here.',
          },
        }),
        strings('timelines', {
          label: 'Project timeline options',
          admin: {
            description:
              'Choices in the "Project timeline" dropdown, one per row, soonest first. Keep a "Just exploring" style option so early stage leads still send the form.',
          },
        }),
      ],
    },
    {
      name: 'quick',
      type: 'group',
      label: 'Up for a quick connect band',
      admin: {
        description:
          'The orange hatched band between the form and the brochure. The email and phone boxes inside it are pulled from Site settings, so change those there, not here.',
      },
      fields: [
        { name: 'h2', type: 'text', admin: { description: 'Heading on the band, currently "Up for a quick connect?".' } },
        { name: 'sub', type: 'text', admin: { description: 'One line under that heading, sitting above the email and phone boxes.' } },
      ],
    },
    {
      name: 'brochure',
      type: 'group',
      label: 'Brochure section',
      admin: {
        description:
          'The black band at the foot of the page. The button does not download anything straight away: it opens a two-field gate, captures the lead, and then the PDF opens in a new tab.',
      },
      fields: [
        { name: 'h2', type: 'text', admin: { description: 'Heading on the black band, currently "A glimpse into our expertise".' } },
        {
          name: 'sub',
          type: 'text',
          admin: { description: 'One line under that heading. Say what is inside the brochure, so handing over an email address feels like a fair trade.' },
        },
        { name: 'button', type: 'text', admin: { description: 'Label on the button that opens the gate, currently "Download brochure".' } },
        {
          name: 'file',
          type: 'text',
          admin: {
            description:
              'Path to the PDF that opens once the gate is submitted, e.g. /downloads/infoloop-brochure.pdf. The file has to be in the site downloads folder already; typing a path here does not upload anything. A wrong path means the gate still captures the lead and then opens nothing.',
          },
        },
        {
          name: 'gate',
          type: 'group',
          label: 'Brochure gate',
          admin: {
            description:
              'The small form that appears in place of the button. It asks for two things only, Name and Work email, and those two input labels are set in the page code. The copy below is yours.',
          },
          fields: [
            { name: 'h3', type: 'text', admin: { description: 'Heading on the gate, currently "Where should we send it?".' } },
            {
              name: 'body',
              type: 'textarea',
              admin: {
                description:
                  'One line under the gate heading. Worth saying that the brochure opens right away, since waiting for an email is what makes people close the gate.',
              },
            },
            {
              name: 'submit',
              type: 'text',
              admin: {
                description: 'Label on the gate button, currently "Get the brochure". It switches to "Sending" on its own while the lead is being saved.',
              },
            },
          ],
        },
      ],
    },
    seo,
  ],
}
