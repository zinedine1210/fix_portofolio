'use client'

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useLocale } from 'next-intl'
import { useState, useRef, useCallback, type MouseEvent } from 'react'
import { getSiteContent } from '@/data/siteContent'

export default function HeroPhotoGallery() {
  const locale = useLocale()
  const content = getSiteContent(locale)
  const { photos } = content.heroGallery

  const realPhoto = photos[0]?.src ?? '/profile1.png'
  const animatedPhoto = photos[1]?.src ?? '/profile2.png'

  const containerRef = useRef<HTMLDivElement>(null)
  const [isRevealed, setIsRevealed] = useState(false)

  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const springConfig = { stiffness: 120, damping: 18, mass: 0.6 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  // Subtle float movement following cursor
  const floatX = useTransform(smoothX, [0, 1], [-12, 12])
  const floatY = useTransform(smoothY, [0, 1], [-6, 6])

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    mouseX.set(Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)))
    mouseY.set(Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height)))
  }, [mouseX, mouseY])

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0.5)
    mouseY.set(0.5)
  }, [mouseX, mouseY])

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => setIsRevealed((prev) => !prev)}
      className="relative h-[520px] w-full cursor-pointer select-none sm:h-[600px] lg:h-[640px]"
    >
      {/* ── Decorative glow behind the person ──────────── */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
        animate={{
          scale: isRevealed ? [1, 1.08, 1] : [1, 1.05, 1],
          opacity: isRevealed ? 0.7 : 0.5,
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className={`h-[420px] w-[420px] rounded-full blur-[80px] transition-colors duration-700 sm:h-[500px] sm:w-[500px] ${
          isRevealed
            ? 'bg-gradient-to-t from-violet-300/60 via-fuchsia-200/40 to-transparent'
            : 'bg-gradient-to-t from-sky-300/50 via-cyan-200/30 to-transparent'
        }`} />
      </motion.div>

      {/* ── Floor shadow ───────────────────────────────── */}
      <div className="absolute bottom-2 left-1/2 h-6 w-[60%] -translate-x-1/2 rounded-[50%] bg-slate-950/10 blur-xl" />

      {/* ── Photo figure container ─────────────────────── */}
      <motion.div
        style={{ x: floatX, y: floatY }}
        className="absolute inset-0 flex items-end justify-center"
      >
        {/* Real Photo */}
        <motion.div
          className="relative h-full w-full"
          animate={{
            opacity: isRevealed ? 0 : 1,
            scale: isRevealed ? 0.96 : 1,
            filter: isRevealed ? 'blur(6px)' : 'blur(0px)',
          }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={realPhoto}
            alt="Zinedine Ziddan - Professional"
            fill
            sizes="(max-width: 640px) 100vw, 600px"
            quality={100}
            className="pointer-events-none object-contain object-bottom drop-shadow-[0_20px_60px_rgba(15,23,42,0.25)]"
            priority
            draggable={false}
          />
        </motion.div>

        {/* Animated Character Photo */}
        <motion.div
          className="absolute inset-0"
          animate={{
            opacity: isRevealed ? 1 : 0,
            scale: isRevealed ? 1 : 0.96,
            filter: isRevealed ? 'blur(0px)' : 'blur(6px)',
          }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={animatedPhoto}
            alt="Zinedine Ziddan - Character"
            fill
            sizes="(max-width: 640px) 100vw, 600px"
            quality={100}
            className="pointer-events-none object-contain object-bottom drop-shadow-[0_20px_60px_rgba(124,58,237,0.25)]"
            draggable={false}
          />
        </motion.div>
      </motion.div>

      {/* ── Name badge (bottom center) ─────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isRevealed ? 'char' : 'real'}
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className={`flex items-center gap-3 rounded-full border px-5 py-2.5 shadow-xl backdrop-blur-xl transition-colors duration-500 ${
              isRevealed
                ? 'border-violet-200/60 bg-violet-950/30 shadow-violet-500/10'
                : 'border-white/30 bg-slate-950/25 shadow-slate-900/10'
            }`}
          >
            <motion.div
              className={`h-2 w-2 rounded-full ${isRevealed ? 'bg-violet-400' : 'bg-emerald-400'}`}
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-xs font-semibold tracking-wide text-white/90">
              {isRevealed ? '✦ Character Mode' : 'Zinedine Ziddan F.'}
            </span>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* ── Toggle hint (top right) ────────────────────── */}
      <AnimatePresence>
        {!isRevealed && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.3, delay: 1 }}
            className="absolute right-2 top-8 z-20 sm:right-4"
          >
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="flex items-center gap-1.5 rounded-full border border-white/40 bg-white/85 px-3 py-1.5 text-[11px] font-semibold text-slate-600 shadow-md backdrop-blur-md"
            >
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2z" />
              </svg>
              Tap me
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
