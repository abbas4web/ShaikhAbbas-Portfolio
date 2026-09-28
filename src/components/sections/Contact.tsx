'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Mail, MapPin, CheckCircle } from 'lucide-react'
import { profile } from '@/data/profile'
import SectionHeading from '@/components/ui/SectionHeading'
import ScrollReveal from '@/components/ui/ScrollReveal'

function Field({ id, label, type = 'text', placeholder, required, value, onChange, multiline, rows = 6 }: {
  id: string; label: string; type?: string; placeholder?: string; required?: boolean
  value: string; onChange: (v: string) => void; multiline?: boolean; rows?: number
}) {
  const [focused, setFocused] = useState(false)
  const fieldStyle: React.CSSProperties = {
    width: '100%', background: 'rgba(12,21,38,0.6)',
    border: focused ? '1px solid rgba(56,189,248,0.55)' : '1px solid rgba(56,189,248,0.15)',
    borderRadius: '0.75rem', padding: '0.875rem 1rem',
    fontSize: '0.875rem', color: 'var(--color-foreground)',
    outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s',
    boxShadow: focused ? '0 0 18px rgba(56,189,248,0.08)' : 'none',
    fontFamily: 'inherit',
  }
  const shared = { id, name: id, placeholder, required, value, 'aria-required': required,
    style: fieldStyle, onFocus: () => setFocused(true), onBlur: () => setFocused(false) }

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--color-foreground-muted)' }}>
        {label}{required && <span style={{ color: 'var(--color-accent)' }} aria-hidden="true"> *</span>}
      </label>
      {multiline
        ? <textarea {...shared} rows={rows} onChange={(e) => onChange(e.target.value)} style={{ ...fieldStyle, resize: 'none' }} />
        : <input {...shared} type={type} onChange={(e) => onChange(e.target.value)} />
      }
    </div>
  )
}

export default function Contact() {
  const [name, setName] = useState(''); const [email, setEmail] = useState('')
  const [subject, setSubject] = useState(''); const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false); const [sending, setSending] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formRef.current?.checkValidity()) return
    setSending(true)
    await new Promise((r) => setTimeout(r, 1000))
    setSending(false); setSubmitted(true)
  }

  return (
    <section id="contact" className="section-padding relative overflow-hidden" style={{ background: 'var(--color-surface)' }} aria-label="Contact">
      <div className="section-divider absolute top-0 left-0 right-0" aria-hidden="true" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 65% 45% at 50% 0%, rgba(56,189,248,0.04) 0%, transparent 70%)' }} aria-hidden="true" />
      <div className="container-main relative z-10">
        <SectionHeading index="08" label="Contact" title="Let's build something."
          subtitle="Have a project, an opportunity, or just want to say hello? My inbox is open." className="mb-16" />
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 xl:gap-20 items-start">
          {/* Form */}
          <ScrollReveal>
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div key="ok" className="flex flex-col items-center justify-center text-center gap-5 py-20"
                  initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
                  <motion.div animate={{ rotate: [0, 12, -12, 0] }} transition={{ delay: 0.3, duration: 0.5 }}>
                    <CheckCircle size={52} strokeWidth={1} style={{ color: 'var(--color-accent)' }} />
                  </motion.div>
                  <p className="text-3xl font-bold" style={{ color: 'var(--color-foreground)' }}>Message sent.</p>
                  <p className="text-sm" style={{ color: 'var(--color-foreground-muted)' }}>I&apos;ll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <motion.form key="form" ref={formRef} onSubmit={handleSubmit}
                  className="flex flex-col gap-5" noValidate aria-label="Contact form"
                  exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field id="name" label="Name" placeholder="Your name" required value={name} onChange={setName} />
                    <Field id="email" label="Email" type="email" placeholder="your@email.com" required value={email} onChange={setEmail} />
                  </div>
                  <Field id="subject" label="Subject" placeholder="What's this about?" value={subject} onChange={setSubject} />
                  <Field id="message" label="Message" placeholder="Tell me about your project or idea..." required value={message} onChange={setMessage} multiline />
                  <div className="flex items-center justify-between gap-4 pt-1">
                    <p className="text-[10px]" style={{ color: 'var(--color-foreground-subtle)' }}>* Required</p>
                    <motion.button type="submit" disabled={sending}
                      className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
                      style={{ background: 'linear-gradient(135deg,#38bdf8,#818cf8)', color: '#020408' }}
                      whileHover={!sending ? { scale: 1.03, boxShadow: '0 0 28px rgba(56,189,248,0.28)' } : {}}
                      whileTap={!sending ? { scale: 0.97 } : {}} transition={{ duration: 0.2 }}>
                      {sending ? 'Sending…' : <><Send size={14} strokeWidth={2.5} /> Send message</>}
                    </motion.button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </ScrollReveal>

          {/* Sidebar */}
          <div className="flex flex-col gap-4">
            <ScrollReveal delay={0.1}>
              <div className="rounded-2xl p-6 flex flex-col gap-5" style={{ background: 'var(--color-surface-2)', border: '1px solid rgba(56,189,248,0.1)' }}>
                <p className="font-mono text-[9px] uppercase tracking-[0.22em]" style={{ color: 'var(--color-foreground-subtle)' }}>Direct contact</p>
                {[{ Icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
                  { Icon: MapPin, label: 'Location', value: profile.location, href: undefined }].map(({ Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.2)' }}>
                      <Icon size={14} strokeWidth={1.5} style={{ color: 'var(--color-accent)' }} />
                    </div>
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.2em] mb-0.5" style={{ color: 'var(--color-foreground-subtle)' }}>{label}</p>
                      {href
                        ? <a href={href} className="text-sm hover:underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]" style={{ color: 'var(--color-foreground-muted)' }}>{value}</a>
                        : <p className="text-sm" style={{ color: 'var(--color-foreground-muted)' }}>{value}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div className="rounded-2xl p-6" style={{ background: 'var(--color-surface-2)', border: '1px solid rgba(56,189,248,0.1)' }}>
                <p className="font-mono text-[9px] uppercase tracking-[0.22em] mb-3" style={{ color: 'var(--color-foreground-subtle)' }}>Response time</p>
                <div className="flex items-center gap-3">
                  <motion.span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 2.2 }} aria-hidden="true" />
                  <p className="text-sm" style={{ color: 'var(--color-foreground-muted)' }}>Within 24 hours on weekdays</p>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="rounded-2xl p-6" style={{ background: 'var(--color-surface-2)', border: '1px solid rgba(56,189,248,0.1)' }}>
                <p className="font-mono text-[9px] uppercase tracking-[0.22em] mb-3" style={{ color: 'var(--color-foreground-subtle)' }}>Good for</p>
                <ul className="flex flex-col gap-2.5" role="list">
                  {['AI / ML project scoping', 'Full-stack development', 'Technical consulting', 'Freelance & contract work', 'Speaking & mentoring'].map((item) => (
                    <li key={item} className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(135deg,#38bdf8,#818cf8)' }} aria-hidden="true" />
                      <span className="text-sm" style={{ color: 'var(--color-foreground-muted)' }}>{item}</span>
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
