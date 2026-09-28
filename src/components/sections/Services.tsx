'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Brain, Layers, Compass, Search, ArrowRight } from 'lucide-react'
import { services, type Service } from '@/data/services'
import SectionHeading from '@/components/ui/SectionHeading'
import ScrollReveal from '@/components/ui/ScrollReveal'
import Button from '@/components/ui/Button'

// ─── Icon map ─────────────────────────────────────────────────────────────────
const iconMap: Record<string, React.ElementType> = {
  Brain,
  Layers,
  Compass,
  Search,
}

// ─── Service card ─────────────────────────────────────────────────────────────
function ServiceCard({
  service,
  index,
  isActive,
  onHover,
}: {
  service: Service
  index: number
  isActive: boolean
  onHover: (id: string | null) => void
}) {
  const Icon = iconMap[service.icon] ?? Brain

  return (
    <ScrollReveal delay={index * 0.08}>
      <motion.article
        className={`
          group relative flex flex-col h-full border p-7 cursor-default
          transition-all duration-500
          ${isActive
            ? 'border-[var(--color-accent-dim)] bg-[var(--color-surface-2)]'
            : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent-dim)]'}
        `}
        onMouseEnter={() => onHover(service.id)}
        onMouseLeave={() => onHover(null)}
        aria-label={service.title}
      >
        {/* Index */}
        <span
          className="absolute top-5 right-5 font-[var(--font-mono)] text-[10px] text-[var(--color-foreground-subtle)]"
          aria-hidden="true"
        >
          {String(service.displayOrder).padStart(2, '0')}
        </span>

        {/* Icon */}
        <div
          className={`
            w-10 h-10 mb-6 border flex items-center justify-center
            transition-all duration-300
            ${isActive
              ? 'border-[var(--color-accent)] bg-[var(--color-accent-subtle)]'
              : 'border-[var(--color-border)] group-hover:border-[var(--color-accent-dim)]'}
          `}
        >
          <Icon
            size={18}
            strokeWidth={1.5}
            className={`transition-colors duration-300 ${
              isActive ? 'text-[var(--color-accent)]' : 'text-[var(--color-foreground-muted)]'
            }`}
          />
        </div>

        {/* Title */}
        <h3
          className={`
            font-[var(--font-display)] text-xl font-light mb-3 leading-snug transition-colors duration-300
            ${isActive ? 'text-[var(--color-accent)]' : 'text-[var(--color-foreground)] group-hover:text-[var(--color-accent)]'}
          `}
        >
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-[var(--color-foreground-muted)] leading-relaxed mb-6 flex-1">
          {service.description}
        </p>

        {/* Deliverables */}
        <div>
          <p className="font-[var(--font-mono)] text-[9px] uppercase tracking-[0.22em] text-[var(--color-foreground-subtle)] mb-3">
            Deliverables
          </p>
          <ul className="flex flex-col gap-2" role="list">
            {service.deliverables.map((d, i) => (
              <li key={i} className="flex items-center gap-2">
                <span
                  className={`w-1 h-1 rounded-full flex-shrink-0 transition-colors duration-300 ${
                    isActive ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-border)]'
                  }`}
                  aria-hidden="true"
                />
                <span className="text-[11px] text-[var(--color-foreground-muted)]">{d}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Arrow */}
        <motion.div
          className="absolute bottom-5 right-5"
          animate={{ x: isActive ? 2 : 0, y: isActive ? -2 : 0 }}
          transition={{ duration: 0.2 }}
          aria-hidden="true"
        >
          <ArrowRight
            size={14}
            strokeWidth={1.5}
            className={`transition-colors duration-300 ${
              isActive ? 'text-[var(--color-accent)]' : 'text-[var(--color-foreground-subtle)]'
            }`}
          />
        </motion.div>
      </motion.article>
    </ScrollReveal>
  )
}

// ─── Services ─────────────────────────────────────────────────────────────────
export default function Services() {
  const [activeId, setActiveId] = useState<string | null>(null)

  const handleCTA = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="services"
      className="section-padding bg-[var(--color-surface)] border-t border-[var(--color-border)]"
      aria-label="Services"
    >
      <div className="container-main">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <SectionHeading
            index="06"
            label="Services"
            title="How I can help."
            subtitle="Focused engagements for teams and founders who need to move fast without cutting corners."
          />
          <ScrollReveal delay={0.2}>
            <Button
              variant="secondary"
              size="md"
              onClick={handleCTA}
              icon={<ArrowRight size={14} strokeWidth={1.5} />}
              className="self-start lg:self-auto flex-shrink-0"
            >
              Work with me
            </Button>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {services
            .sort((a, b) => a.displayOrder - b.displayOrder)
            .map((service, i) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={i}
                isActive={activeId === service.id}
                onHover={setActiveId}
              />
            ))}
        </div>

        {/* CTA strip */}
        <ScrollReveal delay={0.3}>
          <div className="mt-12 border border-[var(--color-border)] p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="font-[var(--font-display)] text-xl font-light text-[var(--color-foreground)] mb-1">
                Have something specific in mind?
              </p>
              <p className="text-sm text-[var(--color-foreground-muted)]">
                I&apos;m happy to discuss custom engagements, advisory roles, and fractional work.
              </p>
            </div>
            <Button variant="primary" size="md" onClick={handleCTA} className="flex-shrink-0">
              Let&apos;s talk
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
