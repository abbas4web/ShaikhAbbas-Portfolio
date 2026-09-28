export interface Profile {
  name: string
  firstName: string
  lastName: string
  title: string
  tagline: string
  bio: string
  bioExtended: string
  location: string
  email: string
  availableForWork: boolean
  primaryCTA: { label: string; href: string }
  secondaryCTA: { label: string; href: string }
}

/**
 * Replace these values with your real data.
 * When a backend is added, this shape can be fetched from the API
 * and passed directly — component props remain unchanged.
 */
export const profile: Profile = {
  name: 'Shaikh Abbas',
  firstName: 'Shaikh',
  lastName: 'Abbas',
  title: 'AI Engineer & Full-Stack Developer',
  tagline: 'Building intelligent systems that think, and interfaces that feel.',
  bio: 'I design and engineer AI-driven products at the intersection of machine intelligence and human experience — from model training pipelines to pixel-perfect UIs.',
  bioExtended:
    "With a foundation in software engineering and a specialisation in applied AI, I've shipped production systems across LLM tooling, computer vision, and full-stack web applications. I care deeply about craft, performance, and the details that separate good from remarkable.",
  location: 'Remote — Available Worldwide',
  email: 'hello@shaikhabbas.dev',
  availableForWork: true,
  primaryCTA: { label: 'View Projects', href: '#projects' },
  secondaryCTA: { label: 'Get in Touch', href: '#contact' },
}
