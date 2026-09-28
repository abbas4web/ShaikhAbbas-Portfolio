'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, ArrowUpRight } from 'lucide-react'
import { projects, type Project } from '@/data/projects'
import SectionHeading from '@/components/ui/SectionHeading'
import ScrollReveal from '@/components/ui/ScrollReveal'

function GithubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  )
}

type FC = 'all' | Project['category']
const FILTERS: { label: string; value: FC }[] = [
  { label: 'All',        value: 'all'       },
  { label: 'AI',         value: 'ai'        },
  { label: 'Full-Stack', value: 'fullstack' },
  { label: 'Tools',      value: 'tool'      },
]

function ProjectCard({ project: p, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.article
      layout
      className="group relative flex flex-col overflow-hidden rounded-2xl"
      style={{ background: 'var(--color-surface)', border: '1px solid rgba(56,189,248,0.1)' }}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      whileHover={{ y: -6, borderColor: 'rgba(56,189,248,0.28)', boxShadow: '0 20px 50px rgba(56,189,248,0.07)', transition: { duration: 0.25 } }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={p.title}
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden" style={{ aspectRatio: p.featured ? '16/9' : '16/8', background: 'var(--color-surface-2)' }}>
        {p.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        ) : (
          <div className="w-full h-full relative flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-[0.15]" style={{
              backgroundImage: 'linear-gradient(rgba(56,189,248,0.4) 1px, transparent 1px),linear-gradient(90deg, rgba(56,189,248,0.4) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }} />
            <motion.span
              className="relative text-7xl font-bold text-gradient"
              style={{ opacity: 0.3 }}
              animate={hovered ? { scale: 1.1, opacity: 0.5 } : { scale: 1, opacity: 0.3 }}
              transition={{ duration: 0.35 }}
            >
              {p.title.charAt(0)}
            </motion.span>
          </div>
        )}
        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center gap-3"
          style={{ background: 'rgba(3,6,15,0.8)' }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {p.liveUrl && (
            <motion.a href={p.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`Live demo: ${p.title}`}
              onClick={(e) => e.stopPropagation()}
              className="w-11 h-11 rounded-full flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
              style={{ background: 'rgba(56,189,248,0.15)', border: '1px solid rgba(56,189,248,0.4)', color: 'var(--color-accent)' }}
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.94 }}>
              <ExternalLink size={15} strokeWidth={1.8} />
            </motion.a>
          )}
          {p.githubUrl && (
            <motion.a href={p.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`GitHub: ${p.title}`}
              onClick={(e) => e.stopPropagation()}
              className="w-11 h-11 rounded-full flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
              style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)', color: 'var(--color-foreground-muted)' }}
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.94 }}>
              <GithubIcon size={15} />
            </motion.a>
          )}
        </motion.div>
        {p.featured && (
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full font-mono text-[9px] uppercase tracking-widest font-bold"
            style={{ background: 'linear-gradient(135deg,#38bdf8,#818cf8)', color: '#020408' }}>
            Featured
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-base leading-snug transition-colors duration-200"
            style={{ color: hovered ? 'var(--color-accent)' : 'var(--color-foreground)' }}>
            {p.title}
          </h3>
          <motion.span animate={{ x: hovered ? 2 : 0, y: hovered ? -2 : 0 }} transition={{ duration: 0.2 }} aria-hidden="true">
            <ArrowUpRight size={16} strokeWidth={2} className="flex-shrink-0 mt-0.5"
              style={{ color: hovered ? 'var(--color-accent)' : 'var(--color-foreground-subtle)' }} />
          </motion.span>
        </div>
        <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--color-foreground-muted)' }}>{p.description}</p>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {p.technologies.slice(0, 5).map((t) => (
            <span key={t} className="px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider rounded-full"
              style={{ background: 'var(--color-surface-2)', border: '1px solid rgba(56,189,248,0.1)', color: 'var(--color-foreground-subtle)' }}>
              {t}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between pt-2.5 border-t" style={{ borderColor: 'rgba(56,189,248,0.08)' }}>
          <span className="font-mono text-[10px]" style={{ color: 'var(--color-foreground-subtle)' }}>{p.year}</span>
          <div className="flex items-center gap-3">
            {p.githubUrl && (
              <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                className="transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
                style={{ color: 'var(--color-foreground-subtle)' }}>
                <GithubIcon size={13} />
              </a>
            )}
            {p.liveUrl && (
              <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" aria-label="Live site"
                className="transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
                style={{ color: 'var(--color-foreground-subtle)' }}>
                <ExternalLink size={13} strokeWidth={1.5} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState<FC>('all')
  const visible = (filter === 'all' ? projects : projects.filter((p) => p.category === filter))
    .sort((a, b) => a.displayOrder - b.displayOrder)

  return (
    <section id="projects" className="section-padding relative overflow-hidden" style={{ background: 'var(--color-surface)' }} aria-label="Selected projects">
      <div className="section-divider absolute top-0 left-0 right-0" aria-hidden="true" />
      <div className="container-main relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <SectionHeading index="04" label="Projects" title="Selected work." subtitle="A handful of things I've built that I'm proud of." />
          <ScrollReveal delay={0.15}>
            <div role="group" aria-label="Filter by category"
              className="flex items-center gap-1 p-1 rounded-full self-start md:self-auto flex-shrink-0"
              style={{ background: 'var(--color-surface-2)', border: '1px solid rgba(56,189,248,0.12)' }}>
              {FILTERS.map((f) => (
                <button key={f.value} onClick={() => setFilter(f.value)} aria-pressed={filter === f.value}
                  className="px-4 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-[0.15em] font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
                  style={filter === f.value
                    ? { background: 'linear-gradient(135deg,#38bdf8,#818cf8)', color: '#020408' }
                    : { color: 'var(--color-foreground-muted)' }}>
                  {f.label}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
