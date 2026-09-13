'use client'

import { useEffect, useRef, type RefObject } from 'react'

export const DESKTOP_TABLET_SPEED_PX_PER_SECOND = 60
export const MOBILE_SPEED_PX_PER_SECOND = 35
const MOBILE_BREAKPOINT_PX = 640

export function useFilmstripMotion({
  root,
  viewport,
  strip,
  measuredGroup,
  paused,
  allowReducedMotion,
}: {
  root: RefObject<HTMLElement | null>
  viewport: RefObject<HTMLDivElement | null>
  strip: RefObject<HTMLDivElement | null>
  measuredGroup: RefObject<HTMLDivElement | null>
  paused: boolean
  allowReducedMotion: boolean
}) {
  const pausedRef = useRef(paused)
  const reducedOverrideRef = useRef(allowReducedMotion)

  useEffect(() => {
    pausedRef.current = paused
    reducedOverrideRef.current = allowReducedMotion
    dispatchEvent(new Event('hero-motion-state'))
  }, [allowReducedMotion, paused])

  useEffect(() => {
    const section = root.current
    const scroller = viewport.current
    const track = strip.current
    const group = measuredGroup.current
    if (!section || !scroller || !track || !group) return

    const reducedQuery = matchMedia('(prefers-reduced-motion: reduce)')
    const mobileQuery = matchMedia(`(max-width: ${MOBILE_BREAKPOINT_PX - 1}px)`)
    let cycleWidth = 0
    let position = 0
    let frame = 0
    let previousTime = performance.now()
    let visible = !document.hidden
    let nearby = true
    let interacting = false
    let resumeTimer = 0
    let pointerId: number | null = null
    let pointerStartX = 0
    let pointerStartY = 0
    let pointerStartPosition = 0
    let dragAxis: 'x' | 'y' | null = null
    let suppressClickUntil = 0
    let reducedWasActive = false

    const speed = () => mobileQuery.matches ? MOBILE_SPEED_PX_PER_SECOND : DESKTOP_TABLET_SPEED_PX_PER_SECOND
    const reducedActive = () => reducedQuery.matches && !reducedOverrideRef.current
    const shouldMove = () => visible && nearby && !pausedRef.current && !reducedActive() && !interacting && cycleWidth > 0

    const normalize = () => {
      if (!cycleWidth) return
      while (position >= cycleWidth * 2) position -= cycleWidth
      while (position < cycleWidth) position += cycleWidth
    }

    const render = () => {
      if (reducedActive()) return
      normalize()
      track.style.transform = `translate3d(${-position}px, 0, 0)`
      section.dataset.filmstripPhase = Math.round(position - cycleWidth).toString()
    }

    const updateMetrics = () => {
      section.dataset.filmstripCycle = Math.round(cycleWidth).toString()
      section.dataset.filmstripSpeed = speed().toString()
      section.dataset.filmstripDuration = cycleWidth ? (cycleWidth / speed()).toFixed(3) : '0'
    }

    const measure = () => {
      const nextCycleWidth = group.getBoundingClientRect().width
      if (!nextCycleWidth) return
      const progress = cycleWidth
        ? (((position - cycleWidth) % cycleWidth) + cycleWidth) % cycleWidth / cycleWidth
        : 0
      cycleWidth = nextCycleWidth
      position = cycleWidth * (1 + progress)
      updateMetrics()
      render()
    }

    const tick = (time: number) => {
      const elapsedSeconds = Math.min(.064, (time - previousTime) / 1000)
      previousTime = time
      if (!shouldMove()) {
        frame = 0
        return
      }
      position += speed() * elapsedSeconds
      render()
      frame = requestAnimationFrame(tick)
    }

    const start = () => {
      if (frame || !shouldMove()) return
      previousTime = performance.now()
      frame = requestAnimationFrame(tick)
    }

    const stop = () => {
      cancelAnimationFrame(frame)
      frame = 0
    }

    const sync = () => {
      const isReduced = reducedActive()
      section.dataset.motion = isReduced ? 'reduced' : pausedRef.current ? 'paused' : 'playing'
      updateMetrics()

      if (isReduced) {
        stop()
        track.style.transform = 'none'
        if (!reducedWasActive) scroller.scrollLeft = 0
      } else {
        if (reducedWasActive) scroller.scrollLeft = 0
        render()
        if (shouldMove()) start()
        else stop()
      }
      reducedWasActive = isReduced
    }

    const resumeAfterInteraction = () => {
      clearTimeout(resumeTimer)
      resumeTimer = window.setTimeout(() => {
        interacting = false
        section.dataset.dragging = 'false'
        start()
      }, 650)
    }

    const onVisibility = () => {
      visible = !document.hidden
      sync()
    }

    const onPointerDown = (event: PointerEvent) => {
      if (reducedActive() || event.button !== 0) return
      pointerId = event.pointerId
      pointerStartX = event.clientX
      pointerStartY = event.clientY
      pointerStartPosition = position
      dragAxis = null
      interacting = true
      clearTimeout(resumeTimer)
      stop()
    }

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerId !== pointerId) return
      const deltaX = event.clientX - pointerStartX
      const deltaY = event.clientY - pointerStartY
      if (!dragAxis && Math.max(Math.abs(deltaX), Math.abs(deltaY)) > 6) {
        dragAxis = Math.abs(deltaX) > Math.abs(deltaY) ? 'x' : 'y'
      }
      if (dragAxis !== 'x') return
      event.preventDefault()
      section.dataset.dragging = 'true'
      suppressClickUntil = performance.now() + 500
      position = pointerStartPosition - deltaX
      render()
    }

    const onPointerEnd = (event: PointerEvent) => {
      if (event.pointerId !== pointerId) return
      pointerId = null
      resumeAfterInteraction()
    }

    const onClickCapture = (event: MouseEvent) => {
      if (performance.now() >= suppressClickUntil) return
      event.preventDefault()
      event.stopPropagation()
    }

    const onFocusIn = (event: FocusEvent) => {
      if (reducedActive()) return
      interacting = true
      clearTimeout(resumeTimer)
      stop()
      const panel = (event.target as HTMLElement).closest<HTMLElement>('.hero-film-panel')
      if (!panel) return
      position = panel.offsetLeft - (scroller.clientWidth - panel.offsetWidth) / 2
      render()
    }

    const onFocusOut = (event: FocusEvent) => {
      if (scroller.contains(event.relatedTarget as Node | null)) return
      resumeAfterInteraction()
    }

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      nearby = entry.isIntersecting
      sync()
    }, { rootMargin: '200px 0px' })
    const resizeObserver = new ResizeObserver(measure)

    intersectionObserver.observe(section)
    resizeObserver.observe(group)
    document.addEventListener('visibilitychange', onVisibility)
    scroller.addEventListener('pointerdown', onPointerDown)
    scroller.addEventListener('pointermove', onPointerMove)
    scroller.addEventListener('pointerup', onPointerEnd)
    scroller.addEventListener('pointercancel', onPointerEnd)
    scroller.addEventListener('click', onClickCapture, true)
    scroller.addEventListener('focusin', onFocusIn)
    scroller.addEventListener('focusout', onFocusOut)
    group.addEventListener('load', measure, true)
    reducedQuery.addEventListener('change', sync)
    mobileQuery.addEventListener('change', measure)
    addEventListener('hero-motion-state', sync)
    measure()
    sync()

    return () => {
      stop()
      clearTimeout(resumeTimer)
      intersectionObserver.disconnect()
      resizeObserver.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      scroller.removeEventListener('pointerdown', onPointerDown)
      scroller.removeEventListener('pointermove', onPointerMove)
      scroller.removeEventListener('pointerup', onPointerEnd)
      scroller.removeEventListener('pointercancel', onPointerEnd)
      scroller.removeEventListener('click', onClickCapture, true)
      scroller.removeEventListener('focusin', onFocusIn)
      scroller.removeEventListener('focusout', onFocusOut)
      group.removeEventListener('load', measure, true)
      reducedQuery.removeEventListener('change', sync)
      mobileQuery.removeEventListener('change', measure)
      removeEventListener('hero-motion-state', sync)
    }
  }, [measuredGroup, root, strip, viewport])
}
