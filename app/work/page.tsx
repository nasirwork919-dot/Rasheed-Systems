import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageEffects from '@/components/PageEffects'
import WorkStage from '@/components/WorkStage'
import { projects } from '@/lib/projects'
import ProjectLink from '@/components/ProjectLink'

export const metadata: Metadata = { title: 'Work', description: 'Selected AI platforms, marketplaces, CRMs, GoHighLevel builds, and automation engineered by Rasheed Systems.' }

const featuredProjects = [
  { title: 'N3rve', category: 'AI PLATFORM', description: 'A connected workspace for everyday tools.' },
  { title: 'JustCarSale', category: 'MARKETPLACE', description: 'Tools for vehicle buyers and sellers.' },
  { title: 'ScholarSurge', category: 'GOHIGHLEVEL', description: 'Connected conversations and workflows.' },
].map(featured => {
  const project = projects.find(project => project.title === featured.title)
  if (!project) throw new Error(`Missing featured project: ${featured.title}`)
  return { ...featured, project }
})

export default function WorkPage() {
  return <><PageEffects /><Header /><main id="main-content" tabIndex={-1}>
    <section className="work-hero" aria-labelledby="work-hero-title"><div className="wrap">
      <div className="work-hero-main reveal">
        <div><span className="section-label">WORK / RASHEED SYSTEMS</span><h1 id="work-hero-title">Ideas put<br />to work.</h1></div>
        <div className="work-hero-copy"><p>A selection of the products, platforms, and connected systems we’ve helped bring to life.</p><a className="work-hero-explore" href="#projects">Explore projects <span aria-hidden="true">↓</span></a></div>
      </div>
      <div className="work-hero-featured">
        <span className="section-label">A FEW PLACES TO START</span>
        <div className="work-featured-grid">{featuredProjects.map(({ project, category, description }) => <ProjectLink project={project} className="work-featured-project reveal" aria-label={`View ${project.title} project${project.slug ? '' : ' (opens in a new tab)'}`} key={project.slug ?? project.href}><span>{category}</span><strong>{project.title}<i aria-hidden="true">↗</i></strong><p>{description}</p></ProjectLink>)}</div>
        <p className="work-hero-caption">Explore the full project collection below.</p>
      </div>
    </div></section>
    <section className="work-stage-section" id="projects"><div className="wrap"><WorkStage /></div></section>
    <section className="archive-section"><div className="wrap"><div className="section-heading reveal"><span className="section-label">Archive / All projects</span><h2>Eleven builds.<br />Two full case studies.</h2><p>Case studies stay on this site. Other projects open their external project URL in a new tab.</p></div>
      <div className="archive-list">{projects.map((project, index) => <ProjectLink project={project} className="archive-row reveal" key={project.slug ?? project.href}><span>{String(index + 1).padStart(2, '0')}</span><strong>{project.title}</strong><span>{project.tag}</span><span>{project.role}</span><span>{project.slug ? 'Read case study' : 'External site'} ↗</span></ProjectLink>)}</div>
    </div></section>
    <section className="work-closing" aria-labelledby="work-closing-title"><div className="wrap reveal">
      <span className="section-label">02 / YOUR NEXT PROJECT</span>
      <div className="work-closing-main">
        <h2 id="work-closing-title">What are you<br />working on?</h2>
        <div className="work-closing-copy">
          <p>Tell us about the product, workflow, or system you want to build or improve.</p>
          <Link className="button primary" href="/contact">Discuss your project <span aria-hidden="true">↗</span></Link>
          <span>A short outline is enough to start.</span>
        </div>
      </div>
      <div className="work-closing-bottom"><strong>Rasheed Systems</strong><span>Independent engineering studio</span></div>
    </div></section>
  </main><Footer /></>
}
