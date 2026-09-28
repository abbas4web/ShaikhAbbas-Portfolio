import { type ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  className?: string
  as?: keyof React.JSX.IntrinsicElements
  id?: string
}

/**
 * Server component — no animation, safe to use everywhere.
 * Wraps content in the standard max-width container.
 */
export default function Container({
  children,
  className = '',
  as: Tag = 'div',
  id,
}: ContainerProps) {
  const Comp = Tag as React.ElementType
  return (
    <Comp id={id} className={`container-main ${className}`}>
      {children}
    </Comp>
  )
}
