import { Metadata, Viewport } from 'next'
import { Manrope } from 'next/font/google'
import './globals.css'

export const viewport: Viewport = {
  themeColor: '#0ea5e9',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
})

export const metadata: Metadata = {
  title: "Zinedine's Portfolio",
  description: 'Frontend Developer Portfolio showcasing projects and skills',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: "Zinedine's Portfolio",
  },
  icons: {
    icon: '/icons/icon-192x192.png',
    apple: '/icons/icon-192x192.png',
  },
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${manrope.className} ${manrope.variable} antialiased`}>{children}</body>
    </html>
  )
}
