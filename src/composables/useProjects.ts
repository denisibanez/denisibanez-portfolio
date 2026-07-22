export type Project = {
  slug: string
  title: string
  category: string
  year: string
  summary: string
  image?: string
  /** External live URL, when the project is published. */
  url?: string
}

// Sample works — swap `image`/`url` in once real project material is ready.
const projects: Project[] = [
  {
    slug: 'aether-watch',
    title: 'Aether Watch Co.',
    category: 'Product UI',
    year: '2024',
    summary:
      'An exploration of horological precision through digital storytelling — heritage craftsmanship meeting a contemporary, fluid digital ecosystem.',
  },
  {
    slug: 'brutalist-villa',
    title: 'Brutalist Villa',
    category: 'Architecture',
    year: '2023',
    summary:
      'An architectural visualization study translating raw concrete forms into an immersive, scroll-driven walkthrough.',
  },
  {
    slug: 'metallic-forms',
    title: 'Metallic Forms',
    category: '3D / Motion',
    year: '2024',
    summary:
      'A motion and 3D exploration of liquid-metal surfaces, rendered in real time and choreographed to sound.',
  },
  {
    slug: 'drive-dashboard',
    title: 'Drive Dashboard',
    category: 'Automotive',
    year: '2023',
    summary:
      'A next-generation automotive HMI concept focused on glanceable clarity and calm, confident interaction.',
  },
  {
    slug: 'titanium-pen',
    title: 'Titanium Pen',
    category: 'Industrial',
    year: '2022',
    summary:
      'An industrial-design microsite pairing macro photography with tactile, weighty micro-interactions.',
  },
  {
    slug: 'nexus-system',
    title: 'Nexus System',
    category: 'Design System',
    year: '2024',
    summary:
      'A cross-platform design system unifying tokens, components and documentation into one living source of truth.',
  },
]

/** Shared access to the project list plus lookup/adjacency helpers. */
export const useProjects = () => {
  const getBySlug = (slug: string): Project | null => projects.find((p) => p.slug === slug) ?? null

  const getAdjacent = (slug: string): { prev: Project | null; next: Project | null } => {
    const index = projects.findIndex((p) => p.slug === slug)
    if (index === -1) return { prev: null, next: null }
    const prev = projects[(index - 1 + projects.length) % projects.length] ?? null
    const next = projects[(index + 1) % projects.length] ?? null
    return { prev, next }
  }

  return { projects, getBySlug, getAdjacent }
}
