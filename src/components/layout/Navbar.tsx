'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { navItems, ctaNav } from '@/data/navigation'

// ─── Hook: active section via IntersectionObserver ────────────────────────────
function useActiveSection(): string {
  const [active, setActive] = useState('')

  useEffect(() => {
    const ids = navItems.map((n) => n.sectionId)
    const observers: IntersectionObserver[] = []

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActive(entry.target.id)
        }
      }
    }

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(handleIntersect, {
        rootMargin: '-40% 0px -55% 0px',
        threshold: 0,
      })
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return active
}

// ─── Hook: scroll position ────────────────────────────────────────────────────
function useScrolled(threshold = 40): boolean {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return scrolled
}

// ─── Mobile Menu ──────────────────────────────────────────────────────────────
interface MobileMenuProps {
  open: boolean
  active: string
  onClose: () => void
}

function MobileMenu({ open, active, onClose }: MobileMenuProps) {
  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const handleNavClick = useCallback(
    (href: string) => {
      onClose()
      // Small delay lets the menu close before scroll
      setTimeout(() => {
        const id = href.replace('#', '')
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }, 300)
    },
    [onClose],
  )

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-40 bg-[var(--color-background)]/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.nav
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-[var(--color-surface)] border-l border-[var(--color-border)] flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-[var(--color-border)]">
              <span className="font-[var(--font-mono)] text-xs text-[var(--color-foreground-muted)] tracking-widest uppercase">
                Menu
              </span>
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="w-8 h-8 flex items-center justify-center text-[var(--color-foreground-muted)] hover:text-[var(--color-foreground)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M1 1L15 15M15 1L1 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Nav links */}
            <ul className="flex flex-col flex-1 px-8 py-10 gap-1" role="list">
              {navItems.map((item, i) => {
                const isActive = active === item.sectionId
                return (
                  <motion.li
                    key={item.sectionId}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <button
                      onClick={() => handleNavClick(item.href)}
                      className={`
                        group w-full flex items-center justify-between py-4
                        border-b border-[var(--color-border-subtle)]
                        text-left transition-colors duration-200
                        focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]
                        ${isActive
                          ? 'text-[var(--color-accent)]'
                          : 'text-[var(--color-foreground-muted)] hover:text-[var(--color-foreground)]'}
                      `}
                    >
                      <span className="font-[var(--font-display)] text-2xl font-light">
                        {item.label}
                      </span>
                      <span
                        className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
                          isActive ? 'bg-[var(--color-accent)]' : 'bg-transparent'
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  </motion.li>
                )
              })}
            </ul>

            {/* CTA */}
            <motion.div
              className="px-8 py-8 border-t border-[var(--color-border)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <button
                onClick={() => handleNavClick(ctaNav.href)}
                className="w-full py-3 text-center text-xs uppercase tracking-widest font-medium bg-[var(--color-accent)] text-[var(--color-background)] transition-colors hover:bg-[var(--color-foreground)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
              >
                {ctaNav.label}
              </button>
            </motion.div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  )
}

// ─── Hamburger icon ───────────────────────────────────────────────────────────
function Hamburger({ open }: { open: boolean }) {
  return (
    <svg
      width="22"
      height="14"
      viewBox="0 0 22 14"
      fill="none"
      aria-hidden="true"
      className="overflow-visible"
    >
      <motion.path
        d="M0 1H22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        animate={open ? { d: 'M2 12L20 2', opacity: 0 } : { d: 'M0 1H22', opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      <motion.path
        d="M0 7H22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.2 }}
        style={{ originX: '50%' }}
      />
      <motion.path
        d="M0 13H22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        animate={open ? { d: 'M2 2L20 12', opacity: 0 } : { d: 'M0 13H22', opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </svg>
  )
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const active = useActiveSection()
  const scrolled = useScrolled()

  const handleNavClick = useCallback((href: string) => {
    const id = href.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <>
      <motion.header
        role="banner"
        className={`
          fixed top-0 left-0 right-0 z-30
          transition-all duration-500 ease-[var(--ease-cinematic)]
          ${scrolled
            ? 'border-b border-[var(--color-border)] bg-[var(--color-background)]/90 backdrop-blur-md py-4'
            : 'bg-transparent py-6'}
        `}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      >
        <div className="container-main flex items-center justify-between">

          {/* Logo / wordmark */}
          <Link
            href="/"
            aria-label="Shaikh Abbas — home"
            className="group flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
          >
            <span
              className="w-7 h-7 border border-[var(--color-accent)] flex items-center justify-center transition-colors duration-300 group-hover:bg-[var(--color-accent)]"
              aria-hidden="true"
            >
              <span className="font-[var(--font-mono)] text-[10px] text-[var(--color-accent)] group-hover:text-[var(--color-background)] transition-colors duration-300 leading-none">
                SA
              </span>
            </span>
            <span className="font-[var(--font-display)] text-sm tracking-wide text-[var(--color-foreground)] hidden sm:block">
              Shaikh Abbas
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-8" role="list">
              {navItems.map((item) => {
                const isActive = active === item.sectionId
                return (
                  <li key={item.sectionId}>
                    <button
                      onClick={() => handleNavClick(item.href)}
                      className={`
                        relative group text-[11px] uppercase tracking-[0.18em] font-medium
                        transition-colors duration-200
                        focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]
                        ${isActive
                          ? 'text-[var(--color-accent)]'
                          : 'text-[var(--color-foreground-muted)] hover:text-[var(--color-foreground)]'}
                      `}
                      aria-current={isActive ? 'location' : undefined}
                    >
                      {item.label}
                      {/* Active underline */}
                      <motion.span
                        className="absolute -bottom-1 left-0 h-px bg-[var(--color-accent)]"
                        initial={false}
                        animate={{ width: isActive ? '100%' : '0%' }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        aria-hidden="true"
                      />
                    </button>
                  </li>
                )
              })}
            </ul>

            {/* Resume CTA */}
            <button
              onClick={() => handleNavClick(ctaNav.href)}
              className="
                text-[11px] uppercase tracking-[0.18em] font-medium
                px-5 py-2.5 border border-[var(--color-accent)]
                text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-[var(--color-background)]
                transition-all duration-300 ease-[var(--ease-cinematic)]
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]
              "
            >
              {ctaNav.label}
            </button>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="lg:hidden w-10 h-10 flex items-center justify-center text-[var(--color-foreground-muted)] hover:text-[var(--color-foreground)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
          >
            <Hamburger open={menuOpen} />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <MobileMenu
        open={menuOpen}
        active={active}
        onClose={() => setMenuOpen(false)}
      />
    </>
  )
}
