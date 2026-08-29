'use client'

import React, { useState } from 'react'
import { useAuth, useConfig, Button, toast } from '@payloadcms/ui'

/**
 * Form used on /admin/change-password. Updates the logged-in user's password
 * and clears mustChangePassword so they can use the rest of the CMS.
 */
export function ChangePasswordForm() {
  const { user } = useAuth()
  const { config } = useConfig()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [busy, setBusy] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user?.id) return
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters.')
      return
    }
    if (password !== confirm) {
      toast.error('New password and confirmation do not match.')
      return
    }
    setBusy(true)
    try {
      const res = await fetch(`${config.serverURL}${config.routes.api}/users/${user.id}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, mustChangePassword: false }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        toast.error(data?.errors?.[0]?.message || data?.message || 'Could not update password.')
        setBusy(false)
        return
      }
      toast.success('Password updated.')
      window.location.href = `${config.routes.admin}`
    } catch {
      toast.error('Could not update password. Try again.')
      setBusy(false)
    }
  }

  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 420 }}>
      <p style={{ margin: 0, opacity: 0.8 }}>
        You signed in with a temporary password. Choose a new password to continue.
      </p>
      <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <span>New password</span>
        <input
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
          style={{ padding: '10px 12px', borderRadius: 4, border: '1px solid var(--theme-elevation-150)' }}
        />
      </label>
      <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <span>Confirm password</span>
        <input
          type="password"
          autoComplete="new-password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
          minLength={8}
          style={{ padding: '10px 12px', borderRadius: 4, border: '1px solid var(--theme-elevation-150)' }}
        />
      </label>
      <Button type="submit" disabled={busy}>
        {busy ? 'Saving…' : 'Save new password'}
      </Button>
    </form>
  )
}
