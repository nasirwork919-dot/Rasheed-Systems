'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { projects } from '@/lib/projects'

const FILTERS = ['All', 'Web Apps', 'GoHighLevel'] as const
type Filter = typeof FILTERS[number]

const CAT: Record<Filter, string | null> = {
  All: null,
  'Web Apps': 'Web',
  GoHighLevel: 'GHL',
}

export default function WorkGrid() {
  const [active, setActive] = useState<Filter>('All')
  const gridRef = useRef<HTMLDivElement>(null)

  const list = active === 'All'
    ? projects
    : projects.filter(p => p.category === CAT[active])

  // re-attach card glow on every render (filter change shows new cards)
  useEffect(() => {
    const cards = Array.from(
      gridRef.current?.querySelectorAll<HTMLElement>('[data-tilt]') ?? []
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
    <>
      <div className="work-filter reveal">
        {FILTERS.map(f => (
          <button
            key={f}
            className={`work-filter-btn${active === f ? ' active' : ''}`}
            onClick={() => setActive(f)}
          >
            {f}
            {f !== 'All' && (
              <span className="work-filter-count">
                {projects.filter(p => p.category === CAT[f]).length}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="work-grid" ref={gridRef}>
        {list.map(project => {
          const inner = (
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

          return project.slug ? (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className="card"
              data-tilt=""
            >
              {inner}
            </Link>
          ) : (
            <a
              key={project.href}
              href={project.href}
              target="_blank"
              rel="noopener"
              className="card"
              data-tilt=""
            >
              {inner}
            </a>
          )
        })}
      </div>
    </>
  )
}
