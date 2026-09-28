export interface NavItem {
  label: string
  href: string
  /** Section id used for active-state detection (without #) */
  sectionId: string
}

export const navItems: NavItem[] = [
  { label: 'About',      href: '#about',      sectionId: 'about'      },
  { label: 'Skills',     href: '#skills',     sectionId: 'skills'     },
  { label: 'Experience', href: '#experience', sectionId: 'experience' },
  { label: 'Projects',   href: '#projects',   sectionId: 'projects'   },
  { label: 'AI Lab',     href: '#ai-lab',     sectionId: 'ai-lab'     },
  { label: 'Services',   href: '#services',   sectionId: 'services'   },
  { label: 'Contact',    href: '#contact',    sectionId: 'contact'    },
]

export const ctaNav = {
  label: 'Resume',
  href: '#resume',
}
