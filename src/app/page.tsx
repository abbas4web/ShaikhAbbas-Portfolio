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

export default function Home() {
  return (
    <div className="relative z-10">
      {/* Skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded-full focus:text-xs focus:font-bold focus:uppercase focus:tracking-widest focus:text-[#020408]"
        style={{ background: 'linear-gradient(135deg, #38bdf8, #818cf8)' }}
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main-content" tabIndex={-1}>
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
    </div>
  )
}
