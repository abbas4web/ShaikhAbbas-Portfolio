/**
 * Server component — static decorative divider.
 */
export default function Divider({ className = '' }: { className?: string }) {
  return (
    <hr
      className={`border-0 border-t border-[var(--color-border)] ${className}`}
      aria-hidden="true"
    />
  )
}
