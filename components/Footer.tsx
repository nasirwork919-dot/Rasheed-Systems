import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-invitation">
          <span className="footer-eyebrow">Have something in mind?</span>
          <Link className="footer-talk" href="/contact">
            <span>Let&apos;s talk.</span>
            <span aria-hidden="true">↗</span>
          </Link>
        </div>

        <div className="footer-information">
          <div className="footer-positioning">
            <p>Independent minds.<br />Thoughtful systems.</p>
            <span>Pakistan · Worldwide</span>
            <a href="mailto:hello@rasheedsystems.com">hello@rasheedsystems.com</a>
          </div>

          <nav className="footer-navigation" aria-label="Footer navigation">
            <div>
              <span>Explore</span>
              <Link href="/services">Services</Link>
              <Link href="/work">Work</Link>
              <Link href="/about">About</Link>
            </div>
            <div>
              <span>Next step</span>
              <Link href="/contact">Start a project</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </nav>
        </div>

        <div className="footer-brand">
          <Image src="/logo-mark-transparent.png" alt="" width={306} height={282} />
          <p className="footer-wordmark"><span>Rasheed</span><span>Systems</span></p>
        </div>

        <div className="footer-base">
          <span>© 2026 Rasheed Systems</span>
          <a href="#main-content">Back to top <span aria-hidden="true">↑</span></a>
        </div>
      </div>
    </footer>
  )
}
