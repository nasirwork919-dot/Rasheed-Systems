import Image from 'next/image'
import ProjectLink from '@/components/ProjectLink'
import type { HomeHeroImage } from '@/lib/home-hero-images'

export default function HeroProjectPanel({
  image,
  index,
  duplicate,
}: {
  image: HomeHeroImage
  index: number
  duplicate: boolean
}) {
  const isInitialImage = !duplicate && index < 5

  return (
    <ProjectLink
      project={image.project}
      className="hero-film-panel"
      tabIndex={duplicate ? -1 : undefined}
      aria-label={duplicate ? undefined : `View ${image.project.title} project: ${image.alt}`}
    >
      <Image
        src={image.src}
        alt={duplicate ? '' : image.alt}
        width={image.width}
        height={image.height}
        priority={isInitialImage}
        loading={isInitialImage ? undefined : duplicate ? 'lazy' : 'eager'}
        sizes="(max-width: 639px) 260px, (max-width: 1023px) 320px, 374px"
        draggable={false}
      />
    </ProjectLink>
  )
}
