'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WorkSlider from '@/components/WorkSlider'
import { useReveal } from '@/hooks/useReveal'
import { useCardGlow } from '@/hooks/useCardGlow'

export default function Home() {
  useReveal()
  useCardGlow()
  const heroRef = useRef<HTMLElement>(null)
  const ktRef = useRef<HTMLDivElement>(null)
  const spotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const hero = heroRef.current
    const kt = ktRef.current
    const spot = spotRef.current
    if (!hero || !kt) return

    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches

    requestAnimationFrame(() => kt.classList.add('ready'))
    if (reduce) return

    const lines = Array.from(kt.querySelectorAll<HTMLElement>('.line'))
    const depths = [22, 40, 16]
    const target = { x: 0, y: 0 }
    const cur = { x: 0, y: 0 }
    let sx = 0, sy = 0, csx = 0, csy = 0
    let rafId: number

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const onEnter = () => hero.classList.add('active')
    const onLeave = () => {
      hero.classList.remove('active')
      target.x = 0
      target.y = 0
    }
    const onMove = (e: MouseEvent) => {
      const r = hero.getBoundingClientRect()
      target.x = (e.clientX - r.left) / r.width - 0.5
      target.y = (e.clientY - r.top) / r.height - 0.5
      sx = e.clientX - r.left
      sy = e.clientY - r.top
    }

    function tick() {
      cur.x = lerp(cur.x, target.x, 0.08)
      cur.y = lerp(cur.y, target.y, 0.08)
      csx = lerp(csx, sx, 0.12)
      csy = lerp(csy, sy, 0.12)

      lines.forEach((line, i) => {
        const d = depths[i] ?? 20
        const tx = cur.x * d
        const ty = cur.y * (d * 0.5)
        const rot = cur.x * 4
        line.style.transform = `translate3d(${tx}px,${ty}px,0) rotateX(${-cur.y * 5}deg) rotateY(${rot}deg)`
        const ghost = line.querySelector<HTMLElement>('.ghost')
        if (ghost) ghost.style.transform = `translate3d(${cur.x * d * 1.8}px,${cur.y * d * 0.9}px,0)`
      })

      if (spot) {
        spot.style.left = csx + 'px'
        spot.style.top = csy + 'px'
      }

      rafId = requestAnimationFrame(tick)
    }

    hero.addEventListener('mouseenter', onEnter)
    hero.addEventListener('mouseleave', onLeave)
    hero.addEventListener('mousemove', onMove)
    rafId = requestAnimationFrame(tick)

    return () => {
      hero.removeEventListener('mouseenter', onEnter)
      hero.removeEventListener('mouseleave', onLeave)
      hero.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <Header />
      <main>
        {/* KINETIC HERO */}
        <section className="hero" id="hero" ref={heroRef}>
          <div className="hero-bg" />
          <div className="hero-grain" />
          <div className="hero-spot" id="spot" ref={spotRef} />
          <div className="hero-chips" aria-hidden="true">
            <span className="chip">AI Agents</span>
            <span className="chip">Automation</span>
            <span className="chip">SaaS Platforms</span>
            <span className="chip">GoHighLevel</span>
            <span className="chip">Marketplaces</span>
          </div>
          <div className="wrap hero-inner">
            <div className="kicker mono"><span className="bar" />Built by two brothers · US · UK · UAE · IN · AU</div>
            <div className="kt" id="kt" ref={ktRef} aria-label="We build the systems that run your business.">
              <span className="line">We build the<span className="ghost" aria-hidden="true">We build the</span></span>
              <span className="line"><em>systems</em><span className="ghost" aria-hidden="true">systems</span></span>
              <span className="line">that run business.<span className="ghost" aria-hidden="true">that run business.</span></span>
            </div>
            <div className="hero-foot">
              <p className="hero-lede">AI agents, automation, and custom software — the kind that quietly does the work after everyone goes home.</p>
              <div className="hero-actions">
                <Link href="/contact" className="btn btn-primary">Start a project <span className="arrow">↗</span></Link>
                <Link href="/work" className="btn btn-ghost">See our work</Link>
              </div>
            </div>
            <div className="hero-stats">
              <div className="hero-stat"><div className="num">15+</div><div className="lbl">Systems shipped</div></div>
              <div className="hero-stat"><div className="num">5</div><div className="lbl">Countries served</div></div>
              <div className="hero-stat"><div className="num">2</div><div className="lbl">Brothers · 0 middlemen</div></div>
            </div>
          </div>
          <div className="scroll-hint" aria-hidden="true">
            <span className="mono">Scroll</span>
            <span className="rail" />
          </div>
        </section>

        {/* STRIP */}
        <div className="strip">
          <div className="wrap strip-inner">
            <span className="mono">Shipping production software, not slides</span>
            <div className="regions">
              <span>United States</span>
              <span>United Kingdom</span>
              <span>United Arab Emirates</span>
              <span>India</span>
              <span>Australia</span>
            </div>
          </div>
        </div>

        {/* WHY US */}
        <section className="lead-block">
          <div className="wrap">
            <div className="sec-head reveal">
              <div>
                <div className="mono" style={{ marginBottom: 14 }}><span className="sec-index">00</span> &nbsp;Why us</div>
                <h2>Most agencies sell hours.<br />We build things that work.</h2>
              </div>
              <p>We&apos;re engineers first. You talk to the people writing the code — not a layer of account managers between you and the build.</p>
            </div>
            <div className="value-grid reveal">
              <div className="value">
                <span className="n">A</span>
                <h4>Direct to the builders</h4>
                <p>Two brothers, one team. No handoffs, no telephone game. The person you brief is the person who ships it.</p>
              </div>
              <div className="value">
                <span className="n">B</span>
                <h4>Systems, not band-aids</h4>
                <p>We design around how your business actually runs, so what we build keeps working long after launch day.</p>
              </div>
              <div className="value">
                <span className="n">C</span>
                <h4>We stay after launch</h4>
                <p>Shipping is the start, not the finish. We keep your systems healthy and grow them with you.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES PREVIEW */}
        <section className="services">
          <div className="wrap">
            <div className="sec-head reveal">
              <div>
                <div className="mono" style={{ marginBottom: 14 }}><span className="sec-index">01</span> &nbsp;What we do</div>
                <h2>Four things, done properly.</h2>
              </div>
              <p>We don&apos;t do a little of everything. We build the systems businesses run on.</p>
            </div>
            <div className="svc-grid reveal">
              <div className="svc">
                <span className="num">S—01</span>
                <h3>AI Agents &amp; Automation</h3>
                <p>Agents that qualify leads, move deals, answer customers, and update records across the tools you already use.</p>
                <ul><li>AI Agents</li><li>Workflows</li><li>Integrations</li></ul>
              </div>
              <div className="svc">
                <span className="num">S—02</span>
                <h3>SaaS &amp; Web Apps</h3>
                <p>Full products, idea to launch. Clean front ends, solid back ends, and the infrastructure that holds it up.</p>
                <ul><li>React / Next.js</li><li>Node / Postgres</li><li>Stripe / Auth</li></ul>
              </div>
              <div className="svc">
                <span className="num">S—03</span>
                <h3>GoHighLevel Builds</h3>
                <p>Deep GHL work — custom dashboards, embedded apps, and automations far past the out-of-the-box limits.</p>
                <ul><li>Custom Menus</li><li>Embedded Apps</li><li>Pipelines</li></ul>
              </div>
              <div className="svc">
                <span className="num">S—04</span>
                <h3>CRMs &amp; Marketplaces</h3>
                <p>Custom platforms built around your business — lead systems, multi-role marketplaces, tools made to scale.</p>
                <ul><li>Custom CRM</li><li>Marketplaces</li><li>Dashboards</li></ul>
              </div>
            </div>
          </div>
        </section>

        {/* WORK SLIDER */}
        <section className="lead-block">
          <div className="wrap">
            <div className="sec-head reveal">
              <div>
                <div className="mono" style={{ marginBottom: 14 }}><span className="sec-index">02</span> &nbsp;Selected work</div>
                <h2>Systems we&apos;ve shipped.</h2>
              </div>
              <p>All 9 platforms — drag or use arrows to browse. <Link href="/work" style={{ color: 'var(--signal)' }}>Full details →</Link></p>
            </div>
            <WorkSlider />
          </div>
        </section>

        {/* CTA */}
        <section className="lead-block">
          <div className="wrap">
            <div className="cta-box reveal">
              <a
                href="https://www.fiverr.com/s/Eg3AENe"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-fiverr-badge"
              >
                <span className="stars">★★★★★</span>
                <span className="rating">5.0</span>
                <span>·</span>
                <span>Verified on Fiverr</span>
                <span className="arrow">↗</span>
              </a>

              <div className="cta-reviews">
                <div className="cta-review">
                  <blockquote>&ldquo;Great seller. Did project as described. Went far and beyond. Will definitely return for more.&rdquo;</blockquote>
                  <cite><span className="flag">🇬🇧</span> Jack H. &mdash; United Kingdom</cite>
                </div>
                <div className="cta-review">
                  <blockquote>&ldquo;Exceptional full-stack developer! SEO techniques significantly boosted our online visibility. A true asset for any project.&rdquo;</blockquote>
                  <cite><span className="flag">🇺🇸</span> janinfervallim &mdash; United States</cite>
                </div>
                <div className="cta-review">
                  <blockquote>&ldquo;Fast, professional, delivered exactly what I needed within budget and on time. Amazing work!&rdquo;</blockquote>
                  <cite><span className="flag">🇨🇦</span> Vanessa K. &mdash; Canada</cite>
                </div>
              </div>

              <div className="mono">Let&apos;s build something</div>
              <h2>Ready to start?</h2>
              <p>Tell us what you need built. We&apos;ll tell you straight whether it&apos;s a fit and how we&apos;d approach it.</p>
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
