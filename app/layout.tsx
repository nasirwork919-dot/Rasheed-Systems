import type { Metadata } from 'next'
import './globals.css'

const defaultTitle = 'GoHighLevel Developer & AI Automation Agency | Rasheed Systems'
const defaultDescription = 'GoHighLevel developer and AI automation agency. We build GHL API integrations, custom dashboards, and AI booking systems connected to your CRM.'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.rasheedsystems.com'),
  title: {
    template: '%s | Rasheed Systems',
    default: defaultTitle,
  },
  description: defaultDescription,
  openGraph: {
    type: 'website',
    siteName: 'Rasheed Systems',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
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
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/png" sizes="512x512" href="/logo-mark-512.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon-180.png" />
      </head>
      <body><a className="skip-link" href="#main-content">Skip to main content</a>{children}</body>
    </html>
  )
}
