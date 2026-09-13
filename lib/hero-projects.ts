import sourceManifest from '@/source-assets/hero-image-manifest.json'
import { projects, type Project } from '@/lib/projects'

type HeroImageDefinition = {
  id: string
  projectTitle: string
  width: number
  height: number
  sourcePath: string
  publicSourcePath?: string
  generatedPath: string
  description: string
}

export type HeroProject = Project & {
  imageId: string
  sourcePath: string
  generatedPath: string
  heroImage: string
  heroAlt: string
  width: number
  height: number
}

const definitions = sourceManifest as HeroImageDefinition[]
const projectByTitle = new Map(projects.map(project => [project.title, project]))

export const heroProjects: HeroProject[] = definitions.map(definition => {
  const project = projectByTitle.get(definition.projectTitle)
  if (!project) throw new Error(`Missing hero project: ${definition.projectTitle}`)
  return {
    ...project,
    imageId: definition.id,
    sourcePath: definition.sourcePath,
    generatedPath: definition.generatedPath,
    heroImage: (definition.publicSourcePath ?? definition.sourcePath).replace(/^public/, ''),
    heroAlt: definition.description,
    width: definition.width,
    height: definition.height,
  }
})
