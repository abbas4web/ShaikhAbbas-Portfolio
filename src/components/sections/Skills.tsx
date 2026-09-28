'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { skillCategories, techStack } from '@/data/skills'
import SectionHeading from '@/components/ui/SectionHeading'
import ScrollReveal from '@/components/ui/ScrollReveal'

// ─── Skill bar ────────────────────────────────────────────────────────────────
function SkillBar({ name, level, index }: { name: string; level: number; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <div ref={ref} className="group">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs text-[var(--color-foreground-muted)] group-hover:text-[var(--color-foreground)] transition-colors duration-200">
          {name}
        </span>
        <span className="font-[var(--font-mono)] text-[10px] text-[var(--color-foreground-subtle)]">
          {level}
        </span>
      </div>
      {/* Track */}
      <div className="h-px w-full bg-[var(--color-border)] relative overflow-hidden">
        {/* Fill */}
        <motion.div
          className="absolute top-0 left-0 h-full bg-[var(--color-accent)]"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{
            duration: 1.1,
            delay: 0.1 + index * 0.06,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
        {/* Glow cap */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-[var(--color-accent)]"
          initial={{ left: 0, opacity: 0 }}
          animate={inView ? { left: `${level}%`, opacity: 1 } : { left: 0, opacity: 0 }}
          transition={{
            duration: 1.1,
            delay: 0.1 + index * 0.06,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      </div>
    </div>
  )
}

// ─── Category card ────────────────────────────────────────────────────────────
function CategoryCard({
  category,
  delay = 0,
}: {
  category: (typeof skillCategories)[number]
  delay?: number
}) {
  return (
    <ScrollReveal delay={delay}>
      <div className="border border-[var(--color-border)] p-6 h-full hover:border-[var(--color-accent-dim)] transition-colors duration-500">
        <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-[var(--color-accent)] mb-6">
          {category.title}
        </p>
        <div className="flex flex-col gap-4">
          {category.skills.map((skill, i) => (
            <SkillBar key={skill.name} name={skill.name} level={skill.level} index={i} />
          ))}
        </div>
      </div>
    </ScrollReveal>
  )
}

// ─── Tech stack marquee ───────────────────────────────────────────────────────
function TechMarquee() {
  const doubled = [...techStack, ...techStack]

  return (
    <div className="relative overflow-hidden py-4" aria-label="Technology stack">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, var(--color-background), transparent)' }}
        aria-hidden="true"
      />
      <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, var(--color-background), transparent)' }}
        aria-hidden="true"
      />
      <motion.div
        className="flex gap-8 w-max"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ repeat: Infinity, duration: 28, ease: 'linear' }}
      >
        {doubled.map((tech, i) => (
          <span
            key={`${tech}-${i}`}
            className="font-[var(--font-mono)] text-xs uppercase tracking-[0.18em] text-[var(--color-foreground-subtle)] whitespace-nowrap px-4 py-2 border border-[var(--color-border-subtle)] hover:text-[var(--color-foreground-muted)] hover:border-[var(--color-border)] transition-colors duration-200"
          >
            {tech}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

// ─── Skills ───────────────────────────────────────────────────────────────────
export default function Skills() {
  return (
    <section
      id="skills"
      className="section-padding bg-[var(--color-surface)] border-t border-[var(--color-border)]"
      aria-label="Skills"
    >
      <div className="container-main">
        <SectionHeading
          index="02"
          label="Skills"
          title="Tools of the trade."
          subtitle="A curated view of what I work with daily — from model training to production deployment."
          className="mb-16 md:mb-20"
        />

        {/* Skill categories grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-16">
          {skillCategories.map((cat, i) => (
            <CategoryCard key={cat.id} category={cat} delay={i * 0.08} />
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-[var(--color-border)] mb-10" aria-hidden="true" />

        {/* Marquee */}
        <ScrollReveal>
          <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-[var(--color-foreground-subtle)] mb-5 text-center">
            Daily toolkit
          </p>
        </ScrollReveal>
        <TechMarquee />
      </div>
    </section>
  )
}
