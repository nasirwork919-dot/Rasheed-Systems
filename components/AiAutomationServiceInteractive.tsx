'use client'

import { useState, type KeyboardEvent } from 'react'

const workflowTabs = [
  { id: 'lead', label: 'Lead' },
  { id: 'conversation', label: 'Conversation' },
  { id: 'booked', label: 'Booked' },
] as const

const bookingSlots = [
  { id: 'tue-4', label: 'Tue · 4:00 pm', day: 'Tue', dayName: 'Tuesday', time: '4:00', range: '4:00–5:00 pm', rows: ['3:30', '4:00', '4:30', '5:00'] },
  { id: 'thu-4', label: 'Thu · 4:00 pm', day: 'Thu', dayName: 'Thursday', time: '4:00', range: '4:00–5:00 pm', rows: ['3:30', '4:00', '4:30', '5:00'] },
  { id: 'sat-10', label: 'Sat · 10:00 am', day: 'Sat', dayName: 'Saturday', time: '10:00', range: '10:00–11:00 am', rows: ['9:30', '10:00', '10:30', '11:00'] },
] as const

const questions = [
  {
    question: 'Will the AI sound robotic?',
    answer: 'We configure its tone, questions, and responses around your business. Conversations that need a person can be routed to your team as part of the agreed workflow.',
  },
  {
    question: 'Which channels can it work on?',
    answer: 'SMS, WhatsApp, and web chat are common options. Availability depends on your messaging provider, account permissions, and the integration requirements.',
  },
  {
    question: 'Does it work with our CRM?',
    answer: 'We review your CRM’s API, webhooks, permissions, and data requirements before agreeing on an integration. We also build workflows connected to GoHighLevel.',
  },
  {
    question: 'What happens when the AI doesn’t know an answer?',
    answer: 'We design fallback and handoff rules so uncertain or out-of-scope questions can be routed to your team rather than answered without an approved basis.',
  },
  {
    question: 'What does ongoing support include?',
    answer: 'Handover, documentation, maintenance, and future improvements are agreed in the project scope before launch.',
  },
] as const

export function AiBookingWorkflow() {
  const [activeTab, setActiveTab] = useState(1)
  const [selectedSlot, setSelectedSlot] = useState<(typeof bookingSlots)[number]['id']>('tue-4')
  const slot = bookingSlots.find(item => item.id === selectedSlot) ?? bookingSlots[0]
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  function selectFromKeyboard(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex = index
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % workflowTabs.length
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + workflowTabs.length) % workflowTabs.length
    else if (event.key === 'Home') nextIndex = 0
    else if (event.key === 'End') nextIndex = workflowTabs.length - 1
    else return

    event.preventDefault()
    setActiveTab(nextIndex)
    document.getElementById(`ai-service-tab-${workflowTabs[nextIndex].id}`)?.focus()
  }

  function showBooking() {
    setActiveTab(2)
    requestAnimationFrame(() => document.getElementById('ai-service-tab-booked')?.focus())
  }

  return <section className="ai-service-workflow" aria-labelledby="ai-workflow-title"><div className="wrap">
    <header className="ai-service-workflow-heading reveal">
      <p className="ai-service-workflow-label">ILLUSTRATIVE WORKFLOW</p>
      <h2 id="ai-workflow-title">From first enquiry to confirmed booking.</h2>
    </header>
    <div className="ai-service-workflow-tabs" role="tablist" aria-label="Illustrative automation workflow">
      {workflowTabs.map((tab, index) => <button id={`ai-service-tab-${tab.id}`} type="button" role="tab" aria-selected={index === activeTab} aria-controls={`ai-service-panel-${tab.id}`} tabIndex={index === activeTab ? 0 : -1} onClick={() => setActiveTab(index)} onKeyDown={event => selectFromKeyboard(event, index)} key={tab.id}>{tab.label}</button>)}
    </div>
    <div className="ai-service-workspace reveal">
      <section className={`ai-service-pane ai-service-lead${activeTab === 0 ? ' is-active' : ''}`} id="ai-service-panel-lead" role="tabpanel" aria-labelledby="ai-service-tab-lead">
        <header><span>1</span><div><h3>New lead</h3><p>An enquiry arrives from a connected channel.</p></div></header>
        <dl>
          <div><dt>Enquiry</dt><dd>I’m interested in a trial session.</dd></div>
          <div><dt>Source</dt><dd>Web chat</dd></div>
          <div><dt>Status</dt><dd><i aria-hidden="true" />Awaiting reply</dd></div>
        </dl>
      </section>
      <section className={`ai-service-pane ai-service-conversation${activeTab === 1 ? ' is-active' : ''}`} id="ai-service-panel-conversation" role="tabpanel" aria-labelledby="ai-service-tab-conversation">
        <header><span>2</span><div><h3>AI conversation</h3><p>Ask the questions. Find a suitable time.</p></div></header>
        <div className="ai-service-messages">
          <p data-speaker="ai"><span>AI</span>Which age group is the trial for?</p>
          <p data-speaker="visitor"><span>Visitor</span>Under 9s.</p>
          <p data-speaker="ai"><span>AI</span>Here are the available trial times.</p>
        </div>
        <fieldset className="ai-service-slot-list">
          <legend>Choose a sample trial time</legend>
          {bookingSlots.map(item => <label data-selected={item.id === selectedSlot} key={item.id}><input type="radio" name="ai-service-slot" value={item.id} checked={item.id === selectedSlot} onChange={() => setSelectedSlot(item.id)} /><span>{item.label}</span><i aria-hidden="true">{item.id === selectedSlot ? '✓' : '›'}</i></label>)}
        </fieldset>
        <p className="ai-service-mobile-selection" aria-live="polite">Example selected: {slot.dayName}, {slot.time} {slot.id === 'sat-10' ? 'am' : 'pm'}</p>
        <button className="ai-service-view-booking" type="button" onClick={showBooking}>View booking <span aria-hidden="true">→</span></button>
      </section>
      <section className={`ai-service-pane ai-service-booked${activeTab === 2 ? ' is-active' : ''}`} id="ai-service-panel-booked" role="tabpanel" aria-labelledby="ai-service-tab-booked">
        <header><span>3</span><div><h3>Booked &amp; synced</h3><p>The booking and CRM record stay together.</p></div></header>
        <div className="ai-service-calendar-heading"><span>Sample week</span></div>
        <div className="ai-service-calendar" role="table" aria-label={`Sample week with a trial session on ${slot.dayName} from ${slot.range}`}>
          <div className="ai-service-calendar-row ai-service-calendar-days" role="row"><span role="columnheader">Time</span>{days.map(day => <span role="columnheader" key={day}>{day}</span>)}</div>
          {slot.rows.map(time => <div className="ai-service-calendar-row" role="row" key={time}><span role="rowheader">{time}</span>{days.map(day => <span role="cell" key={day}>{day === slot.day && time === slot.time ? <strong>Trial</strong> : null}</span>)}</div>)}
        </div>
        <p className="ai-service-booking-time" aria-live="polite">{slot.dayName} · {slot.range}</p>
        <ul className="ai-service-crm-summary">
          <li><span aria-hidden="true">✓</span>Stage: Trial booked</li>
          <li><span aria-hidden="true">✓</span>Calendar: U9 trials</li>
          <li><span aria-hidden="true">✓</span>Conversation saved</li>
        </ul>
      </section>
    </div>
    <p className="ai-service-workflow-caption reveal" id="ai-workflow-caption">The reply, the booking, and the CRM update. Connected.</p>
  </div></section>
}

export function AiAutomationServiceFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return <section className="ai-service-faq" aria-labelledby="ai-service-faq-title"><div className="wrap ai-service-faq-grid">
    <header className="ai-service-faq-intro reveal"><span className="section-label">04 / FAQ</span><h2 id="ai-service-faq-title">A few practical answers.</h2></header>
    <div className="ai-service-faq-list">
      {questions.map((item, index) => {
        const open = openIndex === index
        const number = String(index + 1).padStart(2, '0')
        return <article className="ai-service-faq-item" data-open={open} key={item.question}>
          <button id={`ai-service-faq-question-${number}`} type="button" aria-expanded={open} aria-controls={`ai-service-faq-answer-${number}`} onClick={() => setOpenIndex(open ? null : index)}><span>{number}</span><strong>{item.question}</strong><i aria-hidden="true">{open ? '−' : '+'}</i></button>
          <div className="ai-service-faq-answer" id={`ai-service-faq-answer-${number}`} role="region" aria-labelledby={`ai-service-faq-question-${number}`} aria-hidden={!open}><div><p>{item.answer}</p></div></div>
        </article>
      })}
    </div>
  </div></section>
}
