import type { Testimonial } from '@/types/testimonial'

// Real testimonials. Portraits live in public/testimonials/ (see the README
// there); a missing photo degrades gracefully to the person's initials.
export const testimonials: Testimonial[] = [
  {
    quote: 'Profissional de elevado padrão, tanto de codificação quanto de análise.',
    full: 'Profissional de elevado padrão, tanto de codificação quanto de análise.',
    name: 'Nilson Rodrigo Carraro',
    link: 'https://www.linkedin.com/in/nilson-rodrigo-carraro-996317151/',
    role: 'Tech Lead, Dock Tech',
    photo: '/testimonials/nilson-carraro.jpg',
  },
  {
    quote:
      'Denis é um programador bastante estruturado e disciplinado, tem excelente comunicação com a equipa, tem motivação e iniciativa, tem grande conhecimento técnico e de negócio, e entrega código com grande qualidade.',
    full: 'Denis é um programador bastante estruturado e disciplinado, tem excelente comunicação com a equipa, tem motivação e iniciativa, tem grande conhecimento técnico e de negócio, é capaz de entregar código com grande qualidade, no qual é evidente a sua experiência, dedicação e esforço.\n\nDenis trabalha muito bem em equipa, reconhece o esforço dos colegas e incentiva-os a dar o seu melhor, tem boa capacidade de liderança e provou várias vezes ser um bom mentor, capaz de explicar conceitos complexos facilmente.',
    name: 'João Lucas',
    link: 'https://www.linkedin.com/in/joao-thenaisie-lucas/',
    role: 'Full Stack Developer, Bentley Systems',
    photo: '/testimonials/joao-lucas.jpg',
  },
  {
    quote: 'Um profissional muito qualificado e com um vasto conhecimento em desenvolvimento.',
    full: 'Um profissional muito qualificado e com um vasto conhecimento em desenvolvimento.',
    name: 'Antonio Santos',
    link: 'https://www.linkedin.com/in/tonhaosantos/',
    role: 'Engenheiro Frontend Senior, Kovi',
    photo: '/testimonials/antonio-santos.jpg',
  },
  {
    quote:
      'Denis é um grande profissional, fez um trabalho de qualidade e trouxe muitas ideias e agilidade aos projetos, sempre disposto a ajudar e fazendo o melhor uso das ferramentas da sua área.',
    full: 'Denis é um grande profissional, fez um trabalho de qualidade e trouxe muitas ideias e agilidade aos projetos, sempre disposto a ajudar e fazendo o melhor uso das ferramentas da sua área.',
    name: 'Alex Costa',
    link: 'https://www.linkedin.com/in/alex-costa-2720538a/',
    role: 'Backend Developer, Zukkin',
    photo: '/testimonials/alex-costa.jpg',
  },
  {
    quote: 'O Denis é dedicado e resiliente. Dominava a área que atuava, front-end do credenciamento era com ele :)',
    full: 'O Denis é dedicado e resiliente.\n\nDominava a área que atuava, front-end do credenciamento era com ele :)\nTrabalha muito bem em equipe e assumia de frente nossos desafios.',
    name: 'Fernando Jesus',
    role: 'Frontend Software Engineer, Cielo',
    photo: '/testimonials/fernando-jesus.jpg',
  },
]
