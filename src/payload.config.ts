import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { parseCookies } from 'payload/shared'
import { servicesPlugin } from '@good-shepherd-insights/payload-plugin-services'
import { sharedBlocks } from '@good-shepherd-insights/website-components/payload'
import { inlinePreviewAdmin } from './admin/livePreviewConfig'
import { deployOnDelete, deployOnGlobalPublish, deployOnPublishChange } from './hooks/websiteDeploy'
import { mcpPlugin } from '@payloadcms/plugin-mcp'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Sections } from './collections/Sections'
import { SiteGlobals } from './globals/SiteGlobals'
import { Pages } from './collections/Pages'
import { pairFieldsIntoContentTab, searchResultURL, withSeoTab } from './collections/seo'
import {
  blobReadWriteToken,
  cmsOrigin,
  defaultLocale,
  locales,
  payloadSecret,
  mongodbUrl,
  siteGlobalSlug,
  siteOrigin,
} from './config/runtime'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const siteBaseURL = `${siteOrigin}/`

// Repeatable page types (payload-plugin-services). URLs and designs are set
// by the owner in each type's template in the CMS.
const SERVICE_AREAS = 'service-areas'
const SERVICES = 'services'
// A service in a service area, e.g. /service-areas/frederick/junk-removal.
const SERVICES_IN_AREAS = 'service-area-services'
const serviceTypes = [SERVICE_AREAS, SERVICES]
const serviceGlobals = [...serviceTypes, SERVICES_IN_AREAS].map((type) => `${type}-template`)
const serviceCombinations = [{ slug: SERVICES_IN_AREAS, parent: SERVICE_AREAS, child: SERVICES }]

// Mirrors the website's route shape (Astro i18n, prefixDefaultLocale: false):
// the default locale is unprefixed for every page (`/`, `/<slug>`), other
// locales are prefixed (`/<locale>/`, `/<locale>/<slug>`).
function getAstroPreviewURL(localeCode: string, slug?: string) {
  const prefix = localeCode === defaultLocale ? '' : `${localeCode}/`
  const page = slug === 'home' ? '' : encodeURIComponent(slug || '')

  return new URL(`${prefix}${page}`, siteBaseURL).toString()
}

export default buildConfig({
  endpoints: [
    {
      path: '/locales',
      method: 'get',
      handler: async (req) => {
        const localization = req.payload.config.localization
        return Response.json({
          locales: localization ? localization.locales : [],
          defaultLocale: localization ? localization.defaultLocale : undefined,
        })
      },
    },
  ],
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '- Wright Way CMS',
      description: 'Content management for Wright Way Junk Removal.',
      // replaces Payload's defaults ("Payload App" and its generated /api/og image)
      openGraph: {
        siteName: 'Wright Way CMS',
        description: 'Content management for Wright Way Junk Removal.',
      },
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      graphics: {
        Logo: '/admin/Logo#default',
        Icon: '/admin/Icon#default',
      },
      beforeLogin: ['/admin/LoginAccent#default'],
      afterLogin: ['/admin/PasskeyLogin#default'],
    },
    livePreview: {
      url: ({ collectionConfig, data, globalConfig, locale, req }) => {
        // Every preview goes through the site's on-request /preview route,
        // which reads the latest drafts with the editor's own login token (the
        // CMS cookie never reaches the CMS from the site's domain). This runs
        // on the CMS server during the editor's own admin request, so the
        // cookie is first-party here. Pages and service entries preview
        // themselves; the site global and global components preview on home.
        const token = parseCookies(req.headers).get(`${req.payload.config.cookiePrefix}-token`)
        // A service type's globals preview their own design.
        if (token && globalConfig && serviceGlobals.includes(globalConfig.slug)) {
          return `${siteOrigin}/preview?${new URLSearchParams({ global: globalConfig.slug, locale: locale.code, token })}`
        }
        // A service in an area has no slug of its own (its URL comes from both parents).
        if (token && collectionConfig?.slug === SERVICES_IN_AREAS && data.id) {
          return `${siteOrigin}/preview?${new URLSearchParams({ collection: SERVICES_IN_AREAS, id: String(data.id), locale: locale.code, token })}`
        }
        const isService = serviceTypes.includes(collectionConfig?.slug ?? '')
        const collection = isService ? collectionConfig!.slug : 'pages'
        const slug = collectionConfig?.slug === Pages.slug || isService ? data.slug : 'home'
        if (token && typeof slug === 'string' && slug) {
          return `${siteOrigin}/preview?${new URLSearchParams({ collection, slug, locale: locale.code, token })}`
        }
        if (collectionConfig?.slug === Pages.slug && typeof data.slug === 'string') {
          return getAstroPreviewURL(locale.code, data.slug)
        }

        return siteOrigin
      },
      globals: [siteGlobalSlug, ...serviceGlobals],
      collections: [Pages.slug, Sections.slug, ...serviceTypes, SERVICES_IN_AREAS],
      breakpoints: [
        { name: 'mobile', label: 'Mobile', width: 400, height: 900 },
        { name: 'tablet', label: 'Tablet', width: 900, height: 1000 },
        { name: 'desktop', label: 'Desktop', width: 1440, height: 1000 },
      ],
    },
  },
  collections: [Users, Media, Sections, Pages],
  globals: [SiteGlobals],
  editor: lexicalEditor(),
  localization: {
    locales,
    defaultLocale,
  },
  serverURL: cmsOrigin,
  cors: [siteOrigin, cmsOrigin],
  // Setting a custom csrf list requires including Payload's own origin too —
  // it's not trusted automatically once you customize this array. Without
  // it, the admin panel's own same-origin requests (e.g. "Publish changes")
  // fail cookie auth and get "You are not allowed to perform this action."
  csrf: [cmsOrigin],
  secret: payloadSecret,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: mongodbUrl,
  }),
  sharp,
  plugins: [
    servicesPlugin({
      adminGroup: 'Services',
      // Each type's globals under Globals, named by the type: Services, Service Areas, Services in Areas.
      globals: { group: 'Globals', label: (labels) => labels.plural },
      blocks: [...sharedBlocks],
      combinations: [
        {
          slug: SERVICES_IN_AREAS,
          parent: SERVICE_AREAS,
          child: SERVICES,
          labels: { singular: 'Service in Area', plural: 'Services in Areas' },
          tokens: { parent: 'area', child: 'service' },
          // Local proof besides a new photo: a review or before/after block of its own.
          indexing: { minUniqueWords: 150, proofBlocks: ['reviews', 'beforeAfter'] },
        },
      ],
      // Same live-preview bridge as Pages and Site Globals (token hand-off,
      // inline editing, image picker), and the same website rebuild on
      // publish — plus on unpublish and delete, since these pages also feed
      // the navbar menus and hub link lists.
      // Their fields go in "Content" | "SEO" tabs (src/collections/seo.ts).
      overrides: {
        collection: (collection) => ({
          ...withSeoTab(collection),
          admin: { ...collection.admin, ...inlinePreviewAdmin },
          hooks: {
            ...collection.hooks,
            afterChange: [...(collection.hooks?.afterChange ?? []), deployOnPublishChange],
            afterDelete: [...(collection.hooks?.afterDelete ?? []), deployOnDelete],
          },
        }),
        global: (global) => ({
          ...global,
          admin: { ...global.admin, ...inlinePreviewAdmin },
          hooks: { ...global.hooks, afterChange: [...(global.hooks?.afterChange ?? []), deployOnGlobalPublish] },
        }),
      },
      pagesCollection: Pages.slug,
      types: [
        {
          slug: SERVICE_AREAS,
          labels: { singular: 'Service Area', plural: 'Service Areas' },
          place: true,
        },
        {
          slug: SERVICES,
          labels: { singular: 'Service', plural: 'Services' },
          titleLabel: 'Which service?',
        },
      ],
    }),
    // The plugin adds pair fields to these after overrides.collection.
    pairFieldsIntoContentTab(serviceTypes),
    // Only its endpoints and translations: the SEO tabs above use its field
    // components on the existing fields, so it adds no fields of its own.
    seoPlugin({
      collections: [],
      globals: [],
      generateURL: searchResultURL({ combinations: serviceCombinations, pagesSlug: Pages.slug, types: serviceTypes }),
    }),
    vercelBlobStorage({
      collections: {
        [Media.slug]: true,
      },
      token: blobReadWriteToken,
    }),
    mcpPlugin({
      // Every content collection and global, all operations (Users excluded:
      // MCP must not manage admin accounts). Each API key still needs its
      // checkboxes ticked to use them.
      collections: {
        [Pages.slug]: { enabled: true, description: 'Pages served by the website.' },
        [Sections.slug]: { enabled: true, description: 'Global components (navbar, footer) curated onto every page.' },
        [Media.slug]: { enabled: true, description: 'Uploaded images and files.' },
        [SERVICES]: { enabled: true, description: 'Services, served at /<prefix>/<slug> (prefix set in Service Globals).' },
        [SERVICE_AREAS]: { enabled: true, description: 'Service areas (real US places), served at /<prefix>/<slug> (prefix set in Service Area Globals).' },
        [SERVICES_IN_AREAS]: { enabled: true, description: 'A service in a service area, served at <area path>/<service slug>; indexed only when it has content of its own.' },
      },
      globals: {
        [siteGlobalSlug]: { enabled: true, description: 'Shared site globals: brand and global components.' },
        [`${SERVICES}-template`]: { enabled: true, description: 'Service Globals: URL prefix and the design new services start from.' },
        [`${SERVICE_AREAS}-template`]: { enabled: true, description: 'Service Area Globals: URL prefix and the design new service areas start from.' },
        [`${SERVICES_IN_AREAS}-template`]: { enabled: true, description: 'Service in Area Globals: the design new service-in-area pages start from, and the link-list headings.' },
      },
    }),
  ],
})
