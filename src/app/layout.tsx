import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider'
import PageTransition from '@/components/providers/PageTransition'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Shaikh Abbas — AI Engineer & Full-Stack Developer',
    template: '%s | Shaikh Abbas',
  },
  description:
    'AI Engineer and Full-Stack Developer crafting intelligent systems and exceptional digital experiences.',
  keywords: ['AI Engineer', 'Full-Stack Developer', 'Next.js', 'Machine Learning', 'Portfolio'],
  authors: [{ name: 'Shaikh Abbas' }],
  creator: 'Shaikh Abbas',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Shaikh Abbas — AI Engineer & Full-Stack Developer',
    description:
      'AI Engineer and Full-Stack Developer crafting intelligent systems and exceptional digital experiences.',
    siteName: 'Shaikh Abbas Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shaikh Abbas — AI Engineer & Full-Stack Developer',
    description:
      'AI Engineer and Full-Stack Developer crafting intelligent systems and exceptional digital experiences.',
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#020408',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/* Global ambient background mesh — fixed, z-0 */}
        <div className="bg-mesh" aria-hidden="true" />
        <SmoothScrollProvider>
          <PageTransition>
            {children}
          </PageTransition>
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
