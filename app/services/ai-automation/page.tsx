import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import PageEffects from '@/components/PageEffects'
import ProjectLink from '@/components/ProjectLink'
import { AiAutomationServiceFaq, AiBookingWorkflow } from '@/components/AiAutomationServiceInteractive'
import { projects } from '@/lib/projects'

const title = 'AI Automation Agency'
const description = 'AI automation agency building AI booking systems, lead qualification, and custom AI agents connected to your CRM, for businesses in the US, UK, UAE, and Australia.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/services/ai-automation' },
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
  ['AI booking systems', 'Qualify new leads and book them into the right calendar by SMS, WhatsApp, or web chat.'],
  ['Lead qualification', 'AI asks your qualifying questions and routes each lead by answer, source, or value.'],
  ['AI follow-up', 'Reminders, missed-booking recovery, and re-engagement messages that sound like your team.'],
  ['CRM-connected AI', 'Write conversation records, tags, and bookings back to your CRM through the agreed integration.'],
  ['Custom AI agents', 'Agents built for one job in your business, using your data and your rules.'],
  ['AI-powered products', 'Full AI platforms and SaaS features, from strategy tools to conversational websites.'],
] as const

const project = (title: string) => projects.find(item => item.title === title)!
const selectedProjects = [
  { project: project('ScholarSurge'), image: '/work/scholarsurge/preview (2).webp', width: 1568, height: 743 },
  { project: project('Strive Soccer Academy'), image: '/work/strive-soccer-academy/strive-agent.webp', width: 1568, height: 737 },
] as const
const alsoBuilt = [project('N3rve'), project('MIA'), project('Chatsites')]

export default function AiAutomationServicePage() {
  return <><PageEffects /><Header /><main id="main-content" tabIndex={-1} className="ai-service-page">
    <section className="ai-service-hero" aria-labelledby="ai-service-title"><div className="wrap">
      <nav className="ai-service-breadcrumb" aria-label="Breadcrumb"><Link href="/services">Services</Link><span aria-hidden="true">/</span><span>AI Automation</span></nav>
      <div className="ai-service-hero-grid">
        <h1 className="ai-service-hero-title reveal" id="ai-service-title"><span>Answer every lead.</span><span>Book every call.</span><span>Automatically.</span></h1>
        <div className="ai-service-hero-copy reveal">
          <h2>An AI automation agency for the conversations your team can’t get to.</h2>
          <p>AI booking systems, lead qualification, and custom AI agents connected to your CRM and calendar.</p>
          <div className="ai-service-hero-actions"><Link className="button primary" href="/contact">Discuss your automation <span aria-hidden="true">↗</span></Link><a className="line-link" href="#ai-selected-work">Explore the work <span aria-hidden="true">↓</span></a></div>
        </div>
      </div>
    </div></section>

    <AiBookingWorkflow />

    <section className="ai-service-build" aria-labelledby="ai-service-build-title"><div className="wrap">
      <header className="ai-service-section-heading reveal"><span className="section-label">01 / WHAT WE BUILD</span><h2 id="ai-service-build-title">Built to do real work.</h2></header>
      <ol className="ai-service-list">
        {services.map(([service, copy], index) => <li className="reveal" key={service}><span>{String(index + 1).padStart(2, '0')}</span><h3>{service}</h3><p>{copy}</p></li>)}
      </ol>
    </div></section>

    <section className="ai-service-work" id="ai-selected-work" aria-labelledby="ai-service-work-title"><div className="wrap">
      <header className="ai-service-section-heading reveal"><span className="section-label">02 / SEE IT IN PRACTICE</span><h2 id="ai-service-work-title">Built around real operations.</h2></header>
      <div className="ai-service-projects">
        {selectedProjects.map(item => <article className="ai-service-project reveal" key={item.project.title}>
          <ProjectLink project={item.project} aria-label={`View ${item.project.title} case study`}>
            <span className="ai-service-project-image"><Image src={item.image} alt={`${item.project.title} interface`} width={item.width} height={item.height} sizes="(max-width: 900px) calc(100vw - 32px), 610px" /></span>
            <span className="ai-service-project-copy"><strong>{item.project.title}<i aria-hidden="true">↗</i></strong><span>{item.project.stack}</span><p>{item.project.desc}</p></span>
          </ProjectLink>
        </article>)}
      </div>
      <div className="ai-service-also reveal"><span>Also built:</span>{alsoBuilt.map(item => <ProjectLink project={item} key={item.title}>{item.title} <span aria-hidden="true">↗</span></ProjectLink>)}</div>
    </div></section>

    <section className="ai-service-fit" aria-labelledby="ai-service-fit-title"><div className="wrap reveal">
      <div><span className="section-label">03 / WHERE AI FITS</span><h2 id="ai-service-fit-title">AI where it helps.<br />Simple where it doesn’t.</h2></div>
      <p>Not every task needs AI. We look at your volume and process first, and only automate the steps where AI saves real time. The rest stays simple.</p>
    </div></section>

    <AiAutomationServiceFaq />

    <section className="ai-service-closing" aria-labelledby="ai-service-closing-title"><div className="wrap reveal">
      <h2 id="ai-service-closing-title">Have leads waiting<br />for a reply?</h2>
      <Link className="button primary" href="/contact">Tell us about it <span aria-hidden="true">↗</span></Link>
    </div></section>
  </main><Footer /></>
}
