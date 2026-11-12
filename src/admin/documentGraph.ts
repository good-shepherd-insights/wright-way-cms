import type { ServicePath, ServiceTypeRoute } from '@good-shepherd-insights/payload-plugin-services'

import { buildPageGraph, type BusinessFacts, type PageGraphInput } from '@good-shepherd-insights/website-components/core'
import { resolveTokens, servicePath } from '@good-shepherd-insights/payload-plugin-services/render'

// The JSON-LD the website publishes for one CMS document, built with the
// same buildPageGraph from the same data the website reads. Everything here
// mirrors the website's own derivation (src/lib/payload.ts, src/lib/services.ts,
// src/components/PageView.astro and the routes); change both together.
// No React: src/admin/JsonLdPreview.tsx fetches the data and shows the result.

export type Section = { blockType: string; [key: string]: unknown }
type Media = { url: string; alt?: string | null; width?: number | null; height?: number | null }
type Place = { name?: string; label?: string; kind?: string; county?: string; geoid?: string }
export type Doc = {
  id: number | string
  slug?: string
  title: string
  sections?: Section[]
  place?: Place
  meta?: { title?: string | null; description?: string | null }
  metadata?: { titleTemplate?: string; description?: string | null }
  hiddenGlobalComponents?: unknown[]
  [field: string]: unknown
}
export type Site = {
  brand?: { logo?: Media | null; logoAlt?: string | null }
  business?: (Omit<BusinessFacts, 'image'> & { image?: Media | string | null }) | null
  components?: { component?: { id: number | string; sections?: Section[] | null } | number | string | null }[]
}
export type Index = { types: ServiceTypeRoute[]; paths: ServicePath[] }

export type Result =
  | { state: 'loading' }
  | { state: 'unsaved' }
  | { state: 'error'; message: string }
  | { state: 'ready'; json: string; url: string; live: boolean; notes: string[] }

// ── Media URLs (website: src/lib/payload.ts) ─────────────────────────────────

const hasText = (value: unknown) => typeof value === 'string' && value.trim().length > 0
const isRelativeMedia = (value: unknown): value is Media => {
  if (!value || typeof value !== 'object') return false
  const media = value as Partial<Media>
  return hasText(media.url) && typeof media.url === 'string' && !media.url.startsWith('http') && typeof media.width === 'number' && typeof media.height === 'number'
}
function absolutizeMediaUrls(value: unknown, cmsOrigin: string): void {
  if (Array.isArray(value)) {
    for (const entry of value) absolutizeMediaUrls(entry, cmsOrigin)
    return
  }
  if (!value || typeof value !== 'object') return
  const record = value as Record<string, unknown>
  if (isRelativeMedia(record)) {
    record.url = new URL(record.url, cmsOrigin).toString()
    return
  }
  for (const child of Object.values(record)) {
    if (child && typeof child === 'object') absolutizeMediaUrls(child, cmsOrigin)
  }
}
function absolutizeSite(site: Site, cmsOrigin: string): Site {
  if (site.brand?.logo?.url) site.brand.logo.url = new URL(site.brand.logo.url, cmsOrigin).toString()
  const image = site.business?.image
  if (image && typeof image === 'object' && image.url) image.url = new URL(image.url, cmsOrigin).toString()
  for (const entry of site.components ?? []) {
    const resolved = entry.component
    if (resolved && typeof resolved === 'object') for (const section of resolved.sections ?? []) absolutizeMediaUrls(section, cmsOrigin)
  }
  return site
}

// ── Services pages (website: src/lib/services.ts) ───────────────────────────

const displayName = (doc: Doc) => doc.place?.name || doc.title
const prefixOf = (index: Index, slug: string) => index.types.find((t) => t.slug === slug)?.pathPrefix ?? ''
const pathOf = (index: Index, collection: string, doc: Doc) => (doc.slug ? servicePath(prefixOf(index, collection), doc.slug) : '')
const asDoc = (value: unknown): Doc | null => (value && typeof value === 'object' ? (value as Doc) : null)

function linkSections(collection: string, doc: Doc, index: Index): Section[] {
  const sections: Section[] = []
  for (const type of index.types) {
    if (type.kind !== 'combination' || !type.tokens || !type.links) continue
    const side = type.parent === collection ? 'parent' : type.child === collection ? 'child' : null
    const heading = side && type.links[side]
    if (!side || !heading) continue
    const links = index.paths
      .filter((p) => p.kind === 'combination' && p.collection === type.slug && String(p[side]) === String(doc.id))
      .slice(0, 40)
      .map((p) => ({ label: p.title, href: p.path }))
    if (links.length === 0) continue
    const context = { [type.tokens[side]]: { ...doc, name: displayName(doc) } }
    sections.push({ blockType: 'linkList', heading: resolveTokens(heading, context), layout: 'grid', tone: 'white', links })
  }
  return sections
}

function servicePage(collection: string, doc: Doc, index: Index) {
  const type = index.types.find((t) => t.slug === collection)
  let context: Record<string, unknown> = { ...doc, name: displayName(doc), path: pathOf(index, collection, doc) }
  let service: PageGraphInput['service']
  let path = pathOf(index, collection, doc)

  if (type?.kind === 'combination' && type.parent && type.child && type.tokens) {
    const parent = asDoc(doc.parent)
    const child = asDoc(doc.child)
    const parentContext = parent && { ...parent, name: displayName(parent), path: pathOf(index, type.parent, parent) }
    const childContext = child && { ...child, name: displayName(child), path: pathOf(index, type.child, child) }
    context = { ...context, [type.tokens.parent]: parentContext, [type.tokens.child]: childContext }
    if (parent && child) {
      service = {
        name: doc.title,
        serviceType: child.title,
        areaServed: { name: parent.place?.label || displayName(parent), kind: parent.place?.kind, county: parent.place?.county, geoid: parent.place?.geoid },
      }
    }
    // The plugin serves a pair at <parent path>/<child slug>.
    path = parent && child?.slug && parent.slug ? `${pathOf(index, type.parent, parent)}/${child.slug}` : ''
  }

  const sections = resolveTokens(doc.sections ?? [], context)
  const title = resolveTokens(doc.meta?.title || doc.title, context)
  const description = doc.meta?.description ? resolveTokens(doc.meta.description, context) : undefined
  return { title, description, path, service, sections: [...sections, ...linkSections(collection, doc, index)] }
}

// A hub page (a page at a type's URL prefix) lists the type's published entries.
function withHubLinks(slug: string, sections: Section[], index: Index): Section[] {
  const lists: Section[] = []
  for (const type of index.types) {
    if (type.kind !== 'type' || !type.hubLinksHeading || !type.pathPrefix || type.pathPrefix !== slug) continue
    const links = index.paths
      .filter((p) => p.kind === 'entry' && p.collection === type.slug)
      .slice(0, 40)
      .map((p) => ({ label: p.title, href: p.path }))
    if (links.length) lists.push({ blockType: 'linkList', heading: type.hubLinksHeading, layout: 'grid', tone: 'white', links })
  }
  if (lists.length === 0) return sections
  const out = [...sections]
  const last = out[out.length - 1]
  out.splice(last?.blockType === 'contactUs' ? out.length - 1 : out.length, 0, ...lists)
  return out
}

// ── The page graph (website: src/components/PageView.astro) ─────────────────

function businessFacts(site: Site): BusinessFacts | null {
  if (!site.business) return null
  const image = site.business.image
  return {
    ...site.business,
    image: image && typeof image === 'object' ? { url: image.url, alt: image.alt, width: image.width, height: image.height } : null,
  }
}

// Website routes: the default locale unprefixed, `home` at the locale root;
// canonical URLs end in a slash.
const pagePath = (slug: string, locale: string, defaultLocale: string) => {
  const prefix = locale === defaultLocale ? '' : `/${locale}`
  return slug === 'home' ? `${prefix}/` : `${prefix}/${slug}/`
}

/** The graph of one saved document, from the data the website reads. */
export function documentGraph({
  cmsOrigin,
  collectionSlug,
  currentLocale,
  defaultLocale,
  doc,
  hasPublishedDoc,
  id,
  index,
  kind,
  locale,
  site: rawSite,
  siteOrigin,
}: {
  cmsOrigin: string
  collectionSlug: string
  currentLocale: string
  defaultLocale: string
  doc: Doc
  hasPublishedDoc: boolean
  id: number | string
  index: Index
  kind: 'page' | 'service'
  locale: string
  site: Site
  siteOrigin: string
}): Result {
  const site = absolutizeSite(rawSite, cmsOrigin)
  const notes: string[] = []

  let title: string
  let description: string | null | undefined
  let urlPath: string
  let sections: Section[]
  let service: PageGraphInput['service']
  let live: boolean
  if (kind === 'service') {
    const page = servicePage(collectionSlug, doc, index)
    title = '{title}'.replace('{title}', page.title)
    description = page.description
    // A published page's address as the website routes it; otherwise as it will be.
    const listed = index.paths.find((p) => p.collection === collectionSlug && String(p.id) === String(id))
    const publicPath = listed?.path ?? page.path
    urlPath = publicPath ? `${publicPath}/` : ''
    sections = page.sections
    service = page.service
    live = Boolean(listed)
    if (currentLocale !== defaultLocale) notes.push(`The website publishes this page in ${defaultLocale} only; shown in ${defaultLocale}.`)
    if (page.sections.length === 0) notes.push('This page has no sections, so the website does not publish it.')
  } else {
    const own = doc.sections ?? []
    sections = doc.slug === 'home' ? own : withHubLinks(doc.slug ?? '', own, index)
    title = (doc.metadata?.titleTemplate ?? '').replace('{title}', doc.title)
    description = doc.metadata?.description
    urlPath = doc.slug ? pagePath(doc.slug, locale, defaultLocale) : ''
    live = hasPublishedDoc
  }
  if (!urlPath) return { state: 'error', message: 'This document has no public address yet: add its slug (or its pair) and save.' }
  absolutizeMediaUrls(sections, cmsOrigin)

  // Sitewide components, minus the ones this document hides (same check as the website).
  const hiddenIds = new Set((doc.hiddenGlobalComponents ?? []).map(String))
  const globalSections = (site.components ?? []).flatMap((entry) => {
    const resolved = entry.component
    if (!resolved || typeof resolved !== 'object') return []
    if (hiddenIds.has(String(resolved.id))) return []
    return resolved.sections ?? []
  })

  const graph = buildPageGraph({
    canonical: new URL(urlPath, siteOrigin).toString(),
    baseUrl: new URL('/', siteOrigin).toString(),
    locale,
    title,
    description: description?.trim() || undefined,
    site: {
      name: site.brand?.logoAlt ?? '',
      logo: site.brand?.logo ? { url: site.brand.logo.url, width: site.brand.logo.width, height: site.brand.logo.height } : null,
      business: businessFacts(site),
    },
    sections: [...sections, ...globalSections],
    isServicePage: kind === 'service',
    service,
  })
  return { state: 'ready', json: JSON.stringify(graph, null, 2), url: new URL(urlPath, siteOrigin).toString(), live, notes }
}
