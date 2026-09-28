'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { profile } from '@/data/profile'
import SectionHeading from '@/components/ui/SectionHeading'
import ScrollReveal from '@/components/ui/ScrollReveal'

// ─── Stat pill ────────────────────────────────────────────────────────────────
function StatItem({
  value,
  label,
  delay = 0,
}: {
  value: string
  label: string
  delay?: number
}) {
  return (
    <ScrollReveal delay={delay}>
      <div className="border border-[var(--color-border)] p-6 group hover:border-[var(--color-accent-dim)] transition-colors duration-500">
        <p className="font-[var(--font-display)] text-4xl font-light text-[var(--color-foreground)] mb-1 group-hover:text-[var(--color-accent)] transition-colors duration-300">
          {value}
        </p>
        <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-[var(--color-foreground-subtle)]">
          {label}
        </p>
      </div>
    </ScrollReveal>
  )
}

// ─── Parallax image placeholder ───────────────────────────────────────────────
function AboutVisual() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <div
      ref={ref}
      className="relative w-full aspect-[3/4] overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)]"
      aria-hidden="true"
    >
      {/* Subtle parallax inner layer */}
      <motion.div className="absolute inset-[-10%]" style={{ y }}>
        {/* Grid pattern fill — replace with <Image> when real photo is available */}
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(var(--color-border-subtle) 1px, transparent 1px),
              linear-gradient(90deg, var(--color-border-subtle) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
        {/* Corner accent */}
        <div className="absolute top-0 left-0 w-16 h-16 border-r border-b border-[var(--color-accent-dim)]" />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-l border-t border-[var(--color-accent-dim)]" />
        {/* Initials */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-[var(--font-display)] text-[8rem] font-light text-[var(--color-border)] select-none">
            SA
          </span>
        </div>
      </motion.div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, var(--color-surface) 0%, transparent 40%)',
        }}
      />
    </div>
  )
}

// ─── About ────────────────────────────────────────────────────────────────────
export default function About() {
  return (
    <section
      id="about"
      className="section-padding bg-[var(--color-background)] border-t border-[var(--color-border)]"
      aria-label="About me"
    >
      <div className="container-main">

        {/* Heading */}
        <SectionHeading
          index="01"
          label="About"
          title="Craft meets intelligence."
          className="mb-16 md:mb-20"
        />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16 xl:gap-24 items-start">

          {/* Text column */}
          <div className="flex flex-col gap-8">
            <ScrollReveal>
              <p className="font-[var(--font-display)] text-2xl md:text-3xl font-light text-[var(--color-foreground)] leading-[1.4]">
                {profile.bio}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <p className="text-base text-[var(--color-foreground-muted)] leading-[1.8]">
                {profile.bioExtended}
              </p>
            </ScrollReveal>

            {/* Values / approach */}
            <ScrollReveal delay={0.2}>
              <div className="border-l-2 border-[var(--color-accent)] pl-5 mt-2">
                <p className="text-sm text-[var(--color-foreground-muted)] leading-relaxed italic font-[var(--font-display)]">
                  "I believe the best software is invisible — it solves real problems so
                  smoothly that users never notice the engineering behind it."
                </p>
              </div>
            </ScrollReveal>

            {/* Principles */}
            <ScrollReveal delay={0.25}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                {[
                  { title: 'Precision', body: 'Details compound. I sweat the small stuff because it adds up to something remarkable.' },
                  { title: 'Velocity', body: 'Speed of learning and execution — not cutting corners — is how I stay ahead.' },
                  { title: 'Clarity', body: 'Complex systems demand clear thinking. I write code and documents that future-me will thank.' },
                ].map(({ title, body }) => (
                  <div
                    key={title}
                    className="p-4 border border-[var(--color-border)] hover:border-[var(--color-accent-dim)] transition-colors duration-300 group"
                  >
                    <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-[var(--color-accent)] mb-2">
                      {title}
                    </p>
                    <p className="text-xs text-[var(--color-foreground-muted)] leading-relaxed">
                      {body}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Visual column */}
          <div className="flex flex-col gap-8">
            <ScrollReveal delay={0.15}>
              <AboutVisual />
            </ScrollReveal>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              <StatItem value="5+" label="Years experience" delay={0.2} />
              <StatItem value="30+" label="Projects shipped" delay={0.25} />
              <StatItem value="8+" label="AI systems built" delay={0.3} />
              <StatItem value="100%" label="Remote ready" delay={0.35} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
