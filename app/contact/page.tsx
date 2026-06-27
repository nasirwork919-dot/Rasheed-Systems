import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContactForm from './ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Start a project with Rasheed Systems. Tell us what you\'re building and we\'ll map out how we\'d approach it.',
  openGraph: {
    title: 'Contact — Rasheed Systems',
    description: 'Start a project with Rasheed Systems. Tell us what you\'re building and we\'ll map out how we\'d approach it.',
    images: [{ url: '/og-image.png' }],
    url: '/contact',
  },
}

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <section className="page-head">
          <div className="ph-glow" />
          <div className="wrap">
            <div className="ph-grid">
              <div className="ph-left">
                <div className="eyebrow mono"><span className="bar" />Contact</div>
                <h1>Tell us what you&apos;re <span className="accent">building</span>.</h1>
                <p>Fill this out and you&apos;ll hear back from one of us — not a sales bot. The more detail, the better the first reply.</p>
              </div>
              <div className="ph-panel">
                <div className="ph-panel-head">
                  <span className="ph-panel-title">What to expect</span>
                  <span className="ph-panel-tag"><span className="live" />Replying</span>
                </div>
                <div className="ph-row"><span className="k">First reply</span><span className="v">~ 1 day</span></div>
                <div className="ph-row"><span className="k">You talk to</span><span className="v">The founders</span></div>
                <div className="ph-row"><span className="k">Time zones</span><span className="v">US·UK·UAE·IN·AU</span></div>
                <div className="ph-row"><span className="k">No</span><span className="v">Sales bots</span></div>
              </div>
            </div>
          </div>
        </section>
        <ContactForm />
      </main>
      <Footer />
    </>
  )
}
