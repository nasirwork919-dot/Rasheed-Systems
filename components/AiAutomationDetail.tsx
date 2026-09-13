'use client'

import Link from 'next/link'
import { useState, type KeyboardEvent } from 'react'

const stages = [
  {
    id: 'enquiry', number: '01', label: 'Enquiry received', shortLabel: 'Enquiry', heading: 'A new enquiry comes in.',
    fields: [
      ['Enquiry', 'Website consultation'],
      ['Source', 'Website form'],
      ['Message', 'We need help connecting our tools.'],
      ['Next step', 'Check the supplied details'],
    ],
  },
  {
    id: 'check', number: '02', label: 'Details checked', shortLabel: 'Check', heading: 'The details are organised.',
    fields: [
      ['Enquiry', 'Website consultation'],
      ['Requirements', 'Connect existing tools'],
      ['Details', 'Ready for team review'],
      ['Next step', 'Assign a follow-up task'],
    ],
  },
  {
    id: 'assign', number: '03', label: 'Task assigned', shortLabel: 'Assign', heading: 'Ready for your team.',
    fields: [
      ['Enquiry', 'Website consultation'],
      ['Details', 'Requirements captured'],
      ['Assigned to', 'Sales team'],
      ['Next step', 'Review and respond'],
    ],
  },
] as const

const capabilities = [
  ['01', 'AI assistants', 'Handle questions and route conversations.'],
  ['02', 'Workflow automation', 'Move information and trigger the next step.'],
  ['03', 'Connected tools', 'Keep your existing systems in sync.'],
] as const

export default function AiAutomationDetail() {
  const [activeIndex, setActiveIndex] = useState(0)

  function selectFromKeyboard(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex = index
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % stages.length
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + stages.length) % stages.length
    else if (event.key === 'Home') nextIndex = 0
    else if (event.key === 'End') nextIndex = stages.length - 1
    else return

    event.preventDefault()
    setActiveIndex(nextIndex)
    document.getElementById(`automation-tab-${stages[nextIndex].id}`)?.focus()
  }

  return (
    <article className="ai-automation-detail reveal" id="service-ai-automation" aria-labelledby="ai-automation-title">
      <header className="ai-automation-heading">
        <span className="section-label">01 / AI &amp; AUTOMATION</span>
        <h2 id="ai-automation-title">Give repetitive work a better system.</h2>
      </header>

      <div className="ai-automation-layout">
        <div className="ai-automation-copy">
          <p>Connect enquiries, conversations, and everyday tasks so your team can focus on the work that needs them.</p>
          <ol className="ai-automation-capabilities">
            {capabilities.map(([number, title, description]) => (
              <li key={number}>
                <span>{number}</span>
                <div><h3>{title}</h3><p>{description}</p></div>
              </li>
            ))}
          </ol>
        </div>

        <div className="automation-example">
          <div className="automation-example-labels">
            <span>AN EXAMPLE WORKFLOW</span>
            <span>Illustrative</span>
          </div>

          <div className="automation-tabs" role="tablist" aria-label="Example workflow stages">
            {stages.map((stage, index) => (
              <button
                id={`automation-tab-${stage.id}`}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                aria-controls={`automation-panel-${stage.id}`}
                tabIndex={index === activeIndex ? 0 : -1}
                onClick={() => setActiveIndex(index)}
                onKeyDown={event => selectFromKeyboard(event, index)}
                key={stage.id}
              >
                <span>{stage.number}</span>
                <span className="automation-tab-label">{stage.label}</span>
                <span className="automation-tab-short">{stage.shortLabel}</span>
              </button>
            ))}
          </div>

          {stages.map((stage, index) => (
            <div
              id={`automation-panel-${stage.id}`}
              className="automation-panel"
              role="tabpanel"
              aria-labelledby={`automation-tab-${stage.id}`}
              tabIndex={index === activeIndex ? 0 : -1}
              hidden={index !== activeIndex}
              key={stage.id}
            >
              <h3>{stage.heading}</h3>
              <dl>
                {stage.fields.map(([label, value]) => (
                  <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
                ))}
              </dl>
            </div>
          ))}

          <p className="automation-note">Your team stays in control of decisions and replies.</p>
        </div>

        <Link className="ai-automation-cta" href="/contact">Discuss an automation <span aria-hidden="true">↗</span></Link>
      </div>
    </article>
  )
}
