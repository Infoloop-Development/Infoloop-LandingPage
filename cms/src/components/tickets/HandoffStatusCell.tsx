'use client'

import { Link, useConfig } from '@payloadcms/ui'
import React from 'react'

type Props = {
  cellData?: string | null
  link?: boolean
  linkURL?: string
  collectionSlug?: string
  rowData?: { id?: string | number }
  viewType?: string
}

/** List cell: red “WAITING” when visitor requested live sales chat. Keeps row link. */
export function HandoffStatusCell({
  cellData,
  link,
  linkURL,
  collectionSlug,
  rowData,
  viewType,
}: Props) {
  const status = typeof cellData === 'string' ? cellData : 'none'
  const {
    config: {
      routes: { admin: adminRoute },
    },
  } = useConfig()

  let badge: React.ReactNode
  if (status === 'requested') {
    badge = (
      <span
        data-handoff="requested"
        style={{
          display: 'inline-block',
          background: '#dc2626',
          color: '#fff',
          fontWeight: 700,
          fontSize: 11,
          letterSpacing: '0.04em',
          padding: '4px 8px',
          borderRadius: 6,
          textTransform: 'uppercase',
        }}
      >
        Waiting
      </span>
    )
  } else if (status === 'active') {
    badge = (
      <span
        data-handoff="active"
        style={{
          display: 'inline-block',
          background: '#ea580c',
          color: '#fff',
          fontWeight: 600,
          fontSize: 11,
          padding: '4px 8px',
          borderRadius: 6,
        }}
      >
        Live
      </span>
    )
  } else if (status === 'ended') {
    badge = <span style={{ color: '#a1a1aa', fontSize: 12 }}>—</span>
  } else {
    badge = <span style={{ color: '#a1a1aa', fontSize: 12 }}>—</span>
  }

  if (!link || !rowData?.id) {
    return badge
  }

  const href =
    linkURL ||
    `${adminRoute}/collections/${collectionSlug || 'sales-inquiry-tickets'}${
      viewType === 'trash' ? '/trash' : ''
    }/${encodeURIComponent(String(rowData.id))}`

  return (
    <Link href={href} prefetch={false}>
      {badge}
    </Link>
  )
}
