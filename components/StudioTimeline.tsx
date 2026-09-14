const stages = [
  { title: 'Discover', description: 'Understand the operation, the people, and the problem to solve.' },
  { title: 'Design', description: 'Turn that understanding into a clear system map and practical plan.' },
  { title: 'Deliver', description: 'Build, review, test, and launch the agreed solution.' },
  { title: 'Continue', description: 'Hand over the system and agree on the support and improvements ahead.' },
]

export default function StudioTimeline() {
  return (
    <ol className="about-process-timeline">
      {stages.map((stage, index) => (
        <li className="reveal" key={stage.title}>
          <span className="about-process-number">{String(index + 1).padStart(2, '0')}</span>
          <h3>{stage.title}</h3>
          <p>{stage.description}</p>
        </li>
      ))}
    </ol>
  )
}
