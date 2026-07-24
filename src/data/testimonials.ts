import type { Testimonial } from '@/types/testimonial'

// Real testimonials. Portraits live in public/testimonials/ (see the README
// there); a missing photo degrades gracefully to the person's initials.
export const testimonials: Testimonial[] = [
  {
    quote: 'Profissional de elevado padrão, tanto de codificação quanto de análise.',
    full: 'Profissional de elevado padrão, tanto de codificação quanto de análise.',
    name: 'Nilson Rodrigo Carraro',
    role: 'Tech Lead, Dock Tech',
    photo: '/testimonials/nilson-carraro.jpg',
  },
  {
    quote:
      'Denis é um programador bastante estruturado e disciplinado, tem excelente comunicação com a equipa, tem motivação e iniciativa, tem grande conhecimento técnico e de negócio, e entrega código com grande qualidade.',
    full: 'Denis é um programador bastante estruturado e disciplinado, tem excelente comunicação com a equipa, tem motivação e iniciativa, tem grande conhecimento técnico e de negócio, é capaz de entregar código com grande qualidade, no qual é evidente a sua experiência, dedicação e esforço.\n\nDenis trabalha muito bem em equipa, reconhece o esforço dos colegas e incentiva-os a dar o seu melhor, tem boa capacidade de liderança e provou várias vezes ser um bom mentor, capaz de explicar conceitos complexos facilmente.',
    name: 'João Lucas',
    role: 'Full Stack Developer, Bentley Systems',
    photo: '/testimonials/joao-lucas.jpg',
  },
  {
    quote: 'Um profissional muito qualificado e com um vasto conhecimento em desenvolvimento.',
    full: 'Um profissional muito qualificado e com um vasto conhecimento em desenvolvimento.',
    name: 'Antonio Santos',
    role: 'Engenheiro Frontend Senior, Kovi',
    photo: '/testimonials/antonio-santos.jpg',
  },
]
