'use client'

import Image from 'next/image'
import { useState, type KeyboardEvent } from 'react'

const stages = [
  {
    id: 'discover', number: '01', label: 'Discover',
    heading: 'Start with the right questions.',
    description: 'We learn how your business works, where time is lost, and what success should look like.',
    deliverables: 'Project brief / Goals / Scope',
    image: '/images/home-process/01-discover.png', width: 1536, height: 1024,
    alt: 'Form builder showing the information gathered for a trial-booking workflow',
  },
  {
    id: 'map', number: '02', label: 'Map',
    heading: 'Make the next step clear.',
    description: 'We turn the brief into a practical plan: what to build, how it connects, and what comes first.',
    deliverables: 'System map / Priorities / Delivery plan',
    image: '/images/home-process/02-map.png', width: 1536, height: 1024,
    alt: 'Workflow map connecting booking, notification, email, and follow-up steps',
  },
  {
    id: 'build', number: '03', label: 'Build',
    heading: 'Build it. Test it. Refine it.',
    description: 'We develop the system in clear milestones, share progress, and test the details with you.',
    deliverables: 'Working software / Reviews / Testing',
    image: '/images/home-process/03-build.png', width: 1536, height: 1024,
    alt: 'Automation builder showing connected qualification and booking steps',
  },
  {
    id: 'support', number: '04', label: 'Support',
    heading: 'Launch with a clear handover.',
    description: 'We prepare your team, document the system, and agree the support you need after launch.',
    deliverables: 'Handover / Documentation / Agreed support',
    image: '/images/home-process/04-support.png', width: 1536, height: 1024,
    alt: 'Published workflow list used to review and maintain automations after launch',
  },
] as const

export default function HomeProcess() {
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
    document.getElementById(`process-tab-${stages[nextIndex].id}`)?.focus()
  }

  return (
    <section className="home-process" aria-labelledby="home-process-title">
      <div className="wrap">
        <div className="home-process-intro reveal">
          <span className="section-label">03 / HOW WE WORK</span>
          <h2 id="home-process-title">From first conversation to working software.</h2>
          <p>Work directly with the people who plan, build, and support your system.</p>
        </div>

        <div className="home-process-tabs" role="tablist" aria-label="How we work stages">
          {stages.map((stage, index) => (
            <button
              id={`process-tab-${stage.id}`}
              className="home-process-tab"
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-controls={`process-panel-${stage.id}`}
              tabIndex={index === activeIndex ? 0 : -1}
              onClick={() => setActiveIndex(index)}
              onKeyDown={event => selectFromKeyboard(event, index)}
              key={stage.id}
            >
              <span>{stage.number}</span>{stage.label}
            </button>
          ))}
        </div>

        <div
          id={`process-panel-${activeStage.id}`}
          className="home-process-panel"
          role="tabpanel"
          aria-labelledby={`process-tab-${activeStage.id}`}
          tabIndex={0}
          key={activeStage.id}
        >
          <div className="home-process-copy">
            <span className="section-label">{activeStage.number} / {activeStage.label}</span>
            <h3>{activeStage.heading}</h3>
            <p>{activeStage.description}</p>
          </div>

          <div className="home-process-deliverables">
            <span>Deliverables</span>
            <strong>{activeStage.deliverables}</strong>
          </div>

          <figure className="home-process-image">
            <Image
              src={activeStage.image}
              alt={activeStage.alt}
              width={activeStage.width}
              height={activeStage.height}
              sizes="(max-width: 800px) calc(100vw - 40px), 58vw"
            />
            <span aria-hidden="true" />
          </figure>
        </div>
      </div>
    </section>
  )
}
