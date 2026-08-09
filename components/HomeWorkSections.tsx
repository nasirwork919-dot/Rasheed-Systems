'use client'
import { useState } from 'react'
import Link from 'next/link'
import { projects, type Project } from '@/lib/projects'

export default function HomeWorkSections() {
  const [active, setActive] = useState<Project>(projects[0])

  return (
    <div className="hw2-root">
      <div className="wrap hw2-grid">

        {/* ── project list ── */}
        <div>
          {projects.map((p, i) => {
            const isCase  = Boolean(p.slug)
            const href    = isCase ? `/work/${p.slug}` : (p.href ?? '#')
            return (
              <a
                key={p.slug ?? p.href}
                href={href}
                target={isCase ? undefined : '_blank'}
                rel={isCase ? undefined : 'noopener noreferrer'}
                className="hw2-item reveal"
                style={{ '--delay': `${i * 0.05}s` } as React.CSSProperties}
                onMouseEnter={() => setActive(p)}
              >
                <span className="hw2-num mono">{String(i + 1).padStart(2, '0')}</span>
                <div className="hw2-info">
                  <span className="hw2-cat mono">{p.tag}</span>
                  <h3 className="hw2-title">{p.title}</h3>
                </div>
                <span className="hw2-stack mono">{p.stack}</span>
                <span className="hw2-arrow">↗</span>
              </a>
            )
          })}
        </div>

        {/* ── sticky image preview ── */}
        <div className="hw2-preview" aria-hidden="true">
          {projects.map(p => (
            <div
              key={p.slug ?? p.href}
              className={`hw2-pimg${active === p ? ' hw2-pimg-on' : ''}`}
            >
              <img src={p.img} alt={p.title} />
              <div className="hw2-pimg-overlay" />
              <div className="hw2-pimg-foot">
                <span className="hw2-pimg-tag">{p.tag}</span>
                <span className="hw2-pimg-name">{p.title}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
