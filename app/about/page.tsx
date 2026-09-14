import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageEffects from '@/components/PageEffects'
import AboutHero from '@/components/AboutHero'
import WorkingTogether from '@/components/WorkingTogether'
import StudioTimeline from '@/components/StudioTimeline'

export const metadata: Metadata = { title: 'About', description: 'Rasheed Systems is a founder-run software engineering studio operated by brothers Nasir and Zain Rasheed.' }

export default function AboutPage() {
  return <><PageEffects /><Header /><main id="main-content" tabIndex={-1}>
    <AboutHero />
    <WorkingTogether />
    <section className="about-process" aria-labelledby="about-process-title"><div className="wrap">
      <div className="about-process-header reveal">
        <span className="section-label">02 / The working process</span>
        <h2 id="about-process-title">One continuous<br />loop.</h2>
        <p>Understand the work, shape the system, and keep improving it through use.</p>
      </div>
      <StudioTimeline />
      <p className="about-process-caption reveal">Scope, timing, and support are agreed for each project.</p>
    </div></section>
    <section className="story-section"><div className="wrap story-grid reveal"><span className="section-label">01 / Our story</span><h2>We started this to build things properly.</h2><div><p>We’re two brothers from Pakistan who wanted a more direct way to build software: the client speaks with the engineers, sees real progress, and knows who owns the result.</p><p>Rasheed Systems works across AI agent platforms, marketplaces, CRMs, GoHighLevel, and automation. We stay close after launch because a system earns trust by continuing to work.</p></div></div></section>
    <section className="people-section"><div className="wrap"><span className="section-label reveal">03 / The builders</span><div className="people-list"><article className="reveal"><span>Nasir Ali Rasheed</span><h2>Founder · Technical Lead</h2><p>Full-stack engineer leading architecture, AI systems, GoHighLevel work, and delivery across every build.</p></article><article className="reveal"><span>Zain Ali Rasheed</span><h2>Co-founder · Developer</h2><p>Building alongside Nasir on development and growth—the second half of the studio’s direct, founder-led model.</p></article></div></div></section>
    <section className="about-closing" aria-labelledby="about-closing-title"><div className="wrap">
      <span className="section-label reveal">03 / Let’s work together</span>
      <div className="about-closing-main reveal">
        <h2 id="about-closing-title">Good work starts<br />with a conversation.</h2>
        <div className="about-closing-copy">
          <p>Tell us what you’re building, where things feel complicated, and what you want to improve.</p>
          <div className="about-closing-actions">
            <Link className="button primary" href="/contact">Discuss your project <span aria-hidden="true">↗</span></Link>
            <Link className="line-link about-closing-secondary" href="/work">Explore our work <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </div>
      <div className="about-closing-founders reveal" aria-label="Studio founders">
        <div><h3>Nasir Rasheed</h3><p>Founder</p></div>
        <div><h3>Zain Rasheed</h3><p>Co-founder</p></div>
      </div>
    </div></section>
  </main><Footer /></>
}
