export interface Service {
  id: string
  title: string
  description: string
  deliverables: string[]
  icon: string // Lucide icon name
  displayOrder: number
}

/**
 * Services offered.
 * Replace with real offerings; icon values map to Lucide React icon names.
 */
export const services: Service[] = [
  {
    id: 'service-1',
    title: 'AI System Design',
    description:
      'End-to-end architecture and implementation of LLM pipelines, RAG systems, and AI agents — built for production scale.',
    deliverables: [
      'System architecture document',
      'Working prototype or MVP',
      'Deployment & monitoring setup',
    ],
    icon: 'Brain',
    displayOrder: 1,
  },
  {
    id: 'service-2',
    title: 'Full-Stack Development',
    description:
      'High-performance web applications from API design to polished UI — with TypeScript, Next.js, and modern backend stacks.',
    deliverables: [
      'Responsive, accessible frontend',
      'Scalable REST or GraphQL API',
      'CI/CD pipeline & cloud deployment',
    ],
    icon: 'Layers',
    displayOrder: 2,
  },
  {
    id: 'service-3',
    title: 'AI Product Consulting',
    description:
      'Strategic advisory for teams embedding AI into their products — covering model selection, evaluation, and responsible deployment.',
    deliverables: [
      'AI readiness assessment',
      'Model & toolchain recommendations',
      'Implementation roadmap',
    ],
    icon: 'Compass',
    displayOrder: 3,
  },
  {
    id: 'service-4',
    title: 'Code Review & Audit',
    description:
      'Deep-dive technical review of existing codebases with actionable feedback on architecture, performance, and security.',
    deliverables: [
      'Detailed audit report',
      'Priority-ranked recommendations',
      'Live review session',
    ],
    icon: 'Search',
    displayOrder: 4,
  },
]
