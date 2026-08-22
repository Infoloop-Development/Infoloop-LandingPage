import type { AdminViewServerProps } from 'payload'
import { Gutter } from '@payloadcms/ui'
import { DefaultTemplate } from '@payloadcms/next/templates'
import { redirect } from 'next/navigation'
import React from 'react'
import { ChangePasswordForm } from './ChangePasswordForm'

/** /admin/change-password — required when mustChangePassword is true. */
export function ChangePasswordView({ initPageResult, params, searchParams }: AdminViewServerProps) {
  const {
    req: { user, i18n, payload },
    locale,
    permissions,
    visibleEntities,
  } = initPageResult

  if (!user) {
    redirect('/admin/login')
  }

  if (!(user as { mustChangePassword?: boolean }).mustChangePassword) {
    redirect('/admin')
  }

  return (
    <DefaultTemplate
      i18n={i18n}
      locale={locale}
      params={params}
      payload={payload}
      permissions={permissions}
      searchParams={searchParams}
      user={user}
      visibleEntities={visibleEntities}
    >
      <Gutter>
        <h1 style={{ marginBottom: 8 }}>Set a new password</h1>
        <ChangePasswordForm />
      </Gutter>
    </DefaultTemplate>
  )
}

export default ChangePasswordView
