'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { useState } from 'react'
import LanguageDropdown from './LanguageDropdown'

export default function Navbar() {
  const t = useTranslations('Navbar')
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: '#about', label: t('about') },
    { href: '#experience', label: t('experience') },
    { href: '#skills', label: t('skills') },
    { href: '#projects', label: t('projects') },
    { href: '#contact', label: t('contact') },
  ]

  return (
    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex h-20 items-center justify-between">
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center gap-3 text-slate-950">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-sm font-extrabold tracking-[0.24em] text-white shadow-lg shadow-slate-900/10">
              ZZ
            </span>
            <span className="text-lg font-extrabold tracking-[0.18em] text-slate-950">
              ZINEDINE
            </span>
          </Link>
        </div>

        <div className="hidden md:block">
          <div className="ml-10 flex items-center gap-3 rounded-full border border-white/60 bg-white/75 px-3 py-2 shadow-lg shadow-slate-900/5 backdrop-blur-xl">
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
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white/85 p-3 text-slate-700 shadow-lg shadow-slate-900/5 transition-colors hover:text-slate-950"
          >
            <span className="sr-only">Open main menu</span>
            {!isOpen ? (
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            ) : (
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, height: "auto" },
          closed: { opacity: 0, height: 0 }
        }}
        className="overflow-hidden md:hidden"
      >
        <div className="mt-3 space-y-2 rounded-[2rem] border border-slate-200 bg-white/92 p-3 shadow-2xl shadow-slate-900/8 backdrop-blur-xl">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-2xl px-4 py-3 text-base font-semibold text-slate-600 transition-colors duration-200 hover:bg-sky-50 hover:text-slate-950"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-2">
            <LanguageDropdown />
          </div>
        </div>
      </motion.div>
    </nav>
  )
} 