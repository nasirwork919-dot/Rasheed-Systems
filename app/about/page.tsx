import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageEffects from '@/components/PageEffects'
import CtaSection from '@/components/CtaSection'

export const metadata: Metadata = {
  title: 'About',
  description: 'Rasheed Systems is run by two brothers building AI systems and software for clients worldwide. Direct access to the people who build it.',
  openGraph: {
    title: 'About — Rasheed Systems',
    description: 'Two brothers building AI systems and software for clients worldwide. Direct access to the people who build it.',
    url: '/about',
  },
}

export default function AboutPage() {
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
                <div className="eyebrow mono"><span className="bar" />About</div>
                <h1>Two brothers. <span className="accent">One team.</span> No middlemen.</h1>
                <p>Rasheed Systems is a small, founder-run engineering studio building AI systems and software for clients around the world.</p>
              </div>
              <div className="ph-panel reveal">
                <div className="ph-panel-head">
                  <span className="ph-panel-title">At a glance</span>
                  <span className="ph-panel-tag"><span className="live" />Open for work</span>
                </div>
                <div className="ph-row"><span className="k">Team</span><span className="v">Two brothers</span></div>
                <div className="ph-row"><span className="k">Based in</span><span className="v">Pakistan</span></div>
                <div className="ph-row"><span className="k">Clients</span><span className="v">5 countries</span></div>
                <div className="ph-row"><span className="k">Model</span><span className="v">Direct to builders</span></div>
                <div className="ph-row"><span className="k">Focus</span><span className="v">AI &amp; software</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* STORY */}
        <section className="lead-block">
          <div className="wrap founders-grid">
            <div className="reveal">
              <div className="badge"><span className="d" />Our story</div>
              <h2>We started this to build things properly.</h2>
            </div>
            <div className="reveal">
              <p>We&apos;re two brothers from Pakistan who got tired of watching good ideas get butchered by agencies that sell hours, hide behind account managers, and disappear the moment a project ships.</p>
              <p>So we built <b>Rasheed Systems</b> the way we&apos;d want to be treated as clients — you talk straight to the engineers, you see real progress constantly, and we stick around to keep your systems running long after launch.</p>
              <p>Over the years we&apos;ve shipped <b>AI agent platforms, marketplaces, CRMs, and automation</b> that real companies depend on every day, serving clients across the US, UK, UAE, India, and Australia. We care more about systems that keep working than slides that look good in a pitch.</p>
            </div>
          </div>
        </section>

        {/* PEOPLE */}
        <section className="lead-block" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="who reveal">
              <div className="person">
                <div className="av">N</div>
                <h5>Nasir Ali Rasheed</h5>
                <div className="role">Founder · Technical Lead</div>
                <span>Full-stack engineer leading architecture, AI systems, and delivery on every build. Deep in the GoHighLevel ecosystem, AI agents, and production SaaS — the one turning the plan into working software.</span>
              </div>
              <div className="person">
                <div className="av">Z</div>
                <h5>Zain Ali Rasheed</h5>
                <div className="role">Co-founder · Developer</div>
                <span>Building alongside Nasir on development and growth — the second half of the team and the reason &quot;we&quot; is never just one person on the other end of your project.</span>
              </div>
            </div>
          </div>
        </section>

        {/* PRINCIPLES */}
        <section className="services">
          <div className="wrap">
            <div className="sec-head reveal">
              <div>
                <div className="mono" style={{ marginBottom: 14 }}><span className="sec-index">→</span> &nbsp;How we think</div>
                <h2>What we believe.</h2>
              </div>
              <p>A few rules we don&apos;t break.</p>
            </div>
            <div className="svc-grid reveal">
              <div className="svc"><span className="num">01</span><h3>Ship real things</h3><p>Working software beats perfect plans. We&apos;d rather show you something running than talk about it for three weeks.</p></div>
              <div className="svc"><span className="num">02</span><h3>Say it straight</h3><p>If an idea won&apos;t work, we&apos;ll tell you. If a deadline is tight, we&apos;ll say so. No surprises, no sugar-coating.</p></div>
              <div className="svc"><span className="num">03</span><h3>Build to last</h3><p>We don&apos;t ship duct tape. What we build is meant to run for years and grow without falling over.</p></div>
              <div className="svc"><span className="num">04</span><h3>Stay close</h3><p>Small team, by choice. Fewer clients, more attention, and a real relationship instead of a ticket number.</p></div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <CtaSection
          label="Work with us"
          headline="Let's build something good."
          sub="If you want a team that treats your project like their own, you're in the right place."
          ghostHref="/work"
          ghostLabel="See our work"
        />
      </main>
      <Footer />
    </>
  )
}
