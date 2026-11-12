'use client'

import type { UIFieldClientProps } from 'payload'
import type { ServicePath, ServiceTypeRoute } from '@good-shepherd-insights/payload-plugin-services'

import { Banner, Button, CopyToClipboard, FieldDescription, FieldLabel, useConfig, useDocumentInfo, useLocale } from '@payloadcms/ui'
import { useCallback, useEffect, useState } from 'react'

import { documentGraph, type Doc, type Index, type Result, type Site } from './documentGraph'

// SEO tab: the exact JSON-LD the website publishes for this document
// (built in ./documentGraph.ts), from the last saved draft.

type Props = UIFieldClientProps & {
  defaultLocale: string
  kind: 'page' | 'service'
  siteGlobalSlug: string
  siteOrigin: string
}

export function JsonLdPreview({ defaultLocale, field, kind, path, siteGlobalSlug, siteOrigin }: Props) {
  const { config: { routes: { api }, serverURL } } = useConfig()
  const { id, collectionSlug, hasPublishedDoc, lastUpdateTime } = useDocumentInfo()
  const { code: currentLocale } = useLocale()
  const [result, setResult] = useState<Result>({ state: 'loading' })
  const [refreshes, setRefreshes] = useState(0)

  const load = useCallback(async (signal: AbortSignal): Promise<Result> => {
    if (!id || !collectionSlug) return { state: 'unsaved' }
    const cmsOrigin = serverURL || window.location.origin
    const base = `${cmsOrigin}${api}`
    const get = async <T,>(url: string, optional = false): Promise<T | null> => {
      const res = await fetch(url, { credentials: 'include', signal })
      if (optional && res.status === 404) return null
      if (!res.ok) throw new Error(`${res.status} ${res.statusText} from ${url.replace(base, '')}`)
      return (await res.json()) as T
    }
    // The website publishes services pages in the default locale only.
    const locale = kind === 'service' ? defaultLocale : currentLocale
    const docQuery = new URLSearchParams({ draft: 'true', depth: '1', locale, 'fallback-locale': 'none' })
    const siteQuery = new URLSearchParams({ draft: 'true', depth: '2', locale })
    const [doc, rawSite, types, paths] = await Promise.all([
      get<Doc>(`${base}/${collectionSlug}/${encodeURIComponent(String(id))}?${docQuery}`),
      get<Site>(`${base}/globals/${siteGlobalSlug}?${siteQuery}`),
      get<ServiceTypeRoute[]>(`${base}/payload-plugin-services/types`, true),
      get<ServicePath[]>(`${base}/payload-plugin-services/paths`, true),
    ])
    if (!doc || !rawSite) throw new Error('The document or the site globals could not be read.')
    const index: Index = { types: types ?? [], paths: paths ?? [] }
    return documentGraph({ cmsOrigin, collectionSlug, currentLocale, defaultLocale, doc, hasPublishedDoc, id, index, kind, locale, site: rawSite, siteOrigin })
  }, [api, collectionSlug, currentLocale, defaultLocale, hasPublishedDoc, id, kind, serverURL, siteGlobalSlug, siteOrigin])

  // Rebuilt on open, after every save or autosave, and on Refresh.
  useEffect(() => {
    const controller = new AbortController()
    load(controller.signal)
      .then(setResult)
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        setResult({ state: 'error', message: error instanceof Error ? error.message : 'The structured data could not be built.' })
      })
    return () => controller.abort()
  }, [load, lastUpdateTime, refreshes])

  return (
    <div className="field-type">
      <FieldLabel label={field?.label || 'Structured data (JSON-LD)'} path={path} />
      <FieldDescription
        description="Exactly what the website publishes for this page for search engines, from the last saved draft and the site globals. Read-only: edit the page, its SEO fields or Site Globals → Business to change it."
        path={path}
      />
      {result.state === 'unsaved' && <Banner type="info">Save this document to see its structured data.</Banner>}
      {result.state === 'loading' && <Banner type="info">Building the structured data…</Banner>}
      {result.state === 'error' && <Banner type="error">{result.message}</Banner>}
      {result.state === 'ready' && (
        <>
          {result.notes.map((note) => (
            <Banner key={note} type="info">{note}</Banner>
          ))}
          <div style={{ alignItems: 'center', display: 'flex', flexWrap: 'wrap', gap: 'calc(var(--base) / 2)', marginBottom: 'calc(var(--base) / 2)' }}>
            <CopyToClipboard defaultMessage="Copy JSON-LD" successMessage="Copied" value={result.json} />
            <Button buttonStyle="secondary" margin={false} onClick={() => setRefreshes((n) => n + 1)} size="small">
              Refresh
            </Button>
            {result.live && (
              <>
                <Button buttonStyle="secondary" el="anchor" margin={false} newTab size="small" url={`https://search.google.com/test/rich-results?${new URLSearchParams({ url: result.url })}`}>
                  Google Rich Results Test
                </Button>
                <Button buttonStyle="secondary" el="anchor" margin={false} newTab size="small" url={`https://validator.schema.org/#url=${encodeURIComponent(result.url)}`}>
                  Schema.org validator
                </Button>
              </>
            )}
          </div>
          <pre
            aria-label="JSON-LD"
            style={{
              background: 'var(--theme-elevation-50)',
              border: '1px solid var(--theme-elevation-150)',
              borderRadius: 'var(--style-radius-s)',
              color: 'var(--theme-text)',
              fontFamily: 'var(--font-mono)',
              margin: 0,
              maxHeight: '32rem',
              overflow: 'auto',
              padding: 'var(--base)',
              whiteSpace: 'pre',
            }}
            tabIndex={0}
          >
            {result.json}
          </pre>
        </>
      )}
    </div>
  )
}
