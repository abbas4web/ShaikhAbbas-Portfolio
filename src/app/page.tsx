import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Experience from '@/components/sections/Experience'
import Projects from '@/components/sections/Projects'
import AILab from '@/components/sections/AILab'
import Services from '@/components/sections/Services'
import Resume from '@/components/sections/Resume'
import Contact from '@/components/sections/Contact'

/**
 * Root page — Server Component.
 * All animation and interactivity lives inside the individual
 * 'use client' section components. This file stays lean.
 */
export default function Home() {
  return (
    <>
      <Navbar />

      <main id="main-content" tabIndex={-1}>
        {/* Skip-to-content target for keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--color-accent)] focus:text-[var(--color-background)] focus:text-xs focus:uppercase focus:tracking-widest"
        >
          Skip to content
        </a>

        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <AILab />
        <Services />
        <Resume />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
