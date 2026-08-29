import type { CollectionBeforeChangeHook, CollectionConfig, PayloadRequest } from 'payload'
import { canAccessCategory, editorAccess, hideUnlessCategory, type CmsUser } from '../access/permissions'

const STATUSES = [
  { label: 'Received', value: 'Received' },
  { label: 'Open', value: 'Open' },
  { label: 'In Progress', value: 'In Progress' },
  { label: 'Closed', value: 'Closed' },
] as const

const HANDOFF_STATUSES = [
  { label: 'None', value: 'none' },
  { label: 'Waiting for agent', value: 'requested' },
  { label: 'Live with agent', value: 'active' },
  { label: 'Ended', value: 'ended' },
] as const

type TranscriptRole = 'user' | 'assistant' | 'system' | 'agent'

type TranscriptRow = {
  id?: string
  role?: TranscriptRole
  message?: string
  timestamp?: string
  agentName?: string
  agentUserId?: string
}

type NoteRow = {
  body: string
  author?: string | null
  at?: string | null
  id?: string | null
}

function agentDisplayName(user: CmsUser) {
  const n = typeof user.name === 'string' ? user.name.trim() : ''
  if (n) return n
  const email = typeof user.email === 'string' ? user.email : ''
  return email.split('@')[0] || 'Sales'
}

function userIdAsNumber(id: number | string | undefined): number | undefined {
  if (typeof id === 'number' && Number.isFinite(id)) return id
  if (typeof id === 'string' && id.trim()) {
    const n = Number(id)
    if (Number.isFinite(n)) return n
  }
  return undefined
}

/** Chatbot (API key) or editors may create; only editors read/update. */
const createAccess = ({ req: { user } }: { req: { user?: unknown } }) => Boolean(user)

const stampNoteAuthors: CollectionBeforeChangeHook = ({ data, req }) => {
  if (!data?.notes || !Array.isArray(data.notes)) return data
  const actor = req.user as CmsUser | undefined
  const name = (typeof actor?.email === 'string' && actor.email) || 'staff'
  const now = new Date().toISOString()
  data.notes = (data.notes as { body?: unknown; author?: string; at?: string; id?: string }[])
    .filter((row): row is { body: string; author?: string; at?: string; id?: string } =>
      typeof row?.body === 'string' && row.body.trim().length > 0,
    )
    .map((row) => ({
      ...row,
      body: row.body.trim(),
      author: row.author || name,
      at: row.at || now,
    }))
  return data
}

/**
 * When status changes without a matching statusHistory append from the custom
 * field UI, reject the save. Seed Received on create.
 */
const enforceStatusReason: CollectionBeforeChangeHook = ({ data, operation, originalDoc }) => {
  if (!data) return data
  const now = new Date().toISOString()

  if (operation === 'create') {
    if (!data.ticketId) {
      data.ticketId = `SIT-${Date.now().toString(36).toUpperCase()}`
    }
    if (!data.status) data.status = 'Received'
    if (!Array.isArray(data.statusHistory) || data.statusHistory.length === 0) {
      data.statusHistory = [
        {
          status: 'Received',
          reason: 'Ticket auto-created by chatbot',
          changedAt: now,
          changedBy: 'chatbot',
        },
      ]
    }
    return data
  }

  const prev = originalDoc?.status
  const next = data.status ?? prev
  if (prev && next && prev !== next) {
    const history = Array.isArray(data.statusHistory)
      ? data.statusHistory
      : Array.isArray(originalDoc?.statusHistory)
        ? [...originalDoc.statusHistory]
        : []
    const last = history[history.length - 1]
    const alreadyLogged =
      last &&
      last.status === next &&
      typeof last.reason === 'string' &&
      last.reason.trim().length > 0 &&
      (!last.changedAt || Date.now() - new Date(last.changedAt).getTime() < 60_000)

    if (!alreadyLogged) {
      throw new Error('Status changes require a reason. Use the Status field modal before saving.')
    }
    data.statusHistory = history
  }

  return data
}

/**
 * Sales Inquiry Tickets created by the website chatbot after a lead + estimate.
 * List shows Ticket ID, Project Name, Status. Detail uses custom UI components.
 */
export const SalesInquiryTickets: CollectionConfig = {
  slug: 'sales-inquiry-tickets',
  labels: { singular: 'Sales inquiry ticket', plural: 'Sales Inquiry Tickets' },
  access: {
    read: editorAccess('sales-tickets'),
    create: createAccess,
    update: editorAccess('sales-tickets'),
    delete: editorAccess('sales-tickets'),
  },
  admin: {
    useAsTitle: 'ticketId',
    defaultColumns: [
      'ticketId',
      'handoffStatus',
      'projectName',
      'status',
      'visitorName',
      'lastVisitorReturnAt',
      'createdAt',
    ],
    group: 'Sales',
    description: 'Leads and rough estimates captured by the Infoloop site chatbot.',
    hidden: hideUnlessCategory('sales-tickets'),
    components: {
      beforeListTable: ['/components/tickets/HandoffListHighlight#HandoffListHighlight'],
    },
  },
  hooks: {
    beforeChange: [stampNoteAuthors, enforceStatusReason],
  },
  endpoints: [
    {
      path: '/:id/notes',
      method: 'post',
      handler: async (req: PayloadRequest) => {
        const user = req.user as CmsUser | undefined
        if (!user || !canAccessCategory(user, 'sales-tickets')) {
          return Response.json({ message: 'You are not allowed to perform this action.' }, { status: 403 })
        }
        const id = req.routeParams?.id
        if (!id) return Response.json({ message: 'Missing id' }, { status: 400 })

        let body: { body?: string; notes?: { body?: string; author?: string; at?: string; id?: string }[] }
        try {
          body = (await req.json?.()) as typeof body
        } catch {
          return Response.json({ message: 'Invalid JSON' }, { status: 400 })
        }

        const actorEmail = (typeof user.email === 'string' && user.email) || 'staff'

        const doc = await req.payload.findByID({
          collection: 'sales-inquiry-tickets',
          id: String(id),
          depth: 0,
          req,
          overrideAccess: false,
        })

        const existing: NoteRow[] = Array.isArray(doc.notes) ? [...doc.notes] : []
        let next: NoteRow[] = existing

        if (Array.isArray(body.notes)) {
          next = body.notes
            .filter((n): n is { body: string; author?: string; at?: string; id?: string } =>
              typeof n?.body === 'string' && n.body.trim().length > 0,
            )
            .map((n) => ({
              ...n,
              body: n.body.trim(),
              author: n.author || actorEmail,
              at: n.at || new Date().toISOString(),
            }))
        } else if (typeof body.body === 'string' && body.body.trim()) {
          next = [
            ...existing,
            {
              body: body.body.trim(),
              author: actorEmail,
              at: new Date().toISOString(),
            },
          ]
        } else {
          return Response.json({ message: 'Note body required' }, { status: 400 })
        }

        const updated = await req.payload.update({
          collection: 'sales-inquiry-tickets',
          id: String(id),
          data: { notes: next },
          depth: 0,
          req,
          overrideAccess: false,
        })

        return Response.json({ doc: updated })
      },
    },
    {
      path: '/:id/handoff/start',
      method: 'post',
      handler: async (req: PayloadRequest) => {
        const user = req.user as CmsUser | undefined
        if (!user || !canAccessCategory(user, 'sales-tickets')) {
          return Response.json({ message: 'You are not allowed to perform this action.' }, { status: 403 })
        }
        const id = req.routeParams?.id
        if (!id) return Response.json({ message: 'Missing id' }, { status: 400 })
        const agentId = userIdAsNumber(user.id)
        if (agentId == null) {
          return Response.json({ message: 'Invalid user id' }, { status: 400 })
        }

        const doc = await req.payload.findByID({
          collection: 'sales-inquiry-tickets',
          id: String(id),
          depth: 0,
          req,
          overrideAccess: false,
        })

        const now = new Date().toISOString()
        const displayName = agentDisplayName(user)
        const actorLabel = (typeof user.email === 'string' && user.email) || displayName
        const transcript: TranscriptRow[] = Array.isArray(doc.transcript) ? [...(doc.transcript as TranscriptRow[])] : []
        transcript.push({
          role: 'system',
          message: `—— Live chat · ${displayName} joined · AI conversation ended ——`,
          timestamp: now,
        })

        let agentPhotoUrl = ''
        try {
          const fullUser = await req.payload.findByID({
            collection: 'users',
            id: agentId,
            depth: 1,
            req,
            overrideAccess: true,
          })
          const photo = (fullUser as { photo?: { url?: string } | number | null }).photo
          if (photo && typeof photo === 'object' && typeof photo.url === 'string') {
            const raw = photo.url
            if (raw.startsWith('http')) {
              agentPhotoUrl = raw
            } else {
              const host =
                (typeof req.headers?.get === 'function' && (req.headers.get('x-forwarded-host') || req.headers.get('host'))) ||
                ''
              const proto =
                (typeof req.headers?.get === 'function' && (req.headers.get('x-forwarded-proto') || 'http')) || 'http'
              const fromReq = host ? `${proto}://${host}` : ''
              const base = (fromReq || process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000').replace(
                /\/$/,
                '',
              )
              agentPhotoUrl = `${base}${raw.startsWith('/') ? raw : `/${raw}`}`
            }
          }
        } catch {
          /* optional */
        }

        transcript.push({
          role: 'agent',
          message: `Hi — I'm ${displayName}. I've got everything discussed so far and can help you navigate from here.`,
          timestamp: now,
          agentName: displayName,
          agentUserId: String(agentId),
        })

        const notes: NoteRow[] = Array.isArray(doc.notes) ? [...doc.notes] : []
        notes.push({
          body: `Live handoff started — ${displayName} joined the visitor chat. Messages after the live-chat divider are with the sales executive.`,
          author: actorLabel,
          at: now,
        })

        const history = Array.isArray(doc.statusHistory) ? [...doc.statusHistory] : []
        const nextStatus = doc.status === 'Received' || doc.status === 'Open' ? 'In Progress' : doc.status
        if (nextStatus !== doc.status) {
          history.push({
            status: nextStatus,
            reason: `Live chat started by ${displayName}`,
            changedAt: now,
            changedBy: actorLabel,
          })
        }

        const updated = await req.payload.update({
          collection: 'sales-inquiry-tickets',
          id: String(id),
          data: {
            handoffStatus: 'active',
            handoffJoinedAt: now,
            handoffAgent: agentId,
            handoffAgentName: displayName,
            handoffAgentPhoto: agentPhotoUrl || undefined,
            transcript,
            notes,
            ...(nextStatus !== doc.status ? { status: nextStatus, statusHistory: history } : {}),
          },
          depth: 0,
          req,
          overrideAccess: false,
        })

        return Response.json({ doc: updated })
      },
    },
    {
      path: '/:id/handoff/message',
      method: 'post',
      handler: async (req: PayloadRequest) => {
        const user = req.user as CmsUser | undefined
        if (!user || !canAccessCategory(user, 'sales-tickets')) {
          return Response.json({ message: 'You are not allowed to perform this action.' }, { status: 403 })
        }
        const id = req.routeParams?.id
        if (!id) return Response.json({ message: 'Missing id' }, { status: 400 })
        const agentId = userIdAsNumber(user.id)

        let body: { message?: string }
        try {
          body = (await req.json?.()) as typeof body
        } catch {
          return Response.json({ message: 'Invalid JSON' }, { status: 400 })
        }
        const message = typeof body.message === 'string' ? body.message.trim() : ''
        if (!message) return Response.json({ message: 'Message required' }, { status: 400 })

        const doc = await req.payload.findByID({
          collection: 'sales-inquiry-tickets',
          id: String(id),
          depth: 0,
          req,
          overrideAccess: false,
        })

        if (doc.handoffStatus !== 'active' && doc.handoffStatus !== 'requested') {
          return Response.json({ message: 'Start the live chat before messaging.' }, { status: 400 })
        }

        const displayName =
          (typeof doc.handoffAgentName === 'string' && doc.handoffAgentName) || agentDisplayName(user)
        const now = new Date().toISOString()
        const transcript: TranscriptRow[] = Array.isArray(doc.transcript) ? [...(doc.transcript as TranscriptRow[])] : []
        transcript.push({
          role: 'agent',
          message: message.slice(0, 2000),
          timestamp: now,
          agentName: displayName,
          agentUserId: String(agentId ?? user.id ?? ''),
        })

        const patch: Record<string, unknown> = { transcript }
        if (doc.handoffStatus === 'requested') {
          patch.handoffStatus = 'active'
          patch.handoffJoinedAt = now
          if (agentId != null) patch.handoffAgent = agentId
          patch.handoffAgentName = displayName
        }

        const updated = await req.payload.update({
          collection: 'sales-inquiry-tickets',
          id: String(id),
          data: patch,
          depth: 0,
          req,
          overrideAccess: false,
        })

        return Response.json({ doc: updated })
      },
    },
  ],
  fields: [
    {
      name: 'ticketId',
      type: 'text',
      required: true,
      unique: true,
      admin: { readOnly: true },
    },
    { name: 'projectName', type: 'text', required: true },
    {
      type: 'row',
      fields: [
        { name: 'visitorName', type: 'text', required: true, admin: { width: '33%' } },
        { name: 'visitorEmail', type: 'email', required: true, admin: { width: '33%' } },
        { name: 'visitorMobile', type: 'text', required: true, admin: { width: '33%' } },
      ],
    },
    {
      name: 'descriptionUi',
      type: 'ui',
      admin: {
        components: {
          Field: '/components/tickets/TicketDescription#TicketDescription',
        },
      },
    },
    {
      name: 'chatSummary',
      type: 'textarea',
      required: true,
      admin: { hidden: true },
    },
    {
      name: 'estimate',
      type: 'group',
      admin: { hidden: true },
      fields: [
        { name: 'hourlyTotal', type: 'number', required: true, admin: { readOnly: true, description: 'USD, buffered. No raw hours stored for staff display.' } },
        { name: 'milestoneTotal', type: 'number', required: true, admin: { readOnly: true } },
        { name: 'months', type: 'number', required: true, admin: { readOnly: true } },
        {
          name: 'stack',
          type: 'text',
          admin: { readOnly: true },
        },
        {
          name: 'features',
          type: 'array',
          admin: { readOnly: true },
          fields: [
            { name: 'key', type: 'text' },
            { name: 'name', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'estimationUi',
      type: 'ui',
      admin: {
        components: {
          Field: '/components/tickets/TicketEstimation#TicketEstimation',
        },
      },
    },
    {
      name: 'transcript',
      type: 'array',
      admin: { hidden: true },
      fields: [
        { name: 'role', type: 'select', options: ['user', 'assistant', 'system', 'agent'] },
        { name: 'message', type: 'textarea' },
        { name: 'timestamp', type: 'date', admin: { date: { pickerAppearance: 'dayAndTime' } } },
        { name: 'agentName', type: 'text' },
        { name: 'agentUserId', type: 'text' },
      ],
    },
    {
      name: 'chatHistoryUi',
      type: 'ui',
      admin: {
        components: {
          Field: '/components/tickets/ChatHistoryBubbles#ChatHistoryBubbles',
        },
      },
    },
    {
      name: 'handoffStatus',
      type: 'select',
      defaultValue: 'none',
      options: [...HANDOFF_STATUSES],
      admin: {
        position: 'sidebar',
        description: 'Live sales handoff. “Waiting” highlights the list row in red.',
        components: {
          Cell: '/components/tickets/HandoffStatusCell#HandoffStatusCell',
        },
      },
    },
    {
      name: 'handoffRequestedAt',
      type: 'date',
      admin: {
        readOnly: true,
        position: 'sidebar',
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
    {
      name: 'handoffJoinedAt',
      type: 'date',
      admin: {
        readOnly: true,
        position: 'sidebar',
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
    {
      name: 'handoffAgent',
      type: 'relationship',
      relationTo: 'users',
      admin: { position: 'sidebar', readOnly: true },
    },
    {
      name: 'handoffAgentName',
      type: 'text',
      admin: { position: 'sidebar', readOnly: true },
    },
    {
      name: 'handoffAgentPhoto',
      type: 'text',
      admin: { position: 'sidebar', readOnly: true, description: 'Public URL of agent photo for the site chat.' },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'Received',
      options: [...STATUSES],
      admin: {
        position: 'sidebar',
        components: {
          Field: '/components/tickets/StatusWithReason#StatusWithReason',
        },
      },
    },
    {
      name: 'notes',
      type: 'array',
      label: 'Notes',
      admin: {
        position: 'sidebar',
        description: 'Call minutes and follow-ups after outreach.',
        components: {
          Field: '/components/tickets/TicketNotes#TicketNotes',
        },
      },
      fields: [
        { name: 'body', type: 'textarea', required: true },
        { name: 'author', type: 'text', admin: { readOnly: true } },
        {
          name: 'at',
          type: 'date',
          admin: { readOnly: true, date: { pickerAppearance: 'dayAndTime' } },
        },
      ],
    },
    {
      name: 'statusTimelineUi',
      type: 'ui',
      admin: {
        components: {
          Field: '/components/tickets/StatusTimeline#StatusTimeline',
        },
      },
    },
    {
      name: 'statusHistory',
      type: 'array',
      admin: { hidden: true },
      fields: [
        { name: 'status', type: 'select', options: [...STATUSES] },
        { name: 'reason', type: 'textarea' },
        { name: 'changedAt', type: 'date', admin: { date: { pickerAppearance: 'dayAndTime' } } },
        { name: 'changedBy', type: 'text' },
      ],
    },
    {
      name: 'lastVisitorReturnAt',
      type: 'date',
      admin: {
        readOnly: true,
        position: 'sidebar',
        description: 'Last time the visitor resumed this quote via Ivy.',
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
    {
      name: 'resumeCount',
      type: 'number',
      defaultValue: 0,
      admin: {
        readOnly: true,
        position: 'sidebar',
        description: 'How many times the visitor has returned via Ivy.',
      },
    },
  ],
}
