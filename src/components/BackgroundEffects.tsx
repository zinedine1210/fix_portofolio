'use client'

import { motion, useScroll, useTransform } from 'framer-motion'

export default function BackgroundEffects() {
  const { scrollYProgress } = useScroll()

  // Parallax: orbs drift slowly as user scrolls
  const orbY1 = useTransform(scrollYProgress, [0, 1], [0, -180])
  const orbY2 = useTransform(scrollYProgress, [0, 1], [0, -120])

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* ── Fine dot grid ─────────────────────────────── */}
      <div className="absolute inset-0 bg-mesh opacity-40 dark:opacity-15" />

      {/* ── Noise texture overlay for depth ────────────── */}
      <div
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px',
        }}
      />

      {/* ── Primary gradient orb (top-left) ────────────── */}
      <motion.div
        style={{ y: orbY1 }}
        className="absolute -left-[10%] -top-[5%] h-[min(55vw,600px)] w-[min(55vw,600px)] rounded-full bg-gradient-to-br from-amber-200/40 via-orange-100/30 to-transparent blur-[100px] dark:from-amber-600/10 dark:via-orange-500/5"
      />

      {/* ── Secondary gradient orb (right) ─────────────── */}
      <motion.div
        style={{ y: orbY2 }}
        className="absolute -right-[8%] top-[15%] h-[min(45vw,500px)] w-[min(45vw,500px)] rounded-full bg-gradient-to-bl from-orange-100/35 via-orange-50/20 to-transparent blur-[100px] dark:from-orange-600/8 dark:via-orange-500/4"
      />

      {/* ── Subtle horizontal rule glow (top) ──────────── */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/30 to-transparent dark:via-amber-500/10" />
    </div>
  )
}
