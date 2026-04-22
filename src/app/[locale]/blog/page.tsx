import type { Metadata } from 'next'
import BlogPageClient from './BlogPageClient'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zinedine.dev'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isId = locale === 'id'
  const title = isId ? 'Proyek & Artikel' : 'Projects & Articles'
  const description = isId
    ? 'Jelajahi proyek dan artikel dari Zinedine Ziddan Fahdlevy — Frontend Developer & Software Engineer.'
    : 'Explore projects and articles by Zinedine Ziddan Fahdlevy — Frontend Developer & Software Engineer.'
  const url = `${siteUrl}/${locale}/blog`

  return {
    title,
    description,
    openGraph: {
      type: 'website',
      locale: isId ? 'id_ID' : 'en_US',
      url,
      title,
      description,
      siteName: 'Zinedine Ziddan Fahdlevy',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'Zinedine Ziddan Fahdlevy — Projects & Articles',
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.png'],
    },
    alternates: {
      canonical: url,
      languages: {
        en: `${siteUrl}/en/blog`,
        id: `${siteUrl}/id/blog`,
      },
    },
  }
}

export default function BlogPage() {
  return <BlogPageClient />
}