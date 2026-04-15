'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import LanguageDropdown from './LanguageDropdown'

export default function Navbar() {
  const t = useTranslations('Navbar')
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 72)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navItems = [
    { href: '#about', label: t('about') },
    { href: '#experience', label: t('experience') },
    { href: '#skills', label: t('skills') },
    { href: '#projects', label: t('projects') },
    { href: '#contact', label: t('contact') },
  ]

  return (
    <header className="sticky top-0 z-50 w-full">
      <motion.div
        initial={false}
        animate={{
          backgroundColor: scrolled ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.00)',
          boxShadow: scrolled
            ? '0 4px 40px -8px rgba(15,23,42,0.13), 0 0 0 1px rgba(148,163,184,0.18)'
            : '0 0px 0px 0px rgba(15,23,42,0.00)',
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full backdrop-blur-2xl"
      >
        <nav className="mx-auto max-w-7xl">
          <motion.div
            initial={false}
            animate={{ height: scrolled ? 64 : 88 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-between"
          >
            <Link href="/" className="flex items-center gap-3 text-slate-950">
              {/* <motion.span
                initial={false}
                animate={{ scale: scrolled ? 0.88 : 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-sm font-extrabold tracking-[0.24em] text-white shadow-lg shadow-slate-900/10"
              >
                ZZ
              </motion.span> */}
              <span className="text-lg font-extrabold tracking-[0.18em] text-slate-950">ZINEDINE ZIDDAN FAHDLEVY</span>
            </Link>

            <div className="hidden md:block">
              <div className={`flex items-center gap-1 rounded-full border border-white/55 bg-white/70 px-2.5 py-1.5 backdrop-blur-xl ${scrolled ? "": "shadow-lg shadow-slate-900/6"}`}>
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition-all duration-200 hover:bg-slate-950 hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
                <LanguageDropdown />
              </div>
            </div>

            <div className="md:hidden">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white/85 p-3 text-slate-700 shadow-lg shadow-slate-900/5 transition-colors hover:text-slate-950"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          </motion.div>
        </nav>
      </motion.div>

      <motion.div
        initial={false}
        animate={isOpen ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden md:hidden"
      >
        <div className="bg-white/94 px-4 pb-4 pt-1 backdrop-blur-2xl">
          <div className="space-y-1 rounded-[1.75rem] border border-slate-200/80 bg-white/95 p-2.5 shadow-2xl shadow-slate-900/10">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-[1.25rem] px-4 py-3 text-base font-semibold text-slate-600 transition-colors hover:bg-sky-50 hover:text-slate-950"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2">
              <LanguageDropdown />
            </div>
          </div>
        </div>
      </motion.div>
    </header>
  )
} 