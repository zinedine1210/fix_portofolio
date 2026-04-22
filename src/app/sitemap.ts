import type { MetadataRoute } from 'next'
import { getBlogPosts } from '@/data/blogPosts'

const siteUrl = 'https://zinedineziddanfahdlevy.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['en', 'id']
  const now = new Date()

  // Static pages
  const staticPages = locales.flatMap((locale) => [
    {
      url: `${siteUrl}/${locale}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 1.0,
    },
    {
      url: `${siteUrl}/${locale}/blog`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ])

  // Blog posts
  const blogPages = locales.flatMap((locale) => {
    const posts = getBlogPosts(locale)
    return posts.map((post) => ({
      url: `${siteUrl}/${locale}/blog/${post.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  })

  return [...staticPages, ...blogPages]
}
