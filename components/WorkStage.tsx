'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { projects } from '@/lib/projects'
import ProjectLink from './ProjectLink'

export default function WorkStage() {
  const [active, setActive] = useState(0)
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const nodes = root.current?.querySelectorAll('[data-project]')
    if (!nodes) return
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.project))
    }), { rootMargin: '-42% 0px -42% 0px' })
    nodes.forEach(node => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="work-stage" ref={root}>
      <div className="work-stage-list">
        {projects.map((project, index) => (
          <ProjectLink project={project} className={`work-stage-row${active === index ? ' active' : ''}`} key={project.slug ?? project.href}>
            <article data-project={index}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div><h2>{project.title}</h2><p>{project.tag} · {project.role}</p></div>
              <span aria-hidden="true">↗</span>
            </article>
          </ProjectLink>
        ))}
      </div>
      <aside className="work-stage-visual" aria-live="polite">
        <div className={`work-stage-frame stage-tone-${active % 4}`}>
          <Image key={projects[active].img} className="active" src={projects[active].img} alt={`${projects[active].title} interface preview`} fill sizes="(max-width: 1000px) 45vw, 580px" priority={active === 0} />
        </div>
        <div className="work-stage-meta"><span>{projects[active].tag}</span><strong>{projects[active].title}</strong><span>{projects[active].stack}</span></div>
      </aside>
    </div>
  )
}
