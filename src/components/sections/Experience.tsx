'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { experiences, type ExperienceItem } from '@/data/experience'
import SectionHeading from '@/components/ui/SectionHeading'
import Badge from '@/components/ui/Badge'
import ScrollReveal from '@/components/ui/ScrollReveal'

// ─── Date formatter ───────────────────────────────────────────────────────────
function formatDate(dateStr: string): string {
  const [year, month] = dateStr.split('-')
  const date = new Date(parseInt(year), parseInt(month) - 1)
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

// ─── Experience card (full view) ──────────────────────────────────────────────
function ExperienceDetail({ item }: { item: ExperienceItem }) {
  return (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-6"
    >
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="font-[var(--font-display)] text-2xl md:text-3xl font-light text-[var(--color-foreground)]">
            {item.role}
          </h3>
          <Badge variant="accent">{item.type}</Badge>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          {item.companyUrl ? (
            <a
              href={item.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-[var(--font-mono)] text-xs text-[var(--color-accent)] hover:underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
            >
              {item.company}
            </a>
          ) : (
            <span className="font-[var(--font-mono)] text-xs text-[var(--color-accent)]">
              {item.company}
            </span>
          )}
          <span className="text-[var(--color-border)]" aria-hidden="true">·</span>
          <span className="font-[var(--font-mono)] text-xs text-[var(--color-foreground-muted)]">
            {item.location}
          </span>
          <span className="text-[var(--color-border)]" aria-hidden="true">·</span>
          <span className="font-[var(--font-mono)] text-xs text-[var(--color-foreground-subtle)]">
            {formatDate(item.startDate)} — {item.endDate ? formatDate(item.endDate) : 'Present'}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-[var(--color-foreground-muted)] leading-relaxed max-w-2xl">
        {item.description}
      </p>

      {/* Achievements */}
      <div>
        <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-[var(--color-foreground-subtle)] mb-3">
          Key achievements
        </p>
        <ul className="flex flex-col gap-2" role="list">
          {item.achievements.map((ach, i) => (
            <li key={i} className="flex items-start gap-3">
              <span
                className="mt-1.5 w-1 h-1 flex-shrink-0 rounded-full bg-[var(--color-accent)]"
                aria-hidden="true"
              />
              <span className="text-sm text-[var(--color-foreground-muted)] leading-relaxed">
                {ach}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2 pt-2">
        {item.technologies.map((tech) => (
          <Badge key={tech} variant="outline">
            {tech}
          </Badge>
        ))}
      </div>
    </motion.div>
  )
}

// ─── Experience ───────────────────────────────────────────────────────────────
export default function Experience() {
  const [active, setActive] = useState(experiences[0].id)
  const activeItem = experiences.find((e) => e.id === active) ?? experiences[0]

  return (
    <section
      id="experience"
      className="section-padding bg-[var(--color-background)] border-t border-[var(--color-border)]"
      aria-label="Work experience"
    >
      <div className="container-main">
        <SectionHeading
          index="03"
          label="Experience"
          title="Where I've built things."
          className="mb-16 md:mb-20"
        />

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-12 items-start">

          {/* Sidebar tab list */}
          <ScrollReveal>
            <div
              role="tablist"
              aria-label="Select experience"
              className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-0 border border-[var(--color-border)] lg:border-0 lg:border-l lg:border-[var(--color-border)]"
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
                    className={`
                      relative text-left px-5 py-4 min-w-max lg:min-w-0 transition-all duration-300
                      border-b lg:border-b-0 lg:border-l-2 border-[var(--color-border)]
                      focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]
                      ${isActive
                        ? 'lg:border-l-[var(--color-accent)] bg-[var(--color-surface)]'
                        : 'lg:border-l-transparent hover:bg-[var(--color-surface)] hover:lg:border-l-[var(--color-border)]'}
                    `}
                  >
                    <p className={`text-xs font-medium transition-colors duration-200 ${
                      isActive ? 'text-[var(--color-accent)]' : 'text-[var(--color-foreground-muted)]'
                    }`}>
                      {exp.company}
                    </p>
                    <p className="font-[var(--font-mono)] text-[10px] text-[var(--color-foreground-subtle)] mt-0.5 truncate">
                      {exp.startDate.split('-')[0]} — {exp.endDate ? exp.endDate.split('-')[0] : 'Now'}
                    </p>
                    {/* Active mobile indicator */}
                    {isActive && (
                      <motion.span
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-accent)] lg:hidden"
                        layoutId="tab-indicator"
                      />
                    )}
                  </button>
                )
              })}
            </div>
          </ScrollReveal>

          {/* Detail panel */}
          <div
            id={`panel-${activeItem.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeItem.id}`}
            className="min-h-[320px]"
          >
            <AnimatePresence mode="wait">
              <ExperienceDetail key={activeItem.id} item={activeItem} />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
