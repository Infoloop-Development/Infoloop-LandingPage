'use client'

import { useAuth, useDocumentInfo, useForm, useFormFields } from '@payloadcms/ui'
import React, { useCallback, useEffect, useRef, useState } from 'react'

type Turn = {
  id?: string
  role?: string
  message?: string
  timestamp?: string
  agentName?: string
  agentUserId?: string
}

function Avatar({
  photo,
  name,
  ivy,
}: {
  photo?: string | null
  name?: string | null
  ivy?: boolean
}) {
  const size = 28
  if (ivy) {
    return (
      <span
        style={{
          width: size,
          height: size,
          borderRadius: '999px',
          background: '#18181b',
          color: '#fff',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 11,
          fontWeight: 700,
          flexShrink: 0,
          border: '2px solid #fb923c',
        }}
        title="Ivy"
      >
        I
      </span>
    )
  }
  if (photo) {
    return (
      <img
        src={photo}
        alt=""
        width={size}
        height={size}
        style={{
          width: size,
          height: size,
          borderRadius: '999px',
          objectFit: 'cover',
          flexShrink: 0,
          border: '2px solid #fb923c',
        }}
      />
    )
  }
  const initial = (name || 'S').trim().slice(0, 1).toUpperCase()
  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: '999px',
        background: '#18181b',
        color: '#fff',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 11,
        fontWeight: 700,
        flexShrink: 0,
        border: '2px solid #fb923c',
      }}
    >
      {initial}
    </span>
  )
}

/** Collapsible transcript with live handoff: Start chat + agent composer. */
export function ChatHistoryBubbles() {
  const [open, setOpen] = useState(true)
  const { getDataByPath, setModified } = useForm()
  const setFields = useFormFields(([, dispatch]) => dispatch)
  const { id } = useDocumentInfo()
  const { user, token } = useAuth()
  useFormFields(([fields]) => fields.transcript?.rows?.length)

  const [rows, setRows] = useState<Turn[]>([])
  const [handoffStatus, setHandoffStatus] = useState('none')
  const [agentPhoto, setAgentPhoto] = useState('')
  const [agentName, setAgentName] = useState('')
  const [draft, setDraft] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [hint, setHint] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  const syncFromForm = useCallback(() => {
    const transcript = getDataByPath('transcript') as Turn[] | undefined
    setRows(Array.isArray(transcript) ? transcript : [])
    const hs = getDataByPath('handoffStatus') as string | undefined
    if (typeof hs === 'string') setHandoffStatus(hs)
    const ap = getDataByPath('handoffAgentPhoto') as string | undefined
    if (typeof ap === 'string') setAgentPhoto(ap)
    const an = getDataByPath('handoffAgentName') as string | undefined
    if (typeof an === 'string') setAgentName(an)
  }, [getDataByPath])

  useEffect(() => {
    syncFromForm()
    const t = window.setTimeout(syncFromForm, 400)
    return () => window.clearTimeout(t)
  }, [syncFromForm])

  useEffect(() => {
    if (!id || (handoffStatus !== 'requested' && handoffStatus !== 'active')) return
    const tick = async () => {
      try {
        const headers: Record<string, string> = {}
        if (token) headers.Authorization = `JWT ${token}`
        const res = await fetch(`/api/sales-inquiry-tickets/${id}?depth=0`, {
          credentials: 'include',
          headers,
        })
        if (!res.ok) return
        const data = (await res.json().catch(() => ({}))) as {
          transcript?: Turn[]
          handoffStatus?: string
          handoffAgentPhoto?: string
          handoffAgentName?: string
        }
        if (Array.isArray(data.transcript)) {
          setRows(data.transcript)
          setFields({ type: 'UPDATE', path: 'transcript', value: data.transcript })
        }
        if (typeof data.handoffStatus === 'string') {
          setHandoffStatus(data.handoffStatus)
          setFields({ type: 'UPDATE', path: 'handoffStatus', value: data.handoffStatus })
        }
        if (typeof data.handoffAgentPhoto === 'string') setAgentPhoto(data.handoffAgentPhoto)
        if (typeof data.handoffAgentName === 'string') setAgentName(data.handoffAgentName)
      } catch {
        /* ignore */
      }
    }
    const iv = window.setInterval(tick, 4000)
    return () => window.clearInterval(iv)
  }, [id, handoffStatus, token, setFields])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [rows.length])

  const applyDoc = (doc: {
    transcript?: Turn[]
    handoffStatus?: string
    handoffAgentName?: string
    handoffAgentPhoto?: string
    handoffJoinedAt?: string
  }) => {
    if (Array.isArray(doc.transcript)) {
      setRows(doc.transcript)
      setFields({ type: 'UPDATE', path: 'transcript', value: doc.transcript })
    }
    if (typeof doc.handoffStatus === 'string') {
      setHandoffStatus(doc.handoffStatus)
      setFields({ type: 'UPDATE', path: 'handoffStatus', value: doc.handoffStatus })
    }
    if (doc.handoffAgentName != null) {
      setAgentName(doc.handoffAgentName)
      setFields({ type: 'UPDATE', path: 'handoffAgentName', value: doc.handoffAgentName })
    }
    if (doc.handoffAgentPhoto != null) {
      setAgentPhoto(doc.handoffAgentPhoto)
      setFields({ type: 'UPDATE', path: 'handoffAgentPhoto', value: doc.handoffAgentPhoto })
    }
    if (doc.handoffJoinedAt != null) {
      setFields({ type: 'UPDATE', path: 'handoffJoinedAt', value: doc.handoffJoinedAt })
    }
    setModified(false)
  }

  const authHeaders = (): Record<string, string> => {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' }
    if (token) headers.Authorization = `JWT ${token}`
    return headers
  }

  const startChat = async () => {
    if (!id || busy) return
    setBusy(true)
    setError('')
    setHint('')
    try {
      const res = await fetch(`/api/sales-inquiry-tickets/${id}/handoff/start`, {
        method: 'POST',
        credentials: 'include',
        headers: authHeaders(),
        body: '{}',
      })
      const data = (await res.json().catch(() => ({}))) as { doc?: Parameters<typeof applyDoc>[0]; message?: string }
      if (!res.ok || !data.doc) {
        setError(data.message || 'Could not start live chat.')
        return
      }
      applyDoc(data.doc)
      setHint('You joined the live chat. Messages appear for the visitor on the site.')
    } catch {
      setError('Network error starting chat.')
    } finally {
      setBusy(false)
    }
  }

  const sendMessage = async () => {
    const message = draft.trim()
    if (!message || !id || busy) return
    setBusy(true)
    setError('')
    try {
      const res = await fetch(`/api/sales-inquiry-tickets/${id}/handoff/message`, {
        method: 'POST',
        credentials: 'include',
        headers: authHeaders(),
        body: JSON.stringify({ message }),
      })
      const data = (await res.json().catch(() => ({}))) as { doc?: Parameters<typeof applyDoc>[0]; message?: string }
      if (!res.ok || !data.doc) {
        setError(data.message || 'Could not send message.')
        return
      }
      setDraft('')
      applyDoc(data.doc)
    } catch {
      setError('Network error sending message.')
    } finally {
      setBusy(false)
    }
  }

  const labelFor = (row: Turn) => {
    if (row.role === 'user') return 'Visitor'
    if (row.role === 'agent') return row.agentName || agentName || 'Sales'
    if (row.role === 'system') return ''
    return 'Ivy'
  }

  return (
    <div className="field-type" style={{ marginBottom: 24 }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        style={{
          fontWeight: 600,
          fontSize: 14,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
        }}
      >
        Chat History {open ? '▾' : '▸'} ({rows.length} messages)
      </button>

      {open && (
        <div style={{ marginTop: 12 }}>
          {handoffStatus === 'requested' && (
            <div
              style={{
                marginBottom: 12,
                padding: 12,
                borderRadius: 8,
                background: '#fef2f2',
                border: '1px solid #fecaca',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 12,
                flexWrap: 'wrap',
              }}
            >
              <div>
                <strong style={{ color: '#b91c1c' }}>Visitor is waiting for a live chat</strong>
                <div style={{ fontSize: 12, color: '#7f1d1d', marginTop: 4 }}>
                  Start chat to take over from Ivy. Your name and photo will show on the website.
                </div>
              </div>
              <button
                type="button"
                onClick={() => void startChat()}
                disabled={busy || !id}
                style={{
                  background: '#dc2626',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '10px 16px',
                  fontWeight: 700,
                  cursor: busy ? 'wait' : 'pointer',
                }}
              >
                Start chat
              </button>
            </div>
          )}

          {handoffStatus === 'active' && (
            <div
              style={{
                marginBottom: 12,
                padding: '8px 12px',
                borderRadius: 8,
                background: '#fff7ed',
                border: '1px solid #fed7aa',
                fontSize: 13,
                color: '#9a3412',
              }}
            >
              Live with {agentName || (user as { name?: string } | null)?.name || 'you'} — reply below.
              Visitor can see your profile photo on the site.
            </div>
          )}

          <div
            style={{
              maxHeight: 420,
              overflow: 'auto',
              padding: 12,
              background: '#f4f4f5',
              borderRadius: 8,
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            {rows.length === 0 && <p style={{ margin: 0, color: '#666' }}>No transcript.</p>}
            {rows.map((row, i) => {
              if (row.role === 'system') {
                return (
                  <div
                    key={i}
                    style={{
                      alignSelf: 'center',
                      maxWidth: '100%',
                      textAlign: 'center',
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      color: '#ea580c',
                      padding: '10px 8px 4px',
                    }}
                  >
                    {row.message || 'System'}
                  </div>
                )
              }
              const isUser = row.role === 'user'
              const isAgent = row.role === 'agent'
              return (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    gap: 8,
                    alignSelf: isUser ? 'flex-end' : 'flex-start',
                    maxWidth: '92%',
                    flexDirection: isUser ? 'row-reverse' : 'row',
                  }}
                >
                  {!isUser && (
                    <Avatar
                      ivy={row.role === 'assistant'}
                      photo={isAgent ? agentPhoto : undefined}
                      name={isAgent ? row.agentName || agentName : 'Ivy'}
                    />
                  )}
                  <div
                    style={{
                      background: isUser ? '#18181b' : isAgent ? '#fff7ed' : '#fff',
                      color: isUser ? '#fff' : '#18181b',
                      border: isUser ? 'none' : isAgent ? '1px solid #fdba74' : '1px solid #e4e4e7',
                      borderRadius: 16,
                      padding: '8px 12px',
                      fontSize: 13,
                      lineHeight: 1.45,
                    }}
                  >
                    <div style={{ opacity: 0.55, fontSize: 11, marginBottom: 4 }}>
                      {labelFor(row)}
                      {row.timestamp ? ` · ${new Date(row.timestamp).toLocaleString()}` : ''}
                    </div>
                    <div style={{ whiteSpace: 'pre-wrap' }}>{row.message}</div>
                  </div>
                </div>
              )
            })}
            <div ref={bottomRef} />
          </div>

          {(handoffStatus === 'active' || handoffStatus === 'requested') && id && (
            <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    void sendMessage()
                  }
                }}
                placeholder={
                  handoffStatus === 'requested'
                    ? 'Or type here — sending will also start the chat…'
                    : 'Message the visitor…'
                }
                disabled={busy}
                style={{
                  flex: 1,
                  border: '1px solid #d4d4d8',
                  borderRadius: 8,
                  padding: '10px 12px',
                  fontSize: 14,
                }}
              />
              <button
                type="button"
                onClick={() => void sendMessage()}
                disabled={busy || !draft.trim()}
                style={{
                  background: '#18181b',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '10px 16px',
                  fontWeight: 600,
                  cursor: busy || !draft.trim() ? 'not-allowed' : 'pointer',
                  opacity: busy || !draft.trim() ? 0.5 : 1,
                }}
              >
                Send
              </button>
            </div>
          )}

          {error && <p style={{ color: '#dc2626', fontSize: 12, marginTop: 8 }}>{error}</p>}
          {hint && <p style={{ color: '#71717a', fontSize: 12, marginTop: 8 }}>{hint}</p>}
        </div>
      )}
    </div>
  )
}
