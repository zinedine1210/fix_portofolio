'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useLocale } from 'next-intl'
import { useParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Link } from '@/i18n/navigation'
import { getBlogPostBySlug, getBlogPosts } from '@/data/blogPosts'
import { getSiteContent } from '@/data/siteContent'

type InlineImage = {
  src: string
  alt: string
  afterParagraph: number
}

type ContentItem = string | {
  type: 'video'
  videoUrl: string
  title?: string
}

type PreviewImage = {
  src: string
  alt: string
}

export default function BlogPost() {
  const locale = useLocale()
  const params = useParams()
  const slug = params.slug as string
  const [previewImage, setPreviewImage] = useState<PreviewImage | null>(null)
  const content = getSiteContent(locale)
  const blogPage = content.blogPage
  const site = content.site

  const post = getBlogPostBySlug(locale, slug)
  const relatedPosts = getBlogPosts(locale)
    .filter((item) => item.slug !== slug)
    .slice(0, 2)

  const inlineImages = ((post as { inlineImages?: InlineImage[] } | undefined)?.inlineImages ?? []).reduce<
    Record<number, InlineImage[]>
  >((acc, image) => {
    if (!acc[image.afterParagraph]) {
      acc[image.afterParagraph] = []
    }

    acc[image.afterParagraph].push(image)
    return acc
  }, {})
  const gallery = (post as { gallery?: string[] } | undefined)?.gallery ?? []

  useEffect(() => {
    if (!previewImage) {
      return undefined
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setPreviewImage(null)
      }
    }

    window.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [previewImage])

  if (!post) {
    return (
      <main className="min-h-screen text-slate-900">
        <Navbar />
        <section className="px-4 pb-16 pt-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">404</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
              {blogPage.notFoundTitle}
            </h1>
            <p className="mt-3 text-slate-600">{blogPage.notFoundDescription}</p>
            <Link
              href="/blog"
              className="mt-6 inline-flex items-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white"
            >
              {blogPage.backToBlogButton}
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen text-slate-900">
      <Navbar />
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-55" />
        <div className="absolute left-0 top-24 h-72 w-72 rounded-full bg-sky-100/65 blur-3xl" />
        <div className="absolute right-0 top-10 h-64 w-64 rounded-full bg-cyan-100/55 blur-3xl" />
      </div>

      <section className="px-4 pb-16 pt-6 sm:px-6 lg:px-8 lg:pt-10">
        <div className="mx-auto max-w-5xl">
          <motion.header
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mb-8"
          >
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-950">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {blogPage.backToBlog}
            </Link>

            <div className="mt-5 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              <span>{post.publishedAt}</span>
              <span className="h-1 w-1 rounded-full bg-slate-400" />
              <span>{post.readTime}</span>
              <span className="h-1 w-1 rounded-full bg-slate-400" />
              <span>{site.author}</span>
            </div>

            <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
              {post.title}
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">{post.excerpt}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-slate-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.header>

          <motion.article
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="surface-panel-strong overflow-hidden rounded-[2rem]"
          >
            <button
              type="button"
              onClick={() => setPreviewImage({ src: post.cover, alt: post.title })}
              className="relative block h-72 w-full cursor-zoom-in sm:h-96"
              aria-label={`Preview ${post.title}`}
            >
              <Image src={post.cover} alt={post.title} fill className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/42 via-slate-900/12 to-transparent" />
              <div className="absolute right-4 top-4 rounded-full bg-white/88 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
                Click to preview
              </div>
            </button>

            <div className="grid gap-8 p-7 sm:p-10 lg:grid-cols-[0.65fr_1.35fr]">
              <aside className="rounded-[1.5rem] border border-slate-200 bg-slate-50/90 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  {blogPage.quickSummaryTitle}
                </p>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                  {blogPage.quickSummaryItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </aside>

              <div className="space-y-6">
                {post.content.map((item, index) => {
                  const isVideo = typeof item === 'object' && item !== null && 'videoUrl' in item
                  
                  return (
                    <div key={index} className="space-y-5">
                      {typeof item === 'string' && (
                        <p className="text-base leading-8 text-slate-700 md:text-lg">{item}</p>
                      )}
                      
                      {isVideo && (
                        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white/80 shadow-sm">
                          <div className="relative aspect-video w-full">
                            <iframe
                              src={(item as any).videoUrl}
                              title={(item as any).title || 'Project video'}
                              className="h-full w-full"
                              allowFullScreen
                              loading="lazy"
                              style={{ border: 'none' }}
                            />
                          </div>
                        </div>
                      )}

                      {inlineImages[index + 1]?.map((image) => (
                        <button
                          type="button"
                          key={`${image.src}-${index}`}
                          onClick={() => setPreviewImage({ src: image.src, alt: image.alt })}
                          className="block w-full cursor-zoom-in overflow-hidden rounded-2xl border border-slate-200 bg-white/80 text-left shadow-sm"
                          aria-label={`Preview ${image.alt}`}
                        >
                          <div className="relative aspect-[16/9] w-full">
                            <Image src={image.src} alt={image.alt} fill className="object-cover" />
                          </div>
                        </button>
                      ))}
                    </div>
                  )
                })}

                {gallery.length > 0 && (
                  <div className="pt-2">
                    <div className="grid gap-4 sm:grid-cols-2">
                      {gallery.map((imageSrc, imageIndex) => (
                        <button
                          type="button"
                          key={`${imageSrc}-${imageIndex}`}
                          onClick={() =>
                            setPreviewImage({
                              src: imageSrc,
                              alt: `${post.title} gallery image ${imageIndex + 1}`,
                            })
                          }
                          className="block w-full cursor-zoom-in overflow-hidden rounded-2xl border border-slate-200 bg-white/80 text-left shadow-sm"
                          aria-label={`Preview gallery image ${imageIndex + 1}`}
                        >
                          <div className="relative aspect-[16/10] w-full">
                            <Image
                              src={imageSrc}
                              alt={`${post.title} gallery image ${imageIndex + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.article>
        </div>
      </section>

      {previewImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/82 p-4 backdrop-blur-sm"
          onClick={() => setPreviewImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-6xl" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              onClick={() => setPreviewImage(null)}
              className="absolute right-3 top-3 z-10 rounded-full bg-white/92 px-3 py-2 text-sm font-semibold text-slate-900 shadow-lg"
              aria-label="Close image preview"
            >
              Close
            </button>
            <div className="overflow-hidden rounded-[1.75rem] border border-white/15 bg-white/6 shadow-2xl">
              <div className="relative aspect-[16/10] w-full max-h-[85vh]">
                <Image src={previewImage.src} alt={previewImage.alt} fill className="object-contain" sizes="100vw" />
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            viewport={{ once: true, amount: 0.2 }}
            className="mb-6 flex items-end justify-between"
          >
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
              {blogPage.relatedArticlesTitle}
            </h2>
            <Link href="/blog" className="text-sm font-semibold text-slate-600 hover:text-slate-950">
              {blogPage.viewAll}
            </Link>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            {relatedPosts.map((relatedPost, index) => (
              <motion.article
                key={relatedPost.slug}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ y: -4 }}
                className="surface-panel-strong overflow-hidden rounded-[1.6rem]"
              >
                <Link href={`/blog/${relatedPost.slug}`} className="block">
                  <div className="relative h-52 w-full overflow-hidden">
                    <Image
                      src={relatedPost.cover}
                      alt={relatedPost.title}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/56 via-slate-900/18 to-transparent" />
                  </div>
                  <div className="p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{relatedPost.publishedAt}</p>
                    <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">{relatedPost.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{relatedPost.excerpt}</p>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
} 