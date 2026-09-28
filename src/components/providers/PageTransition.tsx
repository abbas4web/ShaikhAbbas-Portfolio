'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => setRevealed(true), 100)
    return () => clearTimeout(id)
  }, [])

  return (
    <>
      <AnimatePresence>
        {!revealed && (
          <motion.div
            key="curtain"
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{ background: '#020408' }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            aria-hidden="true"
          >
            <motion.div
              className="flex flex-col items-center gap-4"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
            >
              {/* Animated logo */}
              <motion.div
                className="w-12 h-12 rounded-full flex items-center justify-center text-xs font-bold font-mono text-[#020408]"
                style={{ background: 'linear-gradient(135deg, #38bdf8, #818cf8)' }}
                animate={{ rotate: [0, 180, 360], scale: [1, 1.1, 1] }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
              >
                SA
              </motion.div>
              {/* Progress bar */}
              <div className="w-24 h-0.5 rounded-full overflow-hidden" style={{ background: 'rgba(56,189,248,0.15)' }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #38bdf8, #818cf8)' }}
                  initial={{ x: '-100%' }}
                  animate={{ x: '0%' }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: revealed ? 1 : 0 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.05 }}
      >
        {children}
      </motion.div>
    </>
  )
}
