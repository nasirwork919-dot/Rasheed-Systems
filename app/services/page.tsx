import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageEffects from '@/components/PageEffects'
import ServicesHeroMark from '@/components/ServicesHeroMark'
import AiAutomationDetail from '@/components/AiAutomationDetail'
import GoHighLevelDetail from '@/components/GoHighLevelDetail'
import WebAppsSaasDetail from '@/components/WebAppsSaasDetail'
import CrmMarketplaceDetail from '@/components/CrmMarketplaceDetail'

const serviceIndex = [
  { number: '01', label: 'AI & automation', href: '#service-ai-automation' },
  { number: '02', label: 'GoHighLevel', href: '#service-gohighlevel' },
  { number: '03', label: 'Web apps & SaaS', href: '#service-web-apps-saas' },
  { number: '04', label: 'CRMs & marketplaces', href: '#service-crms-marketplaces' },
] as const

export const metadata: Metadata = { title: 'Services', description: 'AI agents and automation, SaaS and web apps, GoHighLevel builds, custom CRMs and marketplaces—built by Rasheed Systems.' }

export default function ServicesPage() {
  return <><PageEffects /><Header /><main id="main-content" tabIndex={-1}>
    <section className="services-hero">
      <div className="wrap">
        <div className="services-hero-main">
          <div className="services-hero-copy">
            <span className="section-label">Services / Rasheed Systems</span>
            <h1>Software built around the way you work.</h1>
            <p>AI automation, GoHighLevel, web applications, and custom CRMs. Built around your business and connected to the tools you use.</p>
            <div className="services-hero-actions">
              <Link className="button primary" href="/contact">Discuss your project <span aria-hidden="true">↗</span></Link>
              <a className="services-hero-secondary" href="#service-ai-automation">Explore services <span aria-hidden="true">↓</span></a>
            </div>
          </div>
          <ServicesHeroMark />
        </div>
        <nav className="services-hero-index" aria-label="Service index">
          {serviceIndex.map(item => <a href={item.href} key={item.number}><span>{item.number}</span><strong>{item.label}</strong><i aria-hidden="true">↘</i></a>)}
        </nav>
        <p className="services-hero-note">From a focused integration to a complete product.</p>
      </div>
    </section>
    <section className="service-details"><div className="wrap">
      <AiAutomationDetail />
      <GoHighLevelDetail />
      <WebAppsSaasDetail />
      <CrmMarketplaceDetail />
    </div></section>
    <section className="services-closing" aria-labelledby="services-closing-title"><div className="wrap reveal">
      <div className="services-closing-intro">
        <span className="section-label">05 / YOUR NEXT STEP</span>
        <h2 id="services-closing-title">Start with the problem.<br />We’ll map the build.</h2>
        <p>Tell us what you want to improve, what you already use, and where you need help.</p>
        <div className="services-closing-action">
          <Link className="button primary" href="/contact">Discuss your project <span aria-hidden="true">↗</span></Link>
          <span>A short outline is enough to start.</span>
        </div>
      </div>
      <div className="services-closing-guidance">
        <h3>A useful starting point</h3>
        <ol>
          <li><span>01</span><div><h4>The goal</h4><p>What would you like to make easier?</p></div></li>
          <li><span>02</span><div><h4>The current setup</h4><p>Which tools or systems do you use?</p></div></li>
          <li><span>03</span><div><h4>The priorities</h4><p>What matters most for the first version?</p></div></li>
        </ol>
      </div>
      <p className="services-closing-location"><span>Based in Pakistan.</span><span>Working worldwide.</span></p>
    </div></section>
  </main><Footer /></>
}
