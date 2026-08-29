'use client'

import { useFormFields } from '@payloadcms/ui'
import React from 'react'

/** Renders the Groq chat summary under a Description heading. */
export function TicketDescription() {
  const summary = useFormFields(([fields]) => fields.chatSummary?.value) as string | undefined
  return (
    <div className="field-type" style={{ marginBottom: 8 }}>
      <h3 style={{ margin: '0 0 8px', fontSize: 15 }}>Description</h3>
      <div
        style={{
          whiteSpace: 'pre-wrap',
          fontSize: 14,
          lineHeight: 1.5,
          padding: 12,
          background: '#fafafa',
          border: '1px solid #e4e4e7',
          borderRadius: 8,
        }}
      >
        {summary || 'No summary yet.'}
      </div>
    </div>
  )
}
