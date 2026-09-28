'use client'

import { motion, type Variants } from 'framer-motion'
import { type ReactNode } from 'react'

type AnimatedTextVariant = 'fadeUp' | 'fadeIn' | 'slideLeft' | 'reveal'

interface AnimatedTextProps {
  children: ReactNode
  variant?: AnimatedTextVariant
  delay?: number
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div'
  once?: boolean
}

const variants: Record<AnimatedTextVariant, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  },
  reveal: {
    hidden: { opacity: 0, y: 16, filter: 'blur(4px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
  },
}

export default function AnimatedText({
  children,
  variant = 'fadeUp',
  delay = 0,
  className = '',
  as: Tag = 'div',
  once = true,
}: AnimatedTextProps) {
  const MotionTag = motion[Tag]

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-60px' }}
      variants={variants[variant]}
      transition={{
        duration: 0.75,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </MotionTag>
  )
}
