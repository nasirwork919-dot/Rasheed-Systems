import type { MetadataRoute } from 'next'
import { projectDetails } from '@/lib/projectDetails'

const baseUrl = 'https://www.rasheedsystems.com'
const staticRoutes = ['/', '/services', '/services/gohighlevel', '/work', '/about', '/contact']

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return [
    ...staticRoutes.map(route => ({
      url: `${baseUrl}${route === '/' ? '' : route}`,
      lastModified,
    })),
    ...Object.keys(projectDetails).map(slug => ({
      url: `${baseUrl}/work/${slug}`,
      lastModified,
    })),
  ]
}
