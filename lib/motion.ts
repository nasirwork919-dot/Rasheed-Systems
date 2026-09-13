export const motion = {
  quick: 220,
  standard: 420,
  mask: 760,
  ease: 'cubic-bezier(.2,.75,.25,1)',
} as const

export function reducedMotionPreferred() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
