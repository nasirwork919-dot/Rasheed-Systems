'use client'

import Image from 'next/image'
import { useState } from 'react'
import { projects } from '@/lib/projects'
import ProjectLink from './ProjectLink'

type ProjectCategory = 'ai' | 'web' | 'ghl' | 'crm'
type ProjectFilter = 'all' | ProjectCategory

const filters: { id: ProjectFilter; label: string }[] = [
  { id: 'all', label: 'All projects' },
  { id: 'ai', label: 'AI & automation' },
  { id: 'web', label: 'Web apps' },
  { id: 'ghl', label: 'GoHighLevel' },
  { id: 'crm', label: 'CRMs & marketplaces' },
]

const projectCategories: Record<string, ProjectCategory[]> = {
  N3rve: ['ai', 'web'],
  JustCarSale: ['web', 'crm'],
  'Insurance Wallets': ['ai', 'web', 'crm'],
  MIA: ['ai', 'web'],
  'Zain Dubai': ['web', 'crm'],
  'Euro World CRM': ['web', 'crm'],
  Chatsites: ['ai', 'web'],
  'Jwalin Jewels': ['web'],
  'UK Therapies': ['web'],
  ScholarSurge: ['ai', 'ghl', 'crm'],
  'Strive Soccer Academy': ['ai', 'ghl'],
}

export default function WorkStage() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectFilter>('all')
  const visibleProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(project => projectCategories[project.title]?.includes(selectedCategory))

  return (
    <div className="work-collection">
      <header className="work-collection-heading">
        <span className="section-label">01 / PROJECT COLLECTION</span>
        <h2>Explore the work.</h2>
        <p>Products, platforms, and the systems behind them.</p>
      </header>

      <div className="work-filters" aria-label="Filter projects">
        {filters.map(filter => (
          <button type="button" aria-pressed={selectedCategory === filter.id} onClick={() => setSelectedCategory(filter.id)} key={filter.id}>
            {filter.label}
          </button>
        ))}
      </div>

      <p className="work-filter-status" aria-live="polite" aria-atomic="true">
        {visibleProjects.length} {visibleProjects.length === 1 ? 'project' : 'projects'} shown.
      </p>

      {visibleProjects.length > 0 ? (
        <div className="work-collection-grid" key={selectedCategory}>
          {visibleProjects.map((project, index) => (
            <article className="work-project" id={`project-${project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} key={project.slug ?? project.href}>
              <ProjectLink project={project} aria-label={`View ${project.title} project${project.slug ? '' : ' (opens in a new tab)'}`}>
                <div className="work-project-image">
                  <Image src={project.img} alt={`${project.title} interface preview`} fill priority={selectedCategory === 'all' && index === 0} sizes="(max-width: 800px) calc(100vw - 32px), (max-width: 1440px) calc((100vw - 80px) / 2), 624px" />
                </div>
                <div className="work-project-copy">
                  <span>{project.tag}</span>
                  <h3>{project.title}<i aria-hidden="true">↗</i></h3>
                  {project.desc && <p>{project.desc}</p>}
                </div>
              </ProjectLink>
            </article>
          ))}
        </div>
      ) : <p className="work-collection-empty">No projects in this category yet.</p>}
    </div>
  )
}
