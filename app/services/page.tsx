import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageEffects from '@/components/PageEffects'
import ServiceRail from '@/components/ServiceRail'
import { services } from '@/lib/services'
import ServiceDiagram from '@/components/ServiceDiagram'

const diagramKinds = ['agents', 'saas', 'ghl', 'marketplace'] as const

export const metadata: Metadata = { title: 'Services', description: 'AI agents and automation, SaaS and web apps, GoHighLevel builds, custom CRMs and marketplaces—built by Rasheed Systems.' }

export default function ServicesPage() {
  return <><PageEffects /><Header /><main id="main-content" tabIndex={-1}>
    <section className="inner-hero"><div className="wrap"><span className="section-label">Services / 04 chapters</span><h1>Engineering the parts<br />your business <em>runs on.</em></h1><p>We go deep on four connected disciplines, then stay close enough to make the finished system work in practice.</p></div></section>
    <section className="services-intro"><div className="wrap section-heading reveal"><span className="section-label">01 / Service chapters</span><h2>From repeated work<br />to dependable systems.</h2><p>Each engagement begins with the operation, not a predetermined technology.</p></div></section>
    <ServiceRail compact />
    <section className="service-details"><div className="wrap">
      {services.map((service, index) => <article className="service-detail reveal" key={service.number}>
        <span className="chapter-number">S—{service.number}</span>
        <div><h2>{service.title}</h2><p>{service.text}</p></div>
        <div className="capability-list">{service.list.map(item => <span key={item}>{item}</span>)}</div>
        <ServiceDiagram kind={diagramKinds[index]} />
      </article>)}
    </div></section>
    <section className="technology-section"><div className="wrap reveal"><span className="section-label">02 / Working stack</span><div className="technology-list">{['React / Next.js','Node / Express','PostgreSQL','Docker','Stripe','AI APIs','GoHighLevel','WordPress'].map(item => <span key={item}>{item}</span>)}</div></div></section>
    <section className="process-section"><div className="wrap"><div className="section-heading reveal"><span className="section-label">03 / How we work</span><h2>No mystery.<br />Just visible progress.</h2><p>The connecting line advances as each stage enters view.</p></div><ol className="process-line reveal"><li><span>01</span><h3>Map it</h3><p>Design around how the business works.</p></li><li><span>02</span><h3>Build it</h3><p>Ship working slices in tight loops.</p></li><li><span>03</span><h3>Ship it</h3><p>Test, deploy, and document the system.</p></li><li><span>04</span><h3>Run it</h3><p>Support and improve after launch.</p></li></ol></div></section>
    <section className="contact-ending"><div className="wrap reveal"><span className="section-label">A useful first conversation</span><h2>What needs to work better?</h2><Link className="button primary" href="/contact">Start with the problem <span>↗</span></Link></div></section>
  </main><Footer /></>
}
