'use client'

import { motion } from 'framer-motion'
import { type ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  delay?: number
  className?: string
  yOffset?: number
}

export default function ScrollReveal({
  children,
  delay = 0,
  className = '',
  yOffset = 28,
}: ScrollRevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.75,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
