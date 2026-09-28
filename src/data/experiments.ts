export interface Experiment {
  id: string
  title: string
  description: string
  status: 'live' | 'wip' | 'archived'
  tags: string[]
  url: string | null
  githubUrl: string | null
  displayOrder: number
}

/**
 * AI experiments and side projects.
 * These are smaller, exploratory builds that live in the AI Lab section.
 */
export const experiments: Experiment[] = [
  {
    id: 'exp-1',
    title: 'Semantic Code Search',
    description:
      'Embed an entire codebase and perform natural-language search over functions, classes, and comments using cosine similarity.',
    status: 'live',
    tags: ['Embeddings', 'Python', 'pgvector', 'FastAPI'],
    url: 'https://code-search-demo.vercel.app',
    githubUrl: 'https://github.com/shaikhabbas/semantic-code-search',
    displayOrder: 1,
  },
  {
    id: 'exp-2',
    title: 'Auto-Podcast from Papers',
    description:
      'Drop any arXiv PDF. An AI pipeline extracts key findings, generates a dialogue script, and synthesises a 5-minute podcast episode.',
    status: 'live',
    tags: ['LLM', 'TTS', 'Python', 'LangChain'],
    url: null,
    githubUrl: 'https://github.com/shaikhabbas/paper-to-podcast',
    displayOrder: 2,
  },
  {
    id: 'exp-3',
    title: 'Visual Diff for UI Screenshots',
    description:
      'Compare two screenshots with a pixel-diff overlay and an AI-generated change summary describing what visually changed and why it matters.',
    status: 'wip',
    tags: ['Computer Vision', 'OpenAI Vision', 'Next.js'],
    url: null,
    githubUrl: null,
    displayOrder: 3,
  },
  {
    id: 'exp-4',
    title: 'Local LLM Benchmark Runner',
    description:
      'A CLI tool that systematically benchmarks any Ollama-compatible model against a configurable suite of prompts and scoring rubrics.',
    status: 'live',
    tags: ['Ollama', 'Python', 'Evaluation', 'CLI'],
    url: null,
    githubUrl: 'https://github.com/shaikhabbas/llm-bench',
    displayOrder: 4,
  },
]
