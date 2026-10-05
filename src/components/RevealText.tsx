'use client'

import { motion, useReducedMotion } from 'framer-motion'

interface RevealTextProps {
  text: string
  className?: string
  delay?: number
  as?: 'span' | 'h1' | 'h2' | 'h3'
}

export default function RevealText({ text, className, delay = 0, as = 'span' }: RevealTextProps) {
  const prefersReducedMotion = useReducedMotion()
  const words = text.split(' ')
  const Tag = motion[as]

  if (prefersReducedMotion) {
    return <Tag className={className}>{text}</Tag>
  }

  return (
    <Tag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      transition={{ staggerChildren: 0.06, delayChildren: delay }}
    >
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className={`inline-block will-change-transform ${className ?? ''}`}
            variants={{
              hidden: { y: '110%', opacity: 0 },
              visible: { y: '0%', opacity: 1 },
            }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
            {index < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
