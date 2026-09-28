'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence, useAnimate, stagger } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { profile } from '@/data/profile'
import { getHeroLinks } from '@/data/socialLinks'

// ─── Brand icons ──────────────────────────────────────────────────────────────
function GithubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  )
}
function LinkedinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}
const ICON_MAP: Record<string, React.ElementType> = { Github: GithubIcon, Linkedin: LinkedinIcon }

// ─── Floating particles (client-only, no SSR mismatch) ───────────────────────
interface Particle { id: number; x: number; y: number; size: number; dur: number; delay: number }

function Particles() {
  const [list, setList] = useState<Particle[]>([])
  useEffect(() => {
    const rng = (min: number, max: number) => Math.random() * (max - min) + min
    setList(
      Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: rng(2, 98),
        y: rng(2, 98),
        size: rng(1, 2.5),
        dur: rng(7, 14),
        delay: rng(0, 6),
      }))
    )
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {list.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: 'rgba(56,189,248,0.6)',
          }}
          animate={{ y: [-10, -50, -10], opacity: [0.15, 0.5, 0.15] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

// ─── Magnetic button ──────────────────────────────────────────────────────────
function MagneticBtn({
  children,
  className,
  onClick,
  style,
}: {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLButtonElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 180, damping: 18 })
  const sy = useSpring(my, { stiffness: 180, damping: 18 })

  const move = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return
      const r = ref.current.getBoundingClientRect()
      mx.set((e.clientX - (r.left + r.width / 2)) * 0.22)
      my.set((e.clientY - (r.top + r.height / 2)) * 0.22)
    },
    [mx, my]
  )
  const reset = useCallback(() => { mx.set(0); my.set(0) }, [mx, my])

  return (
    <motion.button
      ref={ref}
      style={{ x: sx, y: sy, ...style }}
      onMouseMove={move}
      onMouseLeave={reset}
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      className={className}
    >
      {children}
    </motion.button>
  )
}

// ─── Role cycler ──────────────────────────────────────────────────────────────
const ROLES = ['AI Engineer', 'Full-Stack Developer', 'LLM Systems Builder', 'Product Engineer']

function RoleCycler() {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % ROLES.length), 3000)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="relative h-7 overflow-hidden" style={{ minWidth: 220 }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={idx}
          className="absolute inset-0 flex items-center font-mono text-sm tracking-widest uppercase"
          style={{ color: 'var(--color-accent)' }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {ROLES[idx]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

// ─── Name line with staggered letter reveal ───────────────────────────────────
function AnimatedName({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const letters = Array.from(text)
  return (
    <motion.span
      className={className}
      initial="hidden"
      animate="visible"
      aria-label={text}
      style={{ display: 'block' }}
    >
      {letters.map((ch, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block', whiteSpace: ch === ' ' ? 'pre' : undefined }}
          variants={{
            hidden: { y: '110%', opacity: 0, skewY: 6 },
            visible: { y: '0%', opacity: 1, skewY: 0 },
          }}
          transition={{
            duration: 0.75,
            delay: delay + i * 0.035,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {ch}
        </motion.span>
      ))}
    </motion.span>
  )
}

// ─── Scroll mouse indicator ───────────────────────────────────────────────────
function ScrollMouse() {
  return (
    <motion.div
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.6, duration: 0.8 }}
      aria-hidden="true"
    >
      <div
        className="w-6 h-10 rounded-full flex items-start justify-center pt-2"
        style={{ border: '1.5px solid rgba(56,189,248,0.35)' }}
      >
        <motion.div
          className="w-1 h-2 rounded-full"
          style={{ background: 'var(--color-accent)' }}
          animate={{ y: [0, 14, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        />
      </div>
      <span
        className="font-mono text-[9px] tracking-[0.35em] uppercase"
        style={{ color: 'var(--color-foreground-subtle)' }}
      >
        Scroll
      </span>
    </motion.div>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export default function Hero() {
  const heroLinks = getHeroLinks()
  const scrollTo = (href: string) =>
    document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' })

  // Stagger delay base for elements after the name (name takes ~0.3 + 6 letters × 0.035 + 0.75 ≈ 1.3s)
  const BASE = 1.4

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      aria-label="Introduction"
    >
      {/* ── Ambient orbs ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="orb absolute"
          style={{
            top: '-15%', right: '-8%',
            width: 700, height: 700,
            background: 'radial-gradient(circle, rgba(56,189,248,0.18) 0%, transparent 65%)',
          }}
        />
        <div
          className="orb absolute"
          style={{
            bottom: '-15%', left: '-8%',
            width: 600, height: 600,
            background: 'radial-gradient(circle, rgba(129,140,248,0.14) 0%, transparent 65%)',
            animationDelay: '-5s',
          }}
        />
        <div
          className="orb absolute"
          style={{
            top: '35%', left: '35%',
            width: 400, height: 400,
            background: 'radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)',
            animationDelay: '-9s',
          }}
        />
      </div>

      {/* ── Particles ── */}
      <Particles />

      {/* ── Subtle grid ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(56,189,248,0.04) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(56,189,248,0.04) 1px, transparent 1px)',
          backgroundSize: '90px 90px',
        }}
        aria-hidden="true"
      />

      {/* ── Main content ── */}
      <div className="container-main relative z-10" style={{ paddingTop: '9rem', paddingBottom: '6rem' }}>

        {/* Available badge */}
        <motion.div
          className="inline-flex items-center gap-2.5 rounded-full px-4 py-2 mb-12"
          style={{
            background: 'rgba(56,189,248,0.07)',
            border: '1px solid rgba(56,189,248,0.25)',
          }}
          initial={{ opacity: 0, y: -12, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.span
            className="w-2 h-2 rounded-full"
            style={{ background: '#4ade80' }}
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
            transition={{ repeat: Infinity, duration: 2.2 }}
            aria-hidden="true"
          />
          <span
            className="font-mono text-[11px] uppercase tracking-widest font-medium"
            style={{ color: '#4ade80' }}
          >
            Available for work
          </span>
        </motion.div>

        {/* Name */}
        <div className="mb-8 overflow-hidden">
          <div
            className="font-bold tracking-tight leading-[0.88]"
            style={{ fontSize: 'clamp(3.8rem, 10.5vw, 9rem)' }}
          >
            <AnimatedName
              text={profile.firstName}
              className="text-white block"
              delay={0.25}
            />
            <AnimatedName
              text={profile.lastName}
              className="text-gradient block"
              delay={0.4}
            />
          </div>
        </div>

        {/* Role + line */}
        <motion.div
          className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, delay: BASE, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="flex-shrink-0 h-px w-10"
            style={{ background: 'linear-gradient(to right, var(--color-accent), transparent)' }}
            aria-hidden="true"
          />
          <RoleCycler />
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="mb-12 max-w-xl leading-relaxed"
          style={{ fontSize: '1.15rem', color: 'var(--color-foreground-muted)' }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: BASE + 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {profile.tagline}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-wrap gap-4 mb-20"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: BASE + 0.22, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Primary */}
          <MagneticBtn
            onClick={() => scrollTo(profile.primaryCTA.href)}
            className="relative overflow-hidden rounded-full px-8 py-4 font-bold text-sm tracking-wide focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
            style={{ color: '#020408' }}
          >
            <span className="absolute inset-0 btn-shine rounded-full" aria-hidden="true" />
            <span className="relative flex items-center gap-2">
              {profile.primaryCTA.label}
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              >
                <ArrowRight size={15} strokeWidth={2.5} />
              </motion.span>
            </span>
          </MagneticBtn>

          {/* Secondary */}
          <MagneticBtn
            onClick={() => scrollTo(profile.secondaryCTA.href)}
            className="rounded-full px-8 py-4 font-semibold text-sm tracking-wide transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(56,189,248,0.25)',
              color: 'var(--color-foreground)',
            }}
          >
            {profile.secondaryCTA.label}
          </MagneticBtn>
        </motion.div>

        {/* Meta row */}
        <motion.div
          className="flex flex-wrap items-center gap-x-10 gap-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: BASE + 0.38 }}
        >
          {/* Info items */}
          {[
            { label: 'Location', value: profile.location },
            { label: 'Focus', value: 'AI & Full-Stack' },
            { label: 'Status', value: 'Open to work' },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col gap-0.5">
              <span
                className="font-mono text-[9px] uppercase tracking-[0.22em]"
                style={{ color: 'var(--color-foreground-subtle)' }}
              >
                {label}
              </span>
              <span
                className="text-xs"
                style={{ color: 'var(--color-foreground-muted)' }}
              >
                {value}
              </span>
            </div>
          ))}

          {/* Divider */}
          <div
            className="hidden sm:block w-px h-6 ml-auto"
            style={{ background: 'rgba(56,189,248,0.15)' }}
            aria-hidden="true"
          />

          {/* Social links */}
          <div className="flex items-center gap-3">
            {heroLinks.map((link) => {
              const Icon = ICON_MAP[link.icon]
              return (
                <motion.a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(56,189,248,0.18)',
                    color: 'var(--color-foreground-muted)',
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.94 }}
                  transition={{ duration: 0.18 }}
                >
                  {Icon ? <Icon /> : null}
                </motion.a>
              )
            })}
          </div>
        </motion.div>
      </div>

      <ScrollMouse />
    </section>
  )
}
