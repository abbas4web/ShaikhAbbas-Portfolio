'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { navItems, ctaNav } from '@/data/navigation'

function useActiveSection() {
  const [active, setActive] = useState('')
  useEffect(() => {
    const ids = navItems.map((n) => n.sectionId)
    const observers: IntersectionObserver[] = []
    const cb = (entries: IntersectionObserverEntry[]) => {
      for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
    }
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(cb, { rootMargin: '-40% 0px -55% 0px', threshold: 0 })
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])
  return active
}

function useScrolled(threshold = 50) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > threshold)
    fn()
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [threshold])
  return scrolled
}

// ─── Mobile panel ─────────────────────────────────────────────────────────────
function MobileMenu({ open, active, onClose }: { open: boolean; active: string; onClose: () => void }) {
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : '' }, [open])

  const go = useCallback((href: string) => {
    onClose()
    setTimeout(() => document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' }), 300)
  }, [onClose])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="bd"
            className="fixed inset-0 z-40"
            style={{ background: 'rgba(3,6,15,0.85)', backdropFilter: 'blur(12px)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.nav
            key="panel"
            role="dialog" aria-modal="true" aria-label="Mobile navigation"
            className="fixed inset-y-0 right-0 z-50 w-80 flex flex-col"
            style={{ background: 'var(--color-surface)', borderLeft: '1px solid rgba(56,189,248,0.14)' }}
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6" style={{ borderBottom: '1px solid rgba(56,189,248,0.08)' }}>
              <span className="font-mono text-xs uppercase tracking-widest" style={{ color: 'var(--color-foreground-subtle)' }}>Menu</span>
              <button onClick={onClose} aria-label="Close menu"
                className="w-9 h-9 flex items-center justify-center rounded-xl transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
                style={{ background: 'rgba(56,189,248,0.06)', color: 'var(--color-foreground-muted)' }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Links */}
            <ul className="flex flex-col flex-1 px-8 py-8 gap-1" role="list">
              {navItems.map((item, i) => {
                const isActive = active === item.sectionId
                return (
                  <motion.li key={item.sectionId}
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.05, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
                    <button onClick={() => go(item.href)}
                      className="w-full flex items-center justify-between py-4 text-left transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
                      style={{
                        borderBottom: '1px solid rgba(56,189,248,0.06)',
                        color: isActive ? 'var(--color-accent)' : 'var(--color-foreground-muted)',
                      }}>
                      <span className="text-xl font-bold tracking-tight">{item.label}</span>
                      {isActive && <span className="w-2 h-2 rounded-full" style={{ background: 'var(--color-accent)' }} aria-hidden="true" />}
                    </button>
                  </motion.li>
                )
              })}
            </ul>

            {/* CTA */}
            <motion.div className="px-8 py-8" style={{ borderTop: '1px solid rgba(56,189,248,0.08)' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}>
              <button onClick={() => go(ctaNav.href)}
                className="w-full py-3.5 rounded-full font-bold text-sm btn-shine focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
                style={{ color: '#020408' }}>
                {ctaNav.label}
              </button>
            </motion.div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  )
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const active = useActiveSection()
  const scrolled = useScrolled()
  const go = useCallback((href: string) =>
    document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' }), [])

  return (
    <>
      <motion.header
        role="banner"
        className="fixed top-0 left-0 right-0 z-30 transition-all duration-500"
        style={scrolled
          ? { padding: '0.75rem 0', background: 'rgba(3,6,15,0.88)', backdropFilter: 'blur(22px)', borderBottom: '1px solid rgba(56,189,248,0.1)' }
          : { padding: '1.25rem 0' }}
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      >
        <div className="container-main flex items-center justify-between">

          {/* Logo */}
          <Link href="/" aria-label="Shaikh Abbas — home"
            className="flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]">
            <motion.div
              className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold font-mono"
              style={{ background: 'linear-gradient(135deg, #38bdf8, #818cf8)', color: '#020408' }}
              whileHover={{ scale: 1.08, rotate: 5 }} transition={{ duration: 0.2 }}
            >
              SA
            </motion.div>
            <span className="font-bold text-base hidden sm:block" style={{ color: 'var(--color-foreground)', letterSpacing: '-0.02em' }}>
              Shaikh Abbas
            </span>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-2">
            <ul className="flex items-center gap-2" role="list">
              {navItems.map((item) => {
                const isActive = active === item.sectionId
                return (
                  <li key={item.sectionId}>
                    <button
                      onClick={() => go(item.href)}
                      aria-current={isActive ? 'location' : undefined}
                      className="relative px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] rounded-xl transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
                      style={{ color: isActive ? 'var(--color-accent)' : 'var(--color-foreground-muted)' }}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-xl"
                          style={{ background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.2)' }}
                          transition={{ type: 'spring', stiffness: 380, damping: 36 }}
                          aria-hidden="true"
                        />
                      )}
                      <span className="relative">{item.label}</span>
                    </button>
                  </li>
                )
              })}
            </ul>

            {/* Resume CTA */}
            <motion.button
              onClick={() => go(ctaNav.href)}
              className="ml-3 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-[0.12em] btn-shine focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
              style={{ color: '#020408' }}
              whileHover={{ scale: 1.04, boxShadow: '0 0 20px rgba(56,189,248,0.3)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.18 }}
            >
              {ctaNav.label}
            </motion.button>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-xl transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
            style={{ color: 'var(--color-foreground)' }}
          >
            <motion.span className="block w-5 h-0.5 rounded-full bg-current"
              animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.28 }} />
            <motion.span className="block w-5 h-0.5 rounded-full bg-current"
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }} />
            <motion.span className="block w-5 h-0.5 rounded-full bg-current"
              animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.28 }} />
          </button>
        </div>
      </motion.header>

      <MobileMenu open={menuOpen} active={active} onClose={() => setMenuOpen(false)} />
    </>
  )
}
