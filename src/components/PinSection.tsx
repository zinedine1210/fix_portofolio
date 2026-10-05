'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

interface PinSectionProps {
  children: ReactNode
  heightVh?: number
}

export default function PinSection({ children, heightVh = 160 }: PinSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })
  const scale = useTransform(scrollYProgress, [0, 0.3, 1], [0.94, 1, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.15], [0.6, 1])

  if (prefersReducedMotion) {
    return <div>{children}</div>
  }

  return (
    <div ref={containerRef} style={{ height: `${heightVh}vh` }} className="relative">
      <motion.div style={{ scale, opacity }} className="sticky top-24">
        {children}
      </motion.div>
    </div>
  )
}
