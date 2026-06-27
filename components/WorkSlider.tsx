'use client'
import { useRef } from 'react'

const projects = [
  {
    href: 'https://n3rve.ai/',
    tag: 'AI Platform',
    img: '/work/n3rve.jpg',
    title: 'N3rve',
    desc: 'An AI operating system for teams — unifying AI, billing, customers, and content under one roof so teams stop switching tabs and ship more.',
    role: 'Architecture & build',
    stack: 'AI · Docker · Node · Postgres',
  },
  {
    href: 'https://justcarsale.com/',
    tag: 'Marketplace',
    img: '/work/justcarsale.jpg',
    title: 'JustCarSale',
    desc: 'A global automotive marketplace connecting buyers, sellers, dealers, and workshops across 18+ modules — from listings and inspections to a full back office.',
    role: 'Backend lead',
    stack: 'React · TypeScript · Postgres',
  },
  {
    href: 'https://insurancewallets.com/',
    tag: 'Marketplace',
    img: '/work/insurancewallets.jpg',
    title: 'Insurance Wallets',
    desc: 'An AI-powered insurance platform and broker/lawyer marketplace — policies, claims, a community forum, and gated access in one secure place.',
    role: 'Full build',
    stack: 'React · Node',
  },
  {
    href: 'https://mia.profitlifter.com/',
    tag: 'AI Assistant',
    img: '/work/mia.jpg',
    title: 'MIA',
    desc: 'An AI marketing strategist that builds a personalized growth plan around your answers — no templates, no fluff — with a reseller-ready architecture.',
    role: 'Platform build',
    stack: 'AI · Web · Postgres',
  },
  {
    href: 'https://www.zaindubai.com/',
    tag: 'Real Estate',
    img: '/work/zaindubai.jpg',
    title: 'Zain Dubai',
    desc: 'A Dubai real estate platform for buying and renting property — advanced search, community guides, and free instant valuation tools.',
    role: 'Full build',
    stack: 'React · Web',
  },
  {
    href: 'https://www.eu-worldcrm.com/',
    tag: 'CRM',
    img: '/work/euroworldcrm.jpg',
    title: 'Euro World CRM',
    desc: 'A travel-agency command center — leads, walk-ins, GST invoicing, payments, and multi-role access, with live performance dashboards.',
    role: 'Full build',
    stack: 'React · Node · Postgres',
  },
  {
    href: 'https://chatsites.app/',
    tag: 'Funnel Builder',
    img: '/work/chatsites.jpg',
    title: 'Chatsites',
    desc: 'An AI-powered conversational website builder that turns visitors into leads — flow blocks, a command center, and a full publish flow.',
    role: 'Engineering',
    stack: 'React · Node',
  },
  {
    href: 'https://www.jwalinjewels.com/',
    tag: 'E-commerce',
    img: '/work/jwalinjewels.jpg',
    title: 'Jwalin Jewels',
    desc: 'A luxury jewelry store — engagement rings, custom design, and loose diamonds, with virtual appointments and a refined buying experience.',
    role: 'Full build',
    stack: 'E-commerce · Web',
  },
  {
    href: 'https://www.uktherapies.co.uk/',
    tag: 'Wellness',
    img: '/work/uktherapies.jpg',
    title: 'UK Therapies',
    desc: 'A wellness and therapy studio site — treatments, pricing, and online booking wrapped in a calm, premium experience.',
    role: 'Full build',
    stack: 'Web · Booking',
  },
]

export default function WorkSlider() {
  const trackRef = useRef<HTMLDivElement>(null)
  const drag = useRef({ active: false, startX: 0, scrollLeft: 0 })

  const scroll = (dir: number) => {
    trackRef.current?.scrollBy({ left: dir * 400, behavior: 'smooth' })
  }

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const track = trackRef.current!
    drag.current = { active: true, startX: e.pageX - track.offsetLeft, scrollLeft: track.scrollLeft }
    track.style.cursor = 'grabbing'
    track.style.userSelect = 'none'
  }

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!drag.current.active) return
    const track = trackRef.current!
    const x = e.pageX - track.offsetLeft
    track.scrollLeft = drag.current.scrollLeft - (x - drag.current.startX) * 1.4
  }

  const stopDrag = () => {
    if (!trackRef.current) return
    drag.current.active = false
    trackRef.current.style.cursor = 'grab'
    trackRef.current.style.userSelect = ''
  }

  return (
    <div className="slider-wrap reveal">
      <div
        className="slider-track"
        ref={trackRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
      >
        {projects.map(p => (
          <a
            key={p.href}
            className="card slider-card"
            data-tilt=""
            href={p.href}
            target="_blank"
            rel="noopener"
            draggable={false}
          >
            <div className="card-top">
              <span className="status"><span className="live" />Live</span>
              <span className="tag">{p.tag}</span>
            </div>
            <div className="card-preview">
              <img src={p.img} alt={`${p.title} preview`} draggable={false} />
            </div>
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
            <div className="meta">
              <span>Role · <b>{p.role}</b></span>
              <span>Stack · <b>{p.stack}</b></span>
            </div>
            <span className="card-visit">Visit live site <span className="arrow">↗</span></span>
          </a>
        ))}
      </div>
      <div className="slider-nav">
        <button className="slider-btn" onClick={() => scroll(-1)} aria-label="Previous">←</button>
        <button className="slider-btn" onClick={() => scroll(1)} aria-label="Next">→</button>
      </div>
    </div>
  )
}
