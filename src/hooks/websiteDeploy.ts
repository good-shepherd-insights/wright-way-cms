import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
  PayloadRequest,
} from 'payload'

import { websiteDeployWebhook } from '../config/runtime'

// The website is built from published CMS content, so any change to what is
// live calls the deploy webhook (WEBSITE_DEPLOY_WEBHOOK_URL) to rebuild it.

async function deployWebsite(req: PayloadRequest) {
  if (!websiteDeployWebhook) return
  try {
    const response = await fetch(websiteDeployWebhook, { method: 'POST' })
    if (!response.ok) {
      throw new Error(`Website deploy webhook failed with ${response.status} ${response.statusText}`)
    }
  } catch (error) {
    req.payload.logger.error(error instanceof Error ? error.message : 'Website deploy webhook failed')
    throw error
  }
}

/** Publishing a document. */
export const deployOnPublish: CollectionAfterChangeHook = async ({ doc, req }) => {
  if (doc._status === 'published') await deployWebsite(req)
  return doc
}

/**
 * Publishing or unpublishing a document. A draft save (autosave included)
 * never changes the live document, so it is told apart from an unpublish by
 * reading the live document back.
 */
export const deployOnPublishChange: CollectionAfterChangeHook = async ({ collection, doc, previousDoc, req }) => {
  if (doc._status === 'published') {
    await deployWebsite(req)
  } else if (previousDoc?._status === 'published') {
    const live = await req.payload.db.findOne<{ _status?: string; id: number | string }>({
      collection: collection.slug,
      req,
      where: { id: { equals: doc.id } },
    })
    if (live?._status !== 'published') await deployWebsite(req)
  }
  return doc
}

/** Deleting a published document. */
export const deployOnDelete: CollectionAfterDeleteHook = async ({ doc, req }) => {
  if (doc?._status === 'published') await deployWebsite(req)
  return doc
}

/** Publishing a global. */
export const deployOnGlobalPublish: GlobalAfterChangeHook = async ({ doc, req }) => {
  if (doc._status === 'published') await deployWebsite(req)
  return doc
}
