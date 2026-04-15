'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

export default function ProjectSlider() {
  const t = useTranslations('Home')
  const [currentIndex, setCurrentIndex] = useState(0)

  const projects = [
    {
      id: 1,
      title: t('project1Title'),
      description: t('project1Description'),
      image: '/project1.jpg',
      tags: ['React', 'Node.js', 'MongoDB'],
      link: '/blog/project1'
    },
    {
      id: 2,
      title: t('project2Title'),
      description: t('project2Description'),
      image: '/project2.jpg',
      tags: ['Next.js', 'TypeScript', 'Tailwind'],
      link: '/blog/project2'
    },
    {
      id: 3,
      title: t('project3Title'),
      description: t('project3Description'),
      image: '/project3.jpg',
      tags: ['React Native', 'Firebase', 'Redux'],
      link: '/blog/project3'
    }
  ]

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  return (
    <div className="relative w-full overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 p-4 shadow-4xl backdrop-blur-xl md:p-6">
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50/80 via-white to-cyan-50/60" />

      <div className="relative flex transition-transform duration-700 ease-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="w-full flex-shrink-0"
          >
            <Link href={project.link}>
              <motion.div
                whileHover={{
                  y: -6,
                  boxShadow: '0 28px 70px -34px rgba(14, 165, 233, 0.35)'
                }}
                whileTap={{ scale: 0.98 }}
                transition={{
                  duration: 0.3,
                  type: 'spring',
                  stiffness: 300
                }}
                className="group relative grid overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white shadow-3xl transition-all duration-500 lg:grid-cols-[1.15fr_0.85fr]"
              >
                <div className="relative h-72 overflow-hidden lg:h-full">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/62 via-slate-900/20 to-sky-300/20" />
                  <div className="absolute left-6 top-6 inline-flex rounded-full border border-white/25 bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-md">
                    {t('projectsTitle')}
                  </div>
                </div>

                <div className="relative flex flex-col justify-between gap-8 p-6 md:p-8">
                  <div className="space-y-5">
                    <div className="space-y-3">
                      <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
                        {t('projectCardLabel')}
                      </span>
                      <motion.h3
                        className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl"
                        whileHover={{ x: 5 }}
                      >
                        {project.title}
                      </motion.h3>
                    </div>
                    <motion.p
                      className="max-w-xl text-base leading-7 text-slate-600 md:text-lg"
                      whileHover={{ x: 5 }}
                    >
                      {project.description}
                    </motion.p>
                  </div>

                  <div className="space-y-5">
                    <div className="flex flex-wrap gap-2.5">
                      {project.tags.map((tag, tagIndex) => (
                        <motion.span
                          key={tag}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: tagIndex * 0.08 }}
                          whileHover={{
                            y: -2,
                            boxShadow: '0 12px 26px -20px rgba(14, 165, 233, 0.45)'
                          }}
                          className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-semibold text-slate-600"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between gap-4 border-t border-slate-200 pt-5">
                      <p className="text-sm font-medium text-slate-500">
                        {t('projectCardDescription')}
                      </p>
                      <motion.div
                        className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-900/10"
                        whileHover={{ scale: 1.08, x: 2 }}
                      >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.button
        onClick={prevSlide}
        whileHover={{
          scale: 1.1,
          boxShadow: '0 18px 34px -22px rgba(15, 23, 42, 0.28)'
        }}
        whileTap={{ scale: 0.9 }}
        className="absolute left-5 top-1/2 h-12 w-12 -translate-y-1/2 rounded-full border border-white/80 bg-white/90 text-slate-700 shadow-lg shadow-slate-900/10 transition-all duration-300 hover:bg-white"
      >
        <svg className="mx-auto h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </motion.button>

      <motion.button
        onClick={nextSlide}
        whileHover={{
          scale: 1.1,
          boxShadow: '0 18px 34px -22px rgba(15, 23, 42, 0.28)'
        }}
        whileTap={{ scale: 0.9 }}
        className="absolute right-5 top-1/2 h-12 w-12 -translate-y-1/2 rounded-full border border-white/80 bg-white/90 text-slate-700 shadow-lg shadow-slate-900/10 transition-all duration-300 hover:bg-white"
      >
        <svg className="mx-auto h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </motion.button>

      <div className="relative mt-6 flex justify-center gap-3">
        {projects.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentIndex(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'w-10 bg-slate-950 shadow-lg shadow-slate-900/10'
                : 'bg-slate-300 hover:bg-slate-400'
            }`}
          />
        ))}
      </div>
    </div>
  )
}