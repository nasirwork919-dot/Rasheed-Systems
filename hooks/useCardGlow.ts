'use client'
import { useEffect } from 'react'

export function useCardGlow() {
  useEffect(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>('[data-tilt]'))

    const handlers = cards.map(card => {
      const handler = (e: MouseEvent) => {
        const r = card.getBoundingClientRect()
        card.style.setProperty('--mx', e.clientX - r.left + 'px')
        card.style.setProperty('--my', e.clientY - r.top + 'px')
      }
      card.addEventListener('mousemove', handler)
      return { card, handler }
    })

    return () => {
      handlers.forEach(({ card, handler }) => card.removeEventListener('mousemove', handler))
    }
  }, [])
}
