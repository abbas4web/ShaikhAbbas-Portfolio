'use client'

import { motion } from 'framer-motion'

interface SectionHeadingProps {
  index?: string
  label: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
}

export default function SectionHeading({
  index,
  label,
  title,
  subtitle,
  align = 'left',
  className = '',
}: SectionHeadingProps) {
  const centered = align === 'center'

  const item = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      className={`${centered ? 'text-center' : 'text-left'} ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ staggerChildren: 0.12 }}
    >
      {/* Label row */}
      <motion.div
        variants={item}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className={`flex items-center gap-3 mb-4 ${centered ? 'justify-center' : ''}`}
      >
        {index && (
          <span
            className="font-[var(--font-mono)] text-xs text-[var(--color-accent)] tracking-[0.2em]"
            aria-hidden="true"
          >
            {index}
          </span>
        )}
        {index && (
          <span
            className="block w-8 h-px bg-[var(--color-accent)] opacity-60"
            aria-hidden="true"
          />
        )}
        <span className="font-[var(--font-sans)] text-xs uppercase tracking-[0.25em] text-[var(--color-foreground-muted)]">
          {label}
        </span>
      </motion.div>

      {/* Main title */}
      <motion.h2
        variants={item}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="font-[var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-light text-[var(--color-foreground)] leading-[1.05] mb-0"
      >
        {title}
      </motion.h2>

      {/* Optional subtitle */}
      {subtitle && (
        <motion.p
          variants={item}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className={`mt-5 text-base text-[var(--color-foreground-muted)] leading-relaxed max-w-xl ${centered ? 'mx-auto' : ''}`}
        >
          {subtitle}
        </motion.p>
      )}

      {/* Decorative rule */}
      <motion.div
        variants={item}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className={`mt-8 h-px bg-[var(--color-border)] ${centered ? 'mx-auto max-w-xs' : 'max-w-xs'}`}
        aria-hidden="true"
      />
    </motion.div>
  )
}
