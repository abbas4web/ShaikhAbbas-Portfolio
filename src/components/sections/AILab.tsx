'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Zap, Clock } from 'lucide-react'
import { experiments, type Experiment } from '@/data/experiments'
import SectionHeading from '@/components/ui/SectionHeading'
import ScrollReveal from '@/components/ui/ScrollReveal'

function GithubIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  )
}

const STATUS = {
  live:     { color: '#4ade80', label: 'Live'     },
  wip:      { color: '#fbbf24', label: 'WIP'      },
  archived: { color: '#6b7280', label: 'Archived' },
}

function StatusDot({ status }: { status: Experiment['status'] }) {
  const { color, label } = STATUS[status]
  return (
    <span
      className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.15em]"
      style={{ color }}
    >
      <motion.span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ backgroundColor: color }}
        animate={status === 'live' ? { scale: [1, 1.5, 1], opacity: [1, 0.4, 1] } : {}}
        transition={{ repeat: Infinity, duration: 2.2 }}
        aria-hidden="true"
      />
      {label}
    </span>
  )
}

function ExperimentCard({ experiment: e, delay = 0 }: { experiment: Experiment; delay?: number }) {
  return (
    <ScrollReveal delay={delay}>
      <motion.article
        className="group h-full flex flex-col card rounded-2xl p-6"
        whileHover={{ y: -5, transition: { duration: 0.26 } }}
        aria-label={e.title}
      >
        {/* Icon + status */}
        <div className="flex items-start justify-between mb-4">
          <motion.div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{
              background: 'rgba(56,189,248,0.1)',
              border: '1px solid rgba(56,189,248,0.2)',
            }}
            whileHover={{ scale: 1.1, rotate: 8, transition: { duration: 0.2 } }}
          >
            <Zap size={16} strokeWidth={1.5} style={{ color: 'var(--color-accent)' }} />
          </motion.div>
          <StatusDot status={e.status} />
        </div>

        {/* Index */}
        <p
          className="font-mono text-[10px] mb-2"
          style={{ color: 'var(--color-foreground-subtle)' }}
        >
          {String(e.displayOrder).padStart(2, '0')}
        </p>

        {/* Title */}
        <h3
          className="font-bold text-base leading-snug mb-3 transition-colors duration-250"
          style={{ color: 'var(--color-foreground)' }}
        >
          {e.title}
        </h3>

        {/* Description */}
        <p
          className="text-xs leading-relaxed flex-1 mb-5"
          style={{ color: 'var(--color-foreground-muted)' }}
        >
          {e.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {e.tags.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest rounded-full"
              style={{
                background: 'var(--color-surface-2)',
                border: '1px solid rgba(56,189,248,0.1)',
                color: 'var(--color-foreground-subtle)',
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div
          className="flex items-center gap-4 pt-4 border-t"
          style={{ borderColor: 'rgba(56,189,248,0.07)' }}
        >
          {e.githubUrl && (
            <a
              href={e.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${e.title} on GitHub`}
              className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.15em] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
              style={{ color: 'var(--color-foreground-subtle)' }}
            >
              <GithubIcon size={12} /> Code
            </a>
          )}
          {e.url && (
            <a
              href={e.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${e.title} demo`}
              className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.15em] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
              style={{ color: 'var(--color-accent)' }}
            >
              <ExternalLink size={12} strokeWidth={1.5} /> Demo
            </a>
          )}
          {!e.githubUrl && !e.url && (
            <span
              className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.15em]"
              style={{ color: 'var(--color-foreground-subtle)' }}
            >
              <Clock size={12} strokeWidth={1.5} /> Soon
            </span>
          )}
        </div>
      </motion.article>
    </ScrollReveal>
  )
}

export default function AILab() {
  return (
    <section
      id="ai-lab"
      className="section-padding relative overflow-hidden"
      style={{ background: "var(--color-background)" }}
      aria-label="AI experiments"
    >
      <div
        className="orb absolute pointer-events-none"
        style={{
          bottom: '-10%', right: '-5%',
          width: 480, height: 480,
          background: 'radial-gradient(circle, rgba(129,140,248,0.1) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="container-main relative z-10">
        <SectionHeading
          index="05"
          label="AI Lab"
          title="Experiments & curiosity."
          subtitle="What I build when no one's watching — exploratory AI projects and proof-of-concepts."
          className="mb-12"
        />

        {/* Intro strip */}
        <ScrollReveal delay={0.1}>
          <div
            className="card rounded-2xl p-6 md:p-8 mb-10 flex flex-col md:flex-row gap-6 items-start md:items-center"
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: 'rgba(56,189,248,0.1)',
                border: '1px solid rgba(56,189,248,0.2)',
              }}
            >
              <Zap size={22} strokeWidth={1} style={{ color: 'var(--color-accent)' }} />
            </div>
            <div>
              <p
                className="font-mono text-[10px] uppercase tracking-[0.22em] mb-2"
                style={{ color: 'var(--color-accent)' }}
              >
                The Lab
              </p>
              <p
                className="text-sm leading-relaxed max-w-2xl"
                style={{ color: 'var(--color-foreground-muted)' }}
              >
                A collection of AI experiments, mini-tools, and proof-of-concepts built to explore
                ideas at the frontier. Rough edges welcome — shipping matters more than perfect.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* 4-col grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {experiments
            .sort((a, b) => a.displayOrder - b.displayOrder)
            .map((e, i) => (
              <ExperimentCard key={e.id} experiment={e} delay={i * 0.07} />
            ))}
        </div>
      </div>
    </section>
  )
}