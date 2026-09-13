'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { services } from '@/lib/services'
import { projects } from '@/lib/projects'
import ProjectLink from './ProjectLink'
import ServiceDiagram from './ServiceDiagram'

const diagramKinds = ['agents', 'saas', 'ghl', 'marketplace'] as const
const project = (title: string) => projects.find(item => item.title === title)!
const homeServices = [
  {
    number: '01', title: 'AI & automation', text: 'Connect your tools, handle repetitive tasks, and keep work moving.',
    capabilities: ['AI agents', 'Integrations', 'Workflows'], project: project('Chatsites'),
    label: 'In practice / Chatsites', projectTitle: 'A conversational path from visit to lead.',
    projectText: 'An AI-powered conversational website that guides visitors into useful next steps.', width: 1000, height: 470,
  },
  {
    number: '02', title: 'GoHighLevel', text: 'Turn enquiries into conversations, bookings and organised follow-up.',
    capabilities: ['Pipelines', 'Calendars', 'Workflows'], project: project('Strive Soccer Academy'),
    label: 'In practice / Strive Soccer Academy', projectTitle: 'A connected trial-booking system.',
    projectText: 'Enquiries, scheduling and follow-up in one workspace.', width: 1568, height: 753,
    image: '/work/strive-soccer-academy/strive-booking-homepage.public.webp',
  },
  {
    number: '03', title: 'Web apps & SaaS', text: 'Build useful products with clear interfaces and dependable foundations.',
    capabilities: ['Product design', 'Development', 'Integrations'], project: project('N3rve'),
    label: 'In practice / N3rve', projectTitle: 'One workspace for the tools teams already use.',
    projectText: 'AI, billing, customers and content brought together in one connected product.', width: 1000, height: 451,
  },
  {
    number: '04', title: 'CRMs & marketplaces', text: 'Bring customers, teams and daily operations into one connected system.',
    capabilities: ['Custom CRM', 'Marketplaces', 'Reporting'], project: project('Euro World CRM'),
    label: 'In practice / Euro World CRM', projectTitle: 'Daily operations in one command centre.',
    projectText: 'Leads, walk-ins, invoicing, payments and reporting in one workspace.', width: 1000, height: 476,
  },
] as const

export default function ServiceRail({ compact = false }: { compact?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeService, setActiveService] = useState(1)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!compact || !section || !track || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    const update = () => {
      frame = 0
      if (matchMedia('(max-width: 800px)').matches) { track.style.transform = ''; return }
      const rect = section.getBoundingClientRect()
      const distance = section.offsetHeight - innerHeight
      const progress = Math.max(0, Math.min(1, -rect.top / Math.max(1, distance)))
      const travel = Math.max(0, track.scrollWidth - section.clientWidth + 48)
      track.style.transform = `translate3d(${-progress * travel}px,0,0)`
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    addEventListener('scroll', onScroll, { passive: true })
    addEventListener('resize', onScroll)
    update()
    return () => { removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll); cancelAnimationFrame(frame) }
  }, [compact])

  if (!compact) {
    const selected = homeServices[activeService]
    const previewImage = 'image' in selected ? selected.image : selected.project.img

    return (
      <section className="home-services" aria-labelledby="home-services-title">
        <div className="wrap">
          <div className="home-services-intro">
            <span className="section-label">01 / What we build</span>
            <h2 id="home-services-title">Built around your business.</h2>
            <p>From your first workflow to your next product. We design and build software that makes everyday work easier.</p>
          </div>

          <div className="home-service-explorer">
            {homeServices.map((service, index) => {
              const active = index === activeService
              const row = index <= activeService ? index + 1 : index + 2
              return (
                <article className={`home-service-row${active ? ' is-active' : ''}`} style={{ gridRow: row }} key={service.number}>
                  <button className="home-service-button" type="button" aria-expanded={active} aria-controls={`home-service-${service.number}`} onClick={() => setActiveService(index)}>
                    <span className="home-service-number">{service.number}</span>
                    <strong>{service.title}</strong>
                    <span className="home-service-icon" aria-hidden="true">{active ? '−' : '+'}</span>
                  </button>
                  {active && <div className="home-service-detail" id={`home-service-${service.number}`}>
                    <p>{service.text}</p>
                    <ul className="home-service-capabilities">{service.capabilities.map(item => <li key={item}>{item}</li>)}</ul>
                    <Link className="home-service-link" href="/services">Explore service <span aria-hidden="true">↗</span></Link>
                  </div>}
                </article>
              )
            })}

            <figure className="home-service-preview" style={{ gridRow: activeService + 2 }} key={selected.number}>
              <span className="home-service-project-label">{selected.label}</span>
              <Image src={previewImage} alt={`${selected.project.title} interface`} width={selected.width} height={selected.height} priority={activeService === 1} sizes="(max-width: 800px) calc(100vw - 40px), 58vw" />
              <figcaption>
                <h3>{selected.projectTitle}</h3>
                <p>{selected.projectText}</p>
                <ProjectLink project={selected.project}>View project <span aria-hidden="true">↗</span></ProjectLink>
              </figcaption>
            </figure>
          </div>

          <div className="home-services-footer">
            <span>Have a process that needs improving?</span>
            <Link href="/contact">Let&apos;s talk <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={`service-rail${compact ? ' compact' : ''}`} ref={sectionRef} aria-label="Services">
      <div className="service-rail-pin">
        <div className="service-track" ref={trackRef}>
          {services.map((service, index) => (
            <article className="service-chapter" key={service.number}>
              <span className="chapter-number">S—{service.number}</span>
              <div><h3>{service.title}</h3><p>{service.text}</p></div>
              <ul>{service.list.map(item => <li key={item}>{item}</li>)}</ul>
              <ServiceDiagram kind={diagramKinds[index]} />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
