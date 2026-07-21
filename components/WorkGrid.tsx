'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { projects, type Project } from '@/lib/projects'

const webProjects = projects.filter(p => p.category === 'Web')
const ghlProjects = projects.filter(p => p.category === 'GHL')

function CardInner({ project }: { project: Project }) {
  return (
    <>
      <div className="card-top">
        <span className="status"><span className="live" />Live</span>
        <span className="tag">{project.tag}</span>
      </div>
      <div className="card-preview">
        <img src={project.img} alt={`${project.title} preview`} />
      </div>
      <h3>{project.title}</h3>
      <p>{project.desc}</p>
      <div className="meta">
        <span>Role · <b>{project.role}</b></span>
        <span>Stack · <b>{project.stack}</b></span>
      </div>
      <span className="card-visit">
        {project.slug ? 'View case study' : 'Visit live site'}{' '}
        <span className="arrow">↗</span>
      </span>
    </>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return project.slug ? (
    <Link href={`/work/${project.slug}`} className="card" data-tilt="">
      <CardInner project={project} />
    </Link>
  ) : (
    <a href={project.href} target="_blank" rel="noopener" className="card" data-tilt="">
      <CardInner project={project} />
    </a>
  )
}

export default function WorkGrid() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cards = Array.from(
      rootRef.current?.querySelectorAll<HTMLElement>('[data-tilt]') ?? []
    )
    const handlers = cards.map(card => {
      const fn = (e: MouseEvent) => {
        const r = card.getBoundingClientRect()
        card.style.setProperty('--mx', e.clientX - r.left + 'px')
        card.style.setProperty('--my', e.clientY - r.top + 'px')
      }
      card.addEventListener('mousemove', fn)
      return { card, fn }
    })
    return () => handlers.forEach(({ card, fn }) => card.removeEventListener('mousemove', fn))
  })

  return (
    <div ref={rootRef}>
      <div className="work-section-head reveal">
        <span className="work-section-label mono">Web Apps</span>
        <span className="work-section-count">{webProjects.length}</span>
      </div>
      <div className="work-grid reveal">
        {webProjects.map(p => <ProjectCard key={p.href ?? p.slug} project={p} />)}
      </div>

      <div className="work-section-head reveal" style={{ marginTop: '72px' }}>
        <span className="work-section-label mono">GoHighLevel</span>
        <span className="work-section-count">{ghlProjects.length}</span>
      </div>
      <div className="work-grid reveal">
        {ghlProjects.map(p => <ProjectCard key={p.href ?? p.slug} project={p} />)}
      </div>
    </div>
  )
}
