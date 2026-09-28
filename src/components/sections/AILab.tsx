'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Zap, Clock } from 'lucide-react'

function GithubIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
    </svg>
  )
}
import { experiments, type Experiment } from '@/data/experiments'
import SectionHeading from '@/components/ui/SectionHeading'
import Badge from '@/components/ui/Badge'
import ScrollReveal from '@/components/ui/ScrollReveal'

// ─── Status indicator ─────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: Experiment['status'] }) {
  const map = {
    live:     { label: 'Live',     color: 'text-emerald-400', dot: 'bg-emerald-400' },
    wip:      { label: 'WIP',      color: 'text-amber-400',   dot: 'bg-amber-400'   },
    archived: { label: 'Archived', color: 'text-[var(--color-foreground-subtle)]', dot: 'bg-[var(--color-foreground-subtle)]' },
  }
  const { label, color, dot } = map[status]

  return (
    <span className={`inline-flex items-center gap-1.5 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.15em] ${color}`}>
      <motion.span
        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dot}`}
        animate={status === 'live' ? { opacity: [1, 0.3, 1] } : {}}
        transition={{ repeat: Infinity, duration: 2 }}
        aria-hidden="true"
      />
      {label}
    </span>
  )
}

// ─── Experiment card ──────────────────────────────────────────────────────────
function ExperimentCard({
  experiment,
  delay = 0,
}: {
  experiment: Experiment
  delay?: number
}) {
  return (
    <ScrollReveal delay={delay}>
      <article className="group h-full flex flex-col border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent-dim)] transition-all duration-500 p-6">
        {/* Top row */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="w-8 h-8 border border-[var(--color-border)] flex items-center justify-center group-hover:border-[var(--color-accent-dim)] transition-colors duration-300">
            <Zap size={14} strokeWidth={1.5} className="text-[var(--color-accent)]" />
          </div>
          <StatusBadge status={experiment.status} />
        </div>

        {/* Index */}
        <p className="font-[var(--font-mono)] text-[10px] text-[var(--color-foreground-subtle)] mb-2">
          {String(experiment.displayOrder).padStart(2, '0')}
        </p>

        {/* Title */}
        <h3 className="font-[var(--font-display)] text-xl font-light text-[var(--color-foreground)] leading-snug mb-3 group-hover:text-[var(--color-accent)] transition-colors duration-300">
          {experiment.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-[var(--color-foreground-muted)] leading-relaxed flex-1 mb-5">
          {experiment.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {experiment.tags.map((tag) => (
            <Badge key={tag} variant="subtle">{tag}</Badge>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3 border-t border-[var(--color-border-subtle)] pt-4">
          {experiment.githubUrl && (
            <a
              href={experiment.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${experiment.title} on GitHub`}
              className="flex items-center gap-1.5 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.15em] text-[var(--color-foreground-subtle)] hover:text-[var(--color-foreground-muted)] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
            >
              <GithubIcon size={12} />
              Code
            </a>
          )}
          {experiment.url && (
            <a
              href={experiment.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${experiment.title} live demo`}
              className="flex items-center gap-1.5 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.15em] text-[var(--color-accent)] hover:text-[var(--color-foreground)] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
            >
              <ExternalLink size={12} strokeWidth={1.5} />
              Demo
            </a>
          )}
          {!experiment.githubUrl && !experiment.url && (
            <span className="flex items-center gap-1.5 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.15em] text-[var(--color-foreground-subtle)]">
              <Clock size={12} strokeWidth={1.5} />
              Coming soon
            </span>
          )}
        </div>
      </article>
    </ScrollReveal>
  )
}

// ─── AI Lab intro text strip ──────────────────────────────────────────────────
function LabIntro() {
  return (
    <ScrollReveal delay={0.15}>
      <div className="border border-[var(--color-border)] bg-[var(--color-surface-2)] p-6 md:p-8 mb-12">
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-center">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 border border-[var(--color-accent-dim)] flex items-center justify-center">
              <Zap size={18} strokeWidth={1} className="text-[var(--color-accent)]" />
            </div>
          </div>
          <div>
            <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-[var(--color-accent)] mb-2">
              The Lab
            </p>
            <p className="text-sm text-[var(--color-foreground-muted)] leading-relaxed max-w-2xl">
              A collection of AI experiments, mini-tools, and proof-of-concepts I build to
              explore ideas at the frontier — from LLM evaluation to autonomous agents. Rough
              edges welcome.
            </p>
          </div>
        </div>
      </div>
    </ScrollReveal>
  )
}

// ─── AI Lab ───────────────────────────────────────────────────────────────────
export default function AILab() {
  return (
    <section
      id="ai-lab"
      className="section-padding bg-[var(--color-background)] border-t border-[var(--color-border)]"
      aria-label="AI experiments and lab projects"
    >
      <div className="container-main">
        <SectionHeading
          index="05"
          label="AI Lab"
          title="Experiments & curiosity."
          subtitle="What I'm building when no one's watching."
          className="mb-12"
        />

        <LabIntro />

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {experiments
            .sort((a, b) => a.displayOrder - b.displayOrder)
            .map((exp, i) => (
              <ExperimentCard key={exp.id} experiment={exp} delay={i * 0.07} />
            ))}
        </div>
      </div>
    </section>
  )
}
