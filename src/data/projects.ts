import type { Project } from '@/types/project'

// Real projects. Text fields are localized (Record<Locale>) — see useLocalize.
// Drafts show only in dev (localhost); see useProjects.
export const projects: Project[] = [
  {
    slug: 'betfair-skybet',
    title: 'Betfair & SkyBet',
    category: {
      en: "Betting Platform",
      pt: "Plataforma de Apostas",
      es: "Plataforma de Apuestas",
      de: "Wettplattform",
      fr: "Plateforme de paris",
      ja: "ベッティングプラットフォーム",
    },
    kind: 'client',
    status: 'draft',
    startDate: '2025-12',
    endDate: '2026-08',
    summary: {
      en: "End-to-end full-stack work on high-traffic betting products — React & React Native interfaces, Cloudflare Workers services and real-time Betfair Exchange integrations.",
      pt: "Trabalho full-stack ponta a ponta em produtos de apostas de alto tráfego — interfaces em React e React Native, serviços em Cloudflare Workers e integrações em tempo real com a Betfair Exchange.",
      es: "Trabajo full-stack de extremo a extremo en productos de apuestas de alto tráfico: interfaces en React y React Native, servicios en Cloudflare Workers e integraciones en tiempo real con la Betfair Exchange.",
      de: "End-to-end Full-Stack-Arbeit an stark frequentierten Wettprodukten — Oberflächen in React & React Native, Services auf Cloudflare Workers und Echtzeit-Integrationen mit der Betfair Exchange.",
      fr: "Travail full-stack de bout en bout sur des produits de paris à fort trafic — interfaces en React et React Native, services sur Cloudflare Workers et intégrations en temps réel avec la Betfair Exchange.",
      ja: "大規模トラフィックのベッティング製品におけるエンドツーエンドのフルスタック開発——React・React Native のインターフェース、Cloudflare Workers のサービス、Betfair Exchange とのリアルタイム連携。",
    },
    overview: {
      en: ["End-to-end full-stack development of high-traffic betting products for Betfair and SkyBet: interfaces in React and React Native, serverless services on Cloudflare Workers, and real-time integrations with the Betfair Exchange.", "On the web (React 19 + TypeScript) I maintained and evolved core screens of the Betfair Predicts product — the MarketEventPage, HomePage, event carousels and the Stories system. On mobile (React Native, iOS/Android) I built and maintained accessible, high-performance cross-platform apps for both Betfair and SkyBet.", "On the backend (Cloudflare Workers + Hono) I built market microservices with data normalization, integrated the Betfair APIs (ERO/LBR/CBR) and added edge caching with Cloudflare KV. Accessibility was a first-class concern throughout: strict WCAG compliance, full screen-reader support (VoiceOver/TalkBack), semantic labels, focus management and colour contrast."],
      pt: ["Desenvolvimento full-stack ponta a ponta de produtos de apostas de alto tráfego para a Betfair e a SkyBet: interfaces em React e React Native, serviços serverless em Cloudflare Workers e integrações em tempo real com a Betfair Exchange.", "Na web (React 19 + TypeScript) mantive e evoluí ecrãs centrais do produto Betfair Predicts — a MarketEventPage, a HomePage, os carrosséis de eventos e o sistema de Stories. No mobile (React Native, iOS/Android) construí e mantive apps cross-platform acessíveis e de alto desempenho para a Betfair e a SkyBet.", "No backend (Cloudflare Workers + Hono) construí microsserviços de mercado com normalização de dados, integrei as APIs da Betfair (ERO/LBR/CBR) e adicionei cache no edge com Cloudflare KV. A acessibilidade foi uma prioridade em todo o processo: conformidade rigorosa com WCAG, suporte total a leitores de ecrã (VoiceOver/TalkBack), etiquetas semânticas, gestão de foco e contraste de cor."],
      es: ["Desarrollo full-stack de extremo a extremo de productos de apuestas de alto tráfico para Betfair y SkyBet: interfaces en React y React Native, servicios serverless en Cloudflare Workers e integraciones en tiempo real con la Betfair Exchange.", "En la web (React 19 + TypeScript) mantuve y evolucioné pantallas centrales del producto Betfair Predicts: la MarketEventPage, la HomePage, los carruseles de eventos y el sistema de Stories. En móvil (React Native, iOS/Android) construí y mantuve apps multiplataforma accesibles y de alto rendimiento para Betfair y SkyBet.", "En el backend (Cloudflare Workers + Hono) construí microservicios de mercado con normalización de datos, integré las APIs de Betfair (ERO/LBR/CBR) y añadí caché en el edge con Cloudflare KV. La accesibilidad fue una prioridad en todo momento: cumplimiento estricto de WCAG, soporte completo de lectores de pantalla (VoiceOver/TalkBack), etiquetas semánticas, gestión del foco y contraste de color."],
      de: ["End-to-end Full-Stack-Entwicklung stark frequentierter Wettprodukte für Betfair und SkyBet: Oberflächen in React und React Native, serverlose Services auf Cloudflare Workers und Echtzeit-Integrationen mit der Betfair Exchange.", "Im Web (React 19 + TypeScript) habe ich zentrale Screens des Produkts Betfair Predicts gepflegt und weiterentwickelt — die MarketEventPage, die HomePage, Event-Karussells und das Stories-System. Auf Mobile (React Native, iOS/Android) habe ich barrierefreie, performante Cross-Platform-Apps für Betfair und SkyBet gebaut und gepflegt.", "Im Backend (Cloudflare Workers + Hono) habe ich Markt-Microservices mit Datennormalisierung gebaut, die Betfair-APIs (ERO/LBR/CBR) integriert und Edge-Caching mit Cloudflare KV ergänzt. Barrierefreiheit war durchgehend erstrangig: strikte WCAG-Konformität, volle Screenreader-Unterstützung (VoiceOver/TalkBack), semantische Labels, Fokus-Management und Farbkontrast."],
      fr: ["Développement full-stack de bout en bout de produits de paris à fort trafic pour Betfair et SkyBet : interfaces en React et React Native, services serverless sur Cloudflare Workers et intégrations en temps réel avec la Betfair Exchange.", "Sur le web (React 19 + TypeScript) j'ai maintenu et fait évoluer des écrans centraux du produit Betfair Predicts — la MarketEventPage, la HomePage, les carrousels d'événements et le système de Stories. Sur mobile (React Native, iOS/Android) j'ai construit et maintenu des applications cross-platform accessibles et performantes pour Betfair et SkyBet.", "Côté backend (Cloudflare Workers + Hono), j'ai construit des microservices de marché avec normalisation des données, intégré les API Betfair (ERO/LBR/CBR) et ajouté du cache en edge avec Cloudflare KV. L'accessibilité a été une priorité de bout en bout : conformité WCAG stricte, prise en charge complète des lecteurs d'écran (VoiceOver/TalkBack), libellés sémantiques, gestion du focus et contraste des couleurs."],
      ja: ["Betfair と SkyBet 向けの大規模トラフィックのベッティング製品を、エンドツーエンドでフルスタック開発——React・React Native のインターフェース、Cloudflare Workers 上のサーバーレスサービス、Betfair Exchange とのリアルタイム連携。", "ウェブ（React 19 + TypeScript）では、Betfair Predicts の中核画面——MarketEventPage、HomePage、イベントカルーセル、Stories システム——を保守・改善しました。モバイル（React Native、iOS/Android）では、Betfair と SkyBet 向けにアクセシブルで高性能なクロスプラットフォームアプリを構築・保守しました。", "バックエンド（Cloudflare Workers + Hono）では、データ正規化を伴うマーケットのマイクロサービスを構築し、Betfair の API（ERO/LBR/CBR）を統合し、Cloudflare KV によるエッジキャッシュを追加しました。アクセシビリティは一貫して最優先事項でした——厳格な WCAG 準拠、スクリーンリーダー（VoiceOver/TalkBack）の完全サポート、セマンティックラベル、フォーカス管理、色コントラスト。"],
    },
    features: {
      en: ["React 19 + TypeScript web: MarketEventPage, HomePage, event carousels and the Stories system in Betfair Predicts.", "React Native apps (iOS/Android) for Betfair and SkyBet — accessible and high-performance.", "Cloudflare Workers + Hono microservices: Betfair API integration (ERO/LBR/CBR), data normalization and edge caching with KV.", "Strict WCAG accessibility: VoiceOver/TalkBack support, semantic labels, focus management and colour contrast.", "Testing with Vitest (unit) and Playwright (E2E); led production incident investigations.", "2nd largest contributor to the Predicts repo (~460 commits, 31k+ lines); built the first version of the real-time cash-out feature."],
      pt: ["Web em React 19 + TypeScript: MarketEventPage, HomePage, carrosséis de eventos e o sistema de Stories no Betfair Predicts.", "Apps em React Native (iOS/Android) para a Betfair e a SkyBet — acessíveis e de alto desempenho.", "Microsserviços em Cloudflare Workers + Hono: integração das APIs da Betfair (ERO/LBR/CBR), normalização de dados e cache no edge com KV.", "Acessibilidade WCAG rigorosa: suporte a VoiceOver/TalkBack, etiquetas semânticas, gestão de foco e contraste de cor.", "Testes com Vitest (unitários) e Playwright (E2E); liderei investigações de incidentes em produção.", "2.º maior contribuidor do repositório do Predicts (~460 commits, mais de 31 mil linhas); construí a primeira versão do cash-out em tempo real."],
      es: ["Web en React 19 + TypeScript: MarketEventPage, HomePage, carruseles de eventos y el sistema de Stories en Betfair Predicts.", "Apps en React Native (iOS/Android) para Betfair y SkyBet: accesibles y de alto rendimiento.", "Microservicios en Cloudflare Workers + Hono: integración de las APIs de Betfair (ERO/LBR/CBR), normalización de datos y caché en el edge con KV.", "Accesibilidad WCAG estricta: soporte de VoiceOver/TalkBack, etiquetas semánticas, gestión del foco y contraste de color.", "Pruebas con Vitest (unitarias) y Playwright (E2E); lideré investigaciones de incidentes en producción.", "2.º mayor contribuidor del repositorio de Predicts (~460 commits, más de 31 mil líneas); construí la primera versión del cash-out en tiempo real."],
      de: ["Web mit React 19 + TypeScript: MarketEventPage, HomePage, Event-Karussells und das Stories-System in Betfair Predicts.", "React-Native-Apps (iOS/Android) für Betfair und SkyBet — barrierefrei und performant.", "Microservices mit Cloudflare Workers + Hono: Integration der Betfair-APIs (ERO/LBR/CBR), Datennormalisierung und Edge-Caching mit KV.", "Strikte WCAG-Barrierefreiheit: VoiceOver/TalkBack-Unterstützung, semantische Labels, Fokus-Management und Farbkontrast.", "Tests mit Vitest (Unit) und Playwright (E2E); leitete Untersuchungen von Produktionsincidents.", "Zweitgrößter Beitragender im Predicts-Repository (~460 Commits, über 31.000 Zeilen); baute die erste Version des Echtzeit-Cash-outs."],
      fr: ["Web en React 19 + TypeScript : MarketEventPage, HomePage, carrousels d'événements et le système de Stories dans Betfair Predicts.", "Applications React Native (iOS/Android) pour Betfair et SkyBet — accessibles et performantes.", "Microservices Cloudflare Workers + Hono : intégration des API Betfair (ERO/LBR/CBR), normalisation des données et cache en edge avec KV.", "Accessibilité WCAG stricte : prise en charge VoiceOver/TalkBack, libellés sémantiques, gestion du focus et contraste des couleurs.", "Tests avec Vitest (unitaires) et Playwright (E2E) ; j'ai mené des investigations d'incidents en production.", "2ᵉ plus gros contributeur du dépôt Predicts (~460 commits, plus de 31 000 lignes) ; j'ai construit la première version du cash-out en temps réel."],
      ja: ["React 19 + TypeScript のウェブ：Betfair Predicts の MarketEventPage、HomePage、イベントカルーセル、Stories システム。", "Betfair と SkyBet 向けの React Native アプリ（iOS/Android）——アクセシブルで高性能。", "Cloudflare Workers + Hono のマイクロサービス：Betfair API（ERO/LBR/CBR）連携、データ正規化、KV によるエッジキャッシュ。", "厳格な WCAG アクセシビリティ：VoiceOver/TalkBack 対応、セマンティックラベル、フォーカス管理、色コントラスト。", "Vitest（ユニット）と Playwright（E2E）によるテスト。本番インシデントの調査をリード。", "Predicts リポジトリで2番目に貢献（約460コミット、3万1千行超）。リアルタイム・キャッシュアウト機能の初版を構築。"],
    },
    industry: {
      en: "Gambling",
      pt: "Apostas",
      es: "Apuestas",
      de: "Glücksspiel",
      fr: "Paris sportifs",
      ja: "ギャンブル",
    },
    techStack: ['React 19', 'React Native', 'TypeScript', 'Cloudflare Workers', 'Hono', 'Cloudflare KV', 'Vitest', 'Playwright'],
    role: 'Full-Stack & Mobile Engineer',
    collaborators: 'via ACT Digital · Flutter Group (Blip)',
    url: 'https://predicts.betfair.com/',
    image: '/projects/betfair-skybet/story-atmosphere.png',
    images: [
      '/projects/betfair-skybet/story-atmosphere.png',
      '/projects/betfair-skybet/story-countdown.png',
      '/projects/betfair-skybet/story-most-read.png',
      '/projects/betfair-skybet/market-mobile.png',
      '/projects/betfair-skybet/home.png',
      '/projects/betfair-skybet/markets.png',
    ],
  },
]
