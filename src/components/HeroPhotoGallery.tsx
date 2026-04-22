'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
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
  const [isHovered, setIsHovered] = useState(false)

  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const springConfig = { stiffness: 120, damping: 18, mass: 0.6 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  // Float movement following cursor
  const floatX = useTransform(smoothX, [0, 1], [-18, 18])
  const floatY = useTransform(smoothY, [0, 1], [-10, 10])

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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { handleMouseLeave(); setIsHovered(false) }}
      onClick={() => setIsRevealed((prev) => !prev)}
      className="relative w-full cursor-pointer select-none"
    >
      {/* ── Soft ambient glow behind figure ────────────── */}
      <motion.div
        className="absolute inset-x-0 bottom-0 flex justify-center"
        animate={{
          opacity: isRevealed ? 0.55 : 0.4,
        }}
        transition={{ duration: 0.7 }}
      >
        <div className={`h-[70%] w-[75%] rounded-[50%] blur-[60px] transition-colors duration-700 ${
          isRevealed
            ? 'bg-violet-200/50 dark:bg-violet-500/20'
            : 'bg-sky-200/45 dark:bg-sky-500/15'
        }`} />
      </motion.div>

      {/* ── "Tap me" badge ─────────────────────────────── */}
      <motion.div
        className="absolute right-6 top-6 z-20 flex items-center gap-1.5 rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-lg shadow-slate-900/10 backdrop-blur-sm dark:bg-slate-800/90 dark:text-slate-300 dark:shadow-black/30 sm:right-10 sm:top-8"
        initial={{ opacity: 0, scale: 0.8, y: -8 }}
        animate={{
          opacity: isHovered ? 0 : 1,
          scale: isHovered ? 0.8 : 1,
          y: isHovered ? -8 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.span
          className="inline-block h-2 w-2 rounded-full bg-sky-400"
          animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
        Tap me
      </motion.div>

      {/* ── Photo figure ───────────────────────────────── */}
      <motion.div
        style={{ x: floatX, y: floatY }}
        animate={{
          scale: isHovered ? 1.04 : 1,
          filter: isHovered ? 'brightness(1.06)' : 'brightness(1)',
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="relative"
      >
        {/* Real Photo */}
        <motion.div
          animate={{
            opacity: isRevealed ? 0 : 1,
            scale: isRevealed ? 0.97 : 1,
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={realPhoto}
            alt="Zinedine Ziddan - Professional"
            width={600}
            height={800}
            quality={100}
            className="pointer-events-none mx-auto h-auto w-full max-w-[480px] drop-shadow-[0_12px_40px_rgba(15,23,42,0.18)] dark:drop-shadow-[0_12px_40px_rgba(56,189,248,0.12)] sm:max-w-[540px]"
            style={{ maskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)' }}
            priority
            draggable={false}
          />
        </motion.div>

        {/* Animated Character Photo — overlaid */}
        <motion.div
          className="absolute inset-0"
          animate={{
            opacity: isRevealed ? 1 : 0,
            scale: isRevealed ? 1 : 0.97,
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={animatedPhoto}
            alt="Zinedine Ziddan - Character"
            width={600}
            height={800}
            quality={100}
            className="pointer-events-none mx-auto h-auto w-full max-w-[480px] drop-shadow-[0_12px_40px_rgba(124,58,237,0.18)] dark:drop-shadow-[0_12px_40px_rgba(124,58,237,0.15)] sm:max-w-[540px]"
            style={{ maskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)' }}
            draggable={false}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}
