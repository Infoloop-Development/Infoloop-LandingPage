'use client'

import { useFormFields } from '@payloadcms/ui'
import React from 'react'

type Row = {
  status?: string
  reason?: string
  changedAt?: string
  changedBy?: string
}

/** Vertical lifecycle timeline: created + every status change and why. */
export function StatusTimeline() {
  const createdAt = useFormFields(([fields]) => fields.createdAt?.value) as string | undefined
  const history = useFormFields(([fields]) => fields.statusHistory?.value) as Row[] | undefined
  const rows = Array.isArray(history) ? history : []

  return (
    <div className="field-type" style={{ marginTop: 24, marginBottom: 24 }}>
      <h3 style={{ margin: '0 0 12px', fontSize: 15 }}>Status timeline</h3>
      <ol style={{ listStyle: 'none', margin: 0, padding: 0, borderLeft: '2px solid #e4e4e7' }}>
        {createdAt && (
          <li style={{ padding: '0 0 16px 16px', position: 'relative' }}>
            <span
              style={{
                position: 'absolute',
                left: -5,
                top: 4,
                width: 8,
                height: 8,
                borderRadius: 99,
                background: '#f97316',
              }}
            />
            <div style={{ fontWeight: 600, fontSize: 13 }}>Ticket created</div>
            <div style={{ fontSize: 12, color: '#71717a' }}>{new Date(createdAt).toLocaleString()}</div>
          </li>
        )}
        {rows.map((row, i) => (
          <li key={i} style={{ padding: '0 0 16px 16px', position: 'relative' }}>
            <span
              style={{
                position: 'absolute',
                left: -5,
                top: 4,
                width: 8,
                height: 8,
                borderRadius: 99,
                background: '#18181b',
              }}
            />
            <div style={{ fontWeight: 600, fontSize: 13 }}>{row.status}</div>
            <div style={{ fontSize: 12, color: '#71717a' }}>
              {row.changedAt ? new Date(row.changedAt).toLocaleString() : ''}
              {row.changedBy ? ` · ${row.changedBy}` : ''}
            </div>
            {row.reason && (
              <p style={{ margin: '4px 0 0', fontSize: 13, whiteSpace: 'pre-wrap' }}>{row.reason}</p>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}
