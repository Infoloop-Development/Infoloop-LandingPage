'use client'

import React, { useEffect } from 'react'

/**
 * Injects CSS so list rows with a Waiting handoff badge get a red background.
 * Mount via collection admin.components.beforeListTable.
 */
export function HandoffListHighlight() {
  useEffect(() => {
    const id = 'infoloop-handoff-list-css'
    if (document.getElementById(id)) return
    const style = document.createElement('style')
    style.id = id
    style.textContent = `
      tr:has([data-handoff="requested"]) {
        background: #fef2f2 !important;
      }
      tr:has([data-handoff="requested"]) td {
        background: transparent !important;
      }
      tr:has([data-handoff="active"]) {
        background: #fff7ed !important;
      }
    `
    document.head.appendChild(style)
  }, [])
  return null
}
