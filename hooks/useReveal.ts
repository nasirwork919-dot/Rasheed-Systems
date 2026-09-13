'use client'
import { useEffect } from 'react'

export function useReveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.reveal, .img-reveal').forEach(el => el.classList.add('in', 'img-in'))
      return
    }
    // Section / block reveals
    const revealIO = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('in')
      }),
      { threshold: 0.08, rootMargin: '0px 0px -24px 0px' }
    )

    // Image reveals (clip-path wipe)
    const imgIO = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('img-in')
      }),
      { threshold: 0.05 }
    )

    document.querySelectorAll('.reveal').forEach(el => revealIO.observe(el))
    document.querySelectorAll('.img-reveal').forEach(el => imgIO.observe(el))

    return () => { revealIO.disconnect(); imgIO.disconnect() }
  }, [])
}
