import type { CollectionConfig } from 'payload'
import { approvedOrAuthenticated } from '../access'
import { rebuildAfterChange, rebuildAfterDelete } from '../hooks/revalidate'
import { editorAccess, hideUnlessCategory } from '../access/permissions'
import { mediaUpload } from '../fields'

/** Client quotes. Only quotes the client has approved in writing. */
export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  labels: { singular: 'Testimonial', plural: 'Testimonials' },
  access: {
    read: approvedOrAuthenticated,
    create: editorAccess('testimonials'),
    update: editorAccess('testimonials'),
    delete: editorAccess('testimonials'),
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'company', 'platform', 'updatedAt'],
    group: 'Work and blog',
    hidden: hideUnlessCategory('testimonials'),
  },
  hooks: { afterChange: [rebuildAfterChange], afterDelete: [rebuildAfterDelete] },
  fields: [
    { name: 'quote', type: 'textarea', required: true },
    { name: 'name', type: 'text', required: true },
    { name: 'role', type: 'text' },
    { name: 'company', type: 'text' },
    mediaUpload('photo', { label: 'Photo' }),
    { name: 'platform', type: 'select', options: ['Trustpilot', 'Google', 'Clutch', 'GoodFirms', 'Direct'] },
    { name: 'rating', type: 'number', min: 1, max: 5 },
    { name: 'sourceUrl', type: 'text' },
    { name: 'industry', type: 'relationship', relationTo: 'industries' },
    { name: 'featured', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
    { name: 'approved', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar', description: 'Written approval from the client on file.' } },
  ],
}
