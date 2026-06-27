import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://rasheed-systems.vercel.app'),
  title: {
    template: '%s — Rasheed Systems',
    default: 'Rasheed Systems — AI systems & software that run your business',
  },
  description: 'Rasheed Systems builds AI agents, automation, and custom software for companies in the US, UK, UAE, India, and Australia. Built by two brothers.',
  openGraph: {
    type: 'website',
    siteName: 'Rasheed Systems',
    images: [{ url: '/og-image.png' }],
  },
  twitter: { card: 'summary_large_image' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,700;12..96,800&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon-180.png" />
      </head>
      <body>{children}</body>
    </html>
  )
}
