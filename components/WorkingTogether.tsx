'use client'

import { useState } from 'react'

const principles = [
  {
    title: 'Direct communication',
    description: 'Discuss the work with the people planning and building it. Questions, feedback, and decisions stay close to the project.',
    support: 'Conversations connected to the work.',
  },
  {
    title: 'Clear decisions',
    description: 'Agree on the scope, priorities, and next steps before moving forward. When requirements change, discuss the options and their effect on the plan.',
    support: 'A clear reason behind the next step.',
  },
  {
    title: 'Careful delivery',
    description: 'Build in reviewable stages, test the important paths, and prepare a clear handover. Documentation and any ongoing support are agreed as part of the project.',
    support: 'Attention through build, review, and handover.',
  },
] as const

export default function WorkingTogether() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="about-working" aria-labelledby="about-working-title">
      <div className="wrap about-working-layout">
        <div className="about-working-intro reveal">
          <span className="section-label">01 / WORKING TOGETHER</span>
          <h2 id="about-working-title">A direct way<br />to work together.</h2>
          <p>Good collaboration means knowing who you’re working with, what comes next, and why decisions are made.</p>
          <span className="about-working-note">Three principles behind the work.</span>
        </div>

        <div className="about-working-list">
          {principles.map((principle, index) => {
            const isOpen = openIndex === index
            const number = String(index + 1).padStart(2, '0')
            const buttonId = `working-principle-${number}`
            const panelId = `working-principle-panel-${number}`

            return (
              <article className="about-working-item" data-open={isOpen} key={principle.title}>
                <h3>
                  <button id={buttonId} type="button" aria-expanded={isOpen} aria-controls={panelId} onClick={() => setOpenIndex(isOpen ? null : index)}>
                    <span>{number}</span>
                    <strong>{principle.title}</strong>
                    <i aria-hidden="true">{isOpen ? '−' : '+'}</i>
                  </button>
                </h3>
                <div id={panelId} className="about-working-panel" role="region" aria-labelledby={buttonId} aria-hidden={!isOpen}>
                  <div><p>{principle.description}</p><span>{principle.support}</span></div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
