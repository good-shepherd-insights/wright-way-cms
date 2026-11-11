'use client'

import { LivePreviewWindow, useAllFormFields, useAuth, useConfig, useForm, useListDrawer } from '@payloadcms/ui'
import { useEffect, useRef } from 'react'

// The admin half of the click-to-edit bridge: the frontend sends the full
// field path directly and this just dispatches it — no path prefix assumed.
type InlineEditMessage = {
  type?: string
  path?: string
  value?: string
}

export default function InlinePreviewBridge() {
  const [, dispatchFields] = useAllFormFields()
  const { setModified } = useForm()
  const { token } = useAuth()
  // Click-to-change images: the preview sends the image field's path, and
  // Payload's own media picker sets it, exactly like picking in the sidebar.
  const { config } = useConfig()
  const uploadCollections = config.collections.filter((collection) => collection.upload).map((collection) => collection.slug)
  const [MediaDrawer, , { closeDrawer, openDrawer }] = useListDrawer({ collectionSlugs: uploadCollections })
  const imagePath = useRef<string | null>(null)

  useEffect(() => {
    const handleMessage = (event: MessageEvent<InlineEditMessage>) => {
      const message = event.data
      const preview = document.querySelector<HTMLIFrameElement>('#live-preview-iframe')

      if (preview?.contentWindow && event.source !== preview.contentWindow) return
      if (message?.type === 'payload-inline-image' && message.path) {
        imagePath.current = message.path
        openDrawer()
        return
      }
      if (message?.type !== 'payload-inline-edit') return
      if (!message.path || message.value === undefined) return

      dispatchFields({
        type: 'UPDATE',
        path: message.path,
        value: message.value,
      })
      setModified(true)
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [dispatchFields, setModified, openDrawer])

  // The preview runs on the site's domain, where this CMS's session cookie is
  // never sent. Hand it the editor's token instead (it authenticates with an
  // Authorization header): only to the iframe's own origin, when it reports
  // ready, and again whenever the admin refreshes the token.
  useEffect(() => {
    const frame = () => document.querySelector<HTMLIFrameElement>('#live-preview-iframe')
    const send = () => {
      const preview = frame()
      if (!token || !preview?.contentWindow || !preview.src) return
      preview.contentWindow.postMessage({ type: 'payload-preview-auth', token }, new URL(preview.src).origin)
    }
    const onReady = (event: MessageEvent<{ type?: string; ready?: boolean }>) => {
      if (event.source === frame()?.contentWindow && event.data?.type === 'payload-live-preview' && event.data.ready) send()
    }
    send()
    window.addEventListener('message', onReady)
    return () => window.removeEventListener('message', onReady)
  }, [token])

  return (
    <>
      <LivePreviewWindow />
      <MediaDrawer
        onSelect={({ doc }) => {
          if (imagePath.current) {
            dispatchFields({ type: 'UPDATE', path: imagePath.current, value: doc.id })
            setModified(true)
          }
          imagePath.current = null
          closeDrawer()
        }}
      />
    </>
  )
}
