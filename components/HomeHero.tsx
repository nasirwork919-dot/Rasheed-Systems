'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import HeroFilmstripGroup from '@/components/home-hero/HeroFilmstripGroup'
import { useFilmstripMotion } from '@/components/home-hero/useFilmstripMotion'

export default function HomeHero() {
  const root = useRef<HTMLElement>(null)
  const viewport = useRef<HTMLDivElement>(null)
  const strip = useRef<HTMLDivElement>(null)
  const measuredGroup = useRef<HTMLDivElement>(null)
  const [motionChoice, setMotionChoice] = useState<'auto' | 'paused' | 'playing'>('auto')
  const [reducedMotion, setReducedMotion] = useState(false)
  const paused = motionChoice === 'paused' || reducedMotion && motionChoice === 'auto'

  useFilmstripMotion({ root, viewport, strip, measuredGroup, paused: motionChoice === 'paused', allowReducedMotion: motionChoice === 'playing' })

  useEffect(() => {
    const query = matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReducedMotion(query.matches)
    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  return (
    <section className="home-hero-sequence" ref={root} aria-labelledby="home-title">
      <div className="home-hero-frame">
        <div className="hero-filmstrip-viewport" ref={viewport} aria-label="Complete project image gallery">
          <div className="hero-filmstrip" ref={strip}>
            <HeroFilmstripGroup duplicate />
            <HeroFilmstripGroup groupRef={measuredGroup} />
            <HeroFilmstripGroup duplicate />
          </div>
        </div>

        <div className="hero-identity-band">
          <div className="hero-identity-copy">
            <p>Independent engineering studio</p>
            <h1 id="home-title">Rasheed Systems</h1>
          </div>
          <p className="hero-support">AI systems. Custom software. GoHighLevel automation.</p>
          <div className="hero-actions">
            <button type="button" className="hero-button hero-motion-toggle" onClick={() => setMotionChoice(paused ? 'playing' : 'paused')} aria-pressed={paused}>{paused ? 'Play gallery' : 'Pause gallery'}</button>
            <Link href="/work" className="hero-button hero-button-primary">View projects <span aria-hidden="true">&#8599;</span></Link>
            <Link href="/contact" className="hero-button">Start a project</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
