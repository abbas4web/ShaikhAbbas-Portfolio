'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ArrowDown } from 'lucide-react'

// Brand icons (removed from lucide-react v0.5+)
function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  )
}
import { profile } from '@/data/profile'
import { getHeroLinks } from '@/data/socialLinks'
import Button from '@/components/ui/Button'

// ─── Animated grid / visual element ──────────────────────────────────────────
function GridVisual() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Vertical lines */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`v-${i}`}
          className="absolute top-0 bottom-0 w-px bg-[var(--color-border-subtle)]"
          style={{ left: `${(i + 1) * (100 / 7)}%` }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{
            duration: 1.4,
            delay: 0.6 + i * 0.08,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      ))}
      {/* Horizontal lines */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`h-${i}`}
          className="absolute left-0 right-0 h-px bg-[var(--color-border-subtle)]"
          style={{ top: `${(i + 1) * (100 / 5)}%` }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{
            duration: 1.4,
            delay: 0.8 + i * 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      ))}
      {/* Radial glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(200,169,110,0.04) 0%, transparent 70%)',
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, delay: 1, ease: 'easeOut' }}
      />
    </div>
  )
}

// ─── Scroll indicator ─────────────────────────────────────────────────────────
function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.2, duration: 0.8, ease: 'easeOut' }}
      aria-hidden="true"
    >
      <span className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.25em] text-[var(--color-foreground-subtle)] rotate-90 origin-center mb-4">
        Scroll
      </span>
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
      >
        <ArrowDown
          size={14}
          className="text-[var(--color-foreground-subtle)]"
          strokeWidth={1.5}
        />
      </motion.div>
    </motion.div>
  )
}

// ─── Social links ─────────────────────────────────────────────────────────────
const iconMap: Record<string, React.ElementType> = {
  Github: GithubIcon,
  Linkedin: LinkedinIcon,
}

function HeroSocialLinks() {
  const links = getHeroLinks()

  return (
    <motion.div
      className="absolute left-8 bottom-10 hidden xl:flex flex-col items-center gap-5"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      aria-label="Social links"
    >
      {links.map((link) => {
        const Icon = iconMap[link.icon]
        return (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="text-[var(--color-foreground-subtle)] hover:text-[var(--color-accent)] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
          >
            {Icon ? <Icon size={16} strokeWidth={1.5} /> : null}
          </a>
        )
      })}
      <div className="w-px h-16 bg-[var(--color-border)]" aria-hidden="true" />
    </motion.div>
  )
}

// ─── Availability badge ───────────────────────────────────────────────────────
function AvailabilityBadge({ available }: { available: boolean }) {
  return (
    <motion.div
      className="inline-flex items-center gap-2 px-3 py-1.5 border border-[var(--color-border)] bg-[var(--color-surface)]"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.span
        className={`w-1.5 h-1.5 rounded-full ${
          available ? 'bg-emerald-400' : 'bg-[var(--color-foreground-subtle)]'
        }`}
        animate={available ? { opacity: [1, 0.3, 1] } : {}}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <span className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.18em] text-[var(--color-foreground-muted)]">
        {available ? 'Available for work' : 'Not available'}
      </span>
    </motion.div>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export default function Hero() {
  const firstNameRef = useRef<HTMLSpanElement>(null)
  const lastNameRef = useRef<HTMLSpanElement>(null)

  // GSAP character split animation for the name
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 })

    ;[firstNameRef.current, lastNameRef.current].forEach((el, rowIndex) => {
      if (!el) return
      const text = el.textContent ?? ''
      el.innerHTML = text
        .split('')
        .map(
          (ch) =>
            `<span style="display:inline-block;overflow:hidden;vertical-align:top"><span class="char" style="display:inline-block">${ch === ' ' ? '&nbsp;' : ch}</span></span>`,
        )
        .join('')

      const chars = el.querySelectorAll<HTMLElement>('.char')
      tl.fromTo(
        chars,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power4.out',
          stagger: 0.04,
        },
        rowIndex * 0.15,
      )
    })

    return () => { tl.kill() }
  }, [])

  const handleCTA = (href: string) => {
    const id = href.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[var(--color-background)]"
      aria-label="Introduction"
    >
      <GridVisual />
      <HeroSocialLinks />

      <div className="container-main relative z-10 pt-28 pb-24 md:pt-36 md:pb-32">
        <div className="max-w-5xl">

          {/* Availability */}
          <AvailabilityBadge available={profile.availableForWork} />

          {/* Name */}
          <div className="mt-8 mb-6 overflow-hidden">
            <h1
              className="font-[var(--font-display)] font-light leading-[0.95] tracking-tight text-[clamp(3.5rem,9vw,8rem)] text-[var(--color-foreground)]"
              aria-label={profile.name}
            >
              <span ref={firstNameRef} className="block">
                {profile.firstName}
              </span>
              <span
                ref={lastNameRef}
                className="block text-gradient"
              >
                {profile.lastName}
              </span>
            </h1>
          </div>

          {/* Title */}
          <motion.div
            className="flex items-center gap-4 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <span
              className="h-px w-10 bg-[var(--color-accent)]"
              aria-hidden="true"
            />
            <p className="font-[var(--font-mono)] text-xs md:text-sm uppercase tracking-[0.25em] text-[var(--color-accent)]">
              {profile.title}
            </p>
          </motion.div>

          {/* Tagline */}
          <motion.p
            className="text-lg md:text-xl text-[var(--color-foreground-muted)] max-w-xl leading-relaxed mb-12 font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {profile.tagline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <Button
              variant="primary"
              size="lg"
              onClick={() => handleCTA(profile.primaryCTA.href)}
              ariaLabel={profile.primaryCTA.label}
            >
              {profile.primaryCTA.label}
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => handleCTA(profile.secondaryCTA.href)}
              ariaLabel={profile.secondaryCTA.label}
            >
              {profile.secondaryCTA.label}
            </Button>
          </motion.div>

          {/* Metadata row */}
          <motion.div
            className="mt-16 pt-8 border-t border-[var(--color-border)] flex flex-wrap items-center gap-x-10 gap-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.9, duration: 0.8 }}
          >
            {[
              { label: 'Location', value: profile.location },
              { label: 'Specialisation', value: 'AI & Full-Stack' },
              { label: 'Status', value: 'Open to opportunities' },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-0.5">
                <span className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-[var(--color-foreground-subtle)]">
                  {label}
                </span>
                <span className="text-xs text-[var(--color-foreground-muted)]">
                  {value}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  )
}
