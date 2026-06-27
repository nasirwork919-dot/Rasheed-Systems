import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageEffects from '@/components/PageEffects'

export const metadata: Metadata = {
  title: 'Work',
  description: 'Selected systems built and shipped by Rasheed Systems: AI platforms, marketplaces, CRMs, and automation.',
  openGraph: {
    title: 'Work — Rasheed Systems',
    description: 'Selected systems built and shipped by Rasheed Systems: AI platforms, marketplaces, CRMs, and automation.',
    images: [{ url: '/og-image.png' }],
    url: '/work',
  },
}

const projects = [
  {
    href: 'https://n3rve.ai/',
    tag: 'AI Platform',
    img: '/work/n3rve.jpg',
    title: 'N3rve',
    desc: 'An AI operating system for teams — unifying AI, billing, customers, and content under one roof so teams stop switching tabs and ship more.',
    role: 'Architecture & build',
    stack: 'AI · Docker · Node · Postgres',
  },
  {
    href: 'https://justcarsale.com/',
    tag: 'Marketplace',
    img: '/work/justcarsale.jpg',
    title: 'JustCarSale',
    desc: 'A global automotive marketplace connecting buyers, sellers, dealers, and workshops across 18+ modules — from listings and inspections to a full back office.',
    role: 'Backend lead',
    stack: 'React · TypeScript · Postgres',
  },
  {
    href: 'https://insurancewallets.com/',
    tag: 'Marketplace',
    img: '/work/insurancewallets.jpg',
    title: 'Insurance Wallets',
    desc: 'An AI-powered insurance platform and broker/lawyer marketplace — policies, claims, a community forum, and gated access in one secure place.',
    role: 'Full build',
    stack: 'React · Node',
  },
  {
    href: 'https://mia.profitlifter.com/',
    tag: 'AI Assistant',
    img: '/work/mia.jpg',
    title: 'MIA',
    desc: 'An AI marketing strategist that builds a personalized growth plan around your answers — no templates, no fluff — with a reseller-ready architecture.',
    role: 'Platform build',
    stack: 'AI · Web · Postgres',
  },
  {
    href: 'https://www.zaindubai.com/',
    tag: 'Real Estate',
    img: '/work/zaindubai.jpg',
    title: 'Zain Dubai',
    desc: 'A Dubai real estate platform for buying and renting property — advanced search, community guides, and free instant valuation tools.',
    role: 'Full build',
    stack: 'React · Web',
  },
  {
    href: 'https://www.eu-worldcrm.com/',
    tag: 'CRM',
    img: '/work/euroworldcrm.jpg',
    title: 'Euro World CRM',
    desc: 'A travel-agency command center — leads, walk-ins, GST invoicing, payments, and multi-role access, with live performance dashboards.',
    role: 'Full build',
    stack: 'React · Node · Postgres',
  },
  {
    href: 'https://chatsites.app/',
    tag: 'Funnel Builder',
    img: '/work/chatsites.jpg',
    title: 'Chatsites',
    desc: 'An AI-powered conversational website builder that turns visitors into leads — flow blocks, a command center, and a full publish flow.',
    role: 'Engineering',
    stack: 'React · Node',
  },
  {
    href: 'https://www.jwalinjewels.com/',
    tag: 'E-commerce',
    img: '/work/jwalinjewels.jpg',
    title: 'Jwalin Jewels',
    desc: 'A luxury jewelry store — engagement rings, custom design, and loose diamonds, with virtual appointments and a refined buying experience.',
    role: 'Full build',
    stack: 'E-commerce · Web',
  },
  {
    href: 'https://www.uktherapies.co.uk/',
    tag: 'Wellness',
    img: '/work/uktherapies.jpg',
    title: 'UK Therapies',
    desc: 'A wellness and therapy studio site — treatments, pricing, and online booking wrapped in a calm, premium experience.',
    role: 'Full build',
    stack: 'Web · Booking',
  },
]

export default function WorkPage() {
  return (
    <>
      <PageEffects />
      <Header />
      <main>
        <section className="page-head">
          <div className="ph-glow" />
          <div className="wrap">
            <div className="ph-grid">
              <div className="ph-left">
                <div className="eyebrow mono"><span className="bar" />Selected work</div>
                <h1>Systems we&apos;ve built and <span className="accent">shipped</span>.</h1>
                <p>Real platforms running in production — AI agents, marketplaces, CRMs, and automation that businesses depend on every day.</p>
              </div>
              <div className="ph-panel reveal">
                <div className="ph-panel-head">
                  <span className="ph-panel-title">Live systems</span>
                  <span className="ph-panel-tag"><span className="live" />All online</span>
                </div>
                <div className="ph-row"><span className="k"><span className="dot" />N3rve</span><span className="v">Online</span></div>
                <div className="ph-row"><span className="k"><span className="dot" />JustCarSale</span><span className="v">Online</span></div>
                <div className="ph-row"><span className="k"><span className="dot" />Insurance Wallets</span><span className="v">Online</span></div>
                <div className="ph-row"><span className="k"><span className="dot" />Zain Dubai</span><span className="v">Online</span></div>
                <div className="ph-row"><span className="k"><span className="dot" />+ 6 more</span><span className="v">Online</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="lead-block" style={{ paddingBottom: 0 }}>
          <div className="wrap">
            <div className="stat-row reveal">
              <div className="stat"><div className="num">9</div><div className="lbl">Live products you can visit</div></div>
              <div className="stat"><div className="num">5</div><div className="lbl">Countries — US · UK · UAE · IN · AU</div></div>
              <div className="stat"><div className="num">100%</div><div className="lbl">Built &amp; run by the founders</div></div>
            </div>
          </div>
        </section>

        {/* WORK GRID */}
        <section className="lead-block">
          <div className="wrap">
            <div className="work-grid">
              {projects.map(project => (
                <a
                  key={project.href}
                  className="card reveal"
                  data-tilt=""
                  href={project.href}
                  target="_blank"
                  rel="noopener"
                >
                  <div className="card-top">
                    <span className="status"><span className="live" />Live</span>
                    <span className="tag">{project.tag}</span>
                  </div>
                  <div className="card-preview">
                    <img src={project.img} alt={`${project.title} preview`} />
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.desc}</p>
                  <div className="meta">
                    <span>Role · <b>{project.role}</b></span>
                    <span>Stack · <b>{project.stack}</b></span>
                  </div>
                  <span className="card-visit">Visit live site <span className="arrow">↗</span></span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="lead-block">
          <div className="wrap">
            <div className="cta-box reveal">
              <div className="mono">Work with us</div>
              <h2>Want to be on this list?</h2>
              <p>Tell us what you need built. We&apos;ll tell you how we&apos;d approach it.</p>
              <div className="cta-actions">
                <Link href="/contact" className="btn btn-primary">Start a project <span className="arrow">↗</span></Link>
                <Link href="/services" className="btn btn-ghost">What we do</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
