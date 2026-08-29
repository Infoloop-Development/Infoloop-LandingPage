'use client'

import { useForm, useFormFields } from '@payloadcms/ui'
import React from 'react'

type Estimate = {
  hourlyTotal?: number
  milestoneTotal?: number
  months?: number
  stack?: string
}

function money(n: unknown) {
  const v = typeof n === 'number' ? n : Number(n)
  if (!Number.isFinite(v)) return '—'
  return `$${Math.round(v).toLocaleString('en-US')}`
}

/** Hourly / milestone / months exactly as quoted (never raw hours). */
export function TicketEstimation() {
  const { getDataByPath } = useForm()
  // Re-render when estimate subfields register or change (group has no single `.value`).
  useFormFields(([fields]) => fields['estimate.hourlyTotal']?.value)
  const estimate = getDataByPath('estimate') as Estimate | undefined

  return (
    <div className="field-type" style={{ marginBottom: 16 }}>
      <h3 style={{ margin: '0 0 8px', fontSize: 15 }}>Estimation</h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 12,
          padding: 12,
          border: '1px solid #e4e4e7',
          borderRadius: 8,
          background: '#fff',
        }}
      >
        <div>
          <div style={{ fontSize: 11, color: '#71717a', textTransform: 'uppercase' }}>Hourly basis</div>
          <div style={{ fontSize: 18, fontWeight: 600 }}>{money(estimate?.hourlyTotal)}</div>
        </div>
        <div>
          <div style={{ fontSize: 11, color: '#71717a', textTransform: 'uppercase' }}>Milestone basis</div>
          <div style={{ fontSize: 18, fontWeight: 600 }}>{money(estimate?.milestoneTotal)}</div>
        </div>
        <div>
          <div style={{ fontSize: 11, color: '#71717a', textTransform: 'uppercase' }}>Timeline</div>
          <div style={{ fontSize: 18, fontWeight: 600 }}>
            {estimate?.months ?? '—'} month{(estimate?.months ?? 0) === 1 ? '' : 's'}
          </div>
        </div>
      </div>
      {estimate?.stack && (
        <p style={{ margin: '8px 0 0', fontSize: 13, color: '#52525b' }}>Stack: {estimate.stack}</p>
      )}
    </div>
  )
}
