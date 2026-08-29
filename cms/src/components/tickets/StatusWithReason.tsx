'use client'

import { useField, useFormFields, useAuth } from '@payloadcms/ui'
import React, { useCallback, useState } from 'react'

const OPTIONS = ['Received', 'Open', 'In Progress', 'Closed'] as const

type HistoryRow = {
  id?: string
  status?: string
  reason?: string
  changedAt?: string
  changedBy?: string
}

/**
 * Status select that requires a reason modal before the new value sticks.
 * Appends { status, reason, changedAt, changedBy } to statusHistory on confirm.
 */
export function StatusWithReason() {
  const { value, setValue } = useField<string>({ path: 'status' })
  const history = useFormFields(([fields]) => fields.statusHistory)
  const setHistory = useFormFields(([, dispatch]) => dispatch)
  const { user } = useAuth()
  const [pending, setPending] = useState<string | null>(null)
  const [reason, setReason] = useState('')
  const [error, setError] = useState('')

  const commit = useCallback(() => {
    const trimmed = reason.trim()
    if (!trimmed) {
      setError('A reason is required to change status.')
      return
    }
    if (!pending) return
    const rows = Array.isArray(history?.value) ? [...(history.value as HistoryRow[])] : []
    rows.push({
      status: pending,
      reason: trimmed,
      changedAt: new Date().toISOString(),
      changedBy: (user as { email?: string } | null)?.email || 'staff',
    })
    setHistory({ type: 'UPDATE', path: 'statusHistory', value: rows })
    setValue(pending)
    setPending(null)
    setReason('')
    setError('')
  }, [reason, pending, history, setHistory, setValue, user])

  return (
    <div className="field-type">
      <label className="field-label">Status</label>
      <select
        className="field-input"
        value={value || 'Received'}
        onChange={(e) => {
          const next = e.target.value
          if (next === value) return
          setPending(next)
          setReason('')
          setError('')
        }}
      >
        {OPTIONS.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>

      {pending && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            background: 'rgba(0,0,0,0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
          }}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: 8,
              maxWidth: 440,
              width: '100%',
              padding: 20,
              boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
            }}
          >
            <h3 style={{ margin: '0 0 8px', fontSize: 16 }}>Reason for status change</h3>
            <p style={{ margin: '0 0 12px', fontSize: 13, color: '#555' }}>
              Changing status from <strong>{value}</strong> to <strong>{pending}</strong>. This is
              required and will appear on the ticket timeline.
            </p>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={4}
              style={{ width: '100%', padding: 8, fontSize: 14 }}
              placeholder="Why is this status changing?"
              autoFocus
            />
            {error && (
              <p style={{ color: '#c00', fontSize: 13, margin: '8px 0 0' }}>{error}</p>
            )}
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 16 }}>
              <button
                type="button"
                onClick={() => {
                  setPending(null)
                  setReason('')
                  setError('')
                }}
              >
                Cancel
              </button>
              <button type="button" onClick={commit}>
                Confirm change
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
