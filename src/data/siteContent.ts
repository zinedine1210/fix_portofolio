import enContent from '@/content/en.json'
import idContent from '@/content/id.json'

const contentByLocale = {
  en: enContent,
  id: idContent,
} as const

export type SupportedLocale = keyof typeof contentByLocale
export type SiteContent = (typeof contentByLocale)[SupportedLocale]
export type BlogPost = SiteContent['blogPosts'][number]
export type HeroPhoto = SiteContent['heroGallery']['photos'][number]
export type FooterSocialLink = SiteContent['footer']['socialLinks'][number]

export function getSiteContent(locale: string): SiteContent {
  return locale === 'id' ? contentByLocale.id : contentByLocale.en
}

export function getBlogPosts(locale: string): BlogPost[] {
  return getSiteContent(locale).blogPosts
}

export function getBlogPostBySlug(locale: string, slug: string): BlogPost | undefined {
  return getBlogPosts(locale).find((post) => post.slug === slug)
}
