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
    <section className="story-section"><div className="wrap story-grid reveal"><span className="section-label">01 / Our story</span><h2>We started this to build things properly.</h2><div><p>We’re two brothers from Pakistan who wanted a more direct way to build software: the client speaks with the engineers, sees real progress, and knows who owns the result.</p><p>Rasheed Systems works across AI agent platforms, marketplaces, CRMs, GoHighLevel, and automation. We stay close after launch because a system earns trust by continuing to work.</p></div></div></section>
    <section className="timeline-section"><div className="wrap"><div className="section-heading reveal"><span className="section-label">02 / Working timeline</span><h2>One continuous loop.</h2><p>The studio is organized around ownership, not handoffs.</p></div><StudioTimeline /></div></section>
    <section className="people-section"><div className="wrap"><span className="section-label reveal">03 / The builders</span><div className="people-list"><article className="reveal"><span>Nasir Ali Rasheed</span><h2>Founder · Technical Lead</h2><p>Full-stack engineer leading architecture, AI systems, GoHighLevel work, and delivery across every build.</p></article><article className="reveal"><span>Zain Ali Rasheed</span><h2>Co-founder · Developer</h2><p>Building alongside Nasir on development and growth—the second half of the studio’s direct, founder-led model.</p></article></div></div></section>
    <section className="contact-ending"><div className="wrap reveal"><span className="section-label">Work directly with us</span><h2>Let’s build something useful.</h2><Link className="button primary" href="/contact">Start a project <span>↗</span></Link></div></section>
  </main><Footer /></>
}
