import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isId = locale === 'id'

  return {
    title: isId
      ? 'Zinedine Ziddan Fahdlevy — Frontend Developer'
      : 'Zinedine Ziddan Fahdlevy — Frontend Developer',
    description: isId
      ? 'Portofolio Zinedine Ziddan Fahdlevy — Frontend Developer & Software Engineer yang mengkhususkan diri dalam React, Next.js, TypeScript, dan teknologi web modern.'
      : 'Portfolio of Zinedine Ziddan Fahdlevy — Frontend Developer & Software Engineer specializing in React, Next.js, TypeScript, and modern web technologies.',
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'en': '/en',
        'id': '/id',
      },
    },
    openGraph: {
      locale: isId ? 'id_ID' : 'en_US',
    },
  }
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'id' }]
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  let messages
  try {
    messages = (await import(`../../messages/${locale}.json`)).default
  } catch (error) {
    console.log(error)
    notFound()
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  )
} 