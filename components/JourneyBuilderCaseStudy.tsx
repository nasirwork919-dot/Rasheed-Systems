import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageEffects from '@/components/PageEffects'
import type { ProjectDetail } from '@/lib/projectDetails'
import type { Project } from '@/lib/projects'

const learningPoints = [
  'Six training phases across Split Agent, Independent Agent, and Override Builder routes.',
  'Route-aware phase visibility with server-enforced requirements for restricted training.',
  'Consistent progress, XP, streak tracking, and clearer desktop and mobile lesson navigation.',
]

const inventoryPoints = [
  ['Market', 'Immediate or Later'],
  ['Financial interests', 'Multiple areas of interest'],
  ['Relationship', 'Type and closeness'],
  ['Event assignment', 'A suitable invitation format'],
]

const assessmentPoints = [
  'Draft autosave and a review step before submission.',
  'Automatic scoring for objective questions and administrative review for written responses.',
  'Results, retakes, leader summaries, and administrative passing-score controls.',
]

const accessPoints = [
  ['Access and content', 'Tighter user and team permissions, server-checked lesson requirements, and protected private training material.'],
  ['Progress and persistence', 'Recorded exam attempts, retake history, stable lesson behavior, saved stories, and retained contact information.'],
  ['Working communication', 'Reliable account-verification emails, leader notifications, and exam-preparation messages.'],
]

const videoTopics = [
  'Phase introduction',
  'Own, Join, Share',
  'Potential Clients',
  'Potential Business Partners',
  'Immediate vs. Later Market',
  'Key Financial Considerations',
  'Relationship Profiling',
]

export default function JourneyBuilderCaseStudy({ detail, next }: { detail: ProjectDetail; next: Project }) {
  return <><PageEffects /><Header /><main id="main-content" tabIndex={-1} className="journey-case">
    <section className="journey-case-hero" aria-labelledby="journey-title"><div className="wrap journey-case-hero-grid">
      <div className="journey-case-intro reveal">
        <Link href="/work" className="line-link">&#8592; All work</Link>
        <span className="section-label">Case study / {detail.category}</span>
        <h1 id="journey-title">Journey <br />Builder Pro</h1>
        <p className="journey-case-subtitle">A connected platform for producer training and team development.</p>
        <p>We improved the experience from recruit onboarding through training, business planning, and leader oversight. The work covered product design, application development, assessment workflows, access controls, email communication, and avatar-led training content.</p>
        <div className="journey-case-actions">
          <a className="button primary" href="https://path-pilot-demo.lovable.app" target="_blank" rel="noopener noreferrer">Visit website <span aria-hidden="true">&#8599;</span></a>
          <a className="line-link" href="/downloads/journey-builder-pro-portfolio.pdf" download>Download project portfolio <span aria-hidden="true">&#8595;</span></a>
        </div>
        <small>Training areas require an account.</small>
      </div>
      <figure className="journey-case-cover reveal">
        <Image src="/images/projects/journey-builder-pro/cover.webp" alt="Journey Builder Pro training platform shown on laptop and tablet screens" width={1024} height={1536} priority unoptimized />
      </figure>
      <dl className="journey-case-spec">
        <div><dt>Category</dt><dd>Training Platform / Web Application</dd></div>
        <div><dt>Services</dt><dd>Product Design, Web Development, Workflow Automation, AI Video Production</dd></div>
        <div><dt>Technology</dt><dd>React, TanStack Start, Tailwind CSS, Supabase, Lovable Cloud, Resend, HeyGen</dd></div>
      </dl>
    </div></section>

    <nav className="journey-case-nav" aria-label="Case study chapters"><div className="wrap">
      <a href="#challenge">Challenge</a><a href="#journey">Learning journey</a><a href="#leaders">Leader tools</a><a href="#mobile">Mobile</a><a href="#outcome">Outcome</a>
    </div></nav>

    <section className="journey-case-section" id="challenge" aria-labelledby="journey-challenge"><div className="wrap journey-case-split">
      <div className="journey-case-copy reveal"><span className="section-label">01 / The challenge</span><h2 id="journey-challenge">Turn training into a usable system.</h2><p>The platform needed more consistent progress tracking, stronger content protection, clearer mobile navigation, and dependable actions throughout the learning journey. Recruit information, assessments, and leader visibility also needed to work together more effectively.</p></div>
      <figure className="journey-case-landscape reveal"><Image src="/images/projects/journey-builder-pro/landing-page.png" alt="Journey Builder Pro landing page with a guided route illustration" width={1917} height={897} unoptimized /></figure>
    </div></section>

    <section className="journey-case-section journey-case-section-alt" id="journey" aria-labelledby="learning-title"><div className="wrap journey-case-split journey-case-split-reverse">
      <figure className="journey-case-interface reveal"><Image src="/images/projects/journey-builder-pro/learning-journey.png" alt="Journey Builder Pro six-phase learning journey with progress status" width={831} height={525} unoptimized /></figure>
      <div className="journey-case-copy reveal"><span className="section-label">02 / The learning journey</span><h2 id="learning-title">A clear next step at every stage.</h2><ul>{learningPoints.map(point => <li key={point}>{point}</li>)}</ul></div>
    </div></section>

    <section className="journey-case-section" aria-labelledby="inventory-title"><div className="wrap journey-case-split">
      <div className="journey-case-copy reveal"><span className="section-label">03 / Business Inventory and Story Builder</span><h2 id="inventory-title">From names to a working inventory.</h2><p>Recruits can organize the people they know, record relevant interests, and prepare their next conversations within the same platform.</p><p>Story Builder responses and contact records persist beyond a page refresh. Entries can be edited, filtered, and exported to CSV, while leaders receive read-only contact summaries.</p></div>
      <dl className="journey-inventory reveal">{inventoryPoints.map(([term, description], index) => <div key={term}><span>{String(index + 1).padStart(2, '0')}</span><dt>{term}</dt><dd>{description}</dd></div>)}</dl>
    </div></section>

    <section className="journey-case-section journey-case-section-alt" id="leaders" aria-labelledby="leaders-title"><div className="wrap journey-case-split journey-case-split-reverse">
      <figure className="journey-case-interface journey-case-interface-tall reveal"><Image src="/images/projects/journey-builder-pro/leader-dashboard.png" alt="Leader dashboard showing development-account roster, progress, licensing, and activity" width={570} height={662} unoptimized /></figure>
      <div className="journey-case-copy reveal"><span className="section-label">04 / Leader tools</span><h2 id="leaders-title">Know where support is needed.</h2><p>The leader experience combines team roster visibility with route, phase, branch, and stalled-progress filtering. Activity, licensing, check-ins, read-only recruit summaries, and step notifications keep follow-up connected.</p><small>The screenshot uses development accounts.</small></div>
    </div></section>

    <section className="journey-case-section" aria-labelledby="assessments-title"><div className="wrap journey-case-split">
      <div className="journey-case-copy reveal"><span className="section-label">05 / Native assessments</span><h2 id="assessments-title">Native quizzes. Real review.</h2><p>Money Wealth Life Insurance and The Power of Zero assessments now live inside the platform.</p><ul>{assessmentPoints.map(point => <li key={point}>{point}</li>)}</ul></div>
      <figure className="journey-case-interface reveal"><Image src="/images/projects/journey-builder-pro/quiz-administration-redacted.png" alt="Quiz administration settings with answer-key content excluded" width={1050} height={750} unoptimized /><figcaption>Answer-key content is excluded from this public image.</figcaption></figure>
    </div></section>

    <section className="journey-case-section journey-mobile-section journey-case-section-alt" id="mobile" aria-labelledby="mobile-title"><div className="wrap">
      <div className="journey-case-heading reveal"><span className="section-label">06 / Mobile experience</span><h2 id="mobile-title">The same journey, wherever they learn.</h2><p>Restored navigation, adapted lesson layouts, resolved overflow, clearer resources, and consistent forms, dialogs, controls, and contact rows keep the experience usable on smaller screens.</p></div>
      <div className="journey-mobile-grid">
        <figure className="reveal"><Image src="/images/projects/journey-builder-pro/mobile-journey.png" alt="Journey phases adapted to a mobile screen" width={448} height={582} unoptimized /><figcaption>Journey navigation</figcaption></figure>
        <figure className="reveal"><Image src="/images/projects/journey-builder-pro/mobile-resources.png" alt="Searchable training resources on a mobile screen" width={398} height={711} unoptimized /><figcaption>Searchable resources</figcaption></figure>
        <figure className="reveal"><Image src="/images/projects/journey-builder-pro/account-verification.png" alt="Account verification email confirmation on mobile" width={320} height={561} unoptimized /><figcaption>Account verification</figcaption></figure>
      </div>
    </div></section>

    <section className="journey-case-section" aria-labelledby="access-title"><div className="wrap">
      <div className="journey-case-heading reveal"><span className="section-label">07 / Access and communication</span><h2 id="access-title">Reliable behavior behind the interface.</h2><p>Prospective users see a cohesive experience because permissions, persistence, assessments, and communication work together beneath it.</p></div>
      <div className="journey-access-grid">{accessPoints.map(([title, copy]) => <article className="reveal" key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div>
    </div></section>

    <section className="journey-case-section journey-case-section-alt" aria-labelledby="video-title"><div className="wrap journey-case-split journey-case-split-reverse">
      <figure className="journey-case-landscape reveal"><Image src="/images/projects/journey-builder-pro/phase-3-video-poster.webp" alt="Presenter frame from the Journey Builder Pro Phase 3 introduction" width={1920} height={1080} unoptimized /><figcaption>Frame from the produced Phase 3 introduction.</figcaption></figure>
      <div className="journey-case-copy reveal"><span className="section-label">08 / Training video production</span><h2 id="video-title">A human face for the training.</h2><p>Client-supplied scripts were turned into avatar-led training videos with selected presenters, varied looks and backgrounds, and requested voice refinements.</p><ol className="journey-video-list">{videoTopics.map((topic, index) => <li key={topic}><span>{String(index + 1).padStart(2, '0')}</span>{topic}{topic === 'Potential Clients' || topic === 'Potential Business Partners' ? <small>Target Audience lesson</small> : null}</li>)}</ol></div>
    </div></section>

    <section className="journey-case-section journey-outcome" id="outcome" aria-labelledby="outcome-title"><div className="wrap">
      <span className="section-label">09 / Outcome</span><div className="journey-outcome-grid reveal"><h2 id="outcome-title">One connected learning experience.</h2><p>A more consistent training experience that connects recruit learning, saved business information, assessments, leader oversight, and supporting video content.</p></div>
      <div className="journey-outcome-links"><a href="https://path-pilot-demo.lovable.app" target="_blank" rel="noopener noreferrer">Visit website <span aria-hidden="true">&#8599;</span></a><a href="/downloads/journey-builder-pro-portfolio.pdf" download>Download project portfolio <span aria-hidden="true">&#8595;</span></a></div>
    </div></section>

    <section className="next-project"><div className="wrap"><span className="section-label">Next case study</span><Link href={`/work/${next.slug}`}><span>{next.tag}</span><strong>{next.title}</strong><b aria-hidden="true">&#8599;</b></Link></div></section>
    <section className="contact-ending"><div className="wrap reveal"><span className="section-label">Need a connected platform?</span><h2>Need a platform that connects your training and operations?</h2><p>We design and improve business applications around the people, workflows, and content they need to support.</p><Link className="button primary" href="/contact">Discuss your project <span aria-hidden="true">&#8599;</span></Link></div></section>
  </main><Footer /></>
}
