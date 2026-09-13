import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from 'react'
import Link from 'next/link'
import type { Project } from '@/lib/projects'

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { project: Project; children: ReactNode }

const ProjectLink = forwardRef<HTMLAnchorElement, Props>(function ProjectLink({ project, children, ...props }, ref) {
  if (project.slug) return <Link ref={ref} href={`/work/${project.slug}`} {...props}>{children}</Link>
  return <a ref={ref} href={project.href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>
})

export default ProjectLink
