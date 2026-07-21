import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageEffects from '@/components/PageEffects'
import WorkGrid from '@/components/WorkGrid'
import CtaSection from '@/components/CtaSection'

export const metadata: Metadata = {
  title: 'Work',
  description: 'Selected systems built and shipped by Rasheed Systems: AI platforms, marketplaces, CRMs, GoHighLevel builds, and automation.',
  openGraph: {
    title: 'Work — Rasheed Systems',
    description: 'Selected systems built and shipped by Rasheed Systems: AI platforms, marketplaces, CRMs, and automation.',
    url: '/work',
  },
}

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
                <p>Real platforms running in production — AI agents, marketplaces, CRMs, GoHighLevel builds, and automation that businesses depend on every day.</p>
              </div>
              <div className="ph-panel reveal">
                <div className="ph-panel-head">
                  <span className="ph-panel-title">Live systems</span>
                  <span className="ph-panel-tag"><span className="live" />All online</span>
                </div>
                <div className="ph-row"><span className="k"><span className="dot" />N3rve</span><span className="v">Online</span></div>
                <div className="ph-row"><span className="k"><span className="dot" />JustCarSale</span><span className="v">Online</span></div>
                <div className="ph-row"><span className="k"><span className="dot" />Insurance Wallets</span><span className="v">Online</span></div>
                <div className="ph-row"><span className="k"><span className="dot" />ScholarSurge</span><span className="v">Live</span></div>
                <div className="ph-row"><span className="k"><span className="dot" />+ 7 more</span><span className="v">Online</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="lead-block" style={{ paddingBottom: 0 }}>
          <div className="wrap">
            <div className="stat-row reveal">
              <div className="stat"><div className="num">10</div><div className="lbl">Live products you can visit</div></div>
              <div className="stat"><div className="num">5</div><div className="lbl">Countries — US · UK · UAE · IN · AU</div></div>
              <div className="stat"><div className="num">100%</div><div className="lbl">Built &amp; run by the founders</div></div>
            </div>
          </div>
        </section>

        {/* WORK GRID */}
        <section className="lead-block">
          <div className="wrap">
            <WorkGrid />
          </div>
        </section>

        {/* CTA */}
        <CtaSection
          label="Work with us"
          headline="Want to be on this list?"
          sub="Tell us what you need built. We'll tell you how we'd approach it."
          ghostHref="/services"
          ghostLabel="What we do"
        />
      </main>
      <Footer />
    </>
  )
}
