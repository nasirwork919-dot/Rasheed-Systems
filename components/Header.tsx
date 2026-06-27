'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const navLinks = [
  { href: '/services', label: 'Services' },
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <header id="hdr" className={scrolled ? 'scrolled' : ''}>
      <div className="wrap">
        <nav>
          <Link href="/" className="brand">
            <span className="logo-mark">R<sup>2</sup></span>Rasheed Systems
          </Link>
          <div className={`nav-links${menuOpen ? ' open' : ''}`} id="navlinks">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={pathname === link.href ? 'active' : ''}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/contact" className="nav-cta" onClick={() => setMenuOpen(false)}>
              Start a project
            </Link>
          </div>
          <button
            className="menu-btn"
            id="menuBtn"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(o => !o)}
          >
            Menu
          </button>
        </nav>
      </div>
    </header>
  )
}
