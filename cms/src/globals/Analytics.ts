import type { GlobalConfig } from 'payload'
import { anyone } from '../access'
import { editorAccess, hideUnlessCategory } from '../access/permissions'

/**
 * Site analytics and measurement IDs. Editors paste vendor IDs here; the
 * Astro site reads this global at build time and injects the scripts.
 * Saving this global triggers a site rebuild (see hooks/revalidate).
 */
export const Analytics: GlobalConfig = {
  slug: 'analytics',
  label: 'Analytics & tracking',
  access: { read: anyone, update: editorAccess('analytics') },
  admin: {
    group: 'Settings',
    hidden: hideUnlessCategory('analytics'),
    description:
      'Connect Google Analytics and other tools without a code change. Paste the IDs from each vendor, tick the privacy checkbox, save, and wait for the site rebuild.',
  },
  fields: [
    {
      type: 'group',
      name: 'google',
      label: 'Google',
      admin: {
        description:
          'GA4: Admin → Data streams → copy Measurement ID (G-…). Optional GTM: paste GTM-… and put GA4 inside the container (do not double-tag). Search Console meta token only if DNS verification is unavailable.',
      },
      fields: [
        {
          name: 'ga4Id',
          type: 'text',
          label: 'Google Analytics 4 ID',
          admin: {
            description: 'Measurement ID from GA4, e.g. G-XXXXXXXXXX. Leave empty to disable.',
            placeholder: 'G-XXXXXXXXXX',
          },
        },
        {
          name: 'gtmId',
          type: 'text',
          label: 'Google Tag Manager ID (optional)',
          admin: {
            description:
              'Container ID, e.g. GTM-XXXXXXX. If set, the direct GA4 tag above is skipped so you do not double-count. Put GA4 inside the GTM container instead.',
            placeholder: 'GTM-XXXXXXX',
          },
        },
        {
          name: 'gscVerification',
          type: 'text',
          label: 'Google Search Console verification (optional)',
          admin: {
            description:
              'HTML-tag verification content only (not the whole meta tag). Prefer DNS verification when you can.',
            placeholder: 'google-site-verification token',
          },
        },
      ],
    },
    {
      type: 'group',
      name: 'other',
      label: 'Other tools (optional)',
      fields: [
        {
          name: 'plausibleDomain',
          type: 'text',
          label: 'Plausible domain',
          admin: {
            description: 'Cookieless analytics. Usually your site hostname, e.g. infoloop.co',
            placeholder: 'infoloop.co',
          },
        },
        {
          name: 'clarityId',
          type: 'text',
          label: 'Microsoft Clarity project ID',
          admin: {
            description: 'Session recordings / heatmaps. Needs consent banner. Use only if you need this.',
          },
        },
        {
          name: 'linkedinPartnerId',
          type: 'text',
          label: 'LinkedIn Insight Tag partner ID',
          admin: {
            description: 'Only if you run LinkedIn Ads. Sets advertising cookies.',
          },
        },
        {
          name: 'posthogKey',
          type: 'text',
          label: 'PostHog project API key',
          admin: {
            description: 'Product analytics. Usually not needed on a marketing site.',
          },
        },
        {
          name: 'posthogHost',
          type: 'text',
          label: 'PostHog host',
          defaultValue: 'https://eu.i.posthog.com',
          admin: {
            description: 'Default EU host. Change only if your PostHog project uses another region.',
          },
        },
      ],
    },
    {
      type: 'group',
      name: 'compliance',
      label: 'Privacy & consent',
      fields: [
        {
          name: 'privacyDisclosed',
          type: 'checkbox',
          label: 'Privacy policy updated (required to enable any tracker)',
          defaultValue: false,
          admin: {
            description:
              'Tick this only when you accept that /privacy will disclose website analytics. The site will not ship trackers without this.',
          },
        },
        {
          name: 'consentRequired',
          type: 'checkbox',
          label: 'Ask visitors for cookie consent',
          defaultValue: true,
          admin: {
            description:
              'Shows the cookie banner for GA4, GTM, Clarity, PostHog and LinkedIn. Leave on for EU/UK visitors unless a lawyer advises otherwise.',
          },
        },
      ],
    },
  ],
}
