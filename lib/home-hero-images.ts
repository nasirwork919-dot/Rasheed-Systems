import { projects, type Project } from '@/lib/projects'

export const HOME_HERO_IMAGE_WIDTH = 1024
export const HOME_HERO_IMAGE_HEIGHT = 1536

export type HomeHeroImage = {
  id: string
  src: `/images/home-hero/${string}.png`
  alt: string
  project: Project
  width: typeof HOME_HERO_IMAGE_WIDTH
  height: typeof HOME_HERO_IMAGE_HEIGHT
}

const projectByTitle = new Map(projects.map(project => [project.title, project]))

function heroImage(id: string, filename: string, projectTitle: string, alt: string): HomeHeroImage {
  const project = projectByTitle.get(projectTitle)
  if (!project) throw new Error(`Missing Home hero project: ${projectTitle}`)

  return {
    id,
    src: `/images/home-hero/${filename}.png`,
    alt,
    project,
    width: HOME_HERO_IMAGE_WIDTH,
    height: HOME_HERO_IMAGE_HEIGHT,
  }
}

export const homeHeroImages: HomeHeroImage[] = [
  heroImage('01-n3rve', '01-n3rve', 'N3rve', 'N3rve AI platform interface'),
  heroImage('02-justcarsale', '02-justcarsale', 'JustCarSale', 'JustCarSale vehicle marketplace interface'),
  heroImage('03-insurance-wallets', '03-insurance-wallets', 'Insurance Wallets', 'Insurance Wallets platform interface'),
  heroImage('04-jwalin-jewels', '04-jwalin-jewels', 'Jwalin Jewels', 'Jwalin Jewels storefront interface'),
  heroImage('05-uk-therapies', '05-uk-therapies', 'UK Therapies', 'UK Therapies website interface'),
  heroImage('06-zain-dubai', '06-zain-dubai', 'Zain Dubai', 'Zain Dubai property platform interface'),
  heroImage('07-mia', '07-mia', 'MIA', 'MIA AI marketing interface'),
  heroImage('08-euro-world-crm', '08-euro-world-crm', 'Euro World CRM', 'Euro World CRM dashboard'),
  heroImage('09-chatsites', '09-chatsites', 'Chatsites', 'Chatsites conversational website interface'),
  heroImage('10-scholarsurge-dashboard', '10-scholarsurge-dashboard', 'ScholarSurge', 'ScholarSurge analytics dashboard'),
  heroImage('11-scholarsurge-pipeline', '11-scholarsurge-pipeline', 'ScholarSurge', 'ScholarSurge enrollment pipeline'),
  heroImage('12-scholarsurge-automation', '12-scholarsurge-automation', 'ScholarSurge', 'ScholarSurge automation workflow'),
  heroImage('13-strive-trial-bookings', '13-strive-trial-bookings', 'Strive Soccer Academy', 'Strive Soccer Academy trial-booking dashboard'),
  heroImage('14-strive-conversation-ai', '14-strive-conversation-ai', 'Strive Soccer Academy', 'Strive Soccer Academy conversation AI dashboard'),
  heroImage('15-strive-booking-follow-up', '15-strive-booking-follow-up', 'Strive Soccer Academy', 'Strive Soccer Academy booking follow-up workflow'),
]
