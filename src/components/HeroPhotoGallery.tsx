'use client'

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useLocale } from 'next-intl'
import { useState, useRef, useCallback, type MouseEvent } from 'react'
import { getSiteContent } from '@/data/siteContent'

export default function HeroPhotoGallery() {
  const locale = useLocale()
  const content = getSiteContent(locale)
  const { roleLabel, photos } = content.heroGallery

  const realPhoto = photos[0]?.src ?? '/profile1.jpeg'
  const animatedPhoto = photos[1]?.src ?? '/profile2.jpeg'

  const containerRef = useRef<HTMLDivElement>(null)
  const [isRevealed, setIsRevealed] = useState(false)

  // ─── Magnetic cursor tracking ────────────────────────────
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const springConfig = { stiffness: 150, damping: 20, mass: 0.8 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  const rotateX = useTransform(smoothY, [0, 1], [12, -12])
  const rotateY = useTransform(smoothX, [0, 1], [-12, 12])

  // Shine / glare effect position
  const glareX = useTransform(smoothX, [0, 1], [0, 100])
  const glareY = useTransform(smoothY, [0, 1], [0, 100])

  // Parallax inner elements
  const photoX = useTransform(smoothX, [0, 1], [-8, 8])
  const photoY = useTransform(smoothY, [0, 1], [-8, 8])

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    mouseX.set(Math.max(0, Math.min(1, x)))
    mouseY.set(Math.max(0, Math.min(1, y)))
  }, [mouseX, mouseY])

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0.5)
    mouseY.set(0.5)
    setIsRevealed(false)
  }, [mouseX, mouseY])

  return (
    <div className="relative mx-auto w-full max-w-md select-none" style={{ perspective: 1200 }}>
      {/* ── 3D Card Container ───────────────────────────────── */}
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsRevealed((prev) => !prev)}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        className="group relative cursor-pointer"
      >
        {/* ── Photo Frame ─────────────────────────────────── */}
        <div className="relative overflow-hidden rounded-[2rem] bg-white p-2.5 shadow-[0_40px_100px_-30px_rgba(15,23,42,0.22),0_0_0_1px_rgba(148,163,184,0.15)]">
          <div className="relative h-[460px] overflow-hidden rounded-[1.6rem] sm:h-[520px]">

            {/* Real Photo — always present as base */}
            <motion.div
              className="absolute inset-0"
              animate={{ opacity: isRevealed ? 0 : 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div style={{ x: photoX, y: photoY, scale: 1.05 }} className="h-full w-full">
                <Image
                  src={realPhoto}
                  alt="Professional photo"
                  fill
                  sizes="(max-width: 640px) 100vw, 460px"
                  quality={100}
                  className="pointer-events-none object-cover"
                  priority
                  draggable={false}
                />
              </motion.div>
            </motion.div>

            {/* Animated Character Photo — revealed on interaction */}
            <motion.div
              className="absolute inset-0"
              animate={{ opacity: isRevealed ? 1 : 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div style={{ x: photoX, y: photoY, scale: 1.05 }} className="h-full w-full">
                <Image
                  src={animatedPhoto}
                  alt="Animated character version"
                  fill
                  sizes="(max-width: 640px) 100vw, 460px"
                  quality={100}
                  className="pointer-events-none object-cover"
                  draggable={false}
                />
              </motion.div>
            </motion.div>

            {/* Cinematic gradient overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-slate-950/5" />

            {/* ── Holographic glare effect ──────────────── */}
            <motion.div
              className="pointer-events-none absolute inset-0 mix-blend-overlay"
              style={{
                background: useTransform(
                  [glareX, glareY],
                  ([x, y]) =>
                    `radial-gradient(600px circle at ${x}% ${y}%, rgba(255,255,255,0.25), transparent 55%)`
                ),
              }}
            />

            {/* ── Bottom info bar ────────────────────────── */}
            <div className="absolute bottom-0 left-0 right-0 z-10 px-5 pb-5">
              <motion.div
                className="flex items-center justify-between rounded-2xl border border-white/20 bg-black/25 px-4 py-3 backdrop-blur-xl"
                animate={{ y: 0, opacity: 1 }}
                initial={{ y: 12, opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isRevealed ? 'animated' : 'real'}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/60">
                      {isRevealed ? 'Animated' : roleLabel}
                    </p>
                    <p className="text-sm font-semibold text-white">
                      {isRevealed ? 'Character Version' : 'Zinedine Ziddan F.'}
                    </p>
                  </motion.div>
                </AnimatePresence>

                <div className="flex items-center gap-2">
                  <motion.div
                    className="h-2 w-2 rounded-full bg-emerald-400"
                    animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <span className="text-[11px] font-semibold text-white/80">Available</span>
                </div>
              </motion.div>
            </div>

          </div>

          {/* ── Inner border ring ────────────────────────── */}
          <div className="pointer-events-none absolute inset-2.5 rounded-[1.6rem] border border-white/30" />
        </div>

        {/* ── Floating interaction hint ──────────────────── */}
        <AnimatePresence>
          {!isRevealed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="absolute -right-3 top-6 z-20 rounded-2xl border border-white/50 bg-white/90 px-3.5 py-2 shadow-lg backdrop-blur-md"
              style={{ transform: 'translateZ(50px)' }}
            >
              <motion.div
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600"
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
                Click to reveal
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Revealed state indicator ─────────────────── */}
        <AnimatePresence>
          {isRevealed && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.9 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -left-3 top-6 z-20 rounded-2xl border border-violet-200 bg-gradient-to-r from-violet-50 to-fuchsia-50 px-3.5 py-2 shadow-lg"
              style={{ transform: 'translateZ(50px)' }}
            >
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-violet-700">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                Character Mode
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── Photo toggle dots ─────────────────────────────── */}
      <div className="mt-5 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => setIsRevealed(false)}
          className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300 ${
            !isRevealed
              ? 'bg-slate-950 text-white shadow-lg shadow-slate-900/15'
              : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700'
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          Real
        </button>
        <button
          type="button"
          onClick={() => setIsRevealed(true)}
          className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300 ${
            isRevealed
              ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/20'
              : 'bg-slate-100 text-slate-500 hover:bg-violet-50 hover:text-violet-600'
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          Character
        </button>
      </div>
    </div>
  )
}
