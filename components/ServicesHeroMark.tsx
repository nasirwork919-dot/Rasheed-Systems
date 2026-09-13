'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

const POINTER_X_LIMIT = 16
const POINTER_Y_LIMIT = 10
const POINTER_TILT_LIMIT = 3
const POINTER_EASING = 0.12

export default function ServicesHeroMark() {
  const markRef = useRef<HTMLDivElement>(null)
  const pointerLayerRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const mark = markRef.current
    const pointerLayer = pointerLayerRef.current
    const hero = mark?.closest<HTMLElement>('.services-hero')

    if (!mark || !pointerLayer || !hero) return

    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let isVisible = true
    let currentX = 0
    let currentY = 0
    let currentTilt = 0
    let targetX = 0
    let targetY = 0
    let targetTilt = 0

    const shouldTrack = () => finePointer.matches && !reducedMotion.matches

    const updatePauseState = () => {
      mark.classList.toggle('is-motion-paused', !isVisible || document.hidden)
    }

    const animatePointer = () => {
      frame = 0
      if (!isVisible || document.hidden || !shouldTrack()) return

      currentX += (targetX - currentX) * POINTER_EASING
      currentY += (targetY - currentY) * POINTER_EASING
      currentTilt += (targetTilt - currentTilt) * POINTER_EASING
      pointerLayer.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) rotate(${currentTilt}deg)`

      if (
        Math.abs(targetX - currentX) > 0.02 ||
        Math.abs(targetY - currentY) > 0.02 ||
        Math.abs(targetTilt - currentTilt) > 0.02
      ) {
        frame = window.requestAnimationFrame(animatePointer)
      }
    }

    const requestPointerFrame = () => {
      if (!frame && isVisible && !document.hidden && shouldTrack()) {
        frame = window.requestAnimationFrame(animatePointer)
      }
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      const bounds = hero.getBoundingClientRect()
      const x = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width) * 2 - 1))
      const y = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height) * 2 - 1))
      targetX = x * POINTER_X_LIMIT
      targetY = y * POINTER_Y_LIMIT
      targetTilt = x * POINTER_TILT_LIMIT
      requestPointerFrame()
    }

    const resetPointer = () => {
      targetX = 0
      targetY = 0
      targetTilt = 0
      requestPointerFrame()
    }

    const configurePointerTracking = () => {
      hero.removeEventListener('pointermove', handlePointerMove)
      hero.removeEventListener('pointerleave', resetPointer)
      if (shouldTrack()) {
        hero.addEventListener('pointermove', handlePointerMove)
        hero.addEventListener('pointerleave', resetPointer)
      } else {
        if (frame) window.cancelAnimationFrame(frame)
        frame = 0
        currentX = 0
        currentY = 0
        currentTilt = 0
        targetX = 0
        targetY = 0
        targetTilt = 0
        pointerLayer.style.transform = ''
      }
    }

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
      if (!isVisible) resetPointer()
      updatePauseState()
      if (isVisible) requestPointerFrame()
    })

    const handleVisibilityChange = () => {
      updatePauseState()
      if (!document.hidden) requestPointerFrame()
    }

    configurePointerTracking()
    observer.observe(hero)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    finePointer.addEventListener('change', configurePointerTracking)
    reducedMotion.addEventListener('change', configurePointerTracking)

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      observer.disconnect()
      hero.removeEventListener('pointermove', handlePointerMove)
      hero.removeEventListener('pointerleave', resetPointer)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      finePointer.removeEventListener('change', configurePointerTracking)
      reducedMotion.removeEventListener('change', configurePointerTracking)
    }
  }, [])

  return (
    <div ref={markRef} className="services-hero-mark" aria-hidden="true">
      <span ref={pointerLayerRef} className="services-hero-mark-pointer">
        <span className="services-hero-mark-float">
          <Image src="/logo-mark-transparent.png" alt="" width={306} height={282} priority />
        </span>
      </span>
    </div>
  )
}
