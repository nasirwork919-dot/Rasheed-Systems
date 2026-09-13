import HeroProjectPanel from '@/components/home-hero/HeroProjectPanel'
import { homeHeroImages } from '@/lib/home-hero-images'

export default function HeroFilmstripGroup({
  duplicate = false,
  groupRef,
}: {
  duplicate?: boolean
  groupRef?: React.Ref<HTMLDivElement>
}) {
  return (
    <div className="hero-filmstrip-group" ref={groupRef} aria-hidden={duplicate || undefined} data-duplicate={duplicate || undefined}>
      {homeHeroImages.map((image, index) => (
        <HeroProjectPanel key={`${image.id}-${duplicate ? 'duplicate' : 'primary'}`} image={image} index={index} duplicate={duplicate} />
      ))}
    </div>
  )
}
