'use client'

import { useState, type KeyboardEvent } from 'react'

const workflowTabs = [
  { id: 'pipeline', label: 'Pipeline' },
  { id: 'conversation', label: 'Conversation' },
  { id: 'booking', label: 'Booking' },
] as const

const pipelineRows = [
  ['New enquiry', 'A parent asks about an after-school trial.'],
  ['Details checked', 'Age group and preferred time are reviewed.'],
  ['Trial booked', 'The agreed session is added to the calendar.'],
] as const

const messages = [
  ['Parent', 'Do you offer after-school trials?'],
  ['Team', 'Yes. Which age group are you looking for?'],
  ['Parent', 'Under 9s, please.'],
  ['Team', 'We can help you choose a suitable trial time.'],
] as const

const questions = [
  {
    question: 'Do you only configure GoHighLevel, or also write custom code?',
    answer: 'We can improve the native setup and develop custom integrations, dashboards, portals, and embedded features where the project requires them. We review what can be handled within GoHighLevel before recommending custom development.',
  },
  {
    question: 'Can you improve our existing setup?',
    answer: 'Yes. We start by reviewing your current workflows, pipelines, integrations, and the problems your team is facing. The scope is based on what needs to change and what should be preserved.',
  },
  {
    question: 'Can you connect our own software?',
    answer: 'We review the available APIs, webhooks, permissions, and data requirements before agreeing on an integration. The approach depends on what both systems support.',
  },
  {
    question: 'Do you help with SaaS Mode and A2P registration?',
    answer: 'We can help structure SaaS Mode, sub-accounts, and messaging workflows, including support with A2P registration requirements. Availability depends on your account and region, and approval is determined by the relevant providers.',
  },
  {
    question: 'What does ongoing support include?',
    answer: 'Handover, documentation, maintenance, and future improvements are agreed as part of the project scope. We define the responsibilities and support arrangements before launch.',
  },
] as const

export function GhlWorkflowDemo() {
  const [activeTab, setActiveTab] = useState(1)

  function selectFromKeyboard(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex = index
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % workflowTabs.length
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + workflowTabs.length) % workflowTabs.length
    else if (event.key === 'Home') nextIndex = 0
    else if (event.key === 'End') nextIndex = workflowTabs.length - 1
    else return

    event.preventDefault()
    setActiveTab(nextIndex)
    document.getElementById(`ghl-workflow-tab-${workflowTabs[nextIndex].id}`)?.focus()
  }

  return <section className="ghl-service-workflow" aria-labelledby="ghl-workflow-title"><div className="wrap">
    <header className="ghl-service-workflow-labels"><span>ILLUSTRATIVE WORKFLOW / ENQUIRY TO BOOKING</span></header>
    <div className="ghl-workflow-tabs" role="tablist" aria-label="Example workflow views">
      {workflowTabs.map((tab, index) => <button id={`ghl-workflow-tab-${tab.id}`} type="button" role="tab" aria-selected={index === activeTab} aria-controls={`ghl-workflow-panel-${tab.id}`} tabIndex={index === activeTab ? 0 : -1} onClick={() => setActiveTab(index)} onKeyDown={event => selectFromKeyboard(event, index)} key={tab.id}>{tab.label}</button>)}
    </div>
    <div className="ghl-workflow-workspace reveal">
      <aside className="ghl-workflow-rail" aria-hidden="true">
        <div className="ghl-workflow-brand"><span>R²</span><strong>Rasheed Systems</strong></div>
        <ul>
          <li>Launchpad</li>
          <li className="is-current">Conversations</li>
          <li>Pipeline</li>
          <li>Calendar</li>
          <li>Contacts</li>
          <li>Automations</li>
          <li>Sites</li>
        </ul>
        <span className="ghl-workflow-rail-footer">Illustrative workspace</span>
      </aside>
      <section className={`ghl-workflow-pane ghl-workflow-pipeline${activeTab === 0 ? ' is-active' : ''}`} id="ghl-workflow-panel-pipeline" role="tabpanel" aria-labelledby="ghl-workflow-tab-pipeline">
        <h3>Pipeline</h3><p className="ghl-workflow-pane-label">Trial enquiries</p>
        <ol>{pipelineRows.map(([title, copy], index) => <li key={title}><span>{String(index + 1).padStart(2, '0')}</span><div><strong>{title}</strong><p>{copy}</p></div></li>)}</ol>
      </section>
      <section className={`ghl-workflow-pane ghl-workflow-conversation${activeTab === 1 ? ' is-active' : ''}`} id="ghl-workflow-panel-conversation" role="tabpanel" aria-labelledby="ghl-workflow-tab-conversation">
        <h3>Conversation</h3><p className="ghl-workflow-pane-label">Sample conversation</p>
        <div className="ghl-workflow-messages">{messages.map(([speaker, message], index) => <article data-speaker={speaker.toLowerCase()} key={`${speaker}-${index}`}><span>{speaker}</span><p>{message}</p></article>)}</div>
      </section>
      <section className={`ghl-workflow-pane ghl-workflow-booking${activeTab === 2 ? ' is-active' : ''}`} id="ghl-workflow-panel-booking" role="tabpanel" aria-labelledby="ghl-workflow-tab-booking">
        <div className="ghl-workflow-booking-heading"><h3>Booking</h3><span>Sample week</span></div>
        <div className="ghl-workflow-calendar" role="table" aria-label="Sample weekly booking calendar">
          <div className="ghl-calendar-header" role="row"><span role="columnheader">Time</span>{['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(day => <span role="columnheader" key={day}>{day}</span>)}</div>
          {['3:30', '4:00', '4:30', '5:00'].map(time => <div className="ghl-calendar-row" role="row" key={time}><span role="rowheader">{time}</span>{['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(day => <span role="cell" key={day}>{day === 'Tue' && time === '4:00' ? <strong>Trial session<small>U9 · 4:00–5:00 pm</small></strong> : null}</span>)}</div>)}
        </div>
      </section>
    </div>
    <p className="ghl-service-workflow-caption reveal" id="ghl-workflow-title">The enquiry, the conversation, and the next step. Connected.</p>
  </div></section>
}

export function GhlServiceFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return <section className="ghl-service-faq" aria-labelledby="ghl-faq-title"><div className="wrap ghl-service-faq-grid">
    <header className="ghl-service-faq-intro reveal"><span className="section-label">04 / FAQ</span><h2 id="ghl-faq-title">A few practical answers.</h2></header>
    <div className="ghl-service-faq-list">
      {questions.map((item, index) => {
        const open = openIndex === index
        const number = String(index + 1).padStart(2, '0')
        return <article className="ghl-service-faq-item" data-open={open} key={item.question}>
          <button id={`ghl-faq-question-${number}`} type="button" aria-expanded={open} aria-controls={`ghl-faq-answer-${number}`} onClick={() => setOpenIndex(open ? null : index)}><span>{number}</span><strong>{item.question}</strong><i aria-hidden="true">{open ? '−' : '+'}</i></button>
          <div className="ghl-service-faq-answer" id={`ghl-faq-answer-${number}`} role="region" aria-labelledby={`ghl-faq-question-${number}`} aria-hidden={!open}><div><p>{item.answer}</p></div></div>
        </article>
      })}
    </div>
  </div></section>
}
