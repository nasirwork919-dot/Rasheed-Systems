import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageEffects from '@/components/PageEffects'
import SelectedProjects from '@/components/SelectedProjects'
import ServiceRail from '@/components/ServiceRail'
import HomeHero from '@/components/HomeHero'
import HomeProcess from '@/components/HomeProcess'
import HomeFaq from '@/components/HomeFaq'

export default function Home() {
  return (
    <>
      <PageEffects />
      <Header variant="home" />
      <main id="main-content" tabIndex={-1}>
        <HomeHero />
        <ServiceRail />

        <section className="selected-section" aria-labelledby="clients-projects-title">
          <div className="wrap">
            <div className="project-wordmark-intro reveal">
              <span className="section-label">02 / Clients &amp; projects</span>
              <h2 id="clients-projects-title">Good work. Real collaborations.</h2>
              <p>Explore a selection of the businesses and products we&apos;ve worked on.</p>
            </div>
            <SelectedProjects />
            <div className="project-wordmark-footer">
              <span>Have something in mind?</span>
              <Link href="/contact">Let&apos;s talk <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
        </section>

        <HomeProcess />
        <HomeFaq />

        <section className="proof-section">
          <div className="wrap proof-grid reveal">
            <div><span className="section-label">03 / Direct proof</span><h2>Small team.<br />Full ownership.</h2></div>
            <div className="proof-facts">
              <div><strong>2</strong><span>Brothers building every engagement</span></div>
              <div><strong>11</strong><span>Projects documented in this portfolio</span></div>
              <a href="https://www.fiverr.com/s/Eg3AENe" target="_blank" rel="noopener noreferrer"><strong>5.0</strong><span>Verified Fiverr profile ↗</span></a>
            </div>
          </div>
        </section>

        <section className="contact-ending"><div className="wrap reveal"><span className="section-label">Have a system in mind?</span><h2>Start with the problem.</h2><Link className="button primary" href="/contact">Tell us about it <span>↗</span></Link></div></section>
      </main>
      <Footer />
    </>
  )
}
