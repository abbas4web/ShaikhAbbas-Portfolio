'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Cinematic page entrance — a curtain that lifts once on first load.
 * After the reveal, the component unmounts entirely (zero runtime cost).
 */
export default function PageTransition({
  children,
}: {
  children: React.ReactNode
}) {
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    // Slight delay so fonts are loaded before the curtain lifts
    const id = setTimeout(() => setRevealed(true), 120)
    return () => clearTimeout(id)
  }, [])

  return (
    <>
      {/* Curtain overlay */}
      <AnimatePresence>
        {!revealed && (
          <motion.div
            key="curtain"
            className="fixed inset-0 z-[100] bg-[var(--color-background)] flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            aria-hidden="true"
          >
            {/* Animated logo mark during load */}
            <motion.div
              className="flex flex-col items-center gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <span className="w-10 h-10 border border-[var(--color-accent)] flex items-center justify-center">
                <span className="font-[var(--font-mono)] text-xs text-[var(--color-accent)] leading-none">
                  SA
                </span>
              </span>
              {/* Loading bar */}
              <div className="w-20 h-px bg-[var(--color-border)] overflow-hidden">
                <motion.div
                  className="h-full bg-[var(--color-accent)]"
                  initial={{ x: '-100%' }}
                  animate={{ x: '0%' }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page content — fades in after curtain */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: revealed ? 1 : 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
      >
        {children}
      </motion.div>
    </>
  )
}
