'use client'

import { useEffect } from 'react'
import { useAuth, useConfig } from '@payloadcms/ui'

/**
 * Redirects any logged-in user with mustChangePassword to the change-password
 * view before they can use the dashboard or other admin pages.
 */
export function MustChangePasswordGate() {
  const { user } = useAuth()
  const { config } = useConfig()

  useEffect(() => {
    if (!user?.mustChangePassword) return
    const path = typeof window !== 'undefined' ? window.location.pathname : ''
    const target = `${config.routes.admin}/change-password`
    if (path.includes('/change-password') || path.includes('/logout')) return
    window.location.replace(target)
  }, [user, config.routes.admin])

  return null
}
