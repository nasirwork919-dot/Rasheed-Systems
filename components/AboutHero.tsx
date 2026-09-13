import Image from 'next/image'

export default function AboutHero() {
  return (
    <section className="about-hero-refined" aria-labelledby="about-title">
      <div className="wrap about-hero-grid">
        <div className="about-heading">
          <span className="section-label">About / Rasheed Systems</span>
          <h1 id="about-title">Two minds.<br /><em>One standard.</em></h1>
        </div>
        <div className="about-view about-plan">
          <div className="about-curtain" aria-hidden="true" />
          <div className="about-map" aria-hidden="true"><i /><i /><i /><i /><span>Map the operation</span></div>
          <p><span>Nasir Rasheed</span>Architecture · AI systems · Delivery</p>
        </div>
        <div className="about-view about-build">
          <div className="about-curtain" aria-hidden="true" />
          <Image src="/work/strive-soccer-academy/strive-agent.webp" alt="A real AI agent dashboard built for Strive Soccer Academy" fill sizes="(max-width: 800px) 100vw, 48vw" priority />
          <p><span>Zain Rasheed</span>Development · Product · Growth</p>
        </div>
        <p className="about-intro">A founder-run engineering studio operated by two brothers. One side maps the system; the other turns it into dependable software.</p>
        <div className="about-connector" aria-hidden="true"><span>Plan</span><i /><span>Build</span></div>
      </div>
    </section>
  )
}
