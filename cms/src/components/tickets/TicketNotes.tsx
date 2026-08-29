'use client'

import { useAuth, useDocumentInfo, useForm, useFormFields } from '@payloadcms/ui'
import React, { useEffect, useState } from 'react'

type NoteRow = {
  id?: string
  body?: string
  author?: string
  at?: string
}

/**
 * Multi-note sidebar. Local React state drives what you see;
 * form + optional API keep them stored.
 */
export function TicketNotes() {
  const { getDataByPath, setModified } = useForm()
  const setFields = useFormFields(([, dispatch]) => dispatch)
  const { id } = useDocumentInfo()
  const { user, token } = useAuth()

  const [rows, setRows] = useState<NoteRow[]>([])
  const [draft, setDraft] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [hint, setHint] = useState('')
  const [hydrated, setHydrated] = useState(false)

  // Load existing notes once when the form has data
  useEffect(() => {
    if (hydrated) return
    const fromForm = getDataByPath('notes') as NoteRow[] | undefined
    if (Array.isArray(fromForm)) {
      setRows(fromForm)
      setHydrated(true)
      return
    }
    // Retry briefly while form initializes
    const t = window.setTimeout(() => {
      const again = getDataByPath('notes') as NoteRow[] | undefined
      if (Array.isArray(again)) setRows(again)
      setHydrated(true)
    }, 300)
    return () => window.clearTimeout(t)
  }, [getDataByPath, hydrated])

  const writeForm = (next: NoteRow[]) => {
    setFields({ type: 'UPDATE', path: 'notes', value: next })
    setModified(true)
  }

  const persist = async (next: NoteRow[]) => {
    // Always show immediately
    setRows(next)
    writeForm(next)

    if (!id) {
      setHint(`${next.length} note(s) ready — click Save.`)
      return
    }

    setBusy(true)
    setError('')
    setHint('')
    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' }
      if (token) headers.Authorization = `JWT ${token}`

      const res = await fetch(`/api/sales-inquiry-tickets/${id}/notes`, {
        method: 'POST',
        credentials: 'include',
        headers,
        body: JSON.stringify({ notes: next }),
      })
      const data = (await res.json().catch(() => ({}))) as {
        doc?: { notes?: NoteRow[] }
        message?: string
      }

      if (!res.ok) {
        setHint(
          `${next.length} note(s) showing above. Auto-save blocked — click Save at the top to store them.`,
        )
        return
      }

      const saved = Array.isArray(data.doc?.notes) ? data.doc!.notes! : next
      setRows(saved)
      writeForm(saved)
      setModified(false)
      setHint(`${saved.length} note(s) saved.`)
    } catch {
      setHint(`${next.length} note(s) showing above — click Save at the top to store them.`)
    } finally {
      setBusy(false)
    }
  }

  const addNote = () => {
    const body = draft.trim()
    if (!body) {
      setError('Write a note before adding.')
      return
    }
    const next: NoteRow[] = [
      ...rows,
      {
        id: `n_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`,
        body,
        author: (user as { email?: string } | null)?.email || 'staff',
        at: new Date().toISOString(),
      },
    ]
    setDraft('')
    setError('')
    void persist(next)
  }

  const removeNote = (index: number) => {
    void persist(rows.filter((_, i) => i !== index))
  }

  return (
    <div className="field-type">
      <label className="field-label">Notes ({rows.length})</label>
      <p style={{ margin: '0 0 10px', fontSize: 12, color: '#71717a', lineHeight: 1.4 }}>
        Add as many as you need. Each one appears in the list below right away.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12 }}>
        {rows.length === 0 ? (
          <p style={{ margin: 0, fontSize: 13, color: '#a1a1aa' }}>No notes yet.</p>
        ) : (
          rows.map((row, i) => (
            <div
              key={row.id || `${row.at}-${i}`}
              style={{
                border: '1px solid #e4e4e7',
                borderRadius: 8,
                padding: '8px 10px',
                background: '#fff',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 8,
                  alignItems: 'flex-start',
                  marginBottom: 4,
                }}
              >
                <div style={{ fontSize: 11, color: '#71717a' }}>
                  Note {i + 1}
                  {row.author ? ` · ${row.author}` : ''}
                  {row.at ? ` · ${new Date(row.at).toLocaleString()}` : ''}
                </div>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => removeNote(i)}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    color: '#a1a1aa',
                    fontSize: 11,
                    cursor: busy ? 'wait' : 'pointer',
                    padding: 0,
                    flexShrink: 0,
                  }}
                >
                  Remove
                </button>
              </div>
              <div style={{ fontSize: 13, whiteSpace: 'pre-wrap', lineHeight: 1.45 }}>{row.body}</div>
            </div>
          ))
        )}
      </div>

      <textarea
        value={draft}
        onChange={(e) => {
          setDraft(e.target.value)
          if (error) setError('')
        }}
        rows={3}
        disabled={busy}
        placeholder="Type a note, click Add note. Repeat for more."
        style={{
          width: '100%',
          padding: 8,
          fontSize: 13,
          borderRadius: 6,
          border: '1px solid #d4d4d8',
          resize: 'vertical',
          boxSizing: 'border-box',
        }}
      />
      {error && <p style={{ color: '#c00', fontSize: 12, margin: '6px 0 0' }}>{error}</p>}
      {hint && !error && (
        <p style={{ margin: '8px 0 0', fontSize: 11, color: '#52525b', lineHeight: 1.4 }}>{hint}</p>
      )}
      <button
        type="button"
        onClick={addNote}
        disabled={busy}
        style={{
          marginTop: 8,
          width: '100%',
          padding: '8px 12px',
          fontSize: 13,
          fontWeight: 600,
          borderRadius: 6,
          border: '1px solid #18181b',
          background: busy ? '#71717a' : '#18181b',
          color: '#fff',
          cursor: busy ? 'wait' : 'pointer',
        }}
      >
        {busy ? 'Saving…' : 'Add note'}
      </button>
    </div>
  )
}
