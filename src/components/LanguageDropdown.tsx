'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocale } from 'next-intl'

export default function LanguageDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale()

  const languages = [
    { code: 'id', name: 'Indonesia', flag: '🇮🇩' },
    { code: 'en', name: 'English', flag: '🇺🇸' }
  ]

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLanguageChange = (languageCode: string) => {
    setIsOpen(false)
    // Remove current locale from pathname and add new one
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/'
    router.push(`/${languageCode}${pathWithoutLocale}`)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-4 py-2 text-sm font-semibold text-slate-700 shadow-lg shadow-slate-900/5 transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-200 hover:text-slate-950 hover:shadow-xl hover:shadow-sky-100/70 dark:border-slate-700 dark:bg-slate-800/85 dark:text-slate-300 dark:shadow-black/20 dark:hover:border-sky-700 dark:hover:text-sky-300 dark:hover:shadow-sky-900/30"
      >
        <span className="text-lg">{currentLanguage.flag}</span>
        <span>{currentLanguage.name}</span>
        <motion.svg
          className="w-4 h-4"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 z-50 mt-3 w-52 overflow-hidden rounded-3xl border border-slate-200 bg-white/92 shadow-2xl shadow-slate-900/10 backdrop-blur-xl dark:border-slate-700 dark:bg-slate-800/92 dark:shadow-black/30"
          >
            <div className="py-2">
              {languages.map((language, index) => (
                <motion.button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  whileHover={{ 
                    backgroundColor: 'rgba(14, 165, 233, 0.08)',
                    x: 5
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-all duration-200 ${
                    language.code === locale 
                      ? 'bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-400' 
                      : 'text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-slate-200'
                  }`}
                >
                  <span className="text-xl">{language.flag}</span>
                  <span className="font-medium">{language.name}</span>
                  {language.code === locale && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-auto h-2 w-2 rounded-full bg-sky-500"
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 