'use client'
import { useEffect } from 'react'

export function useReveal() {
  useEffect(() => {
    // Section / block reveals
    const revealIO = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); revealIO.unobserve(e.target) }
      }),
      { threshold: 0.08, rootMargin: '0px 0px -24px 0px' }
    )

    // Image reveals (clip-path wipe)
    const imgIO = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('img-in'); imgIO.unobserve(e.target) }
      }),
      { threshold: 0.05 }
    )

    document.querySelectorAll('.reveal').forEach(el => revealIO.observe(el))
    document.querySelectorAll('.img-reveal').forEach(el => imgIO.observe(el))

    return () => { revealIO.disconnect(); imgIO.disconnect() }
  }, [])
}
