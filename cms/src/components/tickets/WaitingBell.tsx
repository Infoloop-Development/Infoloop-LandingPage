'use client'

/**
 * Admin nav bell: polls Sales Inquiry Tickets with handoffStatus=requested.
 * Waiting = requested (bell + sound). Live/active and ended = no bell.
 */
import { useAuth, useConfig } from '@payloadcms/ui'
import React, { useCallback, useEffect, useRef, useState } from 'react'

type WaitingTicket = {
  id: string | number
  ticketId?: string
  projectName?: string
  visitorName?: string
  handoffRequestedAt?: string
}

type AuthUser = {
  role?: string | null
  accessMode?: string | null
  categories?: string[] | null
}

function userCanSeeSalesTickets(user: AuthUser | null | undefined): boolean {
  if (!user) return false
  if (user.role === 'admin') return true
  if (user.accessMode !== 'limited') return true
  return Array.isArray(user.categories) && user.categories.includes('sales-tickets')
}

const ALERTED_KEY = 'infoloop:handoffAlertedIds'
const POLL_MS = 4000

function readAlerted(): Set<string> {
  try {
    const raw = sessionStorage.getItem(ALERTED_KEY)
    if (!raw) return new Set()
    const arr = JSON.parse(raw) as unknown
    if (!Array.isArray(arr)) return new Set()
    return new Set(arr.map(String))
  } catch {
    return new Set()
  }
}

function writeAlerted(ids: Set<string>) {
  try {
    sessionStorage.setItem(ALERTED_KEY, JSON.stringify([...ids]))
  } catch {
    /* ignore quota */
  }
}

/** Loud multi-tone alert via Web Audio (no binary asset required). */
function playWaitingAlert(ctx: AudioContext) {
  const now = ctx.currentTime
  const tones = [880, 1174.7, 880, 1318.5]
  tones.forEach((freq, i) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'square'
    osc.frequency.value = freq
    gain.gain.setValueAtTime(0.0001, now)
    const start = now + i * 0.18
    gain.gain.exponentialRampToValueAtTime(0.35, start + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.16)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(start)
    osc.stop(start + 0.17)
  })
}

function waitingSinceLabel(iso?: string): string {
  if (!iso) return 'just now'
  const ms = Date.now() - new Date(iso).getTime()
  if (Number.isNaN(ms) || ms < 0) return 'just now'
  const mins = Math.floor(ms / 60000)
  if (mins < 1) return 'just now'
  if (mins === 1) return '1 min'
  if (mins < 60) return `${mins} min`
  const hrs = Math.floor(mins / 60)
  return hrs === 1 ? '1 hr' : `${hrs} hr`
}

export function WaitingBell() {
  const { user, token } = useAuth()
  const { config } = useConfig()
  const adminRoute = config.routes.admin || '/admin'

  const [tickets, setTickets] = useState<WaitingTicket[]>([])
  const [open, setOpen] = useState(false)
  const [allowed, setAllowed] = useState(false)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const audioUnlockedRef = useRef(false)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setAllowed(userCanSeeSalesTickets(user as AuthUser | undefined))
  }, [user])

  // Unlock audio on first user gesture (browser autoplay policy)
  useEffect(() => {
    if (!allowed) return
    const unlock = () => {
      if (audioUnlockedRef.current) return
      try {
        const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        if (!Ctx) return
        const ctx = audioCtxRef.current || new Ctx()
        audioCtxRef.current = ctx
        if (ctx.state === 'suspended') void ctx.resume()
        audioUnlockedRef.current = true
      } catch {
        /* ignore */
      }
    }
    window.addEventListener('pointerdown', unlock, { once: true })
    window.addEventListener('keydown', unlock, { once: true })
    return () => {
      window.removeEventListener('pointerdown', unlock)
      window.removeEventListener('keydown', unlock)
    }
  }, [allowed])

  const alertNew = useCallback((list: WaitingTicket[]) => {
    const alerted = readAlerted()
    const fresh = list.filter((t) => !alerted.has(String(t.id)))
    if (!fresh.length) return
    for (const t of fresh) alerted.add(String(t.id))
    writeAlerted(alerted)
    try {
      const ctx = audioCtxRef.current
      if (ctx && audioUnlockedRef.current) {
        if (ctx.state === 'suspended') void ctx.resume().then(() => playWaitingAlert(ctx))
        else playWaitingAlert(ctx)
      }
    } catch {
      /* ignore */
    }
  }, [])

  const poll = useCallback(async () => {
    if (!allowed) return
    try {
      const headers: Record<string, string> = {}
      if (token) headers.Authorization = `JWT ${token}`
      const qs = new URLSearchParams({
        limit: '20',
        depth: '0',
        sort: 'handoffRequestedAt',
        'where[handoffStatus][equals]': 'requested',
      })
      const res = await fetch(`/api/sales-inquiry-tickets?${qs}`, {
        credentials: 'include',
        headers,
      })
      if (res.status === 403) {
        setAllowed(false)
        setTickets([])
        return
      }
      if (!res.ok) return
      const data = (await res.json().catch(() => ({}))) as { docs?: WaitingTicket[] }
      const docs = Array.isArray(data.docs) ? data.docs : []
      setTickets(docs)
      alertNew(docs)
    } catch {
      /* ignore network blips */
    }
  }, [allowed, token, alertNew])

  useEffect(() => {
    if (!allowed) return
    void poll()
    const iv = window.setInterval(() => void poll(), POLL_MS)
    return () => window.clearInterval(iv)
  }, [allowed, poll])

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [open])

  if (!allowed) return null

  const count = tickets.length

  return (
    <div ref={wrapRef} style={{ position: 'relative', margin: '8px 0 12px', padding: '0 8px' }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={count ? `${count} visitors waiting for live chat` : 'No visitors waiting'}
        aria-expanded={open}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          width: '100%',
          padding: '8px 10px',
          borderRadius: 8,
          border: count ? '1px solid #fecaca' : '1px solid transparent',
          background: count ? '#fef2f2' : 'transparent',
          color: count ? '#b91c1c' : 'inherit',
          cursor: 'pointer',
          fontSize: 13,
          fontWeight: 600,
        }}
      >
        <span aria-hidden style={{ display: 'inline-flex', lineHeight: 1 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
          </svg>
        </span>
        <span style={{ flex: 1, textAlign: 'left' }}>Live chat</span>
        {count > 0 && (
          <span
            style={{
              minWidth: 20,
              height: 20,
              padding: '0 6px',
              borderRadius: 999,
              background: '#dc2626',
              color: '#fff',
              fontSize: 11,
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {count > 99 ? '99+' : count}
          </span>
        )}
      </button>

      {open && (
        <div
          style={{
            position: 'absolute',
            left: 8,
            right: 8,
            top: '100%',
            zIndex: 50,
            marginTop: 4,
            background: '#fff',
            border: '1px solid #e4e4e7',
            borderRadius: 10,
            boxShadow: '0 12px 28px rgba(0,0,0,0.12)',
            overflow: 'hidden',
            maxHeight: 320,
            overflowY: 'auto',
          }}
        >
          {count === 0 ? (
            <p style={{ margin: 0, padding: 12, fontSize: 12, color: '#71717a' }}>
              No visitors waiting. Bell rings when someone asks to connect with sales.
            </p>
          ) : (
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {tickets.map((t) => (
                <li key={String(t.id)} style={{ borderBottom: '1px solid #f4f4f5' }}>
                  <a
                    href={`${adminRoute}/collections/sales-inquiry-tickets/${encodeURIComponent(String(t.id))}`}
                    onClick={() => setOpen(false)}
                    style={{
                      display: 'block',
                      padding: '10px 12px',
                      textDecoration: 'none',
                      color: '#18181b',
                    }}
                  >
                    <div style={{ fontWeight: 600, fontSize: 13 }}>
                      {t.projectName || t.ticketId || `Ticket ${t.id}`}
                    </div>
                    <div style={{ fontSize: 11, color: '#71717a', marginTop: 2 }}>
                      {t.visitorName || 'Visitor'}
                      {' · '}
                      waiting {waitingSinceLabel(t.handoffRequestedAt)}
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
