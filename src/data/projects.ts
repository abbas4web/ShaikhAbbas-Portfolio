export interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  technologies: string[]
  /** Path relative to /public, or an external image URL */
  image: string | null
  githubUrl: string | null
  liveUrl: string | null
  featured: boolean
  displayOrder: number
  category: 'ai' | 'fullstack' | 'tool' | 'experiment'
  year: number
}

/**
 * Portfolio projects.
 * Replace image paths and URLs with real assets.
 * featured: true projects surface first in the Projects section.
 */
export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Nexus — LLM Orchestration Platform',
    description:
      'A production-grade orchestration layer for multi-agent LLM pipelines with real-time streaming, memory management, and observability.',
    longDescription:
      'Nexus abstracts the complexity of chaining multiple LLM calls, tool use, and memory across a distributed architecture. It exposes a clean API surface for building agents that reason, retrieve, and act.',
    technologies: ['Python', 'FastAPI', 'LangChain', 'Redis', 'WebSockets', 'Next.js'],
    image: null,
    githubUrl: 'https://github.com/shaikhabbas/nexus',
    liveUrl: 'https://nexus-demo.vercel.app',
    featured: true,
    displayOrder: 1,
    category: 'ai',
    year: 2024,
  },
  {
    id: 'project-2',
    title: 'Prism — AI Design Feedback Tool',
    description:
      'Upload any UI screenshot and receive structured, actionable design feedback powered by a fine-tuned vision model.',
    longDescription:
      'Prism uses GPT-4 Vision with a custom evaluation rubric to score and critique UI designs across accessibility, hierarchy, and visual consistency. Outputs are structured as exportable reports.',
    technologies: ['Next.js', 'TypeScript', 'OpenAI Vision API', 'Tailwind CSS', 'Vercel AI SDK'],
    image: null,
    githubUrl: 'https://github.com/shaikhabbas/prism',
    liveUrl: null,
    featured: true,
    displayOrder: 2,
    category: 'ai',
    year: 2024,
  },
  {
    id: 'project-3',
    title: 'Folio CMS',
    description:
      'A headless CMS and portfolio management system with a clean admin panel, asset management, and one-click deployment.',
    longDescription:
      'Folio is a batteries-included CMS built specifically for developer portfolios. It exposes a typed REST API consumed by any frontend, with live preview and webhook support.',
    technologies: ['Next.js', 'Prisma', 'PostgreSQL', 'AWS S3', 'TypeScript'],
    image: null,
    githubUrl: 'https://github.com/shaikhabbas/folio-cms',
    liveUrl: null,
    featured: true,
    displayOrder: 3,
    category: 'fullstack',
    year: 2023,
  },
  {
    id: 'project-4',
    title: 'Lens — Real-Time Analytics',
    description:
      'Event-driven analytics dashboard with WebSocket-powered live graphs, funnel analysis, and retention cohorts.',
    technologies: ['React', 'Node.js', 'ClickHouse', 'WebSockets', 'D3.js'],
    image: null,
    githubUrl: 'https://github.com/shaikhabbas/lens',
    liveUrl: null,
    featured: false,
    displayOrder: 4,
    category: 'fullstack',
    year: 2023,
  },
  {
    id: 'project-5',
    title: 'VectorStore CLI',
    description:
      'A developer CLI for managing, querying, and visualising vector embeddings across Pinecone, Qdrant, and pgvector.',
    technologies: ['Python', 'Typer', 'Pinecone', 'Qdrant', 'pgvector'],
    image: null,
    githubUrl: 'https://github.com/shaikhabbas/vectorstore-cli',
    liveUrl: null,
    featured: false,
    displayOrder: 5,
    category: 'tool',
    year: 2024,
  },
]

/** Helper: returns featured projects sorted by displayOrder */
export function getFeaturedProjects(): Project[] {
  return projects
    .filter((p) => p.featured)
    .sort((a, b) => a.displayOrder - b.displayOrder)
}
