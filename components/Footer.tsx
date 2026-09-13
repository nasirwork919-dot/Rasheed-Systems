import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div><Link href="/" className="brand" aria-label="Rasheed Systems home"><Image className="brand-logo" src="/logo-mark-transparent.png" alt="" width={306} height={282} /> Rasheed Systems</Link><p>Founder-run software engineering studio.</p></div>
        <nav aria-label="Footer navigation"><Link href="/services">Services</Link><Link href="/work">Work</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link></nav>
        <div className="footer-contact"><span className="label">Write to us</span><a href="mailto:hello@rasheedsystems.com">hello@rasheedsystems.com</a><span>Pakistan · Working worldwide</span></div>
      </div>
      <div className="wrap footer-base"><span>© 2026 Rasheed Systems</span><span>AI systems · Software · Automation</span></div>
    </footer>
  )
}
