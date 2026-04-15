'use client'

import { useTranslations } from 'next-intl'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import ProjectSlider from '@/components/ProjectSlider'
import Footer from '@/components/Footer'

const floatingShapes = [
  { className: 'left-[4%] top-24 h-44 w-44 bg-sky-200/55', duration: 12 },
  { className: 'right-[6%] top-[22%] h-56 w-56 bg-cyan-100/80', duration: 16 },
  { className: 'left-[16%] bottom-[18%] h-64 w-64 bg-blue-100/60', duration: 18 },
  { className: 'right-[18%] bottom-12 h-40 w-40 bg-slate-200/70', duration: 14 },
]

const orbitDots = [
  'left-[12%] top-[18%] h-2.5 w-2.5',
  'left-[22%] top-[38%] h-3 w-3',
  'right-[16%] top-[14%] h-2 w-2',
  'right-[24%] top-[42%] h-2.5 w-2.5',
  'left-[28%] bottom-[22%] h-2 w-2',
  'right-[28%] bottom-[16%] h-3 w-3',
]

export default function Home() {
  const t = useTranslations('Home')
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -120])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0.88])

  const experienceItems = [1, 2, 3].map((index) => ({
    title: t(`experience${index}Title`),
    period: t(`experience${index}Period`),
    description: t(`experience${index}Description`),
  }))

  const skillGroups = [
    {
      title: 'Frontend',
      description: t('skillsCardFrontendDescription'),
      accent: 'from-sky-500 to-cyan-400',
      items: [t('frontendSkill1'), t('frontendSkill2'), t('frontendSkill3'), t('frontendSkill4')],
    },
    {
      title: 'Backend',
      description: t('skillsCardBackendDescription'),
      accent: 'from-teal-500 to-emerald-400',
      items: [t('backendSkill1'), t('backendSkill2'), t('backendSkill3'), t('backendSkill4')],
    },
    {
      title: 'Tools',
      description: t('skillsCardToolsDescription'),
      accent: 'from-slate-900 to-slate-700',
      items: [t('toolsSkill1'), t('toolsSkill2'), t('toolsSkill3'), t('toolsSkill4')],
    },
    {
      title: 'Soft Skills',
      description: t('skillsCardSoftDescription'),
      accent: 'from-violet-500 to-fuchsia-400',
      items: [t('softskillsSkill1'), t('softskillsSkill2'), t('softskillsSkill3'), t('softskillsSkill4')],
    },
  ]

  const statCards = [
    { value: t('heroExperienceValue'), label: t('heroExperienceLabel') },
    { value: t('heroProjectsValue'), label: t('heroProjectsLabel') },
    { value: t('heroFocusValue'), label: t('heroFocusLabel') },
  ]

  return (
    <main className="relative min-h-screen overflow-hidden text-slate-900">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-60" />
        {floatingShapes.map((shape) => (
          <motion.div
            key={shape.className}
            className={`absolute rounded-full blur-3xl ${shape.className}`}
            animate={{ y: [0, -20, 0], scale: [1, 1.06, 1] }}
            transition={{ duration: shape.duration, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
        {orbitDots.map((dot, index) => (
          <motion.div
            key={dot}
            className={`absolute rounded-full bg-sky-400/50 ${dot}`}
            animate={{ opacity: [0.35, 1, 0.35], y: [0, -10, 0] }}
            transition={{ duration: 4 + index, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <div className="fixed left-0 right-0 top-0 z-50 border-b border-white/60 bg-white/70 backdrop-blur-2xl">
        <Navbar />
      </div>

      <section className="relative px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pt-36">
        <div className="mx-auto max-w-7xl">
          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]"
          >
            <div className="space-y-8">
              <motion.span
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="section-label"
              >
                {t('heroEyebrow')}
              </motion.span>

              <div className="space-y-6">
                <motion.h1
                  className="max-w-4xl text-balance text-5xl font-extrabold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                >
                  {t('title')} <span className="accent-text">{t('heroHighlight')}</span>
                </motion.h1>
                <motion.p
                  className="max-w-2xl text-balance text-lg leading-8 text-slate-600 md:text-xl"
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
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center rounded-full bg-slate-950 px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-slate-900/10 transition-colors hover:bg-slate-800"
                >
                  {t('viewProjects')}
                </motion.a>
                <motion.a
                  href="#contact"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center rounded-full border border-slate-200 bg-white/90 px-7 py-3.5 text-sm font-semibold text-slate-700 shadow-lg shadow-slate-900/5 transition-colors hover:border-sky-200 hover:text-slate-950"
                >
                  {t('contactMe')}
                </motion.a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="grid gap-4 sm:grid-cols-3"
              >
                {statCards.map((stat) => (
                  <div key={stat.label} className="surface-panel rounded-[1.75rem] p-5">
                    <p className="text-3xl font-bold tracking-tight text-slate-950">{stat.value}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-500">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.25 }}
              className="relative"
            >
              <div className="surface-panel-strong relative overflow-hidden rounded-[2rem] p-6 sm:p-8">
                <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-sky-100 blur-3xl" />
                <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-cyan-100 blur-3xl" />
                <div className="relative space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full border border-sky-200 bg-sky-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
                      {t('heroBadge')}
                    </span>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      {t('heroAvailability')}
                    </span>
                  </div>

                  <div className="relative mx-auto flex max-w-sm justify-center">
                    <div className="soft-ring relative overflow-hidden rounded-[2rem] bg-white p-3 shadow-4xl">
                      <Image
                        src="/profile.jpg"
                        alt="Profile"
                        width={460}
                        height={560}
                        className="h-[420px] w-full rounded-[1.5rem] object-cover"
                        priority
                      />
                    </div>

                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                      className="surface-panel absolute -left-3 top-10 rounded-3xl px-4 py-3"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">UI Systems</p>
                      <p className="mt-1 text-sm font-semibold text-slate-950">Next.js • Motion • UX</p>
                    </motion.div>

                    <motion.div
                      animate={{ y: [0, 10, 0] }}
                      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                      className="surface-panel absolute -bottom-3 right-0 rounded-3xl px-4 py-3"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Delivery</p>
                      <p className="mt-1 text-sm font-semibold text-slate-950">Responsive, polished, production-ready</p>
                    </motion.div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50/90 p-5">
                      <p className="text-sm font-semibold text-slate-500">{t('aboutCardTitle')}</p>
                      <p className="mt-2 text-base leading-7 text-slate-700">{t('aboutCardDescription')}</p>
                    </div>
                    <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50/90 p-5">
                      <p className="text-sm font-semibold text-slate-500">{t('contactTitle')}</p>
                      <p className="mt-2 text-base leading-7 text-slate-700">{t('heroAvailabilityDetail')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="about" className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]"
          >
            <div className="surface-panel-strong rounded-[2rem] p-8 md:p-10">
              <span className="section-label">{t('aboutTitle')}</span>
              <h2 className="section-title mt-6">{t('aboutTitle')}</h2>
              <p className="section-copy mt-6">{t('aboutDescription')}</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <motion.div whileHover={{ y: -4 }} className="surface-panel rounded-[2rem] p-7">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">{t('location')}</p>
                <p className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">{t('locationValue')}</p>
                <p className="mt-3 text-sm leading-6 text-slate-600">{t('locationDescription')}</p>
              </motion.div>
              <motion.div whileHover={{ y: -4 }} className="surface-panel rounded-[2rem] p-7">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">{t('email')}</p>
                <p className="mt-4 break-all text-2xl font-semibold tracking-tight text-slate-950">{t('emailValue')}</p>
                <p className="mt-3 text-sm leading-6 text-slate-600">{t('emailDescription')}</p>
              </motion.div>
              <motion.div whileHover={{ y: -4 }} className="surface-panel rounded-[2rem] p-7 md:col-span-2">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">{t('aboutCardTitle')}</p>
                    <p className="mt-3 text-base leading-7 text-slate-700">{t('aboutCardDescription')}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">{t('experienceTitle')}</p>
                    <p className="mt-3 text-base leading-7 text-slate-700">{t('experienceIntro')}</p>
                  </div>
                </div>
              </motion.div>
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
            <span className="section-label">{t('experienceTitle')}</span>
            <h2 className="section-title mt-6">{t('experienceTitle')}</h2>
            <p className="section-copy mt-5">{t('experienceIntro')}</p>
          </motion.div>

          <div className="relative space-y-6 before:absolute before:left-5 before:top-0 before:h-full before:w-px before:bg-gradient-to-b before:from-sky-200 before:via-slate-200 before:to-transparent md:before:left-[11.5rem]">
            {experienceItems.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: index * 0.08 }}
                viewport={{ once: true, amount: 0.2 }}
                className="grid gap-4 md:grid-cols-[10rem_1fr] md:gap-8"
              >
                <div className="relative pl-12 md:pl-0">
                  <span className="absolute left-[18px] top-1 h-3.5 w-3.5 rounded-full border-4 border-white bg-sky-500 shadow-lg shadow-sky-200 md:left-auto md:right-[-1.06rem]" />
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{item.period}</p>
                </div>
                <div className="surface-panel rounded-[1.75rem] p-7 md:p-8">
                  <h3 className="text-2xl font-semibold tracking-tight text-slate-950">{item.title}</h3>
                  <p className="mt-4 text-base leading-7 text-slate-600">{item.description}</p>
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
            <span className="section-label">{t('skillsTitle')}</span>
            <h2 className="section-title mt-6">{t('skillsTitle')}</h2>
            <p className="section-copy mt-5">{t('skillsIntro')}</p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {skillGroups.map((group, index) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.08 }}
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ y: -6 }}
                className="surface-panel-strong rounded-[2rem] p-7"
              >
                <div className={`inline-flex rounded-full bg-gradient-to-r ${group.accent} px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-white`}>
                  {group.title}
                </div>
                <p className="mt-5 text-sm leading-6 text-slate-500">{group.description}</p>
                <ul className="mt-6 space-y-4">
                  {group.items.map((item) => (
                    <motion.li key={item} whileHover={{ x: 4 }} className="flex items-start gap-3 text-sm font-medium leading-6 text-slate-700">
                      <span className="mt-2 h-2 w-2 rounded-full bg-sky-500" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
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
            <span className="section-label">{t('projectsTitle')}</span>
            <h2 className="section-title mt-6">{t('projectsTitle')}</h2>
            <p className="section-copy mt-5">{t('projectsIntro')}</p>
          </motion.div>
          <ProjectSlider />
        </div>
      </section>

      <section id="contact" className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, amount: 0.2 }}
              className="surface-panel-strong rounded-[2rem] p-8 md:p-10"
            >
              <span className="section-label">{t('contactTitle')}</span>
              <h2 className="section-title mt-6">{t('contactTitle')}</h2>
              <p className="section-copy mt-5">{t('contactIntro')}</p>

              <div className="mt-8 space-y-4">
                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50/90 p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">{t('email')}</p>
                  <p className="mt-2 text-lg font-semibold text-slate-950">{t('emailValue')}</p>
                </div>
                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50/90 p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">{t('location')}</p>
                  <p className="mt-2 text-lg font-semibold text-slate-950">{t('locationValue')}</p>
                </div>
                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50/90 p-5 text-sm leading-6 text-slate-600">
                  {t('heroAvailabilityDetail')}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true, amount: 0.2 }}
              className="surface-panel-strong rounded-[2rem] p-8 md:p-10"
            >
              <form className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-600">{t('name')}</label>
                    <input
                      type="text"
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-700 shadow-sm shadow-slate-900/5 transition-colors placeholder:text-slate-400 focus:border-sky-300 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-600">{t('email')}</label>
                    <input
                      type="email"
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-700 shadow-sm shadow-slate-900/5 transition-colors placeholder:text-slate-400 focus:border-sky-300 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-600">{t('message')}</label>
                  <textarea
                    rows={6}
                    className="w-full rounded-[1.5rem] border border-slate-200 bg-white px-4 py-3 text-slate-700 shadow-sm shadow-slate-900/5 transition-colors placeholder:text-slate-400 focus:border-sky-300 focus:outline-none"
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.99 }}
                  className="inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-8 py-4 text-sm font-semibold text-white shadow-xl shadow-slate-900/10 transition-colors hover:bg-slate-800"
                >
                  {t('sendMessage')}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}