import { Metadata, Viewport } from 'next'
import { Manrope } from 'next/font/google'
import ThemeProvider from '@/components/ThemeProvider'
import './globals.css'

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fbff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zinedine.dev'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Zinedine Ziddan Fahdlevy — Frontend Developer',
    template: '%s | Zinedine Ziddan Fahdlevy',
  },
  description:
    'Portfolio of Zinedine Ziddan Fahdlevy — Frontend Developer & Software Engineer specializing in React, Next.js, TypeScript, and modern web technologies.',
  keywords: [
    'Zinedine Ziddan Fahdlevy',
    'Frontend Developer',
    'Software Engineer',
    'React',
    'Next.js',
    'TypeScript',
    'Portfolio',
    'Web Developer',
    'Indonesia',
  ],
  authors: [{ name: 'Zinedine Ziddan Fahdlevy' }],
  creator: 'Zinedine Ziddan Fahdlevy',
  publisher: 'Zinedine Ziddan Fahdlevy',
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'id_ID',
    url: siteUrl,
    siteName: 'Zinedine Ziddan Fahdlevy',
    title: 'Zinedine Ziddan Fahdlevy — Frontend Developer',
    description:
      'Frontend Developer & Software Engineer specializing in React, Next.js, TypeScript, and modern web technologies.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Zinedine Ziddan Fahdlevy — Frontend Developer Portfolio',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zinedine Ziddan Fahdlevy — Frontend Developer',
    description:
      'Frontend Developer & Software Engineer specializing in React, Next.js, and modern web technologies.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      'en': '/en',
      'id': '/id',
    },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Zinedine Portfolio',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icons/icon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/icon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/icon-180x180.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/favicon.svg', color: '#0ea5e9' },
    ],
  },
  category: 'technology',
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Zinedine Ziddan Fahdlevy',
    url: siteUrl,
    jobTitle: 'Frontend Developer',
    description:
      'Frontend Developer & Software Engineer specializing in React, Next.js, TypeScript, and modern web technologies.',
    sameAs: [],
    knowsAbout: [
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'Tailwind CSS',
      'Node.js',
      'Frontend Development',
      'Software Engineering',
    ],
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${manrope.className} ${manrope.variable} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
