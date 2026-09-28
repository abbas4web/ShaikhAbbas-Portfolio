'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

/**
 * Initialises Lenis smooth scrolling once on mount.
 * Runs the RAF loop and cleans up on unmount.
 * Renders no DOM — pure side-effect provider.
 */
export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.5,
    })

    // Expose lenis globally so GSAP ScrollTrigger can sync if needed later
    ;(window as unknown as Record<string, unknown>).lenis = lenis

    let rafId: number

    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
