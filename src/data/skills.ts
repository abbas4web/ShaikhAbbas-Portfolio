export interface Skill {
  name: string
  level: number // 1–100
}

export interface SkillCategory {
  id: string
  title: string
  skills: Skill[]
}

/**
 * Skill categories and proficiency levels.
 * Replace or extend when connecting to a backend.
 */
export const skillCategories: SkillCategory[] = [
  {
    id: 'ai-ml',
    title: 'AI & Machine Learning',
    skills: [
      { name: 'Large Language Models',   level: 92 },
      { name: 'PyTorch / TensorFlow',    level: 85 },
      { name: 'RAG Systems',             level: 90 },
      { name: 'Computer Vision',         level: 78 },
      { name: 'Prompt Engineering',      level: 95 },
      { name: 'LangChain / LlamaIndex',  level: 88 },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    skills: [
      { name: 'React / Next.js',         level: 93 },
      { name: 'TypeScript',              level: 90 },
      { name: 'Tailwind CSS',            level: 92 },
      { name: 'Framer Motion',           level: 85 },
      { name: 'GSAP',                    level: 78 },
      { name: 'Three.js / WebGL',        level: 65 },
    ],
  },
  {
    id: 'backend',
    title: 'Backend & Infrastructure',
    skills: [
      { name: 'Node.js / Express',       level: 88 },
      { name: 'Python / FastAPI',        level: 90 },
      { name: 'PostgreSQL / Prisma',     level: 84 },
      { name: 'Redis',                   level: 76 },
      { name: 'Docker / Kubernetes',     level: 72 },
      { name: 'AWS / GCP',               level: 75 },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Practices',
    skills: [
      { name: 'Git & GitHub',            level: 95 },
      { name: 'CI/CD Pipelines',         level: 80 },
      { name: 'System Design',           level: 82 },
      { name: 'Technical Writing',       level: 88 },
      { name: 'Agile / Scrum',           level: 85 },
      { name: 'Open Source',             level: 78 },
    ],
  },
]

/** Flat list of notable technologies for icon-grid display */
export const techStack: string[] = [
  'Python', 'TypeScript', 'React', 'Next.js', 'Node.js',
  'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'AWS',
  'PyTorch', 'LangChain', 'OpenAI API', 'Prisma', 'Tailwind CSS',
]
