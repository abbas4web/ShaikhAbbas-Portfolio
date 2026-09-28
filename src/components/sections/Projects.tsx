'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, ArrowUpRight } from 'lucide-react'

function GithubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
    </svg>
  )
}
import { projects, getFeaturedProjects, type Project } from '@/data/projects'
import SectionHeading from '@/components/ui/SectionHeading'
import Badge from '@/components/ui/Badge'
import ScrollReveal from '@/components/ui/ScrollReveal'

type FilterCategory = 'all' | Project['category']

const filters: { label: string; value: FilterCategory }[] = [
  { label: 'All', value: 'all' },
  { label: 'AI', value: 'ai' },
  { label: 'Full-Stack', value: 'fullstack' },
  { label: 'Tools', value: 'tool' },
]

// ─── Project card ─────────────────────────────────────────────────────────────
function ProjectCard({
  project,
  index,
}: {
  project: Project
  index: number
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16, scale: 0.98 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative flex flex-col border transition-colors duration-500 cursor-default
        ${project.featured
          ? 'border-[var(--color-border)] hover:border-[var(--color-accent-dim)]'
          : 'border-[var(--color-border-subtle)] hover:border-[var(--color-border)]'}
      `}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={project.title}
    >
      {/* Image / placeholder */}
      <div
        className={`relative overflow-hidden bg-[var(--color-surface)] ${
          project.featured ? 'aspect-[16/9]' : 'aspect-[16/8]'
        }`}
      >
        {project.image ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center"
            style={{
              backgroundImage: `
                linear-gradient(var(--color-border-subtle) 1px, transparent 1px),
                linear-gradient(90deg, var(--color-border-subtle) 1px, transparent 1px)
              `,
              backgroundSize: '32px 32px',
            }}
          >
            <span className="font-[var(--font-display)] text-5xl font-light text-[var(--color-border)] select-none">
              {project.title.split('—')[0].trim().charAt(0)}
            </span>
          </div>
        )}

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 bg-[var(--color-background)]/60 flex items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
        >
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} live`}
              className="w-10 h-10 border border-[var(--color-accent)] flex items-center justify-center text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-[var(--color-background)] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
            >
              <ExternalLink size={14} strokeWidth={1.5} />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} on GitHub`}
              className="w-10 h-10 border border-[var(--color-border)] flex items-center justify-center text-[var(--color-foreground-muted)] hover:border-[var(--color-foreground-muted)] hover:text-[var(--color-foreground)] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
            >
              <GithubIcon size={14} />
            </a>
          )}
        </motion.div>

        {/* Featured badge */}
        {project.featured && (
          <span className="absolute top-3 left-3 font-[var(--font-mono)] text-[9px] uppercase tracking-[0.2em] px-2 py-1 bg-[var(--color-accent)] text-[var(--color-background)]">
            Featured
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-[var(--font-display)] text-lg font-light text-[var(--color-foreground)] leading-snug group-hover:text-[var(--color-accent)] transition-colors duration-300">
            {project.title}
          </h3>
          <motion.span
            animate={{ x: hovered ? 2 : 0, y: hovered ? -2 : 0 }}
            transition={{ duration: 0.2 }}
            aria-hidden="true"
          >
            <ArrowUpRight
              size={16}
              strokeWidth={1.5}
              className="flex-shrink-0 text-[var(--color-foreground-subtle)] group-hover:text-[var(--color-accent)] transition-colors duration-300 mt-1"
            />
          </motion.span>
        </div>

        <p className="text-xs text-[var(--color-foreground-muted)] leading-relaxed flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.technologies.slice(0, 5).map((tech) => (
            <Badge key={tech} variant="subtle">{tech}</Badge>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-[var(--color-border-subtle)]">
          <span className="font-[var(--font-mono)] text-[10px] text-[var(--color-foreground-subtle)]">
            {project.year}
          </span>
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-[var(--color-foreground-subtle)] hover:text-[var(--color-foreground-muted)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
              >
                <GithubIcon size={13} />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Live site"
                className="text-[var(--color-foreground-subtle)] hover:text-[var(--color-accent)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
              >
                <ExternalLink size={13} strokeWidth={1.5} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  )
}

// ─── Projects ─────────────────────────────────────────────────────────────────
export default function Projects() {
  const [filter, setFilter] = useState<FilterCategory>('all')

  const visible = filter === 'all'
    ? projects.sort((a, b) => a.displayOrder - b.displayOrder)
    : projects.filter((p) => p.category === filter).sort((a, b) => a.displayOrder - b.displayOrder)

  return (
    <section
      id="projects"
      className="section-padding bg-[var(--color-surface)] border-t border-[var(--color-border)]"
      aria-label="Selected projects"
    >
      <div className="container-main">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <SectionHeading
            index="04"
            label="Projects"
            title="Selected work."
            subtitle="A handful of things I've built that I'm proud of."
          />

          {/* Filter bar */}
          <ScrollReveal delay={0.2}>
            <div
              role="group"
              aria-label="Filter projects by category"
              className="flex items-center gap-1 p-1 border border-[var(--color-border)] bg-[var(--color-background)] self-start md:self-auto flex-shrink-0"
            >
              {filters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFilter(f.value)}
                  aria-pressed={filter === f.value}
                  className={`
                    px-4 py-1.5 text-[10px] uppercase tracking-[0.18em] font-medium transition-all duration-200
                    focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]
                    ${filter === f.value
                      ? 'bg-[var(--color-accent)] text-[var(--color-background)]'
                      : 'text-[var(--color-foreground-muted)] hover:text-[var(--color-foreground)]'}
                  `}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
