/**
 * Single source of truth for site-wide constants (identity, social links, contact).
 * Update `url` to the real production domain when it's set.
 */
export const site = {
  name: 'Denis Ibañez',
  role: 'Software Developer',
  url: 'https://denisibanez.vercel.app',
  description:
    'Front-end developer specialised in Vue, React and Angular, with 14+ years of experience — strong in design systems and prototyping.',
  whatsapp: '351961488375',
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/denisibanez' },
    { label: 'GitHub', href: 'https://github.com/denisibanez' },
    { label: 'Medium', href: '#' },
    { label: 'Podcast', href: 'https://open.spotify.com/show/0N36kqb9AiTb6nAeL26T1b' },
    { label: 'WhatsApp', href: 'https://wa.me/351961488375' },
  ],
} as const
