'use client'

import Link from 'next/link'
import { useState } from 'react'

const projects = [
  { project: 'Website refresh', stage: 'Design review', nextStep: 'Review layouts' },
  { project: 'Customer portal', stage: 'Development', nextStep: 'Check the latest build' },
  { project: 'Booking flow', stage: 'Planning', nextStep: 'Confirm requirements' },
] as const

const capabilities = [
  ['01', 'Product & interface', 'Clear journeys and responsive screens.'],
  ['02', 'Application development', 'Accounts, data, billing, and connected services.'],
  ['03', 'Launch & handover', 'Deployment, documentation, and agreed support.'],
] as const

const sampleFiles = [
  { name: 'Project brief.pdf', project: 'Booking flow' },
  { name: 'Interface layouts.pdf', project: 'Website refresh' },
  { name: 'Handover notes.pdf', project: 'Customer portal' },
] as const

type Preview = 'desktop' | 'mobile'
type View = 'overview' | 'projects' | 'files'

export default function WebAppsSaasDetail() {
  const [preview, setPreview] = useState<Preview>('desktop')
  const [selectedView, setSelectedView] = useState<View>('projects')

  return (
    <article className="webapp-detail reveal" id="service-web-apps-saas" aria-labelledby="webapp-detail-title">
      <header className="webapp-detail-heading">
        <span className="section-label">03 / WEB APPS &amp; SAAS</span>
        <h2 id="webapp-detail-title">Turn a good idea into a useful product.</h2>
        <div>
          <p>From the first interface to the systems behind it, we build web applications around what your users need to do.</p>
          <Link className="webapp-detail-cta" href="/contact">Discuss your product <span aria-hidden="true">↗</span></Link>
        </div>
      </header>

      <div className="webapp-preview-heading">
        <div><span>A PRODUCT THAT FITS THE SCREEN</span><span>Illustrative example</span></div>
        <div className="webapp-preview-controls" role="group" aria-label="Product preview size">
          {(['desktop', 'mobile'] as const).map(option => (
            <button
              type="button"
              aria-pressed={preview === option}
              onClick={() => setPreview(option)}
              key={option}
            >
              {option[0].toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className={`webapp-product-stage webapp-product-stage--${preview}`}>
        <section className="webapp-product-preview" aria-label="Illustrative client workspace preview">
          <header className="webapp-app-header"><strong>Client workspace</strong><span aria-hidden="true">R²</span></header>
          <div className="webapp-app-body">
            <nav className="webapp-app-sidebar" aria-label="Sample workspace views">
              {(['overview', 'projects', 'files'] as const).map(view => (
                <button
                  type="button"
                  aria-controls="webapp-view-panel"
                  aria-pressed={selectedView === view}
                  onClick={() => setSelectedView(view)}
                  key={view}
                >
                  {view[0].toUpperCase() + view.slice(1)}
                </button>
              ))}
            </nav>
            <div className="webapp-app-main">
              <div className="webapp-view" id="webapp-view-panel" key={selectedView}>
                {selectedView === 'projects' && <>
                  <h3>Your projects</h3>
                  <p>Keep work, files, and next steps together.</p>
                  <table className="webapp-records">
                    <thead><tr><th scope="col">Project</th><th scope="col">Stage</th><th scope="col">Next step</th></tr></thead>
                    <tbody>
                      {projects.map(project => (
                        <tr key={project.project}>
                          <th scope="row">{project.project}</th>
                          <td data-label="Stage">{project.stage}</td>
                          <td data-label="Next step">{project.nextStep}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>}

                {selectedView === 'overview' && <>
                  <h3>Workspace overview</h3>
                  <dl className="webapp-overview-summary">
                    <div><dt>Total projects</dt><dd>{projects.length}</dd></div>
                    {(['Planning', 'Design review', 'Development'] as const).map(stage => (
                      <div key={stage}><dt>{stage}</dt><dd>{projects.filter(project => project.stage === stage).length}</dd></div>
                    ))}
                  </dl>
                  <h4>Next steps</h4>
                  <ul className="webapp-next-steps">
                    {projects.map(project => <li key={project.project}><strong>{project.project}</strong><span>{project.nextStep}</span></li>)}
                  </ul>
                </>}

                {selectedView === 'files' && <>
                  <h3>Project files</h3>
                  <p>Sample files — preview only</p>
                  <ul className="webapp-file-list">
                    {sampleFiles.map(file => <li key={file.name}><strong>{file.name}</strong><span>{file.project}</span></li>)}
                  </ul>
                </>}
              </div>
              <p className="webapp-sample-note">Sample content</p>
            </div>
          </div>
        </section>
      </div>

      <ol className="webapp-capabilities">
        {capabilities.map(([number, title, description]) => (
          <li key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></li>
        ))}
      </ol>
    </article>
  )
}
