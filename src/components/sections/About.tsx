'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { profile } from '@/data/profile'
import SectionHeading from '@/components/ui/SectionHeading'
import ScrollReveal from '@/components/ui/ScrollReveal'

const STATS = [
  { value: '5+',   label: 'Years experience' },
  { value: '30+',  label: 'Projects shipped'  },
  { value: '8+',   label: 'AI systems built'  },
  { value: '100%', label: 'Remote ready'       },
]

const PRINCIPLES = [
  { title: 'Precision',  body: 'Details compound. I sweat the small stuff because it adds up to something remarkable.' },
  { title: 'Velocity',   body: 'Speed of learning and execution — not cutting corners — is how I stay ahead.' },
  { title: 'Clarity',    body: 'Complex systems demand clear thinking. Code that future-me will thank.' },
]

export default function About() {
  const imgRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <section
      id="about"
      className="section-padding relative overflow-hidden"
      style={{ background: "var(--color-background)" }}
      aria-label="About me"
    >
      {/* Ambient glow */}
      <div
        className="orb absolute pointer-events-none"
        style={{
          top: '-10%', right: '-5%',
          width: 500, height: 500,
          background: 'radial-gradient(circle, rgba(129,140,248,0.12) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="container-main relative z-10">
        <SectionHeading
          index="01"
          label="About"
          title="Craft meets intelligence."
          className="mb-16"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 xl:gap-16 items-start">

          {/* ── Left column ── */}
          <div className="flex flex-col gap-8">
            <ScrollReveal>
              <p
                className="text-2xl md:text-3xl font-bold leading-[1.3]"
                style={{ color: 'var(--color-foreground)' }}
              >
                {profile.bio}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <p className="text-base leading-relaxed" style={{ color: 'var(--color-foreground-muted)' }}>
                {profile.bioExtended}
              </p>
            </ScrollReveal>

            {/* Quote */}
            <ScrollReveal delay={0.18}>
              <div className="pl-5 relative">
                <div
                  className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full"
                  style={{ background: 'linear-gradient(to bottom, #38bdf8, #818cf8)' }}
                  aria-hidden="true"
                />
                <p
                  className="text-base italic leading-relaxed"
                  style={{ color: 'var(--color-foreground-muted)' }}
                >
                  "I believe the best software is invisible — it solves real problems so
                  smoothly that users never notice the engineering behind it."
                </p>
              </div>
            </ScrollReveal>

            {/* Principles grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {PRINCIPLES.map(({ title, body }, i) => (
                <ScrollReveal key={title} delay={0.1 + i * 0.08}>
                  <motion.div
                    className="card rounded-2xl p-5 h-full"
                    whileHover={{ y: -4, transition: { duration: 0.25 } }}
                  >
                    <p
                      className="font-mono text-[10px] uppercase tracking-[0.22em] mb-2"
                      style={{ color: 'var(--color-accent)' }}
                    >
                      {title}
                    </p>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--color-foreground-muted)' }}>
                      {body}
                    </p>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* ── Right column ── */}
          <div className="flex flex-col gap-6">
            {/* Portrait placeholder with parallax */}
            <ScrollReveal delay={0.12}>
              <div
                ref={imgRef}
                className="relative overflow-hidden card rounded-2xl"
                style={{ aspectRatio: '3/4' }}
              >
                <motion.div
                  className="absolute inset-[-10%] flex items-center justify-center"
                  style={{
                    y,
                    background: 'linear-gradient(135deg, var(--color-surface) 0%, var(--color-surface-3) 100%)',
                  }}
                >
                  {/* Animated rings */}
                  <div className="relative w-44 h-44">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="absolute inset-0 rounded-full"
                        style={{
                          border: `1px solid ${
                            i === 0
                              ? 'rgba(56,189,248,0.45)'
                              : i === 1
                              ? 'rgba(129,140,248,0.3)'
                              : 'rgba(6,182,212,0.2)'
                          }`,
                          scale: 1 + i * 0.28,
                        }}
                        animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                        transition={{ duration: 14 + i * 4, repeat: Infinity, ease: 'linear' }}
                      />
                    ))}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-5xl font-bold text-gradient select-none">SA</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </ScrollReveal>

            {/* Stat grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {STATS.map(({ value, label }, i) => (
                <ScrollReveal key={label} delay={0.15 + i * 0.07}>
                  <motion.div
                    className="card rounded-2xl p-5 text-center"
                    whileHover={{ y: -3, transition: { duration: 0.25 } }}
                  >
                    <p className="text-3xl font-bold text-gradient mb-1">{value}</p>
                    <p
                      className="font-mono text-[10px] uppercase tracking-[0.18em]"
                      style={{ color: 'var(--color-foreground-subtle)' }}
                    >
                      {label}
                    </p>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}