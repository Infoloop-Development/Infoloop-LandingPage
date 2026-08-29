import type { CollectionConfig } from 'payload'
import { anyone, authenticated } from '../access'
import { editorAccess, hideUnlessCategory } from '../access/permissions'

/**
 * Feature catalog for the site chatbot estimator.
 * The LLM only picks feature keys; hours come from complexity → hour lookup on the web API.
 */
export const ChatFeatures: CollectionConfig = {
  slug: 'chat-features',
  labels: { singular: 'Chat feature', plural: 'Chat features' },
  access: {
    read: anyone,
    create: editorAccess('chat-features'),
    update: editorAccess('chat-features'),
    delete: editorAccess('chat-features'),
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'key', 'complexity', 'platforms', 'active', 'updatedAt'],
    group: 'Sales',
    description:
      'Catalog the chatbot can suggest when a visitor wants a build. Complexity maps to fixed hours on the website API (not editable by the model).',
    hidden: hideUnlessCategory('chat-features'),
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'key',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'Stable id the model returns in tool calls, e.g. user-auth.' },
    },
    { name: 'description', type: 'textarea', required: true },
    {
      name: 'complexity',
      type: 'select',
      required: true,
      defaultValue: 'medium',
      options: [
        { label: 'Simple', value: 'simple' },
        { label: 'Medium', value: 'medium' },
        { label: 'Complex', value: 'complex' },
      ],
    },
    {
      name: 'platforms',
      type: 'select',
      hasMany: true,
      required: true,
      options: [
        { label: 'Web', value: 'web' },
        { label: 'Mobile', value: 'mobile' },
        { label: 'Backend', value: 'backend' },
      ],
    },
    {
      name: 'tags',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'E-commerce', value: 'ecommerce' },
        { label: 'Marketplace', value: 'marketplace' },
        { label: 'SaaS', value: 'saas' },
        { label: 'Social', value: 'social' },
        { label: 'Booking', value: 'booking' },
        { label: 'AI', value: 'ai' },
        { label: 'Admin', value: 'admin' },
        { label: 'Payments', value: 'payments' },
        { label: 'General', value: 'general' },
      ],
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 100,
      admin: { position: 'sidebar' },
    },
  ],
}
