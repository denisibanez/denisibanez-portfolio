/**
 * Single source of truth for site-wide constants (identity, social links, contact).
 * Update `url` to the real production domain when it's set.
 */
export const site = {
  name: 'Denis Ibañez',
  role: 'AI Engineer & Front-end Architect',
  url: 'https://denisibanez.dev',
  description:
    'AI Engineer and front-end architect building AI-native products and agentic workflows — 14+ years shaping high-traffic UIs in Vue, React and Angular.',
  whatsapp: '351961488375',
  /** Résumé PDF, served from public/ (stable URL, no hashing). */
  resumeUrl: '/denis-ibanez-cv.pdf',
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/denis-ibanez' },
    { label: 'GitHub', href: 'https://github.com/denisibanez' },
    { label: 'Medium', href: 'https://medium.com/@denis.ibanez.gdl' },
    { label: 'Podcast', href: 'https://open.spotify.com/show/0N36kqb9AiTb6nAeL26T1b' },
    { label: 'WhatsApp', href: 'https://wa.me/351961488375' },
  ],
} as const
