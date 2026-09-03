import type { Access, FieldAccess, PayloadRequest } from 'payload'

/** Content areas an editor can be granted. Maps to CMS nav groups. */
export const CONTENT_CATEGORIES = [
  { label: 'Home page', value: 'home' },
  { label: 'Site settings (nav, footer)', value: 'site' },
  { label: 'Service pages', value: 'services' },
  { label: 'Solutions group pages', value: 'solutions' },
  { label: 'Products', value: 'products' },
  { label: 'Work / case studies', value: 'work' },
  { label: 'Industry pages', value: 'industries' },
  { label: 'Hire talent pages', value: 'hire' },
  { label: 'About page', value: 'about' },
  { label: 'Brand assets page', value: 'brand' },
  { label: 'Hub pages (all services / industries / hire)', value: 'hubs' },
  { label: 'Company pages (careers, testimonials, trust center)', value: 'company' },
  { label: 'Contact page', value: 'contact' },
  { label: 'Technologies page', value: 'technologies' },
  { label: 'Analytics', value: 'analytics' },
  { label: 'Blog posts', value: 'posts' },
  { label: 'Testimonials', value: 'testimonials' },
  { label: 'Free-form pages', value: 'pages' },
  { label: 'Media library', value: 'media' },
  { label: 'Chat feature catalog', value: 'chat-features' },
  { label: 'Sales inquiry tickets', value: 'sales-tickets' },
] as const

export type ContentCategory = (typeof CONTENT_CATEGORIES)[number]['value']

export type CmsUser = {
  id: number | string
  email?: string | null
  name?: string | null
  role?: string | null
  accessMode?: 'full' | 'limited' | null
  categories?: ContentCategory[] | null
  allowedServices?: (number | string | { id: number | string })[] | null
  allowedProducts?: (number | string | { id: number | string })[] | null
  allowedWork?: (number | string | { id: number | string })[] | null
  mustChangePassword?: boolean | null
}

export function isFullAccess(user: CmsUser | null | undefined): boolean {
  if (!user) return false
  if (user.role === 'admin') return true
  return user.accessMode !== 'limited'
}

export function canAccessCategory(user: CmsUser | null | undefined, category: ContentCategory): boolean {
  if (!user) return false
  if (isFullAccess(user)) return true
  return Array.isArray(user.categories) && user.categories.includes(category)
}

function idsFromRel(rel: CmsUser['allowedServices']): (string | number)[] {
  if (!Array.isArray(rel) || rel.length === 0) return []
  return rel
    .map((r) => (typeof r === 'object' && r && 'id' in r ? r.id : r))
    .filter((id): id is string | number => id !== null && id !== undefined && id !== '')
}

/** Narrow a limited user to specific document IDs when relationships are set. */
export function docIdConstraint(
  user: CmsUser | null | undefined,
  category: ContentCategory,
  allowedField: 'allowedServices' | 'allowedProducts' | 'allowedWork',
): true | false | { id: { in: (string | number)[] } } {
  if (!user) return false
  if (isFullAccess(user)) return true
  if (!canAccessCategory(user, category)) return false
  const ids = idsFromRel(user[allowedField])
  if (ids.length === 0) return true
  return { id: { in: ids } }
}

/** Create / update / delete for a content category (logged-in editors only). */
export function editorAccess(category: ContentCategory): Access {
  return ({ req: { user } }) => canAccessCategory(user as CmsUser | undefined, category)
}

/** Same, optionally scoped to allowed document IDs. */
export function editorDocAccess(
  category: ContentCategory,
  allowedField: 'allowedServices' | 'allowedProducts' | 'allowedWork',
): Access {
  return ({ req: { user } }) => docIdConstraint(user as CmsUser | undefined, category, allowedField)
}

/** Media: allowed if they have the media category, any content category, or full access. */
export function canAccessMedia(user: CmsUser | null | undefined): boolean {
  if (!user) return false
  if (isFullAccess(user)) return true
  if (canAccessCategory(user, 'media')) return true
  return Array.isArray(user.categories) && user.categories.length > 0
}

export const mediaEditorAccess: Access = ({ req: { user } }) => canAccessMedia(user as CmsUser | undefined)

/** Hide collection/global in admin nav when the user cannot edit it. */
export function hideUnlessCategory(category: ContentCategory) {
  return ({ user }: { user?: CmsUser | null }) => !canAccessCategory(user, category)
}

export function hideUnlessMedia() {
  return ({ user }: { user?: CmsUser | null }) => !canAccessMedia(user)
}

export const isAdminUser: Access = ({ req: { user } }) => Boolean(user && (user as CmsUser).role === 'admin')

export const adminOnlyField: FieldAccess = ({ req: { user } }) => Boolean(user && (user as CmsUser).role === 'admin')

export const isAdminOrSelf: Access = ({ req: { user }, id }) => {
  if (!user) return false
  if ((user as CmsUser).role === 'admin') return true
  return String(user.id) === String(id)
}

/** Users may update their own password / name; only admins manage other users. */
export function usersUpdateAccess({ req: { user }, id }: { req: PayloadRequest; id?: string | number }) {
  if (!user) return false
  if ((user as CmsUser).role === 'admin') return true
  return String(user.id) === String(id)
}
