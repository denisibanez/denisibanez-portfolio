import type { Project } from '@/types/project'

// Sample works — swap real content/`image`/`url`/`repoUrl` in when ready.
const projects: Project[] = [
  {
    slug: 'aether-watch',
    title: 'Aether Watch Co.',
    category: 'Product UI',
    kind: 'client',
    startDate: '2024-02',
    endDate: '2024-09',
    summary:
      'An exploration of horological precision through digital storytelling — heritage craftsmanship meeting a contemporary, fluid digital ecosystem.',
    overview: [
      'A digital flagship for a heritage watchmaker, built around the synthesis of technical precision and quiet, tactile luxury. The experience scales from a single hero configurator to a full localised storefront without ever feeling heavy.',
      'A bespoke motion system links scroll, cursor and 3D state so the timepiece feels physically present. Every transition was tuned for calm confidence rather than spectacle.',
    ],
    features: [
      'Real-time 3D watch configurator with optimised WebGL pipelines.',
      'Scroll-linked motion choreography built on a reusable timeline system.',
      'Localised storefront across six markets with per-region pricing.',
    ],
    industry: 'Product Design',
    techStack: ['Vue 3', 'Three.js', 'GSAP', 'TypeScript', 'Vite'],
    role: 'Lead Front-end & Motion',
    collaborators: 'Studio Aion (3D), M. Rocha (Copy)',
  },
  {
    slug: 'brutalist-villa',
    title: 'Brutalist Villa',
    category: 'Architecture',
    kind: 'study',
    startDate: '2023-03',
    endDate: '2023-08',
    repoUrl: 'https://github.com/denisibanez/brutalist-villa',
    summary:
      'An architectural visualization study translating raw concrete forms into an immersive, scroll-driven walkthrough.',
    overview: [
      'An architectural visualization study that turns a single brutalist residence into a cinematic, scroll-driven walkthrough. The narrative moves the visitor room by room while keeping the raw materiality front and centre.',
      'A restrained interface lets the renders breathe: type, light and pacing do the work, with interaction reduced to a single continuous gesture.',
    ],
    features: [
      'Scroll-choreographed camera path through the full residence.',
      'Lazy-loaded high-resolution renders with graceful blur-up.',
      'Reduced-motion fallback that preserves the full narrative.',
    ],
    industry: 'Architecture Viz',
    techStack: ['Nuxt', 'GSAP', 'Lenis', 'TypeScript', 'Cloudinary'],
    role: 'Design & Front-end',
    collaborators: 'Atelier Nord (Renders)',
  },
  {
    slug: 'metallic-forms',
    title: 'Metallic Forms',
    category: '3D / Motion',
    kind: 'study',
    startDate: '2024-05',
    endDate: '2024-08',
    repoUrl: 'https://github.com/denisibanez/metallic-forms',
    summary: 'A motion and 3D exploration of liquid-metal surfaces, rendered in real time and choreographed to sound.',
    overview: [
      'A real-time exploration of liquid-metal surfaces where geometry reacts to audio input. Built as an experiment in coupling shader work with a clean, controllable UI.',
      'The piece balances raw GPU experimentation with a disciplined design system so the controls never compete with the visuals.',
    ],
    features: [
      'Custom raymarched metal shaders reacting to live audio.',
      'Deterministic, shareable presets encoded in the URL.',
      'Adaptive quality scaling to hold 60fps across devices.',
    ],
    industry: 'Interactive / R&D',
    techStack: ['Three.js', 'GLSL', 'Web Audio', 'TypeScript'],
    role: 'Creative Development',
    collaborators: 'Solo project',
  },
  {
    slug: 'drive-dashboard',
    title: 'Drive Dashboard',
    category: 'Automotive',
    kind: 'client',
    startDate: '2023-01',
    endDate: '2023-10',
    summary: 'A next-generation automotive HMI concept focused on glanceable clarity and calm, confident interaction.',
    overview: [
      'A next-generation automotive HMI concept built around glanceable clarity. The system prioritises the driver’s attention budget, surfacing only what matters at each moment.',
      'A strict, high-contrast design language keeps the interface legible in every lighting condition, from tunnel to full sun.',
    ],
    features: [
      'Context-aware layout that adapts to speed and driving mode.',
      'High-contrast, sunlight-legible component library.',
      'Prototyped on real touch-target and reachability constraints.',
    ],
    industry: 'Automotive HMI',
    techStack: ['React', 'TypeScript', 'Framer Motion', 'Figma'],
    role: 'Lead Product Designer',
    collaborators: 'OEM Innovation Lab',
  },
  {
    slug: 'titanium-pen',
    title: 'Titanium Pen',
    category: 'Industrial',
    kind: 'study',
    status: 'draft',
    startDate: '2022-09',
    endDate: '2022-11',
    repoUrl: 'https://github.com/denisibanez/titanium-pen',
    summary: 'An industrial-design microsite pairing macro photography with tactile, weighty micro-interactions.',
    overview: [
      'An industrial-design microsite for a machined titanium pen, pairing macro photography with weighty, tactile micro-interactions. Every detail reinforces the object’s precision.',
      'The layout is deliberately spare so the product photography — and the sound of the interactions — carries the story.',
    ],
    features: [
      'Macro photography gallery with pixel-precise crops.',
      'Weighty, spring-based micro-interactions throughout.',
      'Sub-second loads via aggressive image optimisation.',
    ],
    industry: 'Industrial Design',
    techStack: ['Astro', 'GSAP', 'TypeScript', 'Sharp'],
    role: 'Design & Front-end',
    collaborators: 'K. Lindqvist (Photography)',
  },
  {
    slug: 'nexus-system',
    title: 'Nexus System',
    category: 'Design System',
    kind: 'client',
    startDate: '2024-01',
    endDate: '2024-12',
    summary: 'A cross-platform design system unifying tokens, components and documentation into one living source of truth.',
    overview: [
      'A cross-platform design system that unifies tokens, components and documentation into a single living source of truth. It replaced a fragmented component landscape across four product teams.',
      'The system is engineered for adoption: typed APIs, first-class accessibility and documentation that stays in sync with the code.',
    ],
    features: [
      'Token pipeline generating themes for web and native.',
      'Accessible, typed components with automated visual tests.',
      'Living documentation generated from the source of truth.',
    ],
    industry: 'Design Systems',
    techStack: ['Vue 3', 'Storybook', 'Style Dictionary', 'TypeScript', 'Playwright'],
    role: 'Design Systems Lead',
    collaborators: 'Platform Guild',
  },
]

const isPublished = (project: Project): boolean => project.status !== 'draft'

// Newest first: by end date, then start date (both `YYYY-MM`, so string-sortable).
const byDateDesc = (a: Project, b: Project): number =>
  b.endDate.localeCompare(a.endDate) || b.startDate.localeCompare(a.startDate)

/**
 * Shared access to the project list plus lookup/adjacency helpers.
 * Everything is scoped to PUBLISHED projects, ordered newest-first — drafts
 * are hidden from the list and are not resolvable by slug (their pages 404).
 */
export const useProjects = () => {
  const published = projects.filter(isPublished).sort(byDateDesc)

  const getBySlug = (slug: string): Project | null => published.find((p) => p.slug === slug) ?? null

  const getAdjacent = (slug: string): { prev: Project | null; next: Project | null } => {
    const index = published.findIndex((p) => p.slug === slug)
    if (index === -1) return { prev: null, next: null }
    const prev = published[(index - 1 + published.length) % published.length] ?? null
    const next = published[(index + 1) % published.length] ?? null
    return { prev, next }
  }

  return { projects: published, getBySlug, getAdjacent }
}
