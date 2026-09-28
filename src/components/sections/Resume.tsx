'use client'

import { motion } from 'framer-motion'
import { Download, ArrowUpRight, FileText } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import ScrollReveal from '@/components/ui/ScrollReveal'

const META = [
  { label: 'Format',   value: 'PDF, ATS-friendly' },
  { label: 'Updated',  value: 'December 2024'     },
  { label: 'Pages',    value: '1 page'            },
  { label: 'Language', value: 'English'           },
]

function DocPreview() {
  return (
    <motion.div
      className="relative overflow-hidden card rounded-2xl"
      style={{ aspectRatio: '3/4' }}
      whileHover={{ scale: 1.02, transition: { duration: 0.35 } }}
      aria-hidden="true"
    >
      <div className="absolute inset-0 p-6 flex flex-col gap-3" >
        {/* Header lines */}
        <div
          className="flex flex-col gap-1.5 pb-4"
          style={{ borderBottom: '1px solid rgba(56,189,248,0.1)' }}
        >
          <div className="h-4 w-2/5 rounded-full" style={{ background: 'rgba(56,189,248,0.22)' }} />
          <div className="h-3 w-1/3 rounded-full" style={{ background: 'rgba(56,189,248,0.1)' }} />
        </div>
        {/* Body lines */}
        {[82, 62, 78, 52, 88, 58, 72, 48, 68, 52, 76].map((w, i) => (
          <div
            key={i}
            className="h-2 rounded-full"
            style={{
              width: `${w}%`,
              background:
                i % 4 === 0
                  ? 'rgba(56,189,248,0.28)'
                  : 'rgba(56,189,248,0.07)',
              marginTop: [0, 4, 8].includes(i) ? '0.4rem' : 0,
            }}
          />
        ))}
        <div
          className="h-2 w-1/3 rounded-full mt-2"
          style={{ background: 'rgba(129,140,248,0.3)' }}
        />
      </div>
      {/* Bottom fade */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, transparent 55%, var(--color-surface) 100%)',
        }}
      />
      <div className="absolute bottom-4 inset-x-0 flex justify-center">
        <span
          className="font-mono text-[9px] uppercase tracking-widest"
          style={{ color: 'var(--color-foreground-subtle)' }}
        >
          Resume preview
        </span>
      </div>
    </motion.div>
  )
}

export default function Resume() {
  return (
    <section
      id="resume"
      className="section-padding relative overflow-hidden"
      style={{ background: "var(--color-background)" }}
      aria-label="Resume"
    >
      <div
        className="orb absolute pointer-events-none"
        style={{
          top: '5%', right: '25%',
          width: 380, height: 380,
          background: 'radial-gradient(circle, rgba(56,189,248,0.07) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="container-main relative z-10">
        <SectionHeading index="07" label="Resume" title="The full picture." className="mb-16" />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 xl:gap-20 items-start">
          {/* Left */}
          <div className="flex flex-col gap-8">
            <ScrollReveal>
              <p
                className="text-2xl md:text-3xl font-bold leading-[1.3]"
                style={{ color: 'var(--color-foreground)' }}
              >
                Five years of building — distilled into one page.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <p
                className="text-sm leading-relaxed max-w-lg"
                style={{ color: 'var(--color-foreground-muted)' }}
              >
                My resume covers professional experience, technical skills, and selected
                projects. Designed to give hiring managers and founders the signal they
                need, fast.
              </p>
            </ScrollReveal>

            {/* Meta grid */}
            <ScrollReveal delay={0.14}>
              <div
                className="grid grid-cols-2 overflow-hidden card rounded-2xl"
                
              >
                {META.map(({ label, value }, i) => (
                  <div
                    key={label}
                    className="p-4"
                    style={{
                      borderRight:  i % 2 === 0 ? '1px solid rgba(56,189,248,0.1)' : 'none',
                      borderBottom: i < 2       ? '1px solid rgba(56,189,248,0.1)' : 'none',
                    }}
                  >
                    <p
                      className="font-mono text-[9px] uppercase tracking-[0.2em] mb-1"
                      style={{ color: 'var(--color-foreground-subtle)' }}
                    >
                      {label}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--color-foreground-muted)' }}>
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* CTA buttons */}
            <ScrollReveal delay={0.2}>
              <div className="flex flex-wrap gap-3">
                <motion.a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download resume PDF"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
                  style={{
                    background: 'linear-gradient(135deg,#38bdf8,#818cf8)',
                    color: '#020408',
                  }}
                  whileHover={{ scale: 1.03, boxShadow: '0 0 28px rgba(56,189,248,0.28)' }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                >
                  <Download size={15} strokeWidth={2.5} /> Download PDF
                </motion.a>
                <motion.a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View resume online"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
                  style={{
                    background: 'rgba(56,189,248,0.08)',
                    border: '1px solid rgba(56,189,248,0.22)',
                    color: 'var(--color-accent)',
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowUpRight size={15} strokeWidth={2} /> View online
                </motion.a>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              <div className="flex items-center gap-3">
                <FileText
                  size={14}
                  strokeWidth={1.5}
                  style={{ color: 'var(--color-foreground-subtle)', flexShrink: 0 }}
                />
                <p className="text-xs" style={{ color: 'var(--color-foreground-subtle)' }}>
                  Prefer a conversation first?{' '}
                  <button
                    onClick={() =>
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                    }
                    className="hover:underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    Get in touch
                  </button>{' '}
                  and I&apos;ll send it directly.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Right — preview */}
          <ScrollReveal delay={0.1}>
            <DocPreview />
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}