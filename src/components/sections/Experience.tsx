'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { experiences, type ExperienceItem } from '@/data/experience'
import SectionHeading from '@/components/ui/SectionHeading'
import ScrollReveal from '@/components/ui/ScrollReveal'

function fmt(d: string) {
  const [y, m] = d.split('-')
  return new Date(+y, +m - 1).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

function Detail({ item }: { item: ExperienceItem }) {
  return (
    <motion.div
      key={item.id}
      className="flex flex-col gap-7"
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-3">
          <h3
            className="text-2xl md:text-3xl font-bold"
            style={{ color: 'var(--color-foreground)' }}
          >
            {item.role}
          </h3>
          <span
            className="px-3 py-1 rounded-full font-mono text-[10px] uppercase tracking-widest"
            style={{
              background: 'rgba(56,189,248,0.1)',
              border: '1px solid rgba(56,189,248,0.22)',
              color: 'var(--color-accent)',
            }}
          >
            {item.type}
          </span>
        </div>

        <div
          className="flex flex-wrap items-center gap-2.5 font-mono text-xs"
          style={{ color: 'var(--color-foreground-muted)' }}
        >
          {item.companyUrl ? (
            <a
              href={item.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
              style={{ color: 'var(--color-accent)' }}
            >
              {item.company}
            </a>
          ) : (
            <span style={{ color: 'var(--color-accent)' }}>{item.company}</span>
          )}
          <span style={{ color: 'var(--color-foreground-subtle)' }}>·</span>
          <span>{item.location}</span>
          <span style={{ color: 'var(--color-foreground-subtle)' }}>·</span>
          <span style={{ color: 'var(--color-foreground-subtle)' }}>
            {fmt(item.startDate)} — {item.endDate ? fmt(item.endDate) : 'Present'}
          </span>
        </div>
      </div>

      {/* Description */}
      <p
        className="text-sm leading-relaxed max-w-2xl"
        style={{ color: 'var(--color-foreground-muted)' }}
      >
        {item.description}
      </p>

      {/* Achievements */}
      <div>
        <p
          className="font-mono text-[9px] uppercase tracking-[0.22em] mb-3"
          style={{ color: 'var(--color-foreground-subtle)' }}
        >
          Key achievements
        </p>
        <ul className="flex flex-col gap-3" role="list">
          {item.achievements.map((a, i) => (
            <motion.li
              key={i}
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07, duration: 0.38 }}
            >
              <span
                className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: 'linear-gradient(135deg,#38bdf8,#818cf8)' }}
                aria-hidden="true"
              />
              <span
                className="text-sm leading-relaxed"
                style={{ color: 'var(--color-foreground-muted)' }}
              >
                {a}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Tech badges */}
      <div className="flex flex-wrap gap-2">
        {item.technologies.map((t) => (
          <span
            key={t}
            className="px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest rounded-full"
            style={{
              background: 'var(--color-surface-2)',
              border: '1px solid rgba(56,189,248,0.1)',
              color: 'var(--color-foreground-muted)',
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const [active, setActive] = useState(experiences[0].id)
  const current = experiences.find((e) => e.id === active) ?? experiences[0]

  return (
    <section
      id="experience"
      className="section-padding relative overflow-hidden"
      style={{ background: "var(--color-background)" }}
      aria-label="Work experience"
    >
      <div
        className="orb absolute pointer-events-none"
        style={{
          top: '40%', right: '-5%',
          width: 400, height: 400,
          background: 'radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="container-main relative z-10">
        <SectionHeading
          index="03"
          label="Experience"
          title="Where I've built things."
          className="mb-16"
        />

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-12 xl:gap-16 items-start">
          {/* Tab list */}
          <ScrollReveal>
            <div
              role="tablist"
              aria-label="Select experience"
              className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-2"
            >
              {experiences.map((exp) => {
                const isActive = exp.id === active
                return (
                  <button
                    key={exp.id}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`panel-${exp.id}`}
                    id={`tab-${exp.id}`}
                    onClick={() => setActive(exp.id)}
                    className="relative text-left px-4 py-3.5 rounded-xl transition-all duration-250 min-w-max lg:min-w-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
                    style={
                      isActive
                        ? {
                            background: 'rgba(56,189,248,0.08)',
                            border: '1px solid rgba(56,189,248,0.2)',
                          }
                        : {
                            border: '1px solid transparent',
                          }
                    }
                  >
                    {isActive && (
                      <motion.span
                        layoutId="exp-indicator"
                        className="absolute inset-0 rounded-xl"
                        style={{
                          background: 'rgba(56,189,248,0.06)',
                          border: '1px solid rgba(56,189,248,0.18)',
                        }}
                        transition={{ type: 'spring', stiffness: 350, damping: 32 }}
                        aria-hidden="true"
                      />
                    )}
                    <p
                      className="relative text-xs font-semibold transition-colors"
                      style={{ color: isActive ? 'var(--color-accent)' : 'var(--color-foreground-muted)' }}
                    >
                      {exp.company}
                    </p>
                    <p
                      className="relative font-mono text-[9px] mt-0.5"
                      style={{ color: 'var(--color-foreground-subtle)' }}
                    >
                      {exp.startDate.split('-')[0]} — {exp.endDate ? exp.endDate.split('-')[0] : 'Now'}
                    </p>
                  </button>
                )
              })}
            </div>
          </ScrollReveal>

          {/* Detail panel */}
          <div
            id={`panel-${current.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${current.id}`}
            className="min-h-[320px]"
          >
            <AnimatePresence mode="wait">
              <Detail key={current.id} item={current} />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}