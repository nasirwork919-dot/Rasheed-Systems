import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageEffects from '@/components/PageEffects'

export const metadata: Metadata = {
  title: 'Services',
  description: 'AI agents & automation, SaaS & web apps, GoHighLevel builds, custom CRMs and marketplaces — built and run by Rasheed Systems.',
  openGraph: {
    title: 'Services — Rasheed Systems',
    description: 'AI agents & automation, SaaS & web apps, GoHighLevel builds, custom CRMs and marketplaces — built and run by Rasheed Systems.',
    images: [{ url: '/og-image.png' }],
    url: '/services',
  },
}

export default function ServicesPage() {
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
                <div className="eyebrow mono"><span className="bar" />Services</div>
                <h1>We build the <span className="accent">few</span> things that matter most.</h1>
                <p>No menu of fifty services. We go deep on the systems businesses actually run on — and we run them well after launch.</p>
              </div>
              <div className="ph-panel reveal">
                <div className="ph-panel-head">
                  <span className="ph-panel-title">Service index</span>
                  <span className="ph-panel-tag">04 total</span>
                </div>
                <div className="ph-row"><span className="k"><span className="code">S—01</span> AI Agents</span><span className="v">Automation</span></div>
                <div className="ph-row"><span className="k"><span className="code">S—02</span> SaaS &amp; Apps</span><span className="v">Web</span></div>
                <div className="ph-row"><span className="k"><span className="code">S—03</span> GoHighLevel</span><span className="v">GHL</span></div>
                <div className="ph-row"><span className="k"><span className="code">S—04</span> CRM / Market</span><span className="v">Platforms</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* DETAILED SERVICES */}
        <section className="lead-block">
          <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

            <div className="card reveal" data-tilt="">
              <div className="card-top"><span className="status"><span className="live" />S—01</span><span className="tag">AI</span></div>
              <h3>AI Agents &amp; Automation</h3>
              <p>We build agents that take repetitive work off your team — qualifying leads the moment they land, moving deals through your pipeline, answering customers, and keeping records up to date across every tool you use. Less busywork, fewer dropped balls, more done while you sleep.</p>
              <div className="meta">
                <span>· AI agents &amp; assistants</span>
                <span>· Workflow automation</span>
                <span>· Tool &amp; API integrations</span>
                <span>· Lead routing &amp; follow-up</span>
              </div>
            </div>

            <div className="card reveal" data-tilt="">
              <div className="card-top"><span className="status"><span className="live" />S—02</span><span className="tag">Software</span></div>
              <h3>SaaS &amp; Web Apps</h3>
              <p>Full products from idea to launch. Clean, fast front ends and solid back ends, plus the parts nobody sees but everyone needs — auth, billing, databases, and infrastructure that holds up under real users. We build it to scale, not just to demo.</p>
              <div className="meta">
                <span>· React / Next.js front ends</span>
                <span>· Node &amp; Postgres back ends</span>
                <span>· Stripe billing &amp; auth</span>
                <span>· Cloud deployment</span>
              </div>
            </div>

            <div className="card reveal" data-tilt="">
              <div className="card-top"><span className="status"><span className="live" />S—03</span><span className="tag">GHL</span></div>
              <h3>GoHighLevel Builds</h3>
              <p>We push GoHighLevel far past its defaults — custom dashboards, apps embedded right inside the GHL sidebar, and automations wired into your pipelines. If you&apos;ve hit the ceiling of what GHL does out of the box, this is where we come in.</p>
              <div className="meta">
                <span>· Custom menu apps</span>
                <span>· Embedded dashboards</span>
                <span>· Pipeline automation</span>
                <span>· API &amp; webhook work</span>
              </div>
            </div>

            <div className="card reveal" data-tilt="">
              <div className="card-top"><span className="status"><span className="live" />S—04</span><span className="tag">Platforms</span></div>
              <h3>CRMs &amp; Marketplaces</h3>
              <p>Custom platforms shaped around how your business actually works. Lead-management CRMs, multi-role marketplaces connecting buyers and sellers, internal tools, admin panels — built to fit your process instead of forcing you into someone else&apos;s.</p>
              <div className="meta">
                <span>· Custom CRM systems</span>
                <span>· Multi-role marketplaces</span>
                <span>· Admin &amp; ops dashboards</span>
                <span>· Reporting &amp; analytics</span>
              </div>
            </div>

          </div>
        </section>

        {/* TECH STRIP */}
        <div className="strip">
          <div className="wrap strip-inner">
            <span className="mono">The stack we build on</span>
            <div className="regions" style={{ gap: 22 }}>
              <span>React / Next.js</span>
              <span>Node / Express</span>
              <span>PostgreSQL</span>
              <span>Docker</span>
              <span>Stripe</span>
              <span>AI APIs</span>
            </div>
          </div>
        </div>

        {/* APPROACH */}
        <section className="approach">
          <div className="wrap">
            <div className="sec-head reveal">
              <div>
                <div className="mono" style={{ marginBottom: 14 }}><span className="sec-index">→</span> &nbsp;How we work</div>
                <h2>No mystery. Just shipping.</h2>
              </div>
              <p>You always know what we&apos;re building, why, and when it lands.</p>
            </div>
            <div className="steps reveal">
              <div className="step"><span className="n">01</span><h4>Map it</h4><p>We learn how your business actually runs, then design the system around it — not the other way around.</p></div>
              <div className="step"><span className="n">02</span><h4>Build it</h4><p>Fast, focused builds in tight loops. You see real progress every few days, not a black box for months.</p></div>
              <div className="step"><span className="n">03</span><h4>Ship it</h4><p>We launch on solid infrastructure, test under real load, and hand you something that holds up.</p></div>
              <div className="step"><span className="n">04</span><h4>Run it</h4><p>We don&apos;t disappear at launch. We keep the system healthy, fix what breaks, and grow it with you.</p></div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="lead-block">
          <div className="wrap">
            <div className="cta-box reveal">
              <div className="mono">Let&apos;s build something</div>
              <h2>Know what you need built?</h2>
              <p>Tell us about it. We&apos;ll tell you straight whether it&apos;s a fit and how we&apos;d approach it.</p>
              <div className="cta-actions">
                <Link href="/contact" className="btn btn-primary">Start a project <span className="arrow">↗</span></Link>
                <Link href="/work" className="btn btn-ghost">See our work</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
