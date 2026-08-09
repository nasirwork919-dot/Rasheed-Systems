'use client'
import Link from 'next/link'
import { projects, type Project } from '@/lib/projects'

const webProjects = projects.filter(p => p.homeGroup === 'web')
const aiProjects  = projects.filter(p => p.homeGroup === 'ai')
const ghlProjects = projects.filter(p => p.homeGroup === 'ghl')

/* ── Small visit button ── */
function VisitBtn({ p }: { p: Project }) {
  if (p.slug) {
    return (
      <Link href={`/work/${p.slug}`} className="hw-btn hw-btn-signal">
        Case study ↗
      </Link>
    )
  }
  return (
    <a href={p.href} target="_blank" rel="noopener noreferrer" className="hw-btn">
      Visit site ↗
    </a>
  )
}

function VisitBtnInv({ p }: { p: Project }) {
  return (
    <a href={p.href} target="_blank" rel="noopener noreferrer" className="hw-btn hw-btn-inv">
      Visit site ↗
    </a>
  )
}

/* ── Web card ── */
function WebCard({ p }: { p: Project }) {
  return (
    <div className="hw-card reveal" data-tilt="">
      <div className="hw-preview img-reveal">
        <img src={p.img} alt={p.title} />
      </div>
      <div className="hw-body">
        <div className="hw-card-top">
          <span className="hw-tag">{p.tag}</span>
          <span className="hw-live"><span className="live" />Live</span>
        </div>
        <h3 className="hw-title">{p.title}</h3>
        <p className="hw-desc">{p.desc}</p>
        <div className="hw-foot">
          <span className="mono hw-meta">{p.role}</span>
          <VisitBtn p={p} />
        </div>
      </div>
    </div>
  )
}

/* ── AI card ── */
function AiCard({ p }: { p: Project }) {
  return (
    <div className="hw-card hw-ai-card reveal" data-tilt="">
      <div className="hw-preview img-reveal">
        <img src={p.img} alt={p.title} />
      </div>
      <div className="hw-body">
        <div className="hw-card-top">
          <span className="hw-tag hw-tag-inv">{p.tag}</span>
          <span className="hw-live hw-live-inv"><span className="live" />Live</span>
        </div>
        <h3 className="hw-title hw-title-inv">{p.title}</h3>
        <p className="hw-desc hw-desc-inv">{p.desc}</p>
        <div className="hw-foot">
          <span className="mono hw-meta hw-meta-inv">{p.role}</span>
          <VisitBtnInv p={p} />
        </div>
      </div>
    </div>
  )
}

/* ── GHL card (landscape) ── */
function GhlCard({ p }: { p: Project }) {
  return (
    <div className="hw-ghl-card reveal">
      <div className="hw-ghl-img img-reveal">
        <img src={p.img} alt={p.title} />
      </div>
      <div className="hw-ghl-body">
        <div className="hw-card-top">
          <span className="hw-tag hw-tag-ghl">{p.tag}</span>
          <span className="hw-ghl-badge mono">GoHighLevel</span>
        </div>
        <h3 className="hw-title">{p.title}</h3>
        <p className="hw-desc">{p.desc}</p>
        <div className="hw-foot">
          <span className="mono hw-meta">{p.stack}</span>
          <VisitBtn p={p} />
        </div>
      </div>
    </div>
  )
}

/* ── Section label ── */
function SectionLabel({ label, count, inv }: { label: string; count: number; inv?: boolean }) {
  return (
    <div className={`hw-sec-head${inv ? ' hw-sec-head-inv' : ''} reveal`}>
      <span className={`mono hw-sec-label${inv ? ' hw-sec-label-inv' : ''}`}>{label}</span>
      <span className={`hw-sec-count${inv ? ' hw-sec-count-inv' : ''}`}>{count} projects</span>
      <div className="hw-sec-rule" />
    </div>
  )
}

export default function HomeWorkSections() {
  return (
    <div className="hw-root">

      {/* ── WEB PROJECTS ── */}
      <div className="hw-section">
        <div className="wrap">
          <SectionLabel label="Web Projects" count={webProjects.length} />
          <div className="hw-web-grid">
            {webProjects.map(p => <WebCard key={p.href ?? p.slug} p={p} />)}
          </div>
        </div>
      </div>

      {/* ── AI · AUTOMATION · CRM ── */}
      <div className="hw-section hw-ai-band">
        <div className="wrap">
          <SectionLabel label="AI · Automation · CRM" count={aiProjects.length} inv />
          <div className="hw-ai-grid">
            {aiProjects.map(p => <AiCard key={p.href ?? p.slug} p={p} />)}
          </div>
        </div>
      </div>

      {/* ── GOHIGHLEVEL ── */}
      <div className="hw-section">
        <div className="wrap">
          <SectionLabel label="GoHighLevel" count={ghlProjects.length} />
          <div className="hw-ghl-grid">
            {ghlProjects.map(p => <GhlCard key={p.href ?? p.slug} p={p} />)}
          </div>
        </div>
      </div>

    </div>
  )
}
