'use client'

import Link from 'next/link'
import { useState, type KeyboardEvent } from 'react'

const stages = [
  { id: 'new', label: 'New enquiry', status: 'Received', next: 'Review the enquiry' },
  { id: 'follow-up', label: 'Follow-up', status: 'In progress', next: 'Confirm a suitable time' },
  { id: 'booked', label: 'Booked', status: 'Confirmed', next: 'Prepare for the consultation' },
] as const

const capabilities = [
  ['01', 'Pipelines & workflows', 'Organise leads and automate routine follow-up.'],
  ['02', 'Custom dashboards', 'Give your team a clearer view of daily work.'],
  ['03', 'Integrations & embedded apps', 'Connect the tools and features your setup needs.'],
] as const

export default function GoHighLevelDetail() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeStage = stages[activeIndex]

  function selectFromKeyboard(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex = index
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % stages.length
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + stages.length) % stages.length
    else if (event.key === 'Home') nextIndex = 0
    else if (event.key === 'End') nextIndex = stages.length - 1
    else return

    event.preventDefault()
    setActiveIndex(nextIndex)
    document.getElementById(`ghl-tab-${stages[nextIndex].id}`)?.focus()
  }

  return (
    <article className="ghl-detail reveal" id="service-gohighlevel" aria-labelledby="ghl-detail-title">
      <header className="ghl-detail-heading">
        <span className="section-label">02 / GOHIGHLEVEL</span>
        <h2 id="ghl-detail-title">Make GoHighLevel work your way.</h2>
        <p>Shape your pipelines, workflows, and connected tools around the way your team operates.</p>
      </header>

      <div className="ghl-detail-layout">
        <div className="ghl-capabilities">
          <ol>
            {capabilities.map(([number, title, description]) => (
              <li key={number}>
                <span>{number}</span>
                <div><h3>{title}</h3><p>{description}</p></div>
              </li>
            ))}
          </ol>
        </div>

        <div className="ghl-pipeline">
          <div className="ghl-pipeline-labels">
            <span>A PIPELINE IN PRACTICE</span>
            <span>Illustrative example</span>
          </div>

          <div className="ghl-pipeline-stages" role="tablist" aria-label="Illustrative pipeline stages">
            {stages.map((stage, index) => (
              <button
                id={`ghl-tab-${stage.id}`}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                aria-controls={`ghl-panel-${stage.id}`}
                tabIndex={index === activeIndex ? 0 : -1}
                onClick={() => setActiveIndex(index)}
                onKeyDown={event => selectFromKeyboard(event, index)}
                key={stage.id}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>{stage.label}
              </button>
            ))}
          </div>

          <div className="ghl-pipeline-track">
            {stages.map((stage, index) => (
                <div
                  id={`ghl-panel-${stage.id}`}
                  className="ghl-pipeline-panel"
                  role="tabpanel"
                  aria-labelledby={`ghl-tab-${stage.id}`}
                  hidden={index !== activeIndex}
                >
                  {index === activeIndex && <article className="ghl-enquiry" key={stage.id}>
                    <header><h3>Website enquiry</h3><p>Consultation request</p></header>
                    <dl>
                      <div><dt>Status</dt><dd>{stage.status}</dd></div>
                      <div><dt>Next</dt><dd>{stage.next}</dd></div>
                    </dl>
                  </article>}
                </div>
            ))}
          </div>

          <div className="ghl-pipeline-controls">
            <p aria-live="polite" aria-atomic="true">Example {activeIndex + 1} of 3 · {activeStage.label}</p>
            <div>
              <button type="button" disabled={activeIndex === 0} onClick={() => setActiveIndex(index => Math.max(0, index - 1))}>Previous</button>
              <button type="button" onClick={() => setActiveIndex(activeIndex === stages.length - 1 ? 0 : activeIndex + 1)}>
                {activeIndex === stages.length - 1 ? 'Restart example ↻' : 'Next stage →'}
              </button>
            </div>
          </div>

          <div className="ghl-pipeline-notes"><p>Keep your team informed.</p><p>Make the next action clear.</p></div>
        </div>

        <Link className="ghl-detail-cta" href="/contact">Discuss your GHL setup <span aria-hidden="true">↗</span></Link>
      </div>
    </article>
  )
}
