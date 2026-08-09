'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const navLinks = [
  { href: '/services', label: 'Services' },
  { href: '/work',     label: 'Work'     },
  { href: '/about',    label: 'About'    },
  { href: '/contact',  label: 'Contact'  },
]

export default function Header() {
  const pathname  = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open,     setOpen]     = useState(false)
  const [closing,  setClosing]  = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // instant close on route change — page transition covers the snap
  useEffect(() => {
    clearTimeout(timer.current)
    setOpen(false)
    setClosing(false)
    document.body.style.overflow = ''
  }, [pathname])

  // restore scroll on unmount
  useEffect(() => () => { document.body.style.overflow = '' }, [])

  const openMenu = () => {
    clearTimeout(timer.current)
    setClosing(false)
    setOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeMenu = () => {
    setClosing(true)
    // items out (≈0.43s) → overlay slides down (delay 0.46s, dur 0.40s) → done at 0.86s
    timer.current = setTimeout(() => {
      setOpen(false)
      setClosing(false)
      document.body.style.overflow = ''
    }, 920)
  }

  return (
    <>
      <header id="hdr" className={scrolled ? 'scrolled' : ''}>
        <div className="wrap">
          <nav>
            <Link href="/" className="brand">
              <span className="logo-mark">R<sup>2</sup></span>Rasheed Systems
            </Link>
            <div className="nav-links">
              {navLinks.map(l => (
                <Link key={l.href} href={l.href} className={pathname === l.href ? 'active' : ''}>
                  {l.label}
                </Link>
              ))}
              <Link href="/contact" className="nav-cta">Start a project</Link>
            </div>
            <button className="menu-btn" aria-label="Open menu" onClick={openMenu}>
              Menu
            </button>
          </nav>
        </div>
      </header>

      {open && (
        <div className={`mob-menu${closing ? ' is-closing' : ' is-open'}`} aria-modal="true" role="dialog">

          <div className="mob-menu-hdr">
            <Link href="/" className="brand">
              <span className="logo-mark">R<sup>2</sup></span>Rasheed Systems
            </Link>
            <button className="mob-close" onClick={closeMenu} aria-label="Close menu">
              Close <span aria-hidden="true">×</span>
            </button>
          </div>

          <nav className="mob-nav">
            {navLinks.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                className={`mob-nav-item${pathname === l.href ? ' active' : ''}`}
                style={{ '--i': i, '--ri': navLinks.length - 1 - i } as React.CSSProperties}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="mob-menu-foot">
            <Link href="/contact" className="btn btn-primary mob-cta">
              Start a project <span className="arrow">↗</span>
            </Link>
          </div>

        </div>
      )}
    </>
  )
}
