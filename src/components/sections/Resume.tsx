'use client'

import { motion } from 'framer-motion'
import { Download, FileText, ArrowUpRight } from 'lucide-react'
import { profile } from '@/data/profile'
import SectionHeading from '@/components/ui/SectionHeading'
import ScrollReveal from '@/components/ui/ScrollReveal'
import Button from '@/components/ui/Button'

// ─── Resume preview placeholder ───────────────────────────────────────────────
function ResumePreview() {
  return (
    <motion.div
      className="relative border border-[var(--color-border)] bg-[var(--color-surface)] aspect-[3/4] overflow-hidden"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      aria-hidden="true"
    >
      {/* Simulated document lines */}
      <div className="absolute inset-0 p-6 flex flex-col gap-4">
        {/* Header block */}
        <div className="flex flex-col gap-1.5 pb-4 border-b border-[var(--color-border)]">
          <div className="h-5 w-1/2 bg-[var(--color-border)] rounded-none" />
          <div className="h-3 w-1/3 bg-[var(--color-border-subtle)] rounded-none" />
        </div>
        {/* Section blocks */}
        {[70, 55, 80, 60, 75, 50, 65, 45, 70, 55].map((w, i) => (
          <div
            key={i}
            className={`h-2 bg-[var(--color-border-subtle)] rounded-none ${i === 0 || i === 3 || i === 7 ? 'mt-2' : ''}`}
            style={{ width: `${w}%`, opacity: i % 3 === 0 ? 0.8 : 0.4 }}
          />
        ))}
        {/* Accent block */}
        <div className="h-2 w-1/4 bg-[var(--color-accent-dim)] rounded-none opacity-60" />
        {[60, 45, 70].map((w, i) => (
          <div
            key={`b-${i}`}
            className="h-2 bg-[var(--color-border-subtle)] rounded-none"
            style={{ width: `${w}%`, opacity: 0.35 }}
          />
        ))}
      </div>

      {/* Overlay gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, transparent 60%, var(--color-surface) 100%)',
        }}
      />

      {/* View label */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        <span className="font-[var(--font-mono)] text-[9px] uppercase tracking-[0.2em] text-[var(--color-foreground-subtle)]">
          Resume preview
        </span>
      </div>
    </motion.div>
  )
}

// ─── Resume highlights ────────────────────────────────────────────────────────
const highlights = [
  { label: 'Format',      value: 'PDF, ATS-friendly' },
  { label: 'Updated',     value: 'December 2024'     },
  { label: 'Pages',       value: '1 page'            },
  { label: 'Languages',   value: 'English'           },
]

// ─── Resume ───────────────────────────────────────────────────────────────────
export default function Resume() {
  return (
    <section
      id="resume"
      className="section-padding bg-[var(--color-background)] border-t border-[var(--color-border)]"
      aria-label="Resume"
    >
      <div className="container-main">
        <SectionHeading
          index="07"
          label="Resume"
          title="The full picture."
          className="mb-16"
        />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 xl:gap-20 items-start">

          {/* Left: info */}
          <div className="flex flex-col gap-8">
            <ScrollReveal>
              <p className="font-[var(--font-display)] text-2xl md:text-3xl font-light text-[var(--color-foreground)] leading-[1.4]">
                Five years of building — distilled into one page.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <p className="text-sm text-[var(--color-foreground-muted)] leading-relaxed max-w-lg">
                My resume covers professional experience, technical skills, and selected
                projects. It&apos;s designed to give hiring managers and founders the
                signal they need quickly.
              </p>
            </ScrollReveal>

            {/* Meta grid */}
            <ScrollReveal delay={0.15}>
              <div className="grid grid-cols-2 gap-0 border border-[var(--color-border)]">
                {highlights.map(({ label, value }, i) => (
                  <div
                    key={label}
                    className={`p-4 ${i % 2 === 0 ? 'border-r' : ''} ${i < 2 ? 'border-b' : ''} border-[var(--color-border)]`}
                  >
                    <p className="font-[var(--font-mono)] text-[9px] uppercase tracking-[0.2em] text-[var(--color-foreground-subtle)] mb-1">
                      {label}
                    </p>
                    <p className="text-xs text-[var(--color-foreground-muted)]">{value}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Actions */}
            <ScrollReveal delay={0.2}>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="primary"
                  size="lg"
                  href="/resume.pdf"
                  external
                  icon={<Download size={14} strokeWidth={1.5} />}
                  ariaLabel="Download resume PDF"
                >
                  Download PDF
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  href="/resume.pdf"
                  external
                  icon={<ArrowUpRight size={14} strokeWidth={1.5} />}
                  ariaLabel="View resume in browser"
                >
                  View online
                </Button>
              </div>
            </ScrollReveal>

            {/* Contact nudge */}
            <ScrollReveal delay={0.25}>
              <div className="flex items-center gap-3 pt-2">
                <FileText
                  size={14}
                  strokeWidth={1.5}
                  className="text-[var(--color-foreground-subtle)] flex-shrink-0"
                />
                <p className="text-xs text-[var(--color-foreground-subtle)]">
                  Prefer a conversation first?{' '}
                  <button
                    onClick={() =>
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                    }
                    className="text-[var(--color-accent)] hover:underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
                  >
                    Get in touch
                  </button>{' '}
                  and I&apos;ll send it directly.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: preview */}
          <ScrollReveal delay={0.1}>
            <ResumePreview />
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
