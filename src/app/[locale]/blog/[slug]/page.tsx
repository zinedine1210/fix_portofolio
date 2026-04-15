'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useLocale } from 'next-intl'
import { useParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Link } from '@/i18n/navigation'
import { getBlogPostBySlug, getBlogPosts } from '@/data/blogPosts'

export default function BlogPost() {
  const locale = useLocale()
  const isId = locale === 'id'
  const params = useParams()
  const slug = params.slug as string

  const post = getBlogPostBySlug(locale, slug)
  const relatedPosts = getBlogPosts(locale)
    .filter((item) => item.slug !== slug)
    .slice(0, 2)

  if (!post) {
    return (
      <main className="min-h-screen text-slate-900">
        <Navbar />
        <section className="px-4 pb-16 pt-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">404</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
              {isId ? 'Artikel tidak ditemukan' : 'Article not found'}
            </h1>
            <p className="mt-3 text-slate-600">
              {isId
                ? 'Halaman yang kamu cari tidak tersedia atau sudah dipindahkan.'
                : 'The page you are looking for is unavailable or has been moved.'}
            </p>
            <Link
              href="/blog"
              className="mt-6 inline-flex items-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white"
            >
              {isId ? 'Kembali ke Blog' : 'Back to Blog'}
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
              {isId ? 'Kembali ke blog' : 'Back to blog'}
            </Link>

            <div className="mt-5 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              <span>{post.publishedAt}</span>
              <span className="h-1 w-1 rounded-full bg-slate-400" />
              <span>{post.readTime}</span>
              <span className="h-1 w-1 rounded-full bg-slate-400" />
              <span>Zinedine</span>
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
            <div className="relative h-72 w-full sm:h-96">
              <Image src={post.cover} alt={post.title} fill className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/42 via-slate-900/12 to-transparent" />
            </div>

            <div className="grid gap-8 p-7 sm:p-10 lg:grid-cols-[0.65fr_1.35fr]">
              <aside className="rounded-[1.5rem] border border-slate-200 bg-slate-50/90 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  {isId ? 'Ringkasan Cepat' : 'Quick Summary'}
                </p>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                  <li>{isId ? 'Fokus pada performa dan kejelasan UX.' : 'Focused on performance and UX clarity.'}</li>
                  <li>{isId ? 'Komponen dirancang reusable untuk scaling.' : 'Reusable component architecture for scaling.'}</li>
                  <li>{isId ? 'Motion digunakan seperlunya agar tetap profesional.' : 'Motion used selectively to stay professional.'}</li>
                </ul>
              </aside>

              <div className="space-y-6">
                {post.content.map((paragraph, index) => (
                  <p key={index} className="text-base leading-8 text-slate-700 md:text-lg">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </motion.article>
        </div>
      </section>

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
              {isId ? 'Artikel Terkait' : 'Related Articles'}
            </h2>
            <Link href="/blog" className="text-sm font-semibold text-slate-600 hover:text-slate-950">
              {isId ? 'Lihat semua' : 'View all'}
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