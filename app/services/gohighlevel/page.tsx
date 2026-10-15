import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'
import { GhlServiceFaq, GhlWorkflowDemo } from '@/components/GoHighLevelServiceInteractive'
import Header from '@/components/Header'
import PageEffects from '@/components/PageEffects'
import ProjectLink from '@/components/ProjectLink'
import { projects } from '@/lib/projects'

const title = 'GoHighLevel Developer Services'
const description = 'Hire a GoHighLevel developer for API integrations, custom dashboards, client portals, SaaS Mode setup, and AI booking systems. Real code, not just setup.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/services/gohighlevel' },
  openGraph: {
    type: 'website',
    siteName: 'Rasheed Systems',
    title: `${title} | Rasheed Systems`,
    description,
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', title: `${title} | Rasheed Systems`, description, images: ['/og-image.png'] },
}

const services = [
  ['APIs & integrations', 'Connect GHL with the rest of your operation.'],
  ['Dashboards & reporting', 'Put the information your team needs in view.'],
  ['Client portals', 'Give clients a workspace built around them.'],
  ['Conversation AI & booking', 'Connect enquiries with the next available step.'],
  ['SaaS Mode & sub-accounts', 'Structure your agency’s accounts and access.'],
  ['Workflows & messaging', 'Build follow-up flows and support A2P registration.'],
] as const

const selectedProjects = [
  {
    project: projects.find(project => project.title === 'ScholarSurge')!,
    image: '/images/home-hero/10-scholarsurge-dashboard.png',
    width: 1024,
    height: 1536,
    services: 'CRM · Conversation AI · Workflows',
  },
  {
    project: projects.find(project => project.title === 'Strive Soccer Academy')!,
    image: '/images/home-hero/13-strive-trial-bookings.png',
    width: 1024,
    height: 1536,
    services: 'Enquiries · Trial booking · Follow-up',
  },
] as const

export default function GoHighLevelServicePage() {
  return <><PageEffects /><Header /><main id="main-content" tabIndex={-1} className="ghl-service-page">
    <section className="ghl-service-hero" aria-labelledby="ghl-service-title"><div className="wrap">
      <nav className="ghl-service-breadcrumb" aria-label="Breadcrumb"><Link href="/services">Services</Link><span aria-hidden="true">/</span><span>GoHighLevel</span></nav>
      <div className="ghl-service-hero-grid">
        <h1 className="ghl-service-hero-title reveal" id="ghl-service-title"><span>Your business.</span><span>Your workflow.</span><span>Your GoHighLevel.</span></h1>
        <div className="ghl-service-hero-copy reveal">
          <h2>Custom GoHighLevel development for the parts your setup doesn&apos;t cover.</h2>
          <p>Integrations, dashboards, client portals, and booking flows built around your operation.</p>
          <div className="ghl-service-hero-actions"><Link className="button primary" href="/contact">Discuss your GHL setup <span aria-hidden="true">↗</span></Link><a className="line-link" href="#ghl-selected-work">Explore the work <span aria-hidden="true">↓</span></a></div>
        </div>
      </div>
    </div></section>

    <GhlWorkflowDemo />

    <section className="ghl-service-build" aria-labelledby="ghl-build-title"><div className="wrap ghl-service-build-grid">
      <header className="ghl-service-build-intro reveal">
        <span className="section-label">01 / WHAT WE BUILD</span>
        <h2 id="ghl-build-title">Built beyond the default.</h2>
        <p>Extend the parts that matter. Keep the tools your team already knows.</p>
      </header>
      <ol className="ghl-service-list">
        {services.map(([service, copy], index) => <li className="reveal" key={service}><span>{String(index + 1).padStart(2, '0')}</span><h3>{service}</h3><p>{copy}</p></li>)}
      </ol>
    </div></section>

    <section className="ghl-service-work" id="ghl-selected-work" aria-labelledby="ghl-work-title"><div className="wrap">
      <header className="ghl-service-work-heading reveal"><span className="section-label">02 / SELECTED GHL WORK</span><h2 id="ghl-work-title">See it in practice.</h2></header>
      <div className="ghl-service-projects">
        {selectedProjects.map(({ project, image, width, height, services: serviceLabel }) => <article className="ghl-service-project reveal" key={project.title}>
          <ProjectLink project={project} aria-label={`View ${project.title} case study`}>
            <span className="ghl-service-project-image img-reveal"><Image src={image} alt={`${project.title} interface`} width={width} height={height} sizes="(max-width: 900px) calc(100vw - 40px), 50vw" /></span>
            <span className="ghl-service-project-copy"><span>{serviceLabel}</span><strong>{project.title}<i aria-hidden="true">↗</i></strong><p>{project.desc}</p></span>
          </ProjectLink>
        </article>)}
      </div>
    </div></section>

    <section className="ghl-service-custom" aria-labelledby="ghl-custom-title"><div className="wrap reveal">
      <div><span className="section-label">03 / CUSTOM DEVELOPMENT</span><h2 id="ghl-custom-title">Extend GHL.<br />Or build what’s missing.</h2></div>
      <div><p>We also develop custom CRMs and web apps. We’ll help you decide what belongs in GoHighLevel and what needs its own solution.</p><Link className="line-link" href="/services#service-crms-marketplaces">Explore custom development <span aria-hidden="true">↗</span></Link></div>
    </div></section>

    <GhlServiceFaq />

    <section className="ghl-service-closing" aria-labelledby="ghl-closing-title"><div className="wrap reveal">
      <h2 id="ghl-closing-title">Let’s look at your setup.</h2>
      <div><p>Tell us what you’re looking to build. We’ll discuss the next step.</p><Link className="button primary" href="/contact">Discuss your GHL setup <span aria-hidden="true">↗</span></Link></div>
    </div></section>
  </main><Footer /></>
}
