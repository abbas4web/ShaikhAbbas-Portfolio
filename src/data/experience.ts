export interface ExperienceItem {
  id: string
  role: string
  company: string
  companyUrl?: string
  location: string
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Freelance'
  startDate: string
  endDate: string | null // null = present
  description: string
  achievements: string[]
  technologies: string[]
}

/**
 * Professional experience data.
 * Replace with real data; shape is designed to map cleanly from a REST/GraphQL API.
 */
export const experiences: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Senior AI Engineer',
    company: 'TechCorp AI',
    companyUrl: 'https://example.com',
    location: 'Remote',
    type: 'Full-time',
    startDate: '2023-01',
    endDate: null,
    description:
      'Leading the design and deployment of production LLM systems, RAG pipelines, and AI-powered product features serving 100k+ users.',
    achievements: [
      'Reduced LLM inference latency by 40% through async batching and caching strategies.',
      'Built a multimodal document analysis pipeline processing 50k+ documents monthly.',
      'Established internal AI tooling standards adopted across 4 engineering teams.',
    ],
    technologies: ['Python', 'FastAPI', 'LangChain', 'OpenAI API', 'PostgreSQL', 'AWS'],
  },
  {
    id: 'exp-2',
    role: 'Full-Stack Developer',
    company: 'Freelance / Contract',
    location: 'Remote',
    type: 'Freelance',
    startDate: '2021-06',
    endDate: '2022-12',
    description:
      'Delivered end-to-end web applications for clients across SaaS, e-commerce, and AI tooling domains.',
    achievements: [
      'Shipped 8 production Next.js applications on time and within budget.',
      'Integrated OpenAI and custom ML APIs into client products, driving measurable engagement uplift.',
      'Built a real-time analytics dashboard handling 1M+ daily events.',
    ],
    technologies: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Tailwind CSS', 'Vercel'],
  },
  {
    id: 'exp-3',
    role: 'Software Engineer',
    company: 'Startup Studio',
    companyUrl: 'https://example.com',
    location: 'Hybrid',
    type: 'Full-time',
    startDate: '2019-09',
    endDate: '2021-05',
    description:
      'Early engineer at a 0→1 startup building SaaS tools for the creator economy.',
    achievements: [
      'Co-architected the core product from scratch, reaching 10k MAU in the first year.',
      'Implemented search and recommendation features using vector similarity techniques.',
      'Mentored two junior engineers and introduced code review practices.',
    ],
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Redis', 'Docker'],
  },
]
