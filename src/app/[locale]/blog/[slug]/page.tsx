'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

export default function BlogPost() {
  const t = useTranslations('Blog')
  const params = useParams()
  const slug = params.slug as string

  // This would typically come from your CMS or API
  const post = {
    title: t('project1Title'),
    date: 'March 15, 2024',
    author: 'Zinedine',
    readTime: '5 min read',
    content: t('project1Content'),
    image: '/project1.jpg',
    tags: ['React', 'Node.js', 'MongoDB'],
    relatedPosts: [
      {
        title: t('project2Title'),
        image: '/project2.jpg',
        link: '/blog/project2'
      },
      {
        title: t('project3Title'),
        image: '/project3.jpg',
        link: '/blog/project3'
      }
    ]
  }

  return (
    <main className="min-h-screen bg-black relative overflow-hidden">
      {/* Parallax Background */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/space-bg.jpg"
          alt="Space Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-purple-900/30 to-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/20 shadow-xl overflow-hidden"
        >
          {/* Hero Image */}
          <div className="relative h-96 w-full">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="flex items-center gap-4 text-gray-300 mb-6">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
              <span>•</span>
              <span>By {post.author}</span>
            </div>

            <h1 className="text-4xl font-bold text-white mb-6">{post.title}</h1>

            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-sm bg-white/10 text-purple-300 border border-purple-500/30"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="prose prose-invert max-w-none">
              {post.content}
            </div>
          </div>
        </motion.div>

        {/* Related Posts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Related Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {post.relatedPosts.map((relatedPost, index) => (
              <Link key={index} href={relatedPost.link}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white/10 rounded-xl overflow-hidden backdrop-blur-md border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-48 w-full">
                    <Image
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-white">{relatedPost.title}</h3>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Back to Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Link href="/#projects">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Back to Projects
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </main>
  )
} 