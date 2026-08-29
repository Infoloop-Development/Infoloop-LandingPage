import type { GlobalConfig } from 'payload'
import { anyone } from '../access'
import { editorAccess, hideUnlessCategory } from '../access/permissions'
import { links, navGroups } from '../fields'

/**
 * Site-wide content: brand strings, header and footer navigation, offices,
 * social profiles and review ratings. Mirrors ../../web/src/content/site.ts.
 * The nav here must stay within the approved sitemap (Documents/Solutions.pdf).
 */
export const Site: GlobalConfig = {
  slug: 'site',
  label: 'Site settings',
  access: { read: anyone, update: editorAccess('site') },
  admin: { group: 'Settings', hidden: hideUnlessCategory('site') },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Brand',
          fields: [
            {
              name: 'site',
              type: 'group',
              label: 'Brand and contact',
              fields: [
                { name: 'name', type: 'text', defaultValue: 'Infoloop' },
                { name: 'legalName', type: 'text' },
                { name: 'url', type: 'text', admin: { description: 'Canonical origin, no trailing slash.' } },
                { name: 'title', type: 'text', maxLength: 60, label: 'Home page title (max 60)' },
                { name: 'description', type: 'textarea', maxLength: 158, label: 'Home page meta description (110 to 158)' },
                { name: 'tagline', type: 'text' },
                { name: 'email', type: 'email' },
                { name: 'careersEmail', type: 'email' },
                phone('salesPhone', 'Sales phone (India)'),
                phone('hrPhone', 'HR phone'),
                phone('usSalesPhone', 'Sales phone (US)'),
                { name: 'bookHref', type: 'text', label: 'Header CTA link' },
                { name: 'ctaLabel', type: 'text', label: 'Header CTA label' },
                { name: 'linkedin', type: 'text' },
              ],
            },
          ],
        },
        {
          label: 'Navigation',
          fields: [
            navGroups('services', 'Solutions > Services, grouped Build / Grow / Transform / Consulting.'),
            navGroups('industries', 'Solutions > Industries, four groups.'),
            navGroups('hire', 'Solutions > Hire talent, by discipline.'),
            links('products', { admin: { description: 'Products drawer (OpsDeck, GarageZone, LoopIQ).' } }),
            links('company', { admin: { description: 'Company drawer (About, Testimonials, Career, Contact, Brand assets).' } }),
          ],
        },
        {
          label: 'Footer',
          fields: [
            {
              name: 'offices',
              type: 'array',
              fields: [
                { name: 'key', type: 'text', required: true, admin: { description: 'in, us' } },
                { name: 'name', type: 'text', required: true },
                { name: 'lines', type: 'array', fields: [{ name: 'value', type: 'text', required: true }] },
                {
                  name: 'address',
                  type: 'group',
                  label: 'Structured address (schema.org)',
                  fields: [
                    { name: 'streetAddress', type: 'text' },
                    { name: 'addressLocality', type: 'text' },
                    { name: 'postalCode', type: 'text' },
                    { name: 'addressRegion', type: 'text' },
                    { name: 'addressCountry', type: 'text' },
                  ],
                },
                {
                  name: 'contacts',
                  type: 'array',
                  fields: [
                    { name: 'label', type: 'text', required: true },
                    { name: 'display', type: 'text', required: true },
                    { name: 'tel', type: 'text', required: true, admin: { description: 'E.164, digits only after +.' } },
                  ],
                },
              ],
            },
            {
              name: 'social',
              type: 'array',
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'href', type: 'text', required: true },
                { name: 'icon', type: 'select', required: true, options: ['linkedin', 'x', 'instagram', 'facebook', 'youtube', 'behance', 'dribbble', 'github'] },
              ],
            },
            {
              name: 'ratings',
              type: 'array',
              admin: { description: 'Review platform scores. Update quarterly.' },
              fields: [
                { name: 'score', type: 'text', required: true },
                { name: 'platform', type: 'text', required: true },
                { name: 'href', type: 'text' },
              ],
            },
          ],
        },
      ],
    },
  ],
}

function phone(name: string, label: string) {
  return {
    name,
    type: 'group' as const,
    label,
    fields: [
      { name: 'display', type: 'text' as const, admin: { description: 'As shown, e.g. +1 (773) 717-9128' } },
      { name: 'tel', type: 'text' as const, admin: { description: 'For tel: links, e.g. +17737179128' } },
    ],
  }
}
