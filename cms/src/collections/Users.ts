import type { CollectionConfig } from 'payload'
import {
  CONTENT_CATEGORIES,
  adminOnlyField,
  isAdminUser,
  usersUpdateAccess,
  type CmsUser,
} from '../access/permissions'
import { mediaUpload } from '../fields'

/**
 * CMS editors. Admins create users with a temporary password and access rules.
 * Limited users only see granted categories (and optional individual pages).
 * On first login, mustChangePassword forces a password change screen.
 */
export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'User', plural: 'Users' },
  admin: {
    useAsTitle: 'email',
    group: 'Settings',
    defaultColumns: ['email', 'name', 'role', 'accessMode', 'mustChangePassword', 'updatedAt'],
    description:
      'Create editors with a temporary password. Choose full access or limit by category / individual pages. Tick “Must change password” so they set their own password on first login.',
    hidden: ({ user }) => (user as CmsUser | undefined)?.role !== 'admin',
  },
  auth: { useAPIKey: true },
  access: {
    admin: ({ req: { user } }) => Boolean(user),
    read: ({ req: { user } }) => {
      if (!user) return false
      if ((user as CmsUser).role === 'admin') return true
      return { id: { equals: user.id } }
    },
    create: isAdminUser,
    update: usersUpdateAccess,
    delete: isAdminUser,
  },
  hooks: {
    beforeChange: [
      ({ data, operation, req, originalDoc }) => {
        if (!data) return data
        const actor = req.user as CmsUser | undefined
        const actorIsAdmin = actor?.role === 'admin'

        // Non-admins editing themselves cannot change access fields.
        if (!actorIsAdmin && operation === 'update') {
          delete data.role
          delete data.accessMode
          delete data.categories
          delete data.allowedServices
          delete data.allowedProducts
          delete data.allowedWork
          // Self-service password change may clear the flag; they cannot force it back on.
          if (data.mustChangePassword === true) delete data.mustChangePassword
        }

        if (operation === 'create') {
          if (data.mustChangePassword === undefined || data.mustChangePassword === null) {
            data.mustChangePassword = true
          }
          if (!data.accessMode) data.accessMode = 'full'
          if (!data.role) data.role = 'editor'
        }

        // Admin set / reset a password → require change on next login unless they unchecked it.
        if (
          actorIsAdmin &&
          operation === 'update' &&
          typeof data.password === 'string' &&
          data.password.length > 0 &&
          data.mustChangePassword === undefined
        ) {
          data.mustChangePassword = true
        }

        // Limited mode needs at least one category (admins only).
        if (actorIsAdmin && data.accessMode === 'limited') {
          const cats = data.categories ?? originalDoc?.categories
          if (!Array.isArray(cats) || cats.length === 0) {
            throw new Error('Limited access requires at least one content category.')
          }
        }

        return data
      },
    ],
  },
  fields: [
    { name: 'name', type: 'text' },
    {
      name: 'role',
      type: 'select',
      defaultValue: 'editor',
      options: [
        { label: 'Admin (manage users)', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      access: { update: adminOnlyField },
      admin: { description: 'Admins can create and manage other users.' },
    },
    {
      name: 'accessMode',
      type: 'select',
      defaultValue: 'full',
      options: [
        { label: 'Full access (all pages)', value: 'full' },
        { label: 'Limited (categories / individual pages)', value: 'limited' },
      ],
      access: { update: adminOnlyField },
      admin: {
        description: 'Full = everything in the CMS. Limited = only the categories and pages below.',
      },
    },
    {
      name: 'categories',
      type: 'select',
      hasMany: true,
      options: [...CONTENT_CATEGORIES],
      access: { update: adminOnlyField },
      admin: {
        condition: (_, siblingData) => siblingData?.accessMode === 'limited',
        description: 'Which areas of the CMS this user can open. Leave individual page lists empty to allow every page in a category.',
      },
    },
    {
      name: 'allowedServices',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      access: { update: adminOnlyField },
      admin: {
        condition: (_, siblingData) =>
          siblingData?.accessMode === 'limited' && Array.isArray(siblingData?.categories) && siblingData.categories.includes('services'),
        description: 'Optional. If set, user may only edit these service pages (not the whole Services category).',
      },
    },
    {
      name: 'allowedProducts',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      access: { update: adminOnlyField },
      admin: {
        condition: (_, siblingData) =>
          siblingData?.accessMode === 'limited' && Array.isArray(siblingData?.categories) && siblingData.categories.includes('products'),
        description: 'Optional. Restrict to these products only.',
      },
    },
    {
      name: 'allowedWork',
      type: 'relationship',
      relationTo: 'work',
      hasMany: true,
      access: { update: adminOnlyField },
      admin: {
        condition: (_, siblingData) =>
          siblingData?.accessMode === 'limited' && Array.isArray(siblingData?.categories) && siblingData.categories.includes('work'),
        description: 'Optional. Restrict to these case studies only.',
      },
    },
    {
      name: 'mustChangePassword',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description:
          'On by default for new users. After they log in with the temporary password they must set a new one. Tick again after you reset their password.',
      },
    },
    { name: 'title', type: 'text', admin: { description: 'Shown as the author line on blog posts.' } },
    mediaUpload('photo', { label: 'Photo' }),
  ],
}
