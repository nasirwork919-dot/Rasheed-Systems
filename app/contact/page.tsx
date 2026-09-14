import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageEffects from '@/components/PageEffects'
import ContactForm from './ContactForm'

export const metadata: Metadata = { title: 'Contact', description: 'Start a project with Rasheed Systems. Describe the problem and speak directly with the founders.' }

export default function ContactPage() {
  return <><PageEffects /><Header /><main id="main-content" tabIndex={-1} className="contact-page">
    <section className="contact-enquiry" aria-labelledby="contact-title"><div className="wrap contact-enquiry-layout">
      <header className="contact-intro reveal">
        <span className="section-label">Contact / Rasheed Systems</span>
        <h1 id="contact-title">Tell us what<br />you have in mind.</h1>
        <p>A new product, a better workflow, or a system that needs attention. Start with a short outline.</p>
      </header>
      <ContactForm />
      <p className="contact-location"><span>Based in Pakistan.</span><span>Working worldwide.</span></p>
    </div></section>
  </main><Footer /></>
}
