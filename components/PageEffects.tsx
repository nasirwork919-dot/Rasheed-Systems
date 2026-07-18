'use client'
import { useReveal } from '@/hooks/useReveal'
import { useCardGlow } from '@/hooks/useCardGlow'
import { useCursorGlow } from '@/hooks/useCursorGlow'

export default function PageEffects() {
  useReveal()
  useCardGlow()
  useCursorGlow()
  return null
}
