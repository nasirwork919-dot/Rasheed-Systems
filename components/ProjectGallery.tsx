'use client'
import { useState, useEffect, useCallback } from 'react'
import type { GalleryImage } from '@/lib/projectDetails'

export default function ProjectGallery({ images }: { images: GalleryImage[] }) {
  const [open, setOpen] = useState<number | null>(null)

  const close = useCallback(() => setOpen(null), [])

  const prev = useCallback(() =>
    setOpen(i => (i === null ? null : (i - 1 + images.length) % images.length)), [images.length])

  const next = useCallback(() =>
    setOpen(i => (i === null ? null : (i + 1) % images.length)), [images.length])

  useEffect(() => {
    if (open === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, close, prev, next])

  return (
    <>
      <div className="gallery-grid">
        {images.map((img, i) => (
          <figure
            key={img.src}
            className="gallery-thumb"
            onClick={() => setOpen(i)}
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && setOpen(i)}
            aria-label={`Open ${img.caption}`}
          >
            <img src={img.src} alt={img.caption} />
            <figcaption>{img.caption}</figcaption>
          </figure>
        ))}
      </div>

      {open !== null && (
        <div
          className="lightbox"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <button className="lightbox-close" onClick={close} aria-label="Close">✕</button>
          <button className="lightbox-btn lightbox-prev" onClick={e => { e.stopPropagation(); prev() }} aria-label="Previous">←</button>
          <img
            className="lightbox-img"
            src={images[open].src}
            alt={images[open].caption}
            onClick={e => e.stopPropagation()}
          />
          <button className="lightbox-btn lightbox-next" onClick={e => { e.stopPropagation(); next() }} aria-label="Next">→</button>
          <p className="lightbox-caption">{images[open].caption}</p>
        </div>
      )}
    </>
  )
}
