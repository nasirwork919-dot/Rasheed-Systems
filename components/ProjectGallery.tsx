'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { GalleryImage } from '@/lib/projectDetails'

export default function ProjectGallery({ images }: { images: GalleryImage[] }) {
  const [open, setOpen] = useState<number | null>(null)
  const closeButton = useRef<HTMLButtonElement>(null)
  const trigger = useRef<HTMLElement | null>(null)
  const close = useCallback(() => setOpen(null), [])
  const move = useCallback((by: number) => setOpen(index => index === null ? null : (index + by + images.length) % images.length), [images.length])

  useEffect(() => {
    if (open === null) return
    const oldOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButton.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
      if (event.key === 'ArrowLeft') move(-1)
      if (event.key === 'ArrowRight') move(1)
      if (event.key === 'Tab') {
        const dialog = closeButton.current?.closest('[role="dialog"]')
        const buttons = Array.from(dialog?.querySelectorAll<HTMLButtonElement>('button') ?? [])
        const first = buttons[0], last = buttons.at(-1)
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
      }
    }
    addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = oldOverflow; removeEventListener('keydown', onKey); trigger.current?.focus() }
  }, [open, close, move])

  const show = (index: number, element: HTMLElement) => { trigger.current = element; setOpen(index) }

  return <>
    <div className="gallery-grid">
      {images.map((image, index) => <figure className="gallery-item reveal" key={image.src}>
        <button type="button" onClick={event => show(index, event.currentTarget)} aria-label={`Open image: ${image.caption}`}>
          <span className="gallery-image"><Image src={image.src} alt={image.caption} fill sizes="(max-width: 700px) 100vw, 50vw" /></span>
          <figcaption><span>{String(index + 1).padStart(2, '0')}</span>{image.caption}</figcaption>
        </button>
      </figure>)}
    </div>
    {open !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${images[open].caption} image viewer`} onMouseDown={event => { if (event.target === event.currentTarget) close() }}>
      <button ref={closeButton} className="lightbox-close" type="button" onClick={close}>Close ×</button>
      <button className="lightbox-prev" type="button" onClick={() => move(-1)} aria-label="Previous image">←</button>
      <figure><div className="lightbox-image"><Image src={images[open].src} alt={images[open].caption} fill sizes="90vw" priority /></div><figcaption>{images[open].caption} · {open + 1} / {images.length}</figcaption></figure>
      <button className="lightbox-next" type="button" onClick={() => move(1)} aria-label="Next image">→</button>
    </div>}
  </>
}
