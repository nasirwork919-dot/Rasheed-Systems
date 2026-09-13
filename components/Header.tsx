'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const links = [
  { href: '/services', label: 'Services' },
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Header({ variant = 'default' }: { variant?: 'default' | 'home' }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [overHomeHero, setOverHomeHero] = useState(variant === 'home')
  const closeRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (variant !== 'home') return
    const hero = document.querySelector<HTMLElement>('.home-hero-sequence')
    if (!hero) return
    let frame = 0
    const update = () => {
      frame = 0
      setOverHomeHero(window.scrollY < hero.offsetHeight - 100)
    }
    const request = () => { if (!frame) frame = window.requestAnimationFrame(update) }
    window.addEventListener('scroll', request, { passive: true })
    window.addEventListener('resize', request)
    update()
    return () => {
      window.removeEventListener('scroll', request)
      window.removeEventListener('resize', request)
      window.cancelAnimationFrame(frame)
    }
  }, [variant])

  useEffect(() => {
    if (!open) return
    const previous = document.activeElement as HTMLElement | null
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
      if (event.key !== 'Tab' || !menuRef.current) return
      const focusable = Array.from(menuRef.current.querySelectorAll<HTMLElement>('a, button'))
      const first = focusable[0]
      const last = focusable.at(-1)
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first?.focus()
      }
    }
    document.body.classList.add('menu-open')
    document.addEventListener('keydown', onKeyDown)
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 50)
    return () => {
      window.clearTimeout(focusTimer)
      document.body.classList.remove('menu-open')
      document.removeEventListener('keydown', onKeyDown)
      previous?.focus()
    }
  }, [open])

  const active = (href: string) => pathname === href || (href === '/work' && pathname.startsWith('/work/'))

  return (
    <header className={`site-header${variant === 'home' && overHomeHero ? ' site-header-home' : ''}`}>
      <div className="wrap header-inner">
        <Link href="/" className="brand" aria-label="Rasheed Systems home">
          <Image className="brand-logo" src="/logo-mark-transparent.png" alt="" width={306} height={282} priority /><span>Rasheed Systems</span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map(link => <Link key={link.href} href={link.href} aria-current={active(link.href) ? 'page' : undefined}>{link.label}</Link>)}
        </nav>
        <Link href="/contact" className="header-cta">Start a project <span aria-hidden="true">↗</span></Link>
        <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(true)}><span>Menu</span><i aria-hidden="true"><b /><b /></i></button>
      </div>

      <div className={`mobile-menu${open ? ' is-open' : ''}`} aria-hidden={!open} id="mobile-navigation" ref={menuRef}>
        <div className="mobile-menu-head">
          <Link href="/" className="brand" aria-label="Rasheed Systems home" tabIndex={open ? 0 : -1}><Image className="brand-logo" src="/logo-mark-transparent.png" alt="" width={306} height={282} /><span>Rasheed Systems</span></Link>
          <button ref={closeRef} className="menu-close" type="button" onClick={() => setOpen(false)} aria-label="Close menu">Close ×</button>
        </div>
        <nav aria-label="Mobile navigation">
          {links.map((link, index) => (
            <Link key={link.href} href={link.href} tabIndex={open ? 0 : -1} style={{ '--index': index } as React.CSSProperties} aria-current={active(link.href) ? 'page' : undefined}>
              <span>0{index + 1}</span>{link.label}
            </Link>
          ))}
        </nav>
        <Link href="/contact" className="mobile-contact" tabIndex={open ? 0 : -1}>Start a project <span aria-hidden="true">↗</span></Link>
      </div>
    </header>
  )
}
