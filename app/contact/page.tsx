import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageEffects from '@/components/PageEffects'
import ContactForm from './ContactForm'

export const metadata: Metadata = { title: 'Contact', description: 'Start a project with Rasheed Systems. Describe the problem and speak directly with the founders.' }

export default function ContactPage() {
  return <><PageEffects /><Header /><main id="main-content" tabIndex={-1} className="contact-page">
    <section className="contact-hero"><div className="wrap"><span className="section-label">Contact / New enquiry</span><h1>Start with<br /><em>the problem.</em></h1><p>You’ll hear from one of the two people who may build it—not a sales layer.</p></div></section>
    <section className="contact-main"><div className="wrap contact-layout"><aside className="contact-details reveal"><span className="section-label">Direct contact</span><h2>A useful first note can be simple.</h2><p>Tell us what currently happens, where it breaks down, and what a better version should make possible.</p><dl><div><dt>Email</dt><dd><a href="mailto:hello@rasheedsystems.com">hello@rasheedsystems.com</a></dd></div><div><dt>Based in</dt><dd>Pakistan · Working worldwide</dd></div><div><dt>You’ll speak with</dt><dd>Nasir or Zain Rasheed</dd></div></dl></aside><ContactForm /></div></section>
  </main><Footer /></>
}
