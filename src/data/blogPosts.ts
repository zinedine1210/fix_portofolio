export type SupportedLocale = 'en' | 'id'

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  cover: string
  tags: string[]
  readTime: string
  publishedAt: string
  content: string[]
}

const postsByLocale: Record<SupportedLocale, BlogPost[]> = {
  en: [
    {
      slug: 'project1',
      title: 'Scalable E-Commerce Platform',
      excerpt:
        'How I structured a maintainable storefront architecture with clean checkout flows, catalog indexing, and predictable component patterns.',
      cover: '/project1.jpg',
      tags: ['Next.js', 'Performance', 'Architecture'],
      readTime: '6 min read',
      publishedAt: 'Mar 15, 2026',
      content: [
        'This project started as a redesign initiative for a growing product catalog. The main challenge was balancing visual polish with predictable performance on slower devices.',
        'I split the UI into reusable slices and introduced a clear section hierarchy, allowing product cards, filters, and checkout forms to share consistent states. This reduced regressions and made iteration faster.',
        'On the technical side, I optimized media handling, reduced render churn on interactive lists, and simplified network payloads for high-traffic routes. The result was a cleaner experience and a much steadier conversion funnel.'
      ]
    },
    {
      slug: 'project2',
      title: 'Real-Time Task Collaboration App',
      excerpt:
        'Designing collaborative workflows with clear status visibility, low-friction updates, and a UI that scales from solo use to teams.',
      cover: '/project2.jpg',
      tags: ['Realtime', 'UX Systems', 'Team Workflow'],
      readTime: '5 min read',
      publishedAt: 'Feb 28, 2026',
      content: [
        'The objective was to make multi-user collaboration feel lightweight and intuitive. I focused on reducing cognitive load by tightening visual hierarchy and improving interaction feedback.',
        'Each task state was translated into a compact design language: clear tags, priority markers, and contextual actions. This helped teams scan and act quickly without opening every detail view.',
        'Beyond visuals, I implemented optimistic UI patterns and resilient state updates. The app remained responsive during high activity, and users reported better trust in the timeline accuracy.'
      ]
    },
    {
      slug: 'project3',
      title: 'Personal Developer Portfolio',
      excerpt:
        'Building a personal brand experience that feels editorial, responsive, and memorable while keeping code quality production-ready.',
      cover: '/project3.jpg',
      tags: ['Branding', 'Motion', 'Frontend'],
      readTime: '4 min read',
      publishedAt: 'Jan 20, 2026',
      content: [
        'The portfolio was designed to communicate both technical confidence and design sensitivity. I used a bright visual system with layered depth and subtle motion to avoid a flat presentation.',
        'Content structure was treated like a product narrative: quick context first, then proof through projects, and finally a conversion-ready contact section. This improved flow across desktop and mobile.',
        'I also prioritized maintainability by centralizing reusable design primitives and simplifying component contracts. The final result is easier to evolve while staying visually cohesive.'
      ]
    }
  ],
  id: [
    {
      slug: 'project1',
      title: 'Platform E-Commerce Skalabel',
      excerpt:
        'Bagaimana saya menyusun arsitektur storefront yang rapi dengan alur checkout jelas, indexing katalog, dan pola komponen yang konsisten.',
      cover: '/project1.jpg',
      tags: ['Next.js', 'Performa', 'Arsitektur'],
      readTime: '6 menit baca',
      publishedAt: '15 Mar 2026',
      content: [
        'Proyek ini dimulai dari kebutuhan redesign untuk katalog produk yang terus bertambah. Tantangan utamanya adalah menjaga tampilan tetap premium tanpa mengorbankan performa di perangkat menengah.',
        'Saya memecah UI menjadi bagian reusable dan membuat hirarki section yang lebih jelas agar kartu produk, filter, dan form checkout memiliki pola state yang seragam. Dampaknya, iterasi fitur jadi lebih cepat dan minim regresi.',
        'Di sisi teknis, saya optimalkan media loading, mengurangi render yang tidak perlu pada list interaktif, serta menyederhanakan payload data di rute trafik tinggi. Hasil akhirnya lebih stabil dan lebih baik untuk konversi.'
      ]
    },
    {
      slug: 'project2',
      title: 'Aplikasi Kolaborasi Tugas Real-Time',
      excerpt:
        'Merancang workflow kolaboratif dengan visibilitas status yang jelas, update minim friksi, dan UI yang nyaman dari penggunaan individu hingga tim.',
      cover: '/project2.jpg',
      tags: ['Realtime', 'UX Systems', 'Kolaborasi Tim'],
      readTime: '5 menit baca',
      publishedAt: '28 Feb 2026',
      content: [
        'Tujuan utama proyek ini adalah membuat kolaborasi multi-user terasa ringan dan natural. Fokus saya pada pengurangan beban kognitif melalui hirarki visual yang tegas dan feedback interaksi yang jelas.',
        'Setiap status tugas diterjemahkan ke bahasa desain yang ringkas: tag yang mudah dipindai, penanda prioritas, dan aksi kontekstual. Tim bisa mengambil keputusan lebih cepat tanpa membuka detail satu per satu.',
        'Selain visual, saya menerapkan pola optimistic UI dan update state yang lebih tahan terhadap kondisi network yang fluktuatif. Aplikasi tetap responsif saat aktivitas tinggi.'
      ]
    },
    {
      slug: 'project3',
      title: 'Portofolio Developer Pribadi',
      excerpt:
        'Membangun pengalaman personal branding yang terasa editorial, responsif, dan berkarakter tanpa mengorbankan kualitas kode produksi.',
      cover: '/project3.jpg',
      tags: ['Branding', 'Motion', 'Frontend'],
      readTime: '4 menit baca',
      publishedAt: '20 Jan 2026',
      content: [
        'Portofolio ini didesain untuk menunjukkan keseimbangan antara kemampuan teknis dan sensitivitas desain. Saya menggunakan sistem visual terang dengan layer depth dan motion halus agar tidak terasa datar.',
        'Struktur konten diperlakukan seperti narasi produk: konteks singkat di awal, bukti melalui proyek, lalu penutup berupa section kontak yang siap konversi. Alurnya terasa nyaman di desktop maupun mobile.',
        'Untuk maintainability, saya sentralisasi primitive desain yang sering dipakai dan menyederhanakan kontrak komponen. Hasilnya lebih mudah dikembangkan tanpa kehilangan konsistensi visual.'
      ]
    }
  ]
}

export function getBlogPosts(locale: string): BlogPost[] {
  const normalizedLocale: SupportedLocale = locale === 'id' ? 'id' : 'en'
  return postsByLocale[normalizedLocale]
}

export function getBlogPostBySlug(locale: string, slug: string): BlogPost | undefined {
  return getBlogPosts(locale).find((post) => post.slug === slug)
}