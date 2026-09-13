'use client'

import Link from 'next/link'
import { useState } from 'react'

const questions = [
  {
    question: 'Can you improve a system we already use?',
    answer: 'Yes. We start by reviewing what is working, where the friction is, and what needs to change. The scope may involve improving your current setup, connecting tools, or building something new.',
  },
  {
    question: 'What do you need from us to get started?',
    answer: 'A short overview of your business, the problem you want to solve, and the tools you currently use is enough to begin the conversation. Relevant examples, priorities, and any deadlines help us define the next step.',
  },
  {
    question: 'How long will the project take?',
    answer: 'Timing depends on the scope, integrations, and complexity. We agree on milestones and an estimated delivery schedule after reviewing your requirements, and discuss any changes as the work progresses.',
  },
  {
    question: 'Can you work with GoHighLevel?',
    answer: 'Yes. We work on GoHighLevel workflows, pipelines, integrations, custom dashboards, and embedded applications. We review your existing setup and recommend an approach based on what you need it to do.',
  },
  {
    question: 'What happens after launch?',
    answer: 'We provide the agreed handover and documentation so your team understands the system. Any ongoing maintenance, improvements, or support are defined in the project scope.',
  },
] as const

export default function HomeFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="home-faq" aria-labelledby="home-faq-title">
      <div className="wrap home-faq-layout">
        <div className="home-faq-intro reveal">
          <span className="section-label">04 / A FEW ANSWERS</span>
          <h2 id="home-faq-title">Before we start.</h2>
          <p>A few practical details about working together.</p>
        </div>

        <div className="home-faq-list">
          {questions.map((item, index) => {
            const isOpen = openIndex === index
            const number = String(index + 1).padStart(2, '0')
            const buttonId = `faq-question-${number}`
            const answerId = `faq-answer-${number}`

            return (
              <div className="home-faq-item" data-open={isOpen} key={item.question}>
                <button
                  id={buttonId}
                  className="home-faq-question"
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span>{number}</span>
                  <strong>{item.question}</strong>
                  <i aria-hidden="true">{isOpen ? '−' : '+'}</i>
                </button>
                <div
                  id={answerId}
                  className="home-faq-answer"
                  role="region"
                  aria-labelledby={buttonId}
                  aria-hidden={!isOpen}
                >
                  <div><p>{item.answer}</p></div>
                </div>
              </div>
            )
          })}
        </div>

        <Link className="home-faq-contact" href="/contact">
          Have another question? Get in touch <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  )
}
