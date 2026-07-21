'use client'
import { useRef } from 'react'
import Link from 'next/link'
import { projects } from '@/lib/projects'

export default function WorkSlider() {
  const trackRef = useRef<HTMLDivElement>(null)
  const drag = useRef({ active: false, startX: 0, scrollLeft: 0 })

  const scroll = (dir: number) => {
    trackRef.current?.scrollBy({ left: dir * 400, behavior: 'smooth' })
  }

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const track = trackRef.current!
    drag.current = { active: true, startX: e.pageX - track.offsetLeft, scrollLeft: track.scrollLeft }
    track.style.cursor = 'grabbing'
    track.style.userSelect = 'none'
  }

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!drag.current.active) return
    const track = trackRef.current!
    const x = e.pageX - track.offsetLeft
    track.scrollLeft = drag.current.scrollLeft - (x - drag.current.startX) * 1.4
  }

  const stopDrag = () => {
    if (!trackRef.current) return
    drag.current.active = false
    trackRef.current.style.cursor = 'grab'
    trackRef.current.style.userSelect = ''
  }

  return (
    <div className="slider-wrap reveal">
      <div
        className="slider-track"
        ref={trackRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
      >
        {projects.map(p => {
          const inner = (
            <>
              <div className="card-top">
                <span className="status"><span className="live" />Live</span>
                <span className="tag">{p.tag}</span>
              </div>
              <div className="card-preview">
                <img src={p.img} alt={`${p.title} preview`} draggable={false} />
              </div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <div className="meta">
                <span>Role · <b>{p.role}</b></span>
                <span>Stack · <b>{p.stack}</b></span>
              </div>
              <span className="card-visit">
                {p.slug ? 'View case study' : 'Visit live site'}{' '}
                <span className="arrow">↗</span>
              </span>
            </>
          )

          return p.slug ? (
            <Link
              key={p.slug}
              href={`/work/${p.slug}`}
              className="card slider-card"
              data-tilt=""
              draggable={false}
            >
              {inner}
            </Link>
          ) : (
            <a
              key={p.href}
              className="card slider-card"
              data-tilt=""
              href={p.href}
              target="_blank"
              rel="noopener"
              draggable={false}
            >
              {inner}
            </a>
          )
        })}
      </div>
      <div className="slider-nav">
        <button className="slider-btn" onClick={() => scroll(-1)} aria-label="Previous">←</button>
        <button className="slider-btn" onClick={() => scroll(1)} aria-label="Next">→</button>
      </div>
    </div>
  )
}
