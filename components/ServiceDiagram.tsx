'use client'

import { useEffect, useRef } from 'react'

type Kind = 'agents' | 'saas' | 'ghl' | 'marketplace'

const content: Record<Kind, { eyebrow: string; nodes: string[] }> = {
  agents: { eyebrow: 'Input → Logic → Action', nodes: ['Website', 'Form', 'AI qualification', 'CRM', 'Reply', 'Task'] },
  saas: { eyebrow: 'Interface → Application → Data', nodes: ['Interface', 'Application / API', 'Auth + Billing', 'Services', 'PostgreSQL', 'Infrastructure'] },
  ghl: { eyebrow: 'Lead → Conversation → Booking', nodes: ['Lead source', 'CRM', 'AI conversation', 'Qualification', 'Calendar', 'Follow-up'] },
  marketplace: { eyebrow: 'Roles → Operations → Reporting', nodes: ['Buyer', 'Seller', 'Admin', 'Operational workspace', 'Workflow', 'Reporting'] },
}

export default function ServiceDiagram({ kind }: { kind: Kind }) {
  const root = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const element = root.current
    if (!element) return
    const observer = new IntersectionObserver(([entry]) => element.classList.toggle('is-active', entry.isIntersecting), { threshold: .35 })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])
  const item = content[kind]
  return (
    <div className={`service-diagram diagram-${kind}`} ref={root}>
      <span className="diagram-label">{item.eyebrow}</span>
      <svg viewBox="0 0 800 260" aria-hidden="true" preserveAspectRatio="none">
        {kind === 'agents' && <><path d="M90 55 C230 55 220 130 360 130"/><path d="M90 205 C230 205 220 130 360 130"/><path d="M440 130 C570 130 560 55 710 55"/><path d="M440 130 C570 130 560 205 710 205"/></>}
        {kind === 'saas' && <><path d="M100 130 H240"/><path d="M320 130 H460"/><path d="M540 130 H700"/></>}
        {kind === 'ghl' && <path d="M65 130 H735"/>}
        {kind === 'marketplace' && <><path d="M80 55 C210 55 210 130 335 130"/><path d="M80 130 H335"/><path d="M80 205 C210 205 210 130 335 130"/><path d="M430 130 H570"/><path d="M650 130 H735"/></>}
      </svg>
      <div className="diagram-nodes">
        {item.nodes.map((node, index) => <span key={node} style={{ '--node': index } as React.CSSProperties}>{node}</span>)}
      </div>
    </div>
  )
}
