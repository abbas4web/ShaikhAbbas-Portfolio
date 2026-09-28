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

  return (
    <div className={`${centered ? 'text-center' : 'text-left'} ${className}`}>
      {/* Label pill */}
      <motion.div
        className={centered ? 'flex justify-center' : ''}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
      >
        <span className="section-label">
          {index && (
            <span style={{ color: 'rgba(56,189,248,0.55)', fontWeight: 500 }}>{index}</span>
          )}
          {label}
        </span>
      </motion.div>

      {/* Title */}
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.65, delay: 0.07, ease: 'easeOut' }}
      >
        {title}
      </motion.h2>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          className={`section-subtitle ${centered ? 'mx-auto' : ''}`}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, delay: 0.14, ease: 'easeOut' }}
        >
          {subtitle}
        </motion.p>
      )}

      {/* Accent line */}
      <motion.div
        className={centered ? 'mx-auto mt-8' : 'mt-8'}
        style={{
          height: 2,
          width: 56,
          borderRadius: 2,
          background: 'linear-gradient(to right, #38bdf8, #818cf8)',
        }}
        initial={{ scaleX: 0, originX: centered ? 0.5 : 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55, delay: 0.2, ease: 'easeOut' }}
        aria-hidden="true"
      />
    </div>
  )
}
