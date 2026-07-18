'use client'
import { useEffect } from 'react'

export function useCursorGlow() {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (matchMedia('(hover: none)').matches) return

    const el = document.createElement('div')
    el.className = 'cursor-glow'
    document.body.appendChild(el)

    let cx = -9999, cy = -9999
    let tx = -9999, ty = -9999
    let visible = false
    let rafId: number

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    function tick() {
      cx = lerp(cx, tx, 0.1)
      cy = lerp(cy, ty, 0.1)
      el.style.transform = `translate(calc(${cx}px - 50%), calc(${cy}px - 50%))`
      rafId = requestAnimationFrame(tick)
    }

    const onMove = (e: MouseEvent) => {
      tx = e.clientX
      ty = e.clientY
      if (!visible) { el.style.opacity = '1'; visible = true }
    }
    const onLeave = () => { el.style.opacity = '0'; visible = false }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(rafId)
      el.remove()
    }
  }, [])
}
