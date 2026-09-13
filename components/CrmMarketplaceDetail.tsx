'use client'

import Link from 'next/link'
import { useState, type KeyboardEvent } from 'react'

const records = [
  {
    request: 'Website redesign', status: 'New', buyerNextStep: 'Await initial review',
    sellerNextStep: 'Review brief', assignedTeam: 'Intake team',
  },
  {
    request: 'Booking system', status: 'In discussion', buyerNextStep: 'Confirm requirements',
    sellerNextStep: 'Clarify scope', assignedTeam: 'Product team',
  },
  {
    request: 'Customer portal', status: 'Proposal sent', buyerNextStep: 'Review proposal',
    sellerNextStep: 'Await reply', assignedTeam: 'Delivery team',
  },
] as const

const roles = [
  {
    id: 'buyer', label: 'Buyer', eyebrow: 'BUYER WORKSPACE', heading: 'Your requests',
    description: 'Follow your requests and see what needs your attention.', column: 'Next step', field: 'buyerNextStep',
  },
  {
    id: 'seller', label: 'Seller', eyebrow: 'SELLER WORKSPACE', heading: 'Your enquiries',
    description: 'See requests and keep the next step clear.', column: 'Next step', field: 'sellerNextStep',
  },
  {
    id: 'admin', label: 'Admin', eyebrow: 'ADMIN WORKSPACE', heading: 'Platform activity',
    description: 'See current requests and the teams responsible for them.', column: 'Assigned team', field: 'assignedTeam',
  },
] as const

const capabilities = [
  ['Custom CRMs', 'Keep relationships and next steps in view.'],
  ['Multi-role marketplaces', 'Give each person the tools they need.'],
  ['Admin & reporting', 'Manage activity with a clearer overview.'],
] as const

export default function CrmMarketplaceDetail() {
  const [activeIndex, setActiveIndex] = useState(1)
  const activeRole = roles[activeIndex]

  function selectFromKeyboard(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex = index
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % roles.length
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + roles.length) % roles.length
    else if (event.key === 'Home') nextIndex = 0
    else if (event.key === 'End') nextIndex = roles.length - 1
    else return

    event.preventDefault()
    setActiveIndex(nextIndex)
    document.getElementById(`crm-role-tab-${roles[nextIndex].id}`)?.focus()
  }

  return (
    <article className="crm-detail reveal" id="service-crms-marketplaces" aria-labelledby="crm-detail-title">
      <div className="crm-detail-layout">
        <header className="crm-detail-copy">
          <span className="section-label">04 / CRMs &amp; MARKETPLACES</span>
          <h2 id="crm-detail-title">Different roles.<br />One connected<br />platform.</h2>
          <p>Bring customers, teams, and daily operations together in a system built around your business.</p>
        </header>

        <div className="crm-demo">
          <div className="crm-demo-labels"><span>ONE PLATFORM, THREE PERSPECTIVES</span><span>Illustrative example</span></div>
          <div className="crm-role-tabs" role="tablist" aria-label="Platform perspectives">
            {roles.map((role, index) => (
              <button
                id={`crm-role-tab-${role.id}`}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                aria-controls="crm-role-panel"
                tabIndex={index === activeIndex ? 0 : -1}
                onClick={() => setActiveIndex(index)}
                onKeyDown={event => selectFromKeyboard(event, index)}
                key={role.id}
              >
                {role.label}
              </button>
            ))}
          </div>

          <div
            className="crm-role-panel"
            id="crm-role-panel"
            role="tabpanel"
            aria-labelledby={`crm-role-tab-${activeRole.id}`}
            tabIndex={0}
            key={activeRole.id}
          >
            <span>{activeRole.eyebrow}</span>
            <h3>{activeRole.heading}</h3>
            <p>{activeRole.description}</p>
            <table className="crm-role-records">
              <thead><tr><th scope="col">Request</th><th scope="col">Status</th><th scope="col">{activeRole.column}</th></tr></thead>
              <tbody>
                {records.map(record => (
                  <tr key={record.request}>
                    <th scope="row">{record.request}</th>
                    <td data-label="Status">{record.status}</td>
                    <td data-label={activeRole.column}>{record[activeRole.field]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="crm-sample-note">Sample content</p>
          </div>

          <div className="crm-demo-footer"><strong>The same activity. A view for every role.</strong><span>Switch roles to explore the example.</span></div>
        </div>

        <ol className="crm-capabilities">
          {capabilities.map(([title, description], index) => (
            <li key={title}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{title}</h3><p>{description}</p></div></li>
          ))}
        </ol>

        <Link className="crm-detail-cta" href="/contact">Discuss your platform <span aria-hidden="true">↗</span></Link>
      </div>
    </article>
  )
}
