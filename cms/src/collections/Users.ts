import type { CollectionConfig } from 'payload'
import { authenticated } from '../access'

/**
 * Editors. API keys are enabled so the Astro build (and Netlify) can read
 * drafts or private content with `Authorization: users API-Key <key>`;
 * public reads need no key.
 */
export const Users: CollectionConfig = {
  slug: 'users',
  admin: { useAsTitle: 'email', group: 'Settings' },
  auth: { useAPIKey: true },
  access: { read: authenticated, create: authenticated, update: authenticated, delete: authenticated },
  fields: [
    { name: 'name', type: 'text' },
    { name: 'role', type: 'select', defaultValue: 'editor', options: ['admin', 'editor'] },
    { name: 'title', type: 'text', admin: { description: 'Shown as the author line on blog posts.' } },
    { name: 'photo', type: 'upload', relationTo: 'media' },
  ],
}
