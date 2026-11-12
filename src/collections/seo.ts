import type { CollectionConfig, Config, Field, Tab } from 'payload'
import type { GenerateURL } from '@payloadcms/plugin-seo/types'

import { MetaDescriptionField, MetaTitleField, PreviewField } from '@payloadcms/plugin-seo/fields'
import { servicePath } from '@good-shepherd-insights/payload-plugin-services/render'

import { defaultLocale, siteGlobalSlug, siteOrigin } from '../config/runtime'

// The SEO tab of every page-like collection: the search-result fields with
// @payloadcms/plugin-seo's own length meters and search preview, and the
// exact JSON-LD the website publishes for the document (src/admin/JsonLdPreview).

type FieldComponent = NonNullable<NonNullable<NonNullable<Field['admin']>['components']>['Field']>

// plugin-seo's own Field components (length meter), taken from its field factories.
const componentOf = (field: Field): FieldComponent => {
  const component = (field.admin as { components?: { Field?: FieldComponent } } | undefined)?.components?.Field
  if (!component) throw new Error('@payloadcms/plugin-seo field has no Field component')
  return component
}
const metaTitleComponent = componentOf(MetaTitleField({ hasGenerateFn: false }))
const metaDescriptionComponent = componentOf(MetaDescriptionField({ hasGenerateFn: false }))

const withComponent = (field: Field, component: FieldComponent): Field =>
  ({ ...field, admin: { ...field.admin, components: { ...field.admin?.components, Field: component } } }) as Field

/** An existing text field shown with plugin-seo's meta title meter. */
export const asMetaTitle = (field: Field) => withComponent(field, metaTitleComponent)
/** An existing textarea shown with plugin-seo's meta description meter. */
export const asMetaDescription = (field: Field) => withComponent(field, metaDescriptionComponent)

/**
 * Read-only title as search engines see it (a Pages title template filled
 * with the page title), with plugin-seo's meter. A UI field: nothing stored.
 */
export const searchTitleField: Field = {
  name: 'searchTitle',
  type: 'ui',
  label: 'Title in search results',
  admin: { components: { Field: '/admin/SearchTitle#SearchTitle' } },
}

/** The search-result fields and previews that end an SEO tab. */
export function seoPreviewFields({ descriptionPath, kind, titlePath }: { descriptionPath: string; kind: 'page' | 'service'; titlePath: string }): Field[] {
  return [
    PreviewField({ descriptionPath, hasGenerateFn: true, overrides: { name: 'searchPreview' }, titlePath }),
    {
      name: 'structuredData',
      type: 'ui',
      label: 'Structured data (JSON-LD)',
      admin: {
        components: {
          Field: {
            path: '/admin/JsonLdPreview#JsonLdPreview',
            clientProps: { defaultLocale, kind, siteGlobalSlug, siteOrigin },
          },
        },
      },
    },
  ]
}

const isSidebar = (field: Field) => field.admin?.position === 'sidebar'
const nameOf = (field: Field) => ('name' in field ? field.name : undefined)
const outOfSidebar = (field: Field) => ({ ...field, admin: { ...field.admin, position: undefined } }) as Field

// payload-plugin-services' meta group: its title and description get the meters.
function metaGroup(field: Field): Field {
  if (field.type !== 'group') return outOfSidebar(field)
  return {
    ...outOfSidebar(field),
    label: 'Search results',
    fields: field.fields.map((child) =>
      nameOf(child) === 'title' ? asMetaTitle(child) : nameOf(child) === 'description' ? asMetaDescription(child) : child,
    ),
  } as Field
}

/**
 * servicesPlugin `overrides.collection`: the plugin's fields in unnamed
 * "Content" | "SEO" tabs, so every field keeps its stored path. The `meta`
 * group (and a pair page's `index` checkbox, unchanged) move to SEO;
 * sidebar fields stay in the sidebar.
 */
export function withSeoTab(collection: CollectionConfig): CollectionConfig {
  const seoNames = new Set(['meta', 'index'])
  const fields = collection.fields
  const sidebar = fields.filter((field) => isSidebar(field) && !seoNames.has(nameOf(field) ?? ''))
  const seo = fields.filter((field) => seoNames.has(nameOf(field) ?? ''))
  const content = fields.filter((field) => !sidebar.includes(field) && !seo.includes(field))
  const tabs: Tab[] = [
    { label: 'Content', fields: content },
    {
      label: 'SEO',
      fields: [
        ...seo.map((field) => (nameOf(field) === 'meta' ? metaGroup(field) : outOfSidebar(field))),
        ...seoPreviewFields({ descriptionPath: 'meta.description', kind: 'service', titlePath: 'meta.title' }),
      ],
    },
  ]
  return { ...collection, fields: [{ type: 'tabs', tabs }, ...sidebar] }
}

/**
 * Runs after servicesPlugin: the plugin adds a pair type's fields (the
 * "offered here" picker and the pair-page lists) to its parent and child
 * collections after `overrides.collection`, at the top level. This moves
 * them into the Content tab, before `sections`, where the plugin puts them.
 */
export const pairFieldsIntoContentTab =
  (slugs: string[]) =>
  (config: Config): Config => ({
    ...config,
    collections: (config.collections ?? []).map((collection) => {
      if (!slugs.includes(collection.slug)) return collection
      const tabsField = collection.fields.find((field) => field.type === 'tabs')
      const contentTab = tabsField?.type === 'tabs' ? tabsField.tabs.find((tab) => tab.label === 'Content') : undefined
      if (!tabsField || !contentTab) return collection
      const tabsAt = collection.fields.indexOf(tabsField)
      const late = collection.fields.filter((field, at) => at > tabsAt && !isSidebar(field))
      if (late.length === 0) return collection
      const sectionsAt = contentTab.fields.findIndex((field) => nameOf(field) === 'sections')
      const contentFields = [...contentTab.fields]
      contentFields.splice(sectionsAt < 0 ? contentFields.length : sectionsAt, 0, ...late)
      const tabs = tabsField.tabs.map((tab) => (tab === contentTab ? { ...tab, fields: contentFields } : tab))
      return {
        ...collection,
        fields: collection.fields
          .filter((field) => !late.includes(field))
          .map((field) => (field === tabsField ? { ...tabsField, tabs } : field)),
      }
    }),
  })

/**
 * plugin-seo's generateURL: the document's public URL on the website, as the
 * website routes it (trailing slash, like its canonical URLs). Pages: the
 * default locale unprefixed, other locales prefixed, `home` at the root.
 * Services entries: /<type prefix>/<slug>. Pair pages: <parent path>/<child slug>.
 */
export function searchResultURL({
  combinations,
  pagesSlug,
  types,
}: {
  combinations: { slug: string; parent: string; child: string }[]
  pagesSlug: string
  types: string[]
}): GenerateURL {
  const publicURL = (path: string) => new URL(path.endsWith('/') ? path : `${path}/`, `${siteOrigin}/`).toString()
  return async ({ collectionConfig, doc, locale, req }) => {
    // plugin-seo's endpoint is open; only logged-in editors get an answer.
    if (!req.user) return ''
    const slug = collectionConfig?.slug
    const data = (doc ?? {}) as Record<string, unknown>
    const prefixOf = async (typeSlug: string) => {
      const template = (await req.payload.findGlobal({ slug: `${typeSlug}-template` as never, depth: 0, req })) as { pathPrefix?: string | null }
      return template?.pathPrefix ?? ''
    }
    const slugOf = async (collection: string, value: unknown) => {
      const id = value && typeof value === 'object' ? (value as { id?: unknown }).id : value
      if (typeof id !== 'string' && typeof id !== 'number') return undefined
      const found = (await req.payload.findByID({ id, collection: collection as never, depth: 0, disableErrors: true, req })) as { slug?: string } | null
      return found?.slug || undefined
    }
    if (slug === pagesSlug && typeof data.slug === 'string' && data.slug) {
      const prefix = locale && locale !== defaultLocale ? `/${locale}` : ''
      return publicURL(data.slug === 'home' ? `${prefix}/` : `${prefix}/${data.slug}`)
    }
    if (slug && types.includes(slug) && typeof data.slug === 'string' && data.slug) {
      return publicURL(servicePath(await prefixOf(slug), data.slug))
    }
    const pair = combinations.find((combination) => combination.slug === slug)
    if (pair) {
      const [parentSlug, childSlug] = await Promise.all([slugOf(pair.parent, data.parent), slugOf(pair.child, data.child)])
      if (parentSlug && childSlug) return publicURL(`${servicePath(await prefixOf(pair.parent), parentSlug)}/${childSlug}`)
    }
    return ''
  }
}
