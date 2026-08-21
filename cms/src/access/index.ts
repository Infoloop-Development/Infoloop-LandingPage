import type { Access } from 'payload'

/** Public read: the Astro build fetches content without credentials. */
export const anyone: Access = () => true

/** Logged-in editors (or an API key) only. */
export const authenticated: Access = ({ req: { user } }) => Boolean(user)

/**
 * Public read of published documents only. Editors (or an API key) see
 * everything, including drafts. Without this, `?draft=true` on a public
 * endpoint would return unpublished work.
 */
export const publishedOrAuthenticated: Access = ({ req: { user } }) => {
  if (user) return true
  return { _status: { equals: 'published' } }
}

/** Testimonials: the public only sees quotes with written client approval. */
export const approvedOrAuthenticated: Access = ({ req: { user } }) => {
  if (user) return true
  return { approved: { equals: true } }
}
