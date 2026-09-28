export interface SocialLink {
  id: string
  label: string
  url: string
  icon: string // Lucide icon name
  username?: string
  displayInFooter: boolean
  displayInHero: boolean
}

/**
 * Social and contact links.
 * Replace URLs and usernames with real values.
 */
export const socialLinks: SocialLink[] = [
  {
    id: 'github',
    label: 'GitHub',
    url: 'https://github.com/shaikhabbas',
    icon: 'Github',
    username: 'shaikhabbas',
    displayInFooter: true,
    displayInHero: true,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    url: 'https://linkedin.com/in/shaikhabbas',
    icon: 'Linkedin',
    username: 'shaikhabbas',
    displayInFooter: true,
    displayInHero: true,
  },
  {
    id: 'twitter',
    label: 'X (Twitter)',
    url: 'https://twitter.com/shaikhabbas',
    icon: 'Twitter',
    username: '@shaikhabbas',
    displayInFooter: true,
    displayInHero: false,
  },
  {
    id: 'email',
    label: 'Email',
    url: 'mailto:hello@shaikhabbas.dev',
    icon: 'Mail',
    displayInFooter: true,
    displayInHero: false,
  },
]

/** Convenience: footer links only */
export function getFooterLinks(): SocialLink[] {
  return socialLinks.filter((l) => l.displayInFooter)
}

/** Convenience: hero links only */
export function getHeroLinks(): SocialLink[] {
  return socialLinks.filter((l) => l.displayInHero)
}
