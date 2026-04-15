'use client'

import { AnimatePresence, motion, PanInfo } from 'framer-motion'
import Image from 'next/image'
import { useLocale } from 'next-intl'
import { useState, useCallback } from 'react'
import { getSiteContent } from '@/data/siteContent'

const SWIPE_THRESHOLD = 48

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      x: { type: 'spring', stiffness: 300, damping: 30, mass: 0.8 },
      opacity: { duration: 0.3 },
    },
  },
  exit: (dir: number) => ({
    x: dir < 0 ? '100%' : '-100%',
    opacity: 0,
    transition: {
      x: { type: 'spring', stiffness: 300, damping: 30, mass: 0.8 },
      opacity: { duration: 0.25 },
    },
  }),
}

const chipVariants = {
  enter: { opacity: 0, y: 10, scale: 0.94 },
  center: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] } },
  exit:   { opacity: 0, y: -10, scale: 0.94, transition: { duration: 0.22 } },
}

export default function HeroPhotoGallery() {
  const locale = useLocale()
  const content = getSiteContent(locale)
  const { photos, roleLabel, swipeHint } = content.heroGallery
  const [[index, direction], setPage] = useState([0, 0])

  const paginate = useCallback((dir: number) => {
    setPage(([prev]) => [(prev + dir + photos.length) % photos.length, dir])
  }, [])

  const handleDragEnd = useCallback((_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_THRESHOLD) paginate(1)
    else if (info.offset.x > SWIPE_THRESHOLD) paginate(-1)
  }, [paginate])

  const photo = photos[index]
  const num = `${String(index + 1).padStart(2, '0')} / ${String(photos.length).padStart(2, '0')}`

  return (
    <div className="relative mx-auto w-full max-w-[34rem] select-none [transform-style:preserve-3d]">

      {/* ── Main photo frame ─────────────────────────────────── */}
      <motion.div
        whileHover={{ scale: 1.008 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        className="soft-ring relative overflow-hidden rounded-[2.2rem] bg-white p-3 shadow-4xl [transform:translateZ(35px)]"
      >
        {/* overflow-hidden clip for slide animation */}
        <div className="relative h-[480px] overflow-hidden rounded-[1.8rem] sm:h-[540px]">

          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.12}
              onDragEnd={handleDragEnd}
              onClick={() => paginate(1)}
              className="absolute inset-0 cursor-grab active:cursor-grabbing"
            >
              <Image
                src={photo.src}
                alt={photo.label}
                fill
                sizes="(max-width: 640px) 100vw, 560px"
                quality={100}
                className="pointer-events-none object-cover"
                priority={index === 0}
                draggable={false}
              />
              {/* subtle cinematic gradient */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/28 via-transparent to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* ── Dot indicator (inside frame, bottom centre) ── */}
          <div
            className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 rounded-full bg-black/30 px-3.5 py-2.5 backdrop-blur-md">
              {photos.map((_, i) => (
                <motion.button
                  key={i}
                  type="button"
                  onClick={() => setPage([i, i > index ? 1 : -1])}
                  animate={{ width: i === index ? 32 : 10 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  className={`h-2.5 rounded-full transition-colors duration-300 ${
                    i === index ? 'bg-white' : 'bg-white/45 hover:bg-white/75'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* inner highlight ring */}
        <div className="pointer-events-none absolute inset-3 rounded-[1.8rem] border border-white/40" />
      </motion.div>

      {/* ── Floating top-left chip — changes with photo ─── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`chip-${index}`}
          variants={chipVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="surface-panel absolute -left-2 top-6 z-10 rounded-3xl px-4 py-3 [transform:translateZ(58px)]"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">{num}</p>
          <p className="mt-1 text-sm font-semibold text-slate-950">{photo.label}</p>
        </motion.div>
      </AnimatePresence>

      {/* ── Floating bottom-right caption — changes with photo ─── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`caption-${index}`}
          variants={chipVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="surface-panel absolute -bottom-4 right-4 z-10 rounded-3xl px-4 py-3 [transform:translateZ(58px)]"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">{roleLabel}</p>
          <p className="mt-1 text-sm font-semibold text-slate-950">{photo.caption}</p>
        </motion.div>
      </AnimatePresence>

      {/* ── Subtle swipe hint (only on mobile, fades after first interaction) ── */}
      <motion.div
        initial={{ opacity: 0.85 }}
        animate={{ opacity: [0.85, 0.4, 0.85] }}
        transition={{ duration: 3, repeat: 2, ease: 'easeInOut', delay: 1.2 }}
        className="pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 [transform:translateZ(80px)] sm:hidden"
      >
        <div className="flex items-center gap-2 rounded-full bg-black/25 px-4 py-2.5 text-xs font-semibold text-white backdrop-blur-md">
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
          {swipeHint}
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </motion.div>
    </div>
  )
}
