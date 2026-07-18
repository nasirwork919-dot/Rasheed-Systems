import Link from 'next/link'

const REVIEWS = [
  {
    quote: "Great seller. Did project as described. Went far and beyond. Will definitely return.",
    name: "Jack H.",
    flag: "🇬🇧",
    country: "United Kingdom",
  },
  {
    quote: "Exceptional full-stack developer! SEO techniques significantly boosted our online visibility.",
    name: "janinfervallim",
    flag: "🇺🇸",
    country: "United States",
  },
  {
    quote: "Fast, professional, delivered exactly what I needed within budget and on time.",
    name: "Vanessa K.",
    flag: "🇨🇦",
    country: "Canada",
  },
]

interface Props {
  label?: string
  headline: string
  sub: string
  primaryHref?: string
  primaryLabel?: string
  ghostHref?: string
  ghostLabel?: string
}

export default function CtaSection({
  label = 'Work with us',
  headline,
  sub,
  primaryHref = '/contact',
  primaryLabel = 'Start a project',
  ghostHref = '/work',
  ghostLabel = 'See our work',
}: Props) {
  return (
    <section className="cta-section">
      <div className="wrap">
        <div className="cta-inner reveal">

          <div className="cta-left">
            <div className="mono cta-eyebrow">{label}</div>
            <h2>{headline}</h2>
            <p>{sub}</p>
            <div className="cta-btns">
              <Link href={primaryHref} className="btn btn-primary">
                {primaryLabel} <span className="arrow">↗</span>
              </Link>
              <Link href={ghostHref} className="btn btn-ghost">
                {ghostLabel}
              </Link>
            </div>
          </div>

          <div className="cta-right">
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
            <div className="cta-review-stack">
              {REVIEWS.map((r, i) => (
                <div className="cta-review-item" key={i}>
                  <blockquote>&ldquo;{r.quote}&rdquo;</blockquote>
                  <cite>
                    <span className="flag">{r.flag}</span>
                    {r.name} &mdash; {r.country}
                  </cite>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
