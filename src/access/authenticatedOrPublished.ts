import type { Access } from 'payload'

// Logged-in users (editors, and the preview site via its API key or the
// editor's token) read everything, drafts included. Everyone else, including
// the public static build, reads published documents only.
export const authenticatedOrPublished: Access = ({ req: { user } }) =>
  user ? true : { _status: { equals: 'published' } }
