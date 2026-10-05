'use client'

import { useTranslations } from 'next-intl'
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef, useState, type MouseEvent } from 'react'
import { useLocale } from 'next-intl'
import Navbar from '@/components/Navbar'
import ProjectSlider from '@/components/ProjectSlider'
import Footer from '@/components/Footer'
import HeroPhotoGallery from '@/components/HeroPhotoGallery'
import BackgroundEffects from '@/components/BackgroundEffects'
import RevealText from '@/components/RevealText'
import RotatingWord from '@/components/RotatingWord'
import PinSection from '@/components/PinSection'
import { getSiteContent } from '@/data/siteContent'

export default function Home() {
  const t = useTranslations('Home')
  const locale = useLocale()
  const content = getSiteContent(locale)

  const experienceItems = [1, 2, 3, 4].map((index) => ({
    title: t(`experience${index}Title`),
    period: t(`experience${index}Period`),
    company: t(`experience${index}Company`),
    description: t(`experience${index}Description`),
  }))

  const skillGroups = [
    {
      title: 'Frontend',
      tone: 'neutral' as const,
      description: t('skillsCardFrontendDescription'),
      items: [t('frontendSkill1'), t('frontendSkill2'), t('frontendSkill3'), t('frontendSkill4')],
    },
    {
      title: 'Backend',
      tone: 'ink' as const,
      description: t('skillsCardBackendDescription'),
      items: [t('backendSkill1'), t('backendSkill2'), t('backendSkill3'), t('backendSkill4')],
    },
    {
      title: 'Tools',
      tone: 'warm' as const,
      description: t('skillsCardToolsDescription'),
      items: [t('toolsSkill1'), t('toolsSkill2'), t('toolsSkill3'), t('toolsSkill4')],
    },
    {
      title: 'Soft Skills',
      tone: 'neutral' as const,
      description: t('skillsCardSoftDescription'),
      items: [t('softskillsSkill1'), t('softskillsSkill2'), t('softskillsSkill3'), t('softskillsSkill4')],
    },
  ]

  const skillToneClasses = {
    neutral: {
      border: 'border-slate-300 dark:border-slate-700',
      label: 'text-slate-900 dark:text-slate-100',
    },
    ink: {
      border: 'border-slate-900 dark:border-slate-100',
      label: 'text-slate-950 dark:text-slate-50',
    },
    warm: {
      border: 'border-amber-600 dark:border-amber-500',
      label: 'text-amber-700 dark:text-amber-400',
    },
  }

  const statCards = [
    { value: t('heroExperienceValue'), label: t('heroExperienceLabel') },
    { value: t('heroProjectsValue'), label: t('heroProjectsLabel') },
    { value: t('heroFocusValue'), label: t('heroFocusLabel') },
  ]

  const titleRest = t('title').split(' ').slice(1).join(' ')

  const prefersReducedMotion = useReducedMotion()
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: heroScrollProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroPhotoY = useTransform(heroScrollProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, -60])
  const heroPhotoScale = useTransform(heroScrollProgress, [0, 1], prefersReducedMotion ? [1, 1] : [1, 0.92])

  const experienceRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: experienceProgress } = useScroll({ target: experienceRef, offset: ['start 75%', 'end 55%'] })

  const magnetX = useMotionValue(0)
  const magnetY = useMotionValue(0)
  const magnetSpringX = useSpring(magnetX, { stiffness: 150, damping: 15, mass: 0.5 })
  const magnetSpringY = useSpring(magnetY, { stiffness: 150, damping: 15, mass: 0.5 })

  const handleMagneticMove = (event: MouseEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    magnetX.set((event.clientX - rect.left - rect.width / 2) * 0.35)
    magnetY.set((event.clientY - rect.top - rect.height / 2) * 0.35)
  }

  const handleMagneticLeave = () => {
    magnetX.set(0)
    magnetY.set(0)
  }

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [formNotice, setFormNotice] = useState('')

  const emailTarget = t('emailValue')
  const whatsappNumber = (content.site.whatsappNumber ?? '').replace(/\D/g, '')

  const buildMessageText = () => {
    const lines = [
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      '',
      'Message:',
      formData.message,
    ]
    return lines.join('\n')
  }

  const isFormValid = () => {
    return formData.name.trim() && formData.email.trim() && formData.message.trim()
  }

  const handleSendEmail = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!isFormValid()) {
      setFormNotice(t('contactValidation'))
      return
    }

    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name.trim()}`)
    const body = encodeURIComponent(buildMessageText())
    window.location.href = `mailto:${emailTarget}?subject=${subject}&body=${body}`
    setFormNotice(t('contactEmailReady'))
  }

  const handleSendWhatsApp = () => {
    if (!isFormValid()) {
      setFormNotice(t('contactValidation'))
      return
    }

    if (!whatsappNumber) {
      setFormNotice(t('contactWhatsappMissing'))
      return
    }

    const message = encodeURIComponent(buildMessageText())
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank', 'noopener,noreferrer')
    setFormNotice(t('contactWhatsappReady'))
  }

  return (
    <main className="relative min-h-screen text-slate-900 dark:text-slate-100">
      <Navbar />
      <BackgroundEffects />

      <section ref={heroRef} className="relative px-4 pb-0 pt-6 sm:px-6 lg:px-8 lg:pt-10">
        <div className="mx-auto max-w-7xl">
          <div
            className="grid items-start gap-8 lg:grid-cols-[1fr_1fr] lg:gap-0"
          >
            {/* ── Left: Text content (sticky) ───────────── */}
            <div className="relative z-10 lg:sticky lg:top-28 lg:self-start">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
              <motion.span
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="section-label"
              >
                {t('heroEyebrow')}
              </motion.span>

              <div className="space-y-5">
                <h1 className="max-w-xl text-balance text-3xl font-extrabold leading-[1.2] tracking-tight text-slate-950 dark:text-slate-50 sm:text-4xl lg:text-6xl">
                  <RotatingWord words={['Fullstack', 'Frontend', 'Backend']} className="text-amber-600 dark:text-amber-400" />{' '}
                  <RevealText text={titleRest} as="span" />{' '}
                  <RevealText text={t('heroHighlight')} as="span" className="accent-text" delay={0.25} />
                </h1>
                <motion.p
                  className="max-w-lg text-balance text-base leading-7 text-slate-600 dark:text-slate-400 sm:text-lg sm:leading-8"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {t('subtitle')}
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <motion.a
                  href="#projects"
                  onMouseMove={handleMagneticMove}
                  onMouseLeave={handleMagneticLeave}
                  style={{ x: magnetSpringX, y: magnetSpringY }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center rounded-full bg-slate-950 px-5 py-3 text-xs font-semibold text-white shadow-xl shadow-slate-900/10 transition-colors hover:bg-slate-800 dark:bg-amber-500 dark:shadow-amber-500/20 dark:hover:bg-amber-400 sm:px-7 sm:py-3.5 sm:text-sm"
                >
                  {t('viewProjects')}
                </motion.a>
                <motion.a
                  href="#contact"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center rounded-full border border-slate-200 bg-white/90 px-5 py-3 text-xs font-semibold text-slate-700 shadow-lg shadow-slate-900/5 transition-colors hover:border-amber-200 hover:text-slate-950 dark:border-slate-700 dark:bg-slate-800/90 dark:text-slate-300 dark:shadow-black/20 dark:hover:border-amber-700 dark:hover:text-amber-300 sm:px-7 sm:py-3.5 sm:text-sm"
                >
                  {t('contactMe')}
                </motion.a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="grid grid-cols-3 gap-3 sm:gap-6"
              >
                {statCards.map((stat, index) => (
                  <div
                    key={stat.label}
                    className={index > 0 ? 'border-l border-slate-200 pl-3 dark:border-slate-800 sm:pl-6' : ''}
                  >
                    <p className="text-2xl font-bold tracking-tight text-slate-950 dark:text-slate-50 sm:text-3xl">{stat.value}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
              </motion.div>
            </div>

            {/* ── Right: Full-height Photo ────────────── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ y: heroPhotoY, scale: heroPhotoScale }}
              className="relative order-first lg:order-last"
            >
              <HeroPhotoGallery />
            </motion.div>
          </div>
        </div>
      </section>

      <section id="about" className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16"
          >
            <div>
              <RevealText as="h2" className="section-title" text={t('aboutTitle')} />
              <p className="section-copy mt-6">{t('aboutDescription')}</p>
            </div>

            <div className="divide-y divide-slate-200 dark:divide-slate-800">
              <div className="grid gap-6 py-6 first:pt-0 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">{t('location')}</p>
                  <p className="mt-4 text-xl font-semibold tracking-tight text-slate-950 dark:text-slate-50 sm:text-2xl">{t('locationValue')}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{t('locationDescription')}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">{t('email')}</p>
                  <p className="mt-4 break-all text-xl font-semibold tracking-tight text-slate-950 dark:text-slate-50 sm:text-2xl">{t('emailValue')}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{t('emailDescription')}</p>
                </div>
              </div>
              <div className="grid gap-6 py-6 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">{t('aboutCardTitle')}</p>
                  <p className="mt-3 text-base leading-7 text-slate-700 dark:text-slate-300">{t('aboutCardDescription')}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">{t('experienceTitle')}</p>
                  <p className="mt-3 text-base leading-7 text-slate-700 dark:text-slate-300">{t('experienceIntro')}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="experience" className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.2 }}
            className="mb-12 max-w-3xl"
          >
            <RevealText as="h2" className="section-title" text={t('experienceTitle')} />
            <p className="section-copy mt-5">{t('experienceIntro')}</p>
          </motion.div>

          <div ref={experienceRef} className="relative divide-y divide-slate-200 dark:divide-slate-800">
            <motion.div
              aria-hidden
              className="absolute top-1 hidden h-[calc(100%-0.5rem)] w-px origin-top bg-gradient-to-b from-amber-400 via-amber-300 to-transparent dark:from-amber-500 dark:via-amber-700 md:left-28 md:block"
              style={{ scaleY: prefersReducedMotion ? 1 : experienceProgress }}
            />
            {experienceItems.map((item, index) => (
              <motion.article
                key={`experience-${index}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: index * 0.08 }}
                viewport={{ once: true, amount: 0.2 }}
                className="relative grid gap-3 py-10 first:pt-0 last:pb-0 md:grid-cols-[8rem_1fr] md:gap-10"
              >
                <span className="absolute top-1.5 hidden h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-white bg-amber-500 shadow-sm shadow-amber-500/40 dark:border-slate-950 dark:bg-amber-400 md:left-28 md:block" />
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">{item.period}</p>
                <div>
                  <h3 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-slate-50 sm:text-3xl">{item.title}</h3>
                  <p className="mt-1 text-base font-semibold text-amber-600 dark:text-amber-400">{item.company}</p>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-400">{item.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.2 }}
            className="mb-12 max-w-3xl"
          >
            <RevealText as="h2" className="section-title" text={t('skillsTitle')} />
            <p className="section-copy mt-5">{t('skillsIntro')}</p>
          </motion.div>

          <div className="grid gap-10 sm:grid-cols-2 lg:gap-x-16">
            {skillGroups.map((group, index) => {
              const tone = skillToneClasses[group.tone]
              return (
                <motion.div
                  key={group.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.08 }}
                  viewport={{ once: true, amount: 0.2 }}
                  className={`border-l-2 pl-6 ${tone.border}`}
                >
                  <div className={`text-xs font-semibold uppercase tracking-[0.22em] ${tone.label}`}>
                    {group.title}
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">{group.description}</p>
                  <ul className="mt-5 space-y-3">
                    {group.items.map((item) => (
                      <motion.li key={item} whileHover={{ x: 4 }} className="text-sm font-medium leading-6 text-slate-700 dark:text-slate-300">
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section id="projects" className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.2 }}
            className="mb-12 max-w-3xl"
          >
            <RevealText as="h2" className="section-title" text={t('projectsTitle')} />
            <p className="section-copy mt-5">{t('projectsIntro')}</p>
          </motion.div>
          <PinSection heightVh={150}>
            <ProjectSlider />
          </PinSection>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.2 }}
            className="mt-10 flex justify-center"
          >
            <motion.a
              href="/blog"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center rounded-full border border-slate-200 bg-white px-8 py-3.5 text-sm font-semibold text-slate-700 shadow-lg shadow-slate-900/5 transition-colors hover:border-amber-200 hover:text-slate-950 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:shadow-black/20 dark:hover:border-amber-700 dark:hover:text-amber-300"
            >
              {t('viewAllProjects')}
              <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </section>

      <section id="contact" className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <RevealText as="h2" className="section-title" text={t('contactTitle')} />
              <p className="section-copy mt-5">{t('contactIntro')}</p>

              <div className="mt-8 divide-y divide-slate-200 dark:divide-slate-700">
                <div className="py-4 first:pt-0">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">{t('email')}</p>
                  <p className="mt-2 text-lg font-semibold text-slate-950 dark:text-slate-50">{t('emailValue')}</p>
                </div>
                <div className="py-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">{t('location')}</p>
                  <p className="mt-2 text-lg font-semibold text-slate-950 dark:text-slate-50">{t('locationValue')}</p>
                </div>
                <div className="py-4 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  {t('heroAvailabilityDetail')}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <form className="space-y-6" onSubmit={handleSendEmail}>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-600 dark:text-slate-400">{t('name')}</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-700 shadow-sm shadow-slate-900/5 transition-colors placeholder:text-slate-400 focus:border-amber-300 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500 dark:focus:border-amber-600"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-600 dark:text-slate-400">{t('email')}</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-700 shadow-sm shadow-slate-900/5 transition-colors placeholder:text-slate-400 focus:border-amber-300 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500 dark:focus:border-amber-600"
                    />
                  </div>
                </div>
                <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-600 dark:text-slate-400">{t('message')}</label>
                  <textarea
                    rows={6}
                    value={formData.message}
                    onChange={(event) => setFormData((prev) => ({ ...prev, message: event.target.value }))}
                    className="w-full rounded-[1.5rem] border border-slate-200 bg-white px-4 py-3 text-slate-700 shadow-sm shadow-slate-900/5 transition-colors placeholder:text-slate-400 focus:border-amber-300 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500 dark:focus:border-amber-600"
                  />
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <motion.button
                    type="submit"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.99 }}
                    className="inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-8 py-4 text-sm font-semibold text-white shadow-xl shadow-slate-900/10 transition-colors hover:bg-slate-800 dark:bg-amber-500 dark:shadow-amber-500/20 dark:hover:bg-amber-400"
                  >
                    {t('sendViaEmail')}
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={handleSendWhatsApp}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.99 }}
                    className="inline-flex w-full items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-4 text-sm font-semibold text-slate-700 shadow-lg shadow-slate-900/5 transition-colors hover:border-emerald-200 hover:text-emerald-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:shadow-black/20 dark:hover:border-emerald-700 dark:hover:text-emerald-400"
                  >
                    {t('sendViaWhatsapp')}
                  </motion.button>
                </div>

                {formNotice ? (
                  <p className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
                    {formNotice}
                  </p>
                ) : null}
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}