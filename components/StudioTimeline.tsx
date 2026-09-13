'use client'

import { useEffect, useRef, useState } from 'react'

const stages = [
  { name: 'Discover', text: 'Understand the operation, its people, and the point where work breaks down.', artifact: 'Inputs / constraints / users' },
  { name: 'Design', text: 'Turn that reality into a clear system map, interface path, and technical boundary.', artifact: 'Flows / states / architecture' },
  { name: 'Deliver', text: 'Build in visible slices, test the complete path, and launch working software.', artifact: 'Product / services / data' },
  { name: 'Continue', text: 'Observe real use, support the system, and improve what matters after launch.', artifact: 'Support / iteration / growth' },
]

export default function StudioTimeline() {
  const [active, setActive] = useState(0)
  const root = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const items = root.current?.querySelectorAll<HTMLElement>('[data-stage]')
    if (!items) return
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.stage))
    }), { rootMargin: '-38% 0px -38% 0px' })
    items.forEach(item => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="timeline-experience" ref={root}>
      <ol className="timeline-copy">
        {stages.map((stage, index) => <li key={stage.name} data-stage={index} className={index === active ? 'active' : index < active ? 'complete' : ''}><span>0{index + 1}</span><div><h3>{stage.name}</h3><p>{stage.text}</p></div></li>)}
      </ol>
      <aside className="timeline-visual" aria-live="polite">
        <div className={`timeline-artifact artifact-${active}`} aria-hidden="true"><i /><i /><i /><i /><b /></div>
        <span className="section-label">Active stage / 0{active + 1}</span>
        <h3>{stages[active].name}</h3>
        <p>{stages[active].artifact}</p>
        <div className="timeline-progress">{stages.map((stage,index)=><i key={stage.name} className={index <= active ? 'active' : ''} />)}</div>
      </aside>
    </div>
  )
}
