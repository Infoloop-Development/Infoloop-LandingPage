import { pageLike } from './pageLike'

/** "Hire X developers" pages, grouped by discipline. */
export const Hire = pageLike({
  slug: 'hire',
  labels: { singular: 'Hire page', plural: 'Hire talent' },
  group: 'Solutions',
  category: 'hire',
  extraFields: [
    { name: 'group', type: 'select', required: true, options: ['Frontend', 'Backend', 'CMS', 'Design', 'Mobile', 'eCommerce'], admin: { position: 'sidebar' } },
    { name: 'order', type: 'number', admin: { position: 'sidebar' } },
    { name: 'skills', type: 'array', fields: [{ name: 'value', type: 'text', required: true }] },
    {
      name: 'engagement',
      type: 'array',
      label: 'Engagement models',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea' },
      ],
    },
  ],
})
