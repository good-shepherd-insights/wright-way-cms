'use client'

import type { TextFieldClientProps, UIFieldClientProps } from 'payload'

import { MetaTitleComponent } from '@payloadcms/plugin-seo/client'
import { useField, useFormFields } from '@payloadcms/ui'
import { useEffect } from 'react'

// A page's title as the website publishes it: its title template with
// {title} filled in (see the website's PageView.astro), shown read-only with
// @payloadcms/plugin-seo's length meter. The value lives only in the form
// (a UI field), so the search preview can show it; nothing is saved.
export function SearchTitle(props: UIFieldClientProps) {
  const template = useFormFields(([fields]) => fields['metadata.titleTemplate']?.value)
  const title = useFormFields(([fields]) => fields.title?.value)
  const { setValue, value } = useField<string>()
  const resolved = typeof template === 'string' ? template.replace('{title}', typeof title === 'string' ? title : '') : ''

  useEffect(() => {
    if (value !== resolved) setValue(resolved, true)
  }, [resolved, setValue, value])

  return <MetaTitleComponent {...(props as unknown as TextFieldClientProps)} hasGenerateTitleFn={false} readOnly />
}
