'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { getBlogPosts } from '@/data/blogPosts'
import { getSiteContent } from '@/data/siteContent'

export default function ProjectSlider() {
  const t = useTranslations('Home')
  const locale = useLocale()
  const content = getSiteContent(locale)
  const [currentIndex, setCurrentIndex] = useState(0)

  const projects = getBlogPosts(locale)
  const sliderContent = content.projectSlider

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-4 shadow-3xl dark:border-slate-700 dark:bg-slate-900 sm:p-6">
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50/70 via-white to-cyan-50/45 dark:from-sky-950/30 dark:via-slate-900 dark:to-cyan-950/20" />

      <div className="relative mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">{sliderContent.eyebrow}</p>
          <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-950 dark:text-slate-50 sm:text-2xl">{t('projectsTitle')}</h3>
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <button
            type="button"
            onClick={prevSlide}
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:text-slate-950 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:text-slate-200"
            aria-label={sliderContent.previousProject}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={nextSlide}
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:text-slate-950 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:text-slate-200"
            aria-label={sliderContent.nextProject}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[1.5rem] border border-slate-200/80 bg-white dark:border-slate-700/80 dark:bg-slate-800">
        <div className="flex transition-transform duration-600 ease-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {projects.map((project, index) => (
            <motion.article
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="w-full flex-shrink-0"
            >
              <Link href={`/blog/${project.slug}`} className="group grid lg:grid-cols-[1.1fr_0.9fr]">
                <div className="relative h-64 overflow-hidden sm:h-72 lg:h-full">
                  <Image
                    src={project.cover}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/55 via-slate-900/25 to-transparent" />
                  <span className="absolute left-5 top-5 rounded-full border border-white/35 bg-white/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md">
                    {project.readTime}
                  </span>
                </div>

                <div className="flex flex-col justify-between gap-6 p-6 sm:p-8">
                  <div>
                    <h4 className="text-xl font-semibold tracking-tight text-slate-950 dark:text-slate-50 sm:text-2xl lg:text-3xl">{project.title}</h4>
                    <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-400">{project.excerpt}</p>
                  </div>

                  <div className="space-y-5">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-200 pt-5 dark:border-slate-700">
                      <p className="text-sm text-slate-500 dark:text-slate-400">{project.publishedAt}</p>
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition-transform duration-200 group-hover:translate-x-1 dark:text-slate-200">
                        {sliderContent.readStory}
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>

      <div className="relative mt-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {projects.map((project, index) => (
            <button
              key={project.slug}
              type="button"
              onClick={() => setCurrentIndex(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'w-9 bg-slate-900 dark:bg-sky-400' : 'w-2.5 bg-slate-300 hover:bg-slate-400 dark:bg-slate-600 dark:hover:bg-slate-500'
              }`}
              aria-label={`${sliderContent.goToProject} ${project.title}`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2 sm:hidden">
          <button
            type="button"
            onClick={prevSlide}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
            aria-label={sliderContent.previousProject}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={nextSlide}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
            aria-label={sliderContent.nextProject}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}