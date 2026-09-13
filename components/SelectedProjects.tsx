import Image from 'next/image'
import type { CSSProperties } from 'react'

const wordmarks = [
  { name: 'N3rve', slug: 'n3rve', href: 'https://n3rve.ai/', visualWidth: '90%' },
  { name: 'JustCarSale', slug: 'justcarsale', href: 'https://www.justcarsale.com/', visualWidth: '78%' },
  { name: 'Insurance Wallets', slug: 'insurance-wallets', href: 'https://www.insurancewallets.com/', visualWidth: '100%' },
  { name: 'MIA', slug: 'mia', href: 'https://mia.profitlifter.com/', visualWidth: '95%' },
  { name: 'Zain Dubai', slug: 'zain-dubai', href: 'https://www.zaindubai.com/', visualWidth: '100%' },
  { name: 'Euro World CRM', slug: 'euro-world-crm', href: 'https://www.eu-worldcrm.com/', visualWidth: '100%' },
  { name: 'Chatsites', slug: 'chatsites', href: 'https://chatsites.app/', visualWidth: '88%' },
  { name: 'Jwalin Jewels', slug: 'jwalin-jewels', href: 'https://www.jwalinjewels.com/', visualWidth: '100%' },
  { name: 'UK Therapies', slug: 'uk-therapies', href: 'https://www.uktherapies.co.uk/', visualWidth: '82%' },
  { name: 'ScholarSurge', slug: 'scholarsurge', href: 'https://scholarsurge.co/', visualWidth: '82%' },
  { name: 'Strive Soccer Academy', slug: 'strive-soccer-academy', href: 'https://strivesoccer.ca/', visualWidth: '72%' },
] as const

export default function SelectedProjects() {
  return (
    <div className="project-wordmark-grid">
      {wordmarks.map(wordmark => (
        <a
          className="project-wordmark"
          href={wordmark.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${wordmark.name} website (opens in a new tab)`}
          style={{ '--wordmark-width': wordmark.visualWidth } as CSSProperties}
          key={wordmark.slug}
        >
          <Image
            src={`/images/project-wordmarks/${wordmark.slug}.png`}
            alt={wordmark.name}
            width={1774}
            height={887}
            sizes="(max-width: 800px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          <span aria-hidden="true">↗</span>
        </a>
      ))}
    </div>
  )
}
