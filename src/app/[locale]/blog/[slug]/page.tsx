import type { Metadata } from 'next'
import { getBlogPostBySlug } from '@/data/blogPosts'
import BlogPostClient from './BlogPostClient'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zinedine.dev'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const post = getBlogPostBySlug(locale, slug)

  if (!post) {
    return { title: 'Not Found' }
  }

  const url = `${siteUrl}/${locale}/blog/${slug}`

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: 'article',
      locale: locale === 'id' ? 'id_ID' : 'en_US',
      url,
      title: post.title,
      description: post.excerpt,
      siteName: 'Zinedine Ziddan Fahdlevy',
      images: [
        {
          url: post.cover,
          width: 1200,
          height: 630,
          alt: post.title,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.cover],
    },
    alternates: {
      canonical: url,
      languages: {
        en: `${siteUrl}/en/blog/${slug}`,
        id: `${siteUrl}/id/blog/${slug}`,
      },
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const post = getBlogPostBySlug(locale, slug)

  if (!post) {
    return <BlogPostClient />
  }

  const url = `${siteUrl}/${locale}/blog/${slug}`
  const publishedIso = new Date(post.publishedAt).toISOString()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: `${siteUrl}${post.cover}`,
    url,
    datePublished: publishedIso,
    dateModified: publishedIso,
    author: {
      '@type': 'Person',
      name: 'Zinedine Ziddan Fahdlevy',
      url: siteUrl,
    },
    publisher: {
      '@type': 'Person',
      name: 'Zinedine Ziddan Fahdlevy',
      url: siteUrl,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPostClient />
    </>
  )
}
