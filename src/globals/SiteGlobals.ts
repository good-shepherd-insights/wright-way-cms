import type { Field, GlobalConfig } from 'payload'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'

import { inlinePreviewAdmin } from '../admin/livePreviewConfig'
import { siteGlobalSlug } from '../config/runtime'
import { mediaSlug } from '../collections/Media'
import { sectionsSlug } from '../collections/Sections'

const slug = siteGlobalSlug

const brand = {
  name: 'brand', type: 'group' as const, fields: [
    { name: 'logo', type: 'upload' as const, relationTo: mediaSlug, required: false },
    { name: 'logoAlt', localized: true, type: 'text' as const, required: false },
    { name: 'favicon', type: 'upload' as const, relationTo: mediaSlug, required: false, admin: { description: 'Browser tab and app icon for the public website.' } },
    { name: 'ogImage', type: 'upload' as const, relationTo: mediaSlug, required: false, admin: { description: 'Share image for links to the public website (1200×630). Falls back to the logo.' } },
  ],
}

// Stored as the lowercase day names the website's structured data expects.
const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const

function validateTime(value: unknown) {
  if (value === undefined || value === null || value === '') return true
  return typeof value === 'string' && /^([01]\d|2[0-3]):[0-5]\d$/.test(value)
    ? true
    : 'Use 24-hour time as HH:MM, for example 08:00 or 17:30.'
}

function validateWebAddress(value: unknown) {
  if (value === undefined || value === null || value === '') return true
  try {
    const url = new URL(String(value))
    if (url.protocol === 'http:' || url.protocol === 'https:') return true
  } catch {
    // Not a web address; fall through to the message below.
  }
  return 'Use the full web address, starting with https://'
}

// The business facts search engines read about the company (schema.org
// structured data). Every field is optional: anything left empty is simply
// not published.
const business: Field = {
  name: 'business', type: 'group', label: 'Business details',
  admin: { description: 'Facts about the business that Google and other search engines read. Leave anything you are unsure of empty; empty fields are not published.' },
  fields: [
    {
      name: 'schemaType', type: 'select', label: 'Kind of business', required: false,
      options: [
        { label: 'Local business (serves customers in an area)', value: 'LocalBusiness' },
        { label: 'Home services or construction business', value: 'HomeAndConstructionBusiness' },
        { label: 'Professional service business', value: 'ProfessionalService' },
        { label: 'Company (no local customers)', value: 'Organization' },
      ],
      admin: { description: 'How search engines should file the business. Empty: listed as a company.' },
    },
    {
      name: 'description', type: 'textarea', localized: true, required: false,
      admin: { description: 'A short, factual summary of what the business does and where.' },
    },
    {
      name: 'telephone', type: 'text', label: 'Phone', required: false,
      admin: { description: 'The main phone number customers call, with area code. Example: +1-410-555-0123.' },
    },
    {
      name: 'email', type: 'email', required: false,
      admin: { description: 'The email address customers can write to.' },
    },
    {
      name: 'address', type: 'group', required: false,
      admin: { description: 'Where the business is based. A business that goes to its customers may leave the street empty.' },
      fields: [
        { name: 'streetAddress', type: 'text', label: 'Street', required: false, admin: { description: 'Optional. Leave empty if customers do not visit this address.' } },
        { name: 'addressLocality', type: 'text', label: 'City or town', required: false },
        { name: 'addressRegion', type: 'text', label: 'State', required: false, admin: { description: 'Two-letter state code, for example MD.' } },
        { name: 'postalCode', type: 'text', label: 'ZIP code', required: false },
        { name: 'addressCountry', type: 'text', label: 'Country', required: false, admin: { description: 'Two-letter country code, for example US.' } },
      ],
    },
    {
      name: 'hours', type: 'array', label: 'Opening hours', required: false,
      labels: { singular: 'Opening hours', plural: 'Opening hours' },
      admin: { description: 'One row per set of days with the same hours.' },
      fields: [
        {
          name: 'days', type: 'select', hasMany: true, required: true,
          options: days.map((day) => ({ label: day[0].toUpperCase() + day.slice(1), value: day })),
        },
        { name: 'opens', type: 'text', required: true, validate: validateTime, admin: { description: '24-hour time, for example 08:00.' } },
        { name: 'closes', type: 'text', required: true, validate: validateTime, admin: { description: '24-hour time, for example 17:30.' } },
      ],
    },
    {
      name: 'sameAs', type: 'array', label: 'Profiles on other websites', required: false,
      labels: { singular: 'Profile', plural: 'Profiles' },
      admin: { description: 'Links to the business on other sites: Google Business Profile, Facebook, Yelp, Angi and similar.' },
      fields: [
        { name: 'url', type: 'text', label: 'Web address', required: true, validate: validateWebAddress },
      ],
    },
    {
      name: 'priceRange', type: 'text', label: 'Price range', required: false,
      admin: { description: 'How expensive the business is, from $ to $$$$. Example: $$.' },
    },
    {
      name: 'image', type: 'upload', relationTo: mediaSlug, required: false,
      admin: { description: 'A photo of the business: the crew, a truck or the storefront.' },
    },
  ],
}

export const SiteGlobals: GlobalConfig = {
  slug, label: 'Site Globals', access: { read: authenticatedOrPublished },
  versions: { drafts: { autosave: { interval: 800 } } },
  admin: {
    group: 'Pages',
    ...inlinePreviewAdmin,
  },
  fields: [{
    type: 'tabs',
    tabs: [
      { label: 'Site Globals', fields: [
        brand,
        {
          name: 'components', type: 'array', minRows: 0, labels: { singular: 'Global component', plural: 'Global components' },
          fields: [
            {
              name: 'component', type: 'relationship', relationTo: sectionsSlug, required: true,
              admin: { description: 'A reusable component document; its sections render globally on every page, in this order.' },
            },
          ],
        },
      ] },
      // Unnamed tab: the group is still stored at `business`.
      { label: 'Business', fields: [business] },
    ],
  }],
}