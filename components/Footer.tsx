import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
      <div className="wrap foot">
        <Link href="/" className="brand">
          <span className="logo-mark">R<sup>2</sup></span>Rasheed Systems
        </Link>
        <span className="mono">© 2026 — AI systems &amp; software</span>
        <div className="foot-links">
          <Link href="/services">Services</Link>
          <Link href="/work">Work</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
    </footer>
  )
}
