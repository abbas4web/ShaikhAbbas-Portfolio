'use client'

import { motion } from 'framer-motion'
import { Mail, ArrowUp } from 'lucide-react'
import { profile } from '@/data/profile'
import { navItems } from '@/data/navigation'
import { getFooterLinks } from '@/data/socialLinks'

// ─── Brand SVG icons (lucide-react removed Github/Linkedin/Twitter in v0.5+) ──
function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
    </svg>
  )
}

function LinkedinIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  )
}

function TwitterIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )
}

function MailIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="16" x="2" y="4" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  )
}

const iconMap: Record<string, React.ElementType> = {
  Github: GithubIcon,
  Linkedin: LinkedinIcon,
  Twitter: TwitterIcon,
  Mail: MailIcon,
}

// ─── Back to top ──────────────────────────────────────────────────────────────
function BackToTop() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <motion.button
      onClick={scrollTop}
      aria-label="Back to top"
      className="w-9 h-9 border border-[var(--color-border)] flex items-center justify-center text-[var(--color-foreground-muted)] hover:text-[var(--color-foreground)] hover:border-[var(--color-accent-dim)] transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <ArrowUp size={14} strokeWidth={1.5} />
    </motion.button>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
export default function Footer() {
  const socialLinks = getFooterLinks()
  const year = new Date().getFullYear()

  const handleNavClick = (href: string) => {
    const id = href.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer
      className="border-t border-[var(--color-border)] bg-[var(--color-background)]"
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Main footer */}
      <div className="container-main py-14">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-10 md:gap-16">

          {/* Brand column */}
          <div className="flex flex-col gap-5 max-w-xs">
            <div className="flex items-center gap-3">
              <span
                className="w-7 h-7 border border-[var(--color-accent)] flex items-center justify-center"
                aria-hidden="true"
              >
                <span className="font-[var(--font-mono)] text-[10px] text-[var(--color-accent)] leading-none">
                  SA
                </span>
              </span>
              <span className="font-[var(--font-display)] text-sm text-[var(--color-foreground)]">
                {profile.name}
              </span>
            </div>
            <p className="text-xs text-[var(--color-foreground-subtle)] leading-relaxed">
              AI Engineer & Full-Stack Developer crafting intelligent systems and
              exceptional digital experiences.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((link) => {
                const Icon = iconMap[link.icon]
                return (
                  <a
                    key={link.id}
                    href={link.url}
                    target={link.url.startsWith('mailto') ? undefined : '_blank'}
                    rel={link.url.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                    aria-label={link.label}
                    className="w-8 h-8 border border-[var(--color-border)] flex items-center justify-center text-[var(--color-foreground-subtle)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent-dim)] transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
                  >
                    {Icon ? <Icon size={13} strokeWidth={1.5} /> : null}
                  </a>
                )
              })}
            </div>
          </div>

          {/* Navigation column */}
          <div>
            <p className="font-[var(--font-mono)] text-[9px] uppercase tracking-[0.22em] text-[var(--color-foreground-subtle)] mb-4">
              Navigation
            </p>
            <nav aria-label="Footer navigation">
              <ul className="flex flex-col gap-2.5" role="list">
                {navItems.map((item) => (
                  <li key={item.sectionId}>
                    <button
                      onClick={() => handleNavClick(item.href)}
                      className="text-xs text-[var(--color-foreground-muted)] hover:text-[var(--color-foreground)] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact column */}
          <div>
            <p className="font-[var(--font-mono)] text-[9px] uppercase tracking-[0.22em] text-[var(--color-foreground-subtle)] mb-4">
              Get in touch
            </p>
            <div className="flex flex-col gap-2.5">
              <a
                href={`mailto:${profile.email}`}
                className="text-xs text-[var(--color-foreground-muted)] hover:text-[var(--color-accent)] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
              >
                {profile.email}
              </a>
              <p className="text-xs text-[var(--color-foreground-subtle)]">
                {profile.location}
              </p>
              {profile.availableForWork && (
                <div className="flex items-center gap-1.5 mt-1">
                  <motion.span
                    className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    aria-hidden="true"
                  />
                  <span className="text-[10px] text-emerald-400 font-[var(--font-mono)] uppercase tracking-[0.15em]">
                    Available for work
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--color-border)]">
        <div className="container-main py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[10px] font-[var(--font-mono)] text-[var(--color-foreground-subtle)]">
            © {year} {profile.name}. Designed & built with intention.
          </p>
          <div className="flex items-center gap-4">
            <p className="text-[10px] font-[var(--font-mono)] text-[var(--color-foreground-subtle)]">
              Next.js · Tailwind · Framer Motion
            </p>
            <BackToTop />
          </div>
        </div>
      </div>
    </footer>
  )
}
