'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { skillCategories, techStack } from '@/data/skills'
import SectionHeading from '@/components/ui/SectionHeading'
import ScrollReveal from '@/components/ui/ScrollReveal'

function SkillRow({ name, level, index }: { name: string; level: number; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <div ref={ref}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm" style={{ color: 'var(--color-foreground-muted)' }}>{name}</span>
        <span className="font-mono text-[11px]" style={{ color: 'var(--color-foreground-subtle)' }}>{level}%</span>
      </div>
      <div className="h-1 w-full rounded-full" style={{ background: 'var(--color-surface-3)' }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #38bdf8, #818cf8)' }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.1, delay: 0.05 + index * 0.05, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  )
}

function CategoryCard({ category, delay }: { category: typeof skillCategories[0]; delay: number }) {
  return (
    <ScrollReveal delay={delay}>
      <motion.div
        className="card rounded-2xl p-6 h-full"
        whileHover={{ y: -4, transition: { duration: 0.22 } }}
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-6" style={{ color: 'var(--color-accent)' }}>
          {category.title}
        </p>
        <div className="flex flex-col gap-5">
          {category.skills.map((s, i) => <SkillRow key={s.name} name={s.name} level={s.level} index={i} />)}
        </div>
      </motion.div>
    </ScrollReveal>
  )
}

function TechMarquee() {
  const doubled = [...techStack, ...techStack]
  return (
    <div className="relative overflow-hidden py-3" aria-label="Technology stack">
      {(['left', 'right'] as const).map((side) => (
        <div key={side} className="absolute top-0 bottom-0 w-24 z-10 pointer-events-none" style={{
          [side]: 0,
          background: `linear-gradient(to ${side === 'left' ? 'right' : 'left'}, var(--color-surface), transparent)`,
        }} aria-hidden="true" />
      ))}
      <motion.div
        className="flex gap-3 w-max"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ repeat: Infinity, duration: 35, ease: 'linear' }}
      >
        {doubled.map((tech, i) => (
          <span
            key={`${tech}-${i}`}
            className="font-mono text-[11px] uppercase tracking-[0.15em] px-5 py-2 rounded-full whitespace-nowrap"
            style={{ background: 'var(--color-surface-2)', border: '1px solid rgba(56,189,248,0.12)', color: 'var(--color-foreground-subtle)' }}
          >
            {tech}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="section-padding relative overflow-hidden" style={{ background: 'var(--color-surface)' }} aria-label="Skills">
      <div className="orb absolute pointer-events-none" style={{ bottom: '-10%', left: '-5%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(56,189,248,0.09) 0%, transparent 70%)' }} aria-hidden="true" />
      <div className="container-main relative z-10">
        <SectionHeading index="02" label="Skills" title="Tools of the trade." subtitle="From model training to production deployment — my curated daily toolkit." className="mb-16" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-14">
          {skillCategories.map((cat, i) => <CategoryCard key={cat.id} category={cat} delay={i * 0.07} />)}
        </div>
        <div className="section-divider mb-10" aria-hidden="true" />
        <ScrollReveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-center mb-6" style={{ color: 'var(--color-foreground-subtle)' }}>Daily toolkit</p>
        </ScrollReveal>
        <TechMarquee />
      </div>
    </section>
  )
}
