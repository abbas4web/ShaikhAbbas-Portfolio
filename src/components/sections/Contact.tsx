'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Mail, MapPin, CheckCircle } from 'lucide-react'
import { profile } from '@/data/profile'
import SectionHeading from '@/components/ui/SectionHeading'
import ScrollReveal from '@/components/ui/ScrollReveal'
import Button from '@/components/ui/Button'

// ─── Field ────────────────────────────────────────────────────────────────────
interface FieldProps {
  id: string
  label: string
  type?: string
  placeholder?: string
  required?: boolean
  value: string
  onChange: (v: string) => void
  multiline?: boolean
  rows?: number
}

function Field({
  id,
  label,
  type = 'text',
  placeholder,
  required,
  value,
  onChange,
  multiline,
  rows = 5,
}: FieldProps) {
  const [focused, setFocused] = useState(false)

  const baseClass = `
    w-full bg-transparent border px-4 py-3 text-sm
    text-[var(--color-foreground)] placeholder:text-[var(--color-foreground-subtle)]
    outline-none transition-colors duration-200
    ${focused
      ? 'border-[var(--color-accent)]'
      : 'border-[var(--color-border)] hover:border-[var(--color-foreground-subtle)]'}
    focus-visible:ring-0
  `

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-[var(--color-foreground-muted)]"
      >
        {label}
        {required && (
          <span className="text-[var(--color-accent)] ml-1" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {multiline ? (
        <textarea
          id={id}
          name={id}
          rows={rows}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`${baseClass} resize-none`}
          aria-required={required}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={baseClass}
          aria-required={required}
        />
      )}
    </div>
  )
}

// ─── Contact info item ────────────────────────────────────────────────────────
function ContactInfo({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ElementType
  label: string
  value: string
  href?: string
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-8 h-8 border border-[var(--color-border)] flex items-center justify-center flex-shrink-0 mt-0.5">
        <Icon size={13} strokeWidth={1.5} className="text-[var(--color-accent)]" />
      </div>
      <div>
        <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-[var(--color-foreground-subtle)] mb-0.5">
          {label}
        </p>
        {href ? (
          <a
            href={href}
            className="text-sm text-[var(--color-foreground-muted)] hover:text-[var(--color-accent)] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
          >
            {value}
          </a>
        ) : (
          <p className="text-sm text-[var(--color-foreground-muted)]">{value}</p>
        )}
      </div>
    </div>
  )
}

// ─── Success state ────────────────────────────────────────────────────────────
function SuccessMessage() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center text-center gap-4 py-12"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <CheckCircle size={40} strokeWidth={1} className="text-[var(--color-accent)]" />
      <div>
        <p className="font-[var(--font-display)] text-2xl font-light text-[var(--color-foreground)] mb-2">
          Message sent.
        </p>
        <p className="text-sm text-[var(--color-foreground-muted)]">
          I&apos;ll get back to you within 24 hours.
        </p>
      </div>
    </motion.div>
  )
}

// ─── Contact ──────────────────────────────────────────────────────────────────
export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formRef.current?.checkValidity()) return
    setSending(true)
    // Simulated send delay — replace with real API call when backend is ready
    await new Promise((r) => setTimeout(r, 1000))
    setSending(false)
    setSubmitted(true)
  }

  return (
    <section
      id="contact"
      className="section-padding bg-[var(--color-surface)] border-t border-[var(--color-border)]"
      aria-label="Contact"
    >
      <div className="container-main">
        <SectionHeading
          index="08"
          label="Contact"
          title="Let's build something."
          subtitle="Have a project, an opportunity, or just want to say hello? My inbox is open."
          className="mb-16"
        />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 xl:gap-20 items-start">

          {/* Form */}
          <ScrollReveal>
            <AnimatePresence mode="wait">
              {submitted ? (
                <SuccessMessage key="success" />
              ) : (
                <motion.form
                  key="form"
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5"
                  noValidate
                  aria-label="Contact form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field
                      id="name"
                      label="Name"
                      placeholder="Your name"
                      required
                      value={name}
                      onChange={setName}
                    />
                    <Field
                      id="email"
                      label="Email"
                      type="email"
                      placeholder="your@email.com"
                      required
                      value={email}
                      onChange={setEmail}
                    />
                  </div>
                  <Field
                    id="subject"
                    label="Subject"
                    placeholder="What's this about?"
                    value={subject}
                    onChange={setSubject}
                  />
                  <Field
                    id="message"
                    label="Message"
                    placeholder="Tell me about your project, idea, or question..."
                    required
                    value={message}
                    onChange={setMessage}
                    multiline
                    rows={6}
                  />

                  <div className="flex items-center justify-between gap-4 pt-1">
                    <p className="text-[10px] text-[var(--color-foreground-subtle)]">
                      * Required fields
                    </p>
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={sending}
                      icon={<Send size={13} strokeWidth={1.5} />}
                      ariaLabel="Send message"
                    >
                      {sending ? 'Sending…' : 'Send message'}
                    </Button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </ScrollReveal>

          {/* Contact info sidebar */}
          <div className="flex flex-col gap-8">
            <ScrollReveal delay={0.1}>
              <div className="border border-[var(--color-border)] p-6 flex flex-col gap-6">
                <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-[var(--color-foreground-subtle)]">
                  Direct contact
                </p>
                <ContactInfo
                  icon={Mail}
                  label="Email"
                  value={profile.email}
                  href={`mailto:${profile.email}`}
                />
                <ContactInfo
                  icon={MapPin}
                  label="Location"
                  value={profile.location}
                />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="border border-[var(--color-border)] p-6">
                <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-[var(--color-foreground-subtle)] mb-4">
                  Typical response time
                </p>
                <div className="flex items-center gap-3">
                  <motion.span
                    className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    aria-hidden="true"
                  />
                  <p className="text-sm text-[var(--color-foreground-muted)]">
                    Within 24 hours on weekdays
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="border border-[var(--color-border)] p-6">
                <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-[var(--color-foreground-subtle)] mb-3">
                  Good for
                </p>
                <ul className="flex flex-col gap-2" role="list">
                  {[
                    'AI / ML project scoping',
                    'Full-stack development',
                    'Technical consulting',
                    'Freelance & contract work',
                    'Speaking & mentoring',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span
                        className="w-1 h-1 rounded-full bg-[var(--color-accent)] flex-shrink-0"
                        aria-hidden="true"
                      />
                      <span className="text-xs text-[var(--color-foreground-muted)]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
