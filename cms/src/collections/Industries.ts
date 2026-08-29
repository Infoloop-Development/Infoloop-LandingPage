import { pageLike } from './pageLike'

export const Industries = pageLike({
  slug: 'industries',
  labels: { singular: 'Industry', plural: 'Industries' },
  group: 'Solutions',
  category: 'industries',
  extraFields: [
    {
      name: 'group',
      type: 'select',
      required: true,
      options: ['Industrial and manufacturing', 'Technology and software', 'Commerce and consumer', 'Education and learning'],
      admin: { position: 'sidebar' },
    },
    { name: 'order', type: 'number', admin: { position: 'sidebar' } },
    { name: 'proof', type: 'text', admin: { description: 'One published result for this industry.' } },
    {
      name: 'useCases',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea' },
      ],
    },
    { name: 'relatedServices', type: 'relationship', relationTo: 'services', hasMany: true },
    { name: 'relatedWork', type: 'relationship', relationTo: 'work', hasMany: true },
  ],
})
