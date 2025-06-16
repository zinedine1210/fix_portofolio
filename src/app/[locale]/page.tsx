'use client'

import { useTranslations } from 'next-intl'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import Navbar from '@/components/Navbar'

export default function Home() {
  const t = useTranslations('Home')
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const y = useTransform(scrollYProgress, [0, 1], [0, -300])
  const containerRef = useRef(null)

  return (
    <main className="min-h-screen bg-black relative overflow-hidden">
      {/* Parallax Background */}
      <div className="fixed inset-0 z-0">
        <Image
          src={`/space-bg.jpg`}
          alt="Space Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-purple-900/30 to-black/50" />
      </div>

      {/* Animated stars */}
      <div className="fixed inset-0 overflow-hidden">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
            }}
          >
            <div className="h-full w-full rounded-full bg-white opacity-70" />
          </div>
        ))}
      </div>

      {/* Floating planets */}
      <motion.div
        style={{ y }}
        className="fixed inset-0 z-0 pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/4 w-64 h-64">
          <Image
            src="/planet1.png"
            alt="Planet"
            width={256}
            height={256}
            className="opacity-50"
          />
        </div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48">
          <Image
            src="/planet2.png"
            alt="Planet"
            width={192}
            height={192}
            className="opacity-30"
          />
        </div>
      </motion.div>

      {/* Navbar with blur effect */}
      <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/30 border-b border-white/10">
        <Navbar />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-20">
        <motion.div 
          ref={containerRef}
          style={{ opacity, scale }}
          className="relative z-10 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mb-6">
              {t('title')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex gap-4 justify-center"
          >
            <a
              href="#projects"
              className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
            >
              {t('viewProjects')}
            </a>
            <a
              href="#contact"
              className="px-8 py-3 rounded-full border-2 border-purple-500 text-purple-400 font-semibold hover:bg-purple-500/10 transition-all duration-300 transform hover:scale-105"
            >
              {t('contactMe')}
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <motion.div
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-1 h-2 bg-white/50 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* About Me Section */}
      <section id="about" className="min-h-screen py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            <div className="relative">
              <div className="relative w-64 h-64 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-xl opacity-50 animate-pulse" />
                <Image
                  src="/profile.jpg"
                  alt="Profile"
                  width={256}
                  height={256}
                  className="rounded-full relative z-10"
                />
              </div>
            </div>
            <div className="text-gray-300">
              <h2 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                {t('aboutTitle')}
              </h2>
              <p className="text-lg mb-6">{t('aboutDescription')}</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-lg backdrop-blur-sm border border-white/10">
                  <h3 className="text-xl font-semibold mb-2 text-blue-400">{t('location')}</h3>
                  <p>{t('locationValue')}</p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg backdrop-blur-sm border border-white/10">
                  <h3 className="text-xl font-semibold mb-2 text-purple-400">{t('email')}</h3>
                  <p>{t('emailValue')}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="min-h-screen py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
          >
            {t('experienceTitle')}
          </motion.h2>
          <div className="space-y-8">
            {[1, 2, 3].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white/5 p-6 rounded-lg backdrop-blur-sm border border-white/10"
              >
                <h3 className="text-2xl font-semibold mb-2 text-blue-400">
                  {t(`experience${index + 1}Title`)}
                </h3>
                <p className="text-purple-400 mb-2">{t(`experience${index + 1}Period`)}</p>
                <p className="text-gray-300">{t(`experience${index + 1}Description`)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="min-h-screen py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
          >
            {t('skillsTitle')}
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Frontend', 'Backend', 'Tools', 'Soft Skills'].map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white/5 p-6 rounded-lg backdrop-blur-sm border border-white/10"
              >
                <h3 className="text-xl font-semibold mb-4 text-blue-400">{category}</h3>
                <ul className="space-y-2">
                  {[1, 2, 3, 4].map((_, i) => (
                    <li key={i} className="text-gray-300">
                      {t(`${category.toLowerCase()}Skill${i + 1}`)}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
          >
            {t('projectsTitle')}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white/5 rounded-lg overflow-hidden backdrop-blur-sm border border-white/10 group"
              >
                <div className="relative h-48">
                  <Image
                    src={`/project${index + 1}.jpg`}
                    alt={`Project ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-blue-400">
                    {t(`project${index + 1}Title`)}
                  </h3>
                  <p className="text-gray-300 mb-4">{t(`project${index + 1}Description`)}</p>
                  <div className="flex gap-2">
                    {['React', 'Node.js', 'MongoDB'].map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen py-20 px-4 relative">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
          >
            {t('contactTitle')}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/5 p-8 rounded-lg backdrop-blur-sm border border-white/10"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2">{t('name')}</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-white/5 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-white/10"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">{t('email')}</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 bg-white/5 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-white/10"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-300 mb-2">{t('message')}</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 bg-white/5 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-white/10"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full px-8 py-3 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
              >
                {t('sendMessage')}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </main>
  )
} 