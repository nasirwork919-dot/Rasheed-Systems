import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageEffects from '@/components/PageEffects'
import ProjectGallery from '@/components/ProjectGallery'
import { projectDetails } from '@/lib/projectDetails'

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const detail = projectDetails[slug]
  if (!detail) return {}
  return {
    title: detail.title,
    description: detail.oneLiner,
    openGraph: {
      title: `${detail.title} — Rasheed Systems`,
      description: detail.oneLiner,
      url: `/work/${slug}`,
    },
  }
}

export async function generateStaticParams() {
  return Object.keys(projectDetails).map(slug => ({ slug }))
}

export default async function ProjectPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const detail = projectDetails[slug]
  if (!detail) notFound()

  return (
    <>
      <PageEffects />
      <Header />
      <main>

        {/* HERO */}
        <section className="page-head case-page-head">
          <div className="ph-glow" />
          <div className="wrap">
            <Link href="/work" className="case-back mono reveal">← Back to work</Link>
            <div className="case-badge reveal">{detail.category}</div>
            <h1 className="case-title reveal">{detail.title}</h1>
            <p className="case-oneliner reveal">{detail.oneLiner}</p>

            <div className="case-spec reveal">
              {[
                { k: 'Platform', v: detail.platform },
                { k: 'Industry', v: detail.industry },
                { k: 'Scope',    v: detail.scope },
              ].map(({ k, v }) => (
                <div key={k} className="case-spec-item">
                  <div className="k">{k}</div>
                  <div className="v">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HERO IMAGE */}
        <section className="lead-block" style={{ paddingBottom: 0 }}>
          <div className="wrap">
            <div className="case-hero reveal">
              <img src={detail.gallery[0].src} alt={detail.gallery[0].caption} />
            </div>
          </div>
        </section>

        {/* BODY */}
        <section className="lead-block">
          <div className="wrap">
            <div className="case-layout">

              <div className="case-body reveal">
                {detail.body.map((para, i) => <p key={i}>{para}</p>)}

                <div className="case-what">
                  <h3>What went into it</h3>
                  <div className="case-what-list">
                    {detail.whatWentIn.map((item, i) => (
                      <div key={i} className="case-what-item">
                        <span className="check">✓</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* GALLERY */}
        <section className="lead-block" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="case-gallery reveal">
              <h3>Screenshots</h3>
              <ProjectGallery images={detail.gallery.slice(1)} />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta-section">
          <div className="wrap">
            <div className="cta-inner reveal">
              <div className="cta-left">
                <div className="mono cta-eyebrow">Work with us</div>
                <h2>Want something like this built?</h2>
                <p>Tell us what your business runs on. We&apos;ll map out how to automate it.</p>
                <div className="cta-btns">
                  <Link href="/contact" className="btn btn-primary">Start a project <span className="arrow">↗</span></Link>
                  <Link href="/work" className="btn btn-ghost">See all work</Link>
                </div>
              </div>
              <div className="cta-right">
                <a href="https://www.fiverr.com/s/Eg3AENe" target="_blank" rel="noopener noreferrer" className="cta-fiverr-badge">
                  <span className="stars">★★★★★</span>
                  <span className="rating">5.0</span>
                  <span>·</span>
                  <span>Verified on Fiverr</span>
                  <span className="arrow">↗</span>
                </a>
                <div className="cta-review-stack">
                  {[
                    { quote: "Great seller. Went far and beyond. Will definitely return.", name: "Jack H.", flag: "🇬🇧", country: "United Kingdom" },
                    { quote: "Exceptional full-stack developer! Significantly boosted our online visibility.", name: "janinfervallim", flag: "🇺🇸", country: "United States" },
                  ].map((r, i) => (
                    <div key={i} className="cta-review-item">
                      <blockquote>&ldquo;{r.quote}&rdquo;</blockquote>
                      <cite><span className="flag">{r.flag}</span>{r.name} &mdash; {r.country}</cite>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
