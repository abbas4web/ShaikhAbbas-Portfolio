'use client'

import { motion } from 'framer-motion'
import { Mail, ArrowUp } from 'lucide-react'
import { profile } from '@/data/profile'
import { navItems } from '@/data/navigation'
import { getFooterLinks } from '@/data/socialLinks'

function GithubIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  )
}
function LinkedinIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}
function TwitterIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}
function MailIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

const ICON_MAP: Record<string, React.ElementType> = {
  Github: GithubIcon, Linkedin: LinkedinIcon, Twitter: TwitterIcon, Mail: MailIcon,
}

export default function Footer() {
  const links = getFooterLinks()
  const year = new Date().getFullYear()
  const go = (href: string) => document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer
      role="contentinfo"
      aria-label="Site footer"
      style={{ background: 'var(--color-background)', borderTop: '1px solid rgba(56,189,248,0.1)' }}
    >
      <div className="container-main py-16">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_160px_200px] gap-12">

          {/* Brand */}
          <div className="flex flex-col gap-5 max-w-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold font-mono"
                style={{ background: 'linear-gradient(135deg,#38bdf8,#818cf8)', color: '#020408' }}>
                SA
              </div>
              <span className="font-bold text-base" style={{ color: 'var(--color-foreground)', letterSpacing: '-0.02em' }}>
                {profile.name}
              </span>
            </div>

            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-foreground-subtle)' }}>
              AI Engineer &amp; Full-Stack Developer crafting intelligent systems and exceptional digital experiences.
            </p>

            <div className="flex items-center gap-2.5">
              {links.map((link) => {
                const Icon = ICON_MAP[link.icon]
                return (
                  <motion.a
                    key={link.id}
                    href={link.url}
                    target={link.url.startsWith('mailto') ? undefined : '_blank'}
                    rel={link.url.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                    aria-label={link.label}
                    className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
                    style={{ background: 'var(--color-surface)', border: '1px solid rgba(56,189,248,0.12)', color: 'var(--color-foreground-subtle)' }}
                    whileHover={{ scale: 1.1, color: '#38bdf8' } as Record<string, unknown>}
                    transition={{ duration: 0.18 }}
                  >
                    {Icon ? <Icon /> : null}
                  </motion.a>
                )
              })}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] mb-5" style={{ color: 'var(--color-foreground-subtle)' }}>
              Navigation
            </p>
            <nav aria-label="Footer navigation">
              <ul className="flex flex-col gap-3" role="list">
                {navItems.map((item) => (
                  <li key={item.sectionId}>
                    <button
                      onClick={() => go(item.href)}
                      className="text-sm transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
                      style={{ color: 'var(--color-foreground-muted)' }}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] mb-5" style={{ color: 'var(--color-foreground-subtle)' }}>
              Contact
            </p>
            <div className="flex flex-col gap-3">
              <a href={`mailto:${profile.email}`}
                className="text-sm transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
                style={{ color: 'var(--color-foreground-muted)' }}>
                {profile.email}
              </a>
              <p className="text-sm" style={{ color: 'var(--color-foreground-subtle)' }}>{profile.location}</p>
              {profile.availableForWork && (
                <div className="flex items-center gap-2 mt-1">
                  <motion.span
                    className="w-2 h-2 rounded-full bg-emerald-400"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
                    transition={{ repeat: Infinity, duration: 2.2 }}
                    aria-hidden="true"
                  />
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-emerald-400">Available</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(56,189,248,0.06)' }}>
        <div className="container-main py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-[11px]" style={{ color: 'var(--color-foreground-subtle)' }}>
            © {year} {profile.name}. Designed &amp; built with intention.
          </p>
          <div className="flex items-center gap-4">
            <p className="font-mono text-[11px]" style={{ color: 'var(--color-foreground-subtle)' }}>
              Next.js · Tailwind · Framer Motion
            </p>
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Back to top"
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
              style={{ background: 'var(--color-surface)', border: '1px solid rgba(56,189,248,0.12)', color: 'var(--color-foreground-subtle)' }}
              whileHover={{ y: -2, scale: 1.05, color: '#38bdf8' } as Record<string, unknown>}
              transition={{ duration: 0.18 }}
            >
              <ArrowUp size={14} strokeWidth={2} />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  )
}
