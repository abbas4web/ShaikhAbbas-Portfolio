'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Brain, Layers, Compass, Search, ArrowRight } from 'lucide-react'
import { services } from '@/data/services'
import SectionHeading from '@/components/ui/SectionHeading'
import ScrollReveal from '@/components/ui/ScrollReveal'

const ICONS: Record<string, React.ElementType> = { Brain, Layers, Compass, Search }

function ServiceCard({ service: s, index, isActive, onHover }: {
  service: typeof services[0]; index: number; isActive: boolean; onHover: (id: string | null) => void
}) {
  const Icon = ICONS[s.icon] ?? Brain
  return (
    <ScrollReveal delay={index * 0.08}>
      <motion.article
        className="group relative flex flex-col h-full rounded-2xl p-7"
        style={{
          background: isActive ? 'var(--color-surface-2)' : 'var(--color-surface)',
          border: `1px solid ${isActive ? 'rgba(56,189,248,0.3)' : 'rgba(56,189,248,0.1)'}`,
          transition: 'border-color 0.3s, background 0.3s',
        }}
        onMouseEnter={() => onHover(s.id)}
        onMouseLeave={() => onHover(null)}
        whileHover={{ y: -5, boxShadow: '0 20px 50px rgba(56,189,248,0.08)', transition: { duration: 0.25 } }}
        aria-label={s.title}
      >
        <span className="absolute top-5 right-5 font-mono text-[10px]" style={{ color: 'var(--color-foreground-subtle)' }} aria-hidden="true">
          {String(s.displayOrder).padStart(2, '0')}
        </span>
        <motion.div
          className="w-12 h-12 rounded-xl mb-6 flex items-center justify-center"
          style={{ background: isActive ? 'rgba(56,189,248,0.15)' : 'rgba(56,189,248,0.08)', border: `1px solid ${isActive ? 'rgba(56,189,248,0.4)' : 'rgba(56,189,248,0.15)'}` }}
          animate={{ scale: isActive ? 1.05 : 1 }} transition={{ duration: 0.25 }}>
          <Icon size={20} strokeWidth={1.5} style={{ color: isActive ? 'var(--color-accent)' : 'var(--color-foreground-muted)' }} />
        </motion.div>
        <h3 className="font-bold text-lg mb-3 leading-snug" style={{ color: isActive ? 'var(--color-accent)' : 'var(--color-foreground)' }}>
          {s.title}
        </h3>
        <p className="text-sm leading-relaxed mb-6 flex-1" style={{ color: 'var(--color-foreground-muted)' }}>{s.description}</p>
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.22em] mb-3" style={{ color: 'var(--color-foreground-subtle)' }}>Deliverables</p>
          <ul className="flex flex-col gap-2" role="list">
            {s.deliverables.map((d, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: isActive ? '#38bdf8' : 'rgba(56,189,248,0.3)' }} aria-hidden="true" />
                <span className="text-xs" style={{ color: 'var(--color-foreground-muted)' }}>{d}</span>
              </li>
            ))}
          </ul>
        </div>
        <motion.div className="absolute bottom-5 right-5" animate={{ x: isActive ? 3 : 0, y: isActive ? -3 : 0 }} transition={{ duration: 0.2 }} aria-hidden="true">
          <ArrowRight size={14} strokeWidth={2} style={{ color: isActive ? 'var(--color-accent)' : 'var(--color-foreground-subtle)' }} />
        </motion.div>
      </motion.article>
    </ScrollReveal>
  )
}

export default function Services() {
  const [activeId, setActiveId] = useState<string | null>(null)
  return (
    <section id="services" className="section-padding relative overflow-hidden" style={{ background: 'var(--color-surface)' }} aria-label="Services">
      <div className="orb absolute pointer-events-none" style={{ top: '30%', left: '-8%', width: 450, height: 450, background: 'radial-gradient(circle, rgba(56,189,248,0.07) 0%, transparent 70%)' }} aria-hidden="true" />
      <div className="container-main relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <SectionHeading index="06" label="Services" title="How I can help."
            subtitle="Focused engagements for teams and founders who need to move fast without cutting corners." />
          <ScrollReveal delay={0.18}>
            <motion.button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm self-start flex-shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
              style={{ background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.22)', color: 'var(--color-accent)' }}
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.2 }}>
              Work with me <ArrowRight size={15} strokeWidth={2} />
            </motion.button>
          </ScrollReveal>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {services.sort((a, b) => a.displayOrder - b.displayOrder).map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} isActive={activeId === s.id} onHover={setActiveId} />
          ))}
        </div>
        <ScrollReveal delay={0.25}>
          <div className="mt-10 rounded-2xl p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            style={{ background: 'var(--color-surface-2)', border: '1px solid rgba(56,189,248,0.12)' }}>
            <div>
              <p className="text-xl font-bold mb-1" style={{ color: 'var(--color-foreground)' }}>Have something specific in mind?</p>
              <p className="text-sm" style={{ color: 'var(--color-foreground-muted)' }}>Happy to discuss custom engagements, advisory roles, and fractional work.</p>
            </div>
            <motion.button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3.5 rounded-full font-bold text-sm btn-shine flex-shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
              style={{ color: '#020408' }}
              whileHover={{ scale: 1.03, boxShadow: '0 0 28px rgba(56,189,248,0.25)' }}
              whileTap={{ scale: 0.97 }} transition={{ duration: 0.2 }}>
              Let&apos;s talk
            </motion.button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
