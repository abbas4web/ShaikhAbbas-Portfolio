import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-[var(--color-background)]">
      <span className="font-[var(--font-mono)] text-xs uppercase tracking-[0.25em] text-[var(--color-accent)]">
        404
      </span>
      <h1 className="font-[var(--font-display)] text-4xl font-light text-[var(--color-foreground)]">
        Page not found.
      </h1>
      <Link
        href="/"
        className="text-xs uppercase tracking-widest text-[var(--color-foreground-muted)] hover:text-[var(--color-foreground)] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
      >
        ← Back home
      </Link>
    </div>
  )
}
