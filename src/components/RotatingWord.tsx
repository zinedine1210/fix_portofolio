'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface RotatingWordProps {
  words: string[]
  className?: string
  intervalMs?: number
}

export default function RotatingWord({ words, className, intervalMs = 2200 }: RotatingWordProps) {
  const prefersReducedMotion = useReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (prefersReducedMotion) return
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length)
    }, intervalMs)
    return () => clearInterval(id)
  }, [prefersReducedMotion, words.length, intervalMs])

  if (prefersReducedMotion) {
    return <span className={className}>{words[0]}</span>
  }

  const longestWord = words.reduce((a, b) => (a.length >= b.length ? a : b))

  return (
    <span className="relative inline-block overflow-hidden align-bottom">
      <span className="invisible">{longestWord}</span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[index]}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={`absolute inset-0 inline-block ${className ?? ''}`}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
