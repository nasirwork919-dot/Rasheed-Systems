import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageEffects from '@/components/PageEffects'
import ProjectGallery from '@/components/ProjectGallery'
import { projectDetails } from '@/lib/projectDetails'
import { projects } from '@/lib/projects'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const item = projectDetails[slug]; return item ? { title: item.title, description: item.oneLiner } : {} }
export function generateStaticParams() { return Object.keys(projectDetails).map(slug => ({ slug })) }

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const detail = projectDetails[slug]
  if (!detail) notFound()
  const caseProjects = projects.filter(project => project.slug)
  const next = caseProjects[(caseProjects.findIndex(project => project.slug === slug) + 1) % caseProjects.length]

  return <><PageEffects /><Header /><main id="main-content" tabIndex={-1}>
    <section className="case-hero"><div className="wrap"><Link href="/work" className="line-link">← All work</Link><span className="section-label">Case study / {detail.category}</span><h1>{detail.title}</h1><p>{detail.oneLiner}</p><dl className="case-spec"><div><dt>Platform</dt><dd>{detail.platform}</dd></div><div><dt>Industry</dt><dd>{detail.industry}</dd></div><div><dt>Scope</dt><dd>{detail.scope}</dd></div></dl></div></section>
    <div className="wrap case-hero-image reveal"><Image src={detail.gallery[0].src} alt={detail.gallery[0].caption} fill priority sizes="(max-width: 1200px) 100vw, 1200px" /></div>
    <section className="case-story"><div className="wrap case-layout">
      <nav className="case-nav" aria-label="Case study chapters"><span>On this page</span><a href="#challenge">Challenge</a><a href="#approach">Approach</a><a href="#system">System</a><a href="#result">Result</a></nav>
      <div className="case-chapters">
        <article id="challenge" className="reveal"><span className="section-label">01 / Challenge</span><h2>Where the operation was getting stuck.</h2><p>{detail.body[0]}</p></article>
        <article id="approach" className="reveal"><span className="section-label">02 / Approach</span><h2>Design the path before the parts.</h2><p>{detail.body[1] ?? detail.body[0]}</p></article>
        <article id="system" className="reveal"><span className="section-label">03 / System</span><h2>What went into it.</h2><ul>{detail.whatWentIn.map(item => <li key={item}><span>↳</span>{item}</li>)}</ul></article>
        <article id="result" className="reveal"><span className="section-label">04 / Result</span><h2>A clearer operational flow.</h2><p>The finished system connects the steps described above into one managed path, reducing the manual gaps in the original process. No quantitative result is claimed where verified metrics are unavailable.</p></article>
      </div>
    </div></section>
    <section className="case-workflow-section"><div className="wrap"><span className="section-label">Workflow / Connected system</span><div className="case-workflow" aria-label="Project workflow">{detail.whatWentIn.slice(0,5).map((item,index)=><div key={item}><span>0{index+1}</span><p>{item}</p>{index < Math.min(4,detail.whatWentIn.length-1) && <i aria-hidden="true">→</i>}</div>)}</div></div></section>
    <section className="case-gallery-section"><div className="wrap"><div className="section-heading reveal"><span className="section-label">Interface / Details</span><h2>The system in use.</h2><p>Meaningful project screenshots. Select any image to inspect it in the accessible viewer.</p></div><ProjectGallery images={detail.gallery} /></div></section>
    <section className="next-project"><div className="wrap"><span className="section-label">Next case study</span><Link href={`/work/${next.slug}`}><span>{next.tag}</span><strong>{next.title}</strong><b>↗</b></Link></div></section>
    <section className="contact-ending"><div className="wrap reveal"><span className="section-label">Have a similar problem?</span><h2>Let’s map the system.</h2><Link className="button primary" href="/contact">Start a project <span>↗</span></Link></div></section>
  </main><Footer /></>
}
