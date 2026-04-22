'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useLocale } from 'next-intl'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Link } from '@/i18n/navigation'
import { getBlogPosts } from '@/data/blogPosts'
import { getSiteContent } from '@/data/siteContent'

export default function BlogPage() {
  const locale = useLocale()
  const posts = getBlogPosts(locale)
  const content = getSiteContent(locale)
  const blogPage = content.blogPage

  return (
    <main className="min-h-screen text-slate-900 dark:text-slate-100">
      <Navbar />
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-55 dark:opacity-20" />
        <div className="absolute -left-20 top-12 h-64 w-64 rounded-full bg-sky-100/70 blur-3xl dark:bg-sky-900/30" />
        <div className="absolute right-0 top-20 h-72 w-72 rounded-full bg-cyan-100/60 blur-3xl dark:bg-cyan-900/20" />
      </div>

      <section className="px-4 pb-16 pt-6 sm:px-6 lg:px-8 lg:pt-10">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mb-12 max-w-3xl"
          >
            <span className="section-label">{blogPage.eyebrow}</span>
            <h1 className="section-title mt-6">{blogPage.title}</h1>
            <p className="section-copy mt-5">{blogPage.description}</p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ y: -6 }}
                className="surface-panel-strong group overflow-hidden rounded-[1.75rem]"
              >
                <Link href={`/blog/${post.slug}`} className="block h-full">
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={post.cover}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/58 via-slate-900/20 to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full border border-white/35 bg-white/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md">
                      {post.readTime}
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="mb-3 flex items-center justify-between text-xs font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                      <span>{post.publishedAt}</span>
                    </div>

                    <h2 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-slate-50">{post.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">{post.excerpt}</p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition-transform duration-300 group-hover:translate-x-1 dark:text-slate-200">
                      {blogPage.readArticle}
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
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