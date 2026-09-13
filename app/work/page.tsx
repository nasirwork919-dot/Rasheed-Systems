import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageEffects from '@/components/PageEffects'
import WorkStage from '@/components/WorkStage'
import { projects } from '@/lib/projects'
import ProjectLink from '@/components/ProjectLink'

export const metadata: Metadata = { title: 'Work', description: 'Selected AI platforms, marketplaces, CRMs, GoHighLevel builds, and automation engineered by Rasheed Systems.' }

export default function WorkPage() {
  return <><PageEffects /><Header /><main id="main-content" tabIndex={-1}>
    <section className="inner-hero work-hero"><div className="wrap"><span className="section-label">Work / 11 projects</span><h1>Systems with<br /><em>real jobs to do.</em></h1><p>Project interfaces, scopes, and technology from the portfolio—without invented performance claims or decorative status labels.</p></div></section>
    <section className="work-stage-section"><div className="wrap"><WorkStage /></div></section>
    <section className="archive-section"><div className="wrap"><div className="section-heading reveal"><span className="section-label">Archive / All projects</span><h2>Eleven builds.<br />Two full case studies.</h2><p>Case studies stay on this site. Other projects open their external project URL in a new tab.</p></div>
      <div className="archive-list">{projects.map((project, index) => <ProjectLink project={project} className="archive-row reveal" key={project.slug ?? project.href}><span>{String(index + 1).padStart(2, '0')}</span><strong>{project.title}</strong><span>{project.tag}</span><span>{project.role}</span><span>{project.slug ? 'Read case study' : 'External site'} ↗</span></ProjectLink>)}</div>
    </div></section>
    <section className="contact-ending"><div className="wrap reveal"><span className="section-label">Build the next one</span><h2>Bring us the complicated part.</h2><Link className="button primary" href="/contact">Start a project <span>↗</span></Link></div></section>
  </main><Footer /></>
}
