import type { FaqItem } from '@/types/faq'

/**
 * About-page FAQ — grounded in the same copy as `about.*`/`home.*` (no new
 * claims). Doubles as the FAQPage JSON-LD source in `useSeo`.
 */
export const faq: FaqItem[] = [
  {
    question: {
      en: 'What does Denis Ibañez do?',
      pt: 'O que o Denis Ibañez faz?',
      es: '¿A qué se dedica Denis Ibañez?',
      fr: 'Que fait Denis Ibañez ?',
      de: 'Was macht Denis Ibañez?',
      ja: 'デニス・イバニェスは何をしていますか?',
    },
    answer: {
      en: "He's an AI Engineer and front-end architect with 14+ years of experience, building AI-native products and agentic workflows, and leading high-traffic UIs in Vue, React and Angular.",
      pt: 'É AI Engineer e arquiteto front-end com mais de 14 anos de experiência, construindo produtos AI-native e workflows agentic, e liderando interfaces de alto tráfego em Vue, React e Angular.',
      es: 'Es AI Engineer y arquitecto front-end con más de 14 años de experiencia, construyendo productos AI-native y flujos agentic, y liderando interfaces de alto tráfico en Vue, React y Angular.',
      fr: "C'est un AI Engineer et architecte front-end avec plus de 14 ans d'expérience, construisant des produits AI-native et des workflows agentic, et pilotant des interfaces à fort trafic en Vue, React et Angular.",
      de: 'Er ist AI Engineer und Front-End-Architekt mit über 14 Jahren Erfahrung, baut AI-native Produkte und agentische Workflows und leitet stark frequentierte Interfaces in Vue, React und Angular.',
      ja: '14年以上の経験を持つAIエンジニア兼フロントエンドアーキテクトとして、AIネイティブなプロダクトとエージェント型ワークフローを構築し、Vue・React・Angularで大規模トラフィックのUIを手がけています。',
    },
  },
  {
    question: {
      en: 'What technologies does he work with?',
      pt: 'Com quais tecnologias ele trabalha?',
      es: '¿Con qué tecnologías trabaja?',
      fr: 'Avec quelles technologies travaille-t-il ?',
      de: 'Mit welchen Technologien arbeitet er?',
      ja: 'どのような技術を使っていますか?',
    },
    answer: {
      en: 'Vue, React, React Native and TypeScript, paired with hands-on AI engineering — agentic developer workflows and AI-assisted delivery pipelines.',
      pt: 'Vue, React, React Native e TypeScript, aliados a engenharia de IA prática — workflows agentic para devs e pipelines de entrega AI-assisted.',
      es: 'Vue, React, React Native y TypeScript, combinados con ingeniería de IA práctica — flujos agentic para desarrolladores y pipelines de entrega AI-assisted.',
      fr: 'Vue, React, React Native et TypeScript, associés à une pratique concrète de l’ingénierie IA — workflows agentic pour développeurs et pipelines de livraison AI-assisted.',
      de: 'Vue, React, React Native und TypeScript, kombiniert mit praktischer KI-Entwicklung — agentische Entwickler-Workflows und AI-assisted Delivery-Pipelines.',
      ja: 'Vue、React、React Native、TypeScriptに加え、実践的なAIエンジニアリング——開発者向けエージェント型ワークフローとAI支援型デリバリーパイプラインの構築——を組み合わせています。',
    },
  },
  {
    question: {
      en: 'Does he work with distributed or international teams?',
      pt: 'Ele trabalha com equipas distribuídas ou internacionais?',
      es: '¿Trabaja con equipos distribuidos o internacionales?',
      fr: 'Travaille-t-il avec des équipes distribuées ou internationales ?',
      de: 'Arbeitet er mit verteilten oder internationalen Teams?',
      ja: '分散チームや国際的なチームと仕事をしていますか?',
    },
    answer: {
      en: 'Yes — he partners with Design Ops and engineering teams across Spain, the UK, the Netherlands and Germany to keep brand and experience consistent at scale.',
      pt: 'Sim — colabora com Design Ops e equipas de engenharia em Espanha, Reino Unido, Holanda e Alemanha para manter marca e experiência consistentes em escala.',
      es: 'Sí — colabora con equipos de Design Ops e ingeniería en España, Reino Unido, Países Bajos y Alemania para mantener la identidad y la experiencia coherentes a escala.',
      fr: "Oui — il collabore avec les équipes Design Ops et ingénierie en Espagne, au Royaume-Uni, aux Pays-Bas et en Allemagne pour garder la marque et l'expérience cohérentes à grande échelle.",
      de: 'Ja — er arbeitet mit Design-Ops- und Engineering-Teams in Spanien, Großbritannien, den Niederlanden und Deutschland zusammen, um Marke und Nutzererlebnis auch bei großem Umfang konsistent zu halten.',
      ja: 'はい。スペイン、イギリス、オランダ、ドイツのDesign Opsおよびエンジニアリングチームと連携し、大規模でもブランドと体験の一貫性を保っています。',
    },
  },
  {
    question: {
      en: 'What certifications does he hold?',
      pt: 'Quais certificações ele possui?',
      es: '¿Qué certificaciones posee?',
      fr: 'Quelles certifications possède-t-il ?',
      de: 'Welche Zertifizierungen besitzt er?',
      ja: 'どのような資格を持っていますか?',
    },
    answer: {
      en: 'He holds the AI-Empowered SAFe® Practitioner (SP) certification.',
      pt: 'Possui a certificação AI-Empowered SAFe® Practitioner (SP).',
      es: 'Posee la certificación AI-Empowered SAFe® Practitioner (SP).',
      fr: "Il détient la certification AI-Empowered SAFe® Practitioner (SP).",
      de: 'Er besitzt die Zertifizierung AI-Empowered SAFe® Practitioner (SP).',
      ja: 'AI-Empowered SAFe® Practitioner（SP）の認定を保有しています。',
    },
  },
  {
    question: {
      en: 'How can I see his work or get in touch?',
      pt: 'Como posso ver o trabalho dele ou entrar em contacto?',
      es: '¿Cómo puedo ver su trabajo o ponerme en contacto?',
      fr: 'Comment puis-je voir son travail ou le contacter ?',
      de: 'Wie kann ich seine Arbeit sehen oder ihn kontaktieren?',
      ja: '実績を見たり、連絡を取ったりするにはどうすればよいですか?',
    },
    answer: {
      en: 'Browse the projects page, or reach out via LinkedIn, GitHub or WhatsApp — links are in the site footer.',
      pt: 'Veja a página de projetos, ou entre em contacto via LinkedIn, GitHub ou WhatsApp — os links estão no rodapé do site.',
      es: 'Consulta la página de proyectos, o contacta por LinkedIn, GitHub o WhatsApp — los enlaces están en el pie del sitio.',
      fr: 'Consultez la page des projets, ou contactez-le via LinkedIn, GitHub ou WhatsApp — les liens sont dans le pied de page du site.',
      de: 'Schau dir die Projektseite an oder kontaktiere ihn über LinkedIn, GitHub oder WhatsApp — die Links findest du in der Fußzeile.',
      ja: 'プロジェクトページをご覧いただくか、LinkedIn・GitHub・WhatsAppからご連絡ください——リンクはサイトのフッターにあります。',
    },
  },
]
