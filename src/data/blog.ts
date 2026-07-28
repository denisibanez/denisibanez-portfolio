import type { BlogPost } from '@/types/blog'

// Blog posts. Text fields are localized (Record<Locale>) — read via useLocalize.
export const posts: BlogPost[] = [
  {
    slug: 'mastering-design-systems',
    featured: true,
    date: '2024-05-24',
    readingMinutes: 8,
    tags: ['Design System', 'UI/UX', 'Architecture'],
    category: {
      en: 'Design Theory',
      pt: 'Teoria de Design',
      es: 'Teoría de Diseño',
      de: 'Design-Theorie',
      fr: 'Théorie du design',
      ja: 'デザイン理論',
    },
    title: {
      en: 'Mastering Design Systems',
      pt: 'Dominar Design Systems',
      es: 'Dominar los Design Systems',
      de: 'Design-Systeme meistern',
      fr: 'Maîtriser les design systems',
      ja: 'デザインシステムを極める',
    },
    excerpt: {
      en: 'A design system is not a library of components — it is the living breath of a brand, where ethereal precision meets functional utility.',
      pt: 'Um design system não é uma biblioteca de componentes — é a respiração viva de uma marca, onde a precisão etérea encontra a utilidade funcional.',
      es: 'Un design system no es una biblioteca de componentes — es la respiración viva de una marca, donde la precisión etérea se encuentra con la utilidad funcional.',
      de: 'Ein Design-System ist keine Komponentenbibliothek — es ist der lebendige Atem einer Marke, wo ätherische Präzision auf funktionalen Nutzen trifft.',
      fr: 'Un design system n\'est pas une bibliothèque de composants — c\'est le souffle vivant d\'une marque, où la précision éthérée rencontre l\'utilité fonctionnelle.',
      ja: 'デザインシステムはコンポーネントのライブラリではなく、ブランドの生きた息吹です——そこでは、繊細な精度と機能的な実用性が出会います。',
    },
    body: {
      en: [
        'In modern digital architecture, a design system represents the intersection of ethereal precision and functional utility. To master it is to craft a silent frame that elevates content without ever intruding upon it.',
        'Clarity comes from constraints: a single source of truth for tokens, accessibility treated as a first principle, and patterns documented so cross-functional teams can move as one.',
        'Design is not what it looks like — it is how it works. A system earns its keep when consistency becomes invisible and speed becomes the default.',
      ],
      pt: [
        'Na arquitetura digital moderna, um design system representa a interseção entre a precisão etérea e a utilidade funcional. Dominá-lo é criar uma moldura silenciosa que eleva o conteúdo sem nunca o invadir.',
        'A clareza nasce das restrições: uma única fonte de verdade para os tokens, a acessibilidade tratada como princípio base e padrões documentados para que equipas multifuncionais avancem em uníssono.',
        'Design não é o que parece — é como funciona. Um sistema justifica-se quando a consistência se torna invisível e a rapidez passa a ser o padrão.',
      ],
      es: [
        'En la arquitectura digital moderna, un design system representa la intersección entre la precisión etérea y la utilidad funcional. Dominarlo es crear un marco silencioso que eleva el contenido sin invadirlo nunca.',
        'La claridad nace de las restricciones: una única fuente de verdad para los tokens, la accesibilidad como principio base y patrones documentados para que los equipos multifuncionales avancen al unísono.',
        'El diseño no es cómo se ve — es cómo funciona. Un sistema se justifica cuando la consistencia se vuelve invisible y la rapidez pasa a ser lo normal.',
      ],
      de: [
        'In der modernen digitalen Architektur steht ein Design-System für den Schnittpunkt von ätherischer Präzision und funktionalem Nutzen. Es zu meistern heißt, einen stillen Rahmen zu schaffen, der Inhalte erhebt, ohne sie je zu stören.',
        'Klarheit entsteht aus Beschränkungen: eine einzige Quelle der Wahrheit für Tokens, Barrierefreiheit als Grundprinzip und dokumentierte Muster, damit cross-funktionale Teams im Gleichklang arbeiten.',
        'Design ist nicht, wie es aussieht — sondern wie es funktioniert. Ein System rechtfertigt sich, wenn Konsistenz unsichtbar und Geschwindigkeit zum Standard wird.',
      ],
      fr: [
        'Dans l\'architecture numérique moderne, un design system représente l\'intersection de la précision éthérée et de l\'utilité fonctionnelle. Le maîtriser, c\'est créer un cadre silencieux qui élève le contenu sans jamais l\'envahir.',
        'La clarté naît des contraintes : une source unique de vérité pour les tokens, l\'accessibilité comme principe premier, et des patterns documentés pour que les équipes pluridisciplinaires avancent d\'un seul mouvement.',
        'Le design, ce n\'est pas son apparence — c\'est son fonctionnement. Un système se justifie quand la cohérence devient invisible et la vitesse, la norme.',
      ],
      ja: [
        'モダンなデジタルアーキテクチャにおいて、デザインシステムは繊細な精度と機能的な実用性の交差点です。それを極めるとは、コンテンツを決して邪魔せず引き立てる、静かな枠組みをつくることです。',
        '明快さは制約から生まれます——トークンの単一の真実、第一原則としてのアクセシビリティ、そしてクロスファンクショナルなチームが一体となって動けるよう文書化されたパターン。',
        'デザインとは見た目ではなく、どう機能するかです。一貫性が見えなくなり、速さが当たり前になったとき、システムはその価値を証明します。',
      ],
    },
  },
  {
    slug: 'ai-in-the-frontend',
    date: '2025-09-10',
    readingMinutes: 6,
    tags: ['AI', 'Frontend', 'DX'],
    category: {
      en: 'Engineering',
      pt: 'Engenharia',
      es: 'Ingeniería',
      de: 'Engineering',
      fr: 'Ingénierie',
      ja: 'エンジニアリング',
    },
    title: {
      en: 'AI in the Frontend, Without Losing the Craft',
      pt: 'IA no Frontend, Sem Perder o Ofício',
      es: 'IA en el Frontend, Sin Perder el Oficio',
      de: 'KI im Frontend, ohne das Handwerk zu verlieren',
      fr: 'L\'IA dans le frontend, sans perdre l\'artisanat',
      ja: '職人技を失わずにフロントエンドへ AI を',
    },
    excerpt: {
      en: 'How aggressively can AI boost productivity before code quality pays the price? Notes from rebuilding a design system with prompts.',
      pt: 'Até que ponto a IA pode acelerar a produtividade antes de a qualidade do código pagar a fatura? Notas de reconstruir um design system com prompts.',
      es: '¿Hasta qué punto la IA puede acelerar la productividad antes de que la calidad del código lo pague? Notas de reconstruir un design system con prompts.',
      de: 'Wie aggressiv darf KI die Produktivität steigern, bevor die Codequalität dafür zahlt? Notizen aus dem Neuaufbau eines Design-Systems mit Prompts.',
      fr: 'Jusqu\'où l\'IA peut-elle accélérer la productivité avant que la qualité du code n\'en paie le prix ? Notes d\'une reconstruction de design system aux prompts.',
      ja: 'コード品質が代償を払う前に、AI はどこまで生産性を高められるのか。プロンプトでデザインシステムを再構築した記録から。',
    },
    body: {
      en: [
        'Generating components by prompt is fast — sometimes startlingly so. The real work begins after: turning unstructured, inconsistent output into something scalable, reusable and production-ready.',
        'AI is a force multiplier for the parts you already understand. It accelerates scaffolding, but architecture, naming and boundaries still need a human with taste and intent.',
        'The craft does not disappear — it moves up a level. You spend less time typing and more time deciding what good looks like, and holding the line on it.',
      ],
      pt: [
        'Gerar componentes por prompt é rápido — por vezes surpreendentemente. O trabalho a sério começa depois: transformar código sem estrutura e inconsistente em algo escalável, reutilizável e pronto para produção.',
        'A IA multiplica a força nas partes que já dominas. Acelera o scaffolding, mas a arquitetura, os nomes e as fronteiras ainda precisam de alguém com critério e intenção.',
        'O ofício não desaparece — sobe de nível. Escreves menos código e passas mais tempo a decidir o que é bom e a manter essa fasquia.',
      ],
      es: [
        'Generar componentes por prompt es rápido — a veces sorprendentemente. El trabajo de verdad empieza después: convertir código sin estructura e inconsistente en algo escalable, reutilizable y listo para producción.',
        'La IA multiplica la fuerza en las partes que ya dominas. Acelera el scaffolding, pero la arquitectura, los nombres y los límites aún necesitan a alguien con criterio e intención.',
        'El oficio no desaparece — sube de nivel. Escribes menos código y dedicas más tiempo a decidir qué es bueno y a mantener ese listón.',
      ],
      de: [
        'Komponenten per Prompt zu erzeugen ist schnell — manchmal verblüffend. Die eigentliche Arbeit beginnt danach: unstrukturierten, inkonsistenten Output in etwas Skalierbares, Wiederverwendbares und Produktionsreifes zu verwandeln.',
        'KI ist ein Kraftverstärker für das, was du bereits verstehst. Sie beschleunigt das Gerüst, doch Architektur, Benennung und Grenzen brauchen weiterhin einen Menschen mit Geschmack und Absicht.',
        'Das Handwerk verschwindet nicht — es steigt eine Ebene höher. Du tippst weniger und entscheidest mehr, was gut ist — und hältst diese Linie.',
      ],
      fr: [
        'Générer des composants au prompt est rapide — parfois de façon saisissante. Le vrai travail commence ensuite : transformer un code non structuré et incohérent en quelque chose de scalable, réutilisable et prêt pour la production.',
        'L\'IA démultiplie les forces sur ce que vous maîtrisez déjà. Elle accélère l\'échafaudage, mais l\'architecture, le nommage et les frontières exigent encore un humain avec du goût et de l\'intention.',
        'L\'artisanat ne disparaît pas — il monte d\'un cran. On tape moins et on décide davantage de ce qui est bon, en tenant la ligne.',
      ],
      ja: [
        'プロンプトでコンポーネントを生成するのは速い——時に驚くほど。本当の仕事はその後です。無構造で一貫性のない出力を、スケーラブルで再利用可能な、本番対応のものへと変えること。',
        'AI は、すでに理解している領域における力の増幅装置です。土台づくりは速くなりますが、アーキテクチャ・命名・境界には、いまも美意識と意図をもつ人間が必要です。',
        '職人技は消えません——一段上へ上がります。タイピングの時間は減り、「良い」とは何かを決め、その基準を守ることに時間を使うようになります。',
      ],
    },
  },
  {
    slug: 'building-across-borders',
    date: '2026-02-15',
    readingMinutes: 5,
    tags: ['Nearshore', 'Teams', 'Craft'],
    category: {
      en: 'Career',
      pt: 'Carreira',
      es: 'Carrera',
      de: 'Karriere',
      fr: 'Carrière',
      ja: 'キャリア',
    },
    title: {
      en: 'Building Across Borders',
      pt: 'Construir Entre Fronteiras',
      es: 'Construir Entre Fronteras',
      de: 'Über Grenzen hinweg bauen',
      fr: 'Construire par-delà les frontières',
      ja: '国境を越えてつくる',
    },
    excerpt: {
      en: 'From Brazil to nearshore Europe — what changes, what stays the same, and why clear frontend standards travel better than any process.',
      pt: 'Do Brasil ao nearshore europeu — o que muda, o que permanece, e porque padrões de frontend claros viajam melhor do que qualquer processo.',
      es: 'De Brasil al nearshore europeo — qué cambia, qué permanece, y por qué unos estándares de frontend claros viajan mejor que cualquier proceso.',
      de: 'Von Brasilien ins nearshore-Europa — was sich ändert, was bleibt, und warum klare Frontend-Standards besser reisen als jeder Prozess.',
      fr: 'Du Brésil au nearshore européen — ce qui change, ce qui reste, et pourquoi des standards frontend clairs voyagent mieux que n\'importe quel processus.',
      ja: 'ブラジルから欧州ニアショアへ——変わるもの、変わらないもの、そして明快なフロントエンド標準がどんなプロセスよりも遠くまで届く理由。',
    },
    body: {
      en: [
        'Working across countries and time zones exposes what actually holds a team together. It is rarely the process — it is shared standards and a codebase everyone can trust.',
        'Language and rituals change; good engineering does not. Clear component contracts, documented patterns and honest reviews let people who have never met ship as one.',
        'Distance rewards clarity. The more explicit the frontend foundation, the less it depends on any single person being online.',
      ],
      pt: [
        'Trabalhar entre países e fusos horários revela o que realmente mantém uma equipa unida. Raramente é o processo — são padrões partilhados e uma base de código em que todos confiam.',
        'A língua e os rituais mudam; a boa engenharia não. Contratos de componentes claros, padrões documentados e reviews honestas permitem que pessoas que nunca se conheceram entreguem em uníssono.',
        'A distância recompensa a clareza. Quanto mais explícita a base de frontend, menos depende de uma única pessoa estar online.',
      ],
      es: [
        'Trabajar entre países y husos horarios revela lo que de verdad mantiene unido a un equipo. Rara vez es el proceso — son los estándares compartidos y una base de código en la que todos confían.',
        'El idioma y los rituales cambian; la buena ingeniería no. Contratos de componentes claros, patrones documentados y revisiones honestas permiten que personas que nunca se conocieron entreguen al unísono.',
        'La distancia premia la claridad. Cuanto más explícita sea la base de frontend, menos depende de que una sola persona esté conectada.',
      ],
      de: [
        'Über Länder und Zeitzonen hinweg zu arbeiten zeigt, was ein Team wirklich zusammenhält. Selten ist es der Prozess — es sind gemeinsame Standards und eine Codebasis, der alle vertrauen.',
        'Sprache und Rituale ändern sich; gutes Engineering nicht. Klare Komponenten-Verträge, dokumentierte Muster und ehrliche Reviews lassen Menschen, die sich nie getroffen haben, im Gleichklang liefern.',
        'Distanz belohnt Klarheit. Je expliziter das Frontend-Fundament, desto weniger hängt es davon ab, dass eine einzelne Person online ist.',
      ],
      fr: [
        'Travailler entre pays et fuseaux horaires révèle ce qui tient réellement une équipe. C\'est rarement le processus — ce sont des standards partagés et une base de code digne de confiance.',
        'La langue et les rituels changent ; le bon engineering, non. Des contrats de composants clairs, des patterns documentés et des revues honnêtes permettent à des gens qui ne se sont jamais rencontrés de livrer d\'un seul mouvement.',
        'La distance récompense la clarté. Plus la fondation frontend est explicite, moins elle dépend d\'une seule personne connectée.',
      ],
      ja: [
        '国やタイムゾーンをまたいで働くと、チームを本当に支えているものが見えてきます。それはプロセスではなく、共有された標準と、全員が信頼できるコードベースであることがほとんどです。',
        '言語や儀式は変わっても、良いエンジニアリングは変わりません。明快なコンポーネント契約、文書化されたパターン、誠実なレビューが、会ったことのない人同士を一体にして出荷させます。',
        '距離は明快さに報います。フロントエンドの土台が明示的であるほど、特定の一人がオンラインであることへの依存は減ります。',
      ],
    },
  },
]
