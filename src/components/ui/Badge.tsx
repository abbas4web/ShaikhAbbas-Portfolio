import { type ReactNode } from 'react'

type BadgeVariant = 'default' | 'accent' | 'outline' | 'subtle'

interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  className?: string
}

const variantStyles: Record<BadgeVariant, string> = {
  default:
    'bg-[var(--color-surface-2)] text-[var(--color-foreground-muted)] border border-[var(--color-border)]',
  accent:
    'bg-[var(--color-accent-subtle)] text-[var(--color-accent)] border border-[var(--color-accent-dim)]',
  outline:
    'bg-transparent text-[var(--color-foreground-muted)] border border-[var(--color-border)]',
  subtle:
    'bg-[var(--color-surface)] text-[var(--color-foreground-subtle)] border border-transparent',
}

/**
 * Server component — no interactivity needed.
 */
export default function Badge({
  children,
  variant = 'default',
  className = '',
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center
        px-2.5 py-0.5
        text-[10px] uppercase tracking-[0.15em]
        font-[var(--font-sans)] font-medium
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  )
}
