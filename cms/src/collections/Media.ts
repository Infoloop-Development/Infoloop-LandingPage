import type { CollectionConfig } from 'payload'
import { anyone } from '../access'
import { mediaEditorAccess, hideUnlessMedia } from '../access/permissions'

/**
 * Uploads. Alt text is required (accessibility and image SEO). Files are
 * served from the CMS host by default; for production point this at Bunny
 * Storage or Cloudinary via a storage adapter (see README, "Media").
 */
export const Media: CollectionConfig = {
  slug: 'media',
  access: { read: anyone, create: mediaEditorAccess, update: mediaEditorAccess, delete: mediaEditorAccess },
  admin: { group: 'Settings', hidden: hideUnlessMedia() },
  upload: {
    // Relative to src/ (the config dir): cms/media, which is gitignored.
    staticDir: '../media',
    mimeTypes: ['image/*', 'application/pdf', 'video/mp4'],
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
      { name: 'card', width: 960, height: 640, position: 'centre' },
      { name: 'og', width: 1200, height: 630, position: 'centre' },
    ],
    adminThumbnail: 'thumbnail',
    formatOptions: { format: 'webp' },
  },
  fields: [
    { name: 'alt', type: 'text', required: true },
    { name: 'caption', type: 'text' },
  ],
}
