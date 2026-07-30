import type { BlogPost } from '@/types/blog'

// Blog posts. Text fields are localized (Record<Locale>) — read via useLocalize.
export const posts: BlogPost[] = [
  {
    slug: 'a-complete-vue3-setup-part-1',
    date: '2023-03-25',
    readingMinutes: 9,
    tags: ['Vue', 'Design System', 'Quasar', 'Storybook'],
    image: '/blog/vue3-part1-cover.jpg',
    category: { en: 'Engineering', pt: 'Engenharia', es: 'Ingeniería', de: 'Engineering', fr: 'Ingénierie', ja: 'エンジニアリング' },
    title: {
      en: 'A Complete Vue 3 Setup — Part I',
      pt: 'Um Setup Completo com Vue 3 — Parte I',
      es: 'Un Setup Completo con Vue 3 — Parte I',
      de: 'Ein komplettes Vue-3-Setup — Teil I',
      fr: 'Un setup complet avec Vue 3 — Partie I',
      ja: '完全な Vue 3 セットアップ — Part I',
    },
    excerpt: {
      en: 'Building a design system with quasar + Storybook — the first step of a complete Vue 3 setup.',
      pt: 'Construindo um design system com quasar + Storybook — o primeiro passo de um setup completo com Vue 3.',
      es: 'Construyendo un design system con quasar + Storybook — el primer paso de un setup completo con Vue 3.',
      de: 'Ein Design-System mit quasar + Storybook bauen — der erste Schritt eines kompletten Vue-3-Setups.',
      fr: "Construire un design system avec quasar + Storybook — la première étape d'un setup complet avec Vue 3.",
      ja: 'quasar + Storybook でデザインシステムを構築——完全な Vue 3 セットアップの第一歩。',
    },
    quote: {
      en: "Frontend isn't a 100-meter dash — it's a marathon; consistency matters more than speed.",
      pt: 'Frontend não é uma corrida de 100 metros — é uma maratona; consistência importa mais que velocidade.',
      es: 'El frontend no es una carrera de 100 metros — es un maratón; la consistencia importa más que la velocidad.',
      de: 'Frontend ist kein 100-Meter-Lauf — es ist ein Marathon; Beständigkeit zählt mehr als Tempo.',
      fr: "Le frontend n'est pas un 100 mètres — c'est un marathon ; la constance compte plus que la vitesse.",
      ja: 'フロントエンドは100メートル走ではなくマラソン。速さより一貫性が大切だ。',
    },
    blocks: [
      { type: 'h3', text: { en: 'Hey, do you have a moment to talk about the new Tekpix?', pt: 'Ei, você tem um minuto pra falar sobre o novo Tekpix?' } },
      { type: 'p', text: { en: 'Joking aside, I’d like to talk a little about the “new” Vue3 — “new” in quotes — because the update to this beloved framework for Frontend developers has been dragging on since 2020, but after December 2022, when the development team announced it would stop supporting version 2, that’s when it actually became a reality.', pt: 'Brincadeiras à parte, gostaria de falar um pouco sobre o “novo” Vue3 — “novo” entre aspas — porque a atualização desse framework tão querido pelos desenvolvedores Frontend se arrasta desde 2020, mas foi depois de dezembro de 2022, quando o time de desenvolvimento anunciou que deixaria de dar suporte à versão 2, que isso de fato virou realidade.' } },
      { type: 'p', text: { en: 'Since it’s such a recent version, it’s a bit harder to find complete resources about features, patterns, and libraries.', pt: 'Por ser uma versão tão recente, é um pouco mais difícil encontrar materiais completos sobre features, padrões e bibliotecas.' } },
      { type: 'p', text: { en: 'At this very moment, the biggest Material library for Vue just came out of beta, and they haven’t even released a functional data-table yet.', pt: 'Neste exato momento, a maior biblioteca Material para Vue acabou de sair do beta, e eles ainda nem lançaram um data-table funcional.' } },
      { type: 'p', text: { en: 'So I decided to put together a complete setup using Vue3 and a few cositas más (extra bits), to help out my fellow devs.', pt: 'Então decidi montar um setup completo usando Vue3 e umas cositas más, pra ajudar os colegas devs.' } },
      { type: 'h2', text: { en: 'Quick summary of what’s coming up next…', pt: 'Resumo rápido do que vem por aí…' } },
      { type: 'p', text: { en: 'In this post, we’ll build a reusable component structure based on quasar (the best-structured Material library for Vue3 so far), using Vite to create our project and GitHub Packages to distribute our library.', pt: 'Neste post, vamos construir uma estrutura de componentes reutilizáveis baseada em quasar (a biblioteca Material mais bem estruturada para Vue3 até agora), usando Vite pra criar o projeto e GitHub Packages pra distribuir nossa biblioteca.' } },
      { type: 'p', text: { en: 'Besides that, we’ll also create a Scaffolding, a base structure meant to define some patterns and development best practices.', pt: 'Além disso, também vamos criar um Scaffolding, uma estrutura base pra definir alguns padrões e boas práticas de desenvolvimento.' } },
      { type: 'h2', text: { en: 'Reusable components', pt: 'Componentes reutilizáveis' } },
      { type: 'p', text: { en: 'It’s no secret that in many companies — whether because delivery speed is prioritized or because of the technical level of their developers — Frontend applications often evolve in a disorganized, non-reusable way. This can become a serious problem as the product grows, especially for whoever has to maintain and scale it.', pt: 'Não é segredo que em muitas empresas — seja por priorizarem a velocidade de entrega, seja pelo nível técnico dos desenvolvedores — as aplicações Frontend costumam evoluir de forma desorganizada e sem reuso. Isso pode virar um problema sério à medida que o produto cresce, principalmente pra quem precisa manter e escalar.' } },
      { type: 'p', text: { en: 'So let’s show, in a simple way, how to create a repository/library to provide our components.', pt: 'Então vamos mostrar, de forma simples, como criar um repositório/biblioteca pra fornecer nossos componentes.' } },
      { type: 'p', text: { en: 'Let’s start by creating a project with Vite!', pt: 'Vamos começar criando um projeto com Vite!' } },
      { type: 'code', code: `yarn create vite` },
      { type: 'img', src: '/blog/vue3-part1-vite.png', alt: { en: 'Creating the project with Vite', pt: 'Criando o projeto com Vite' } },
      { type: 'p', text: { en: 'In our case we chose to work with Typescript, but you can opt for Javascript if you prefer.', pt: 'No nosso caso escolhemos trabalhar com Typescript, mas você pode optar por Javascript se preferir.' } },
      { type: 'p', text: { en: 'Right after creating it, we’ll go into the project folder, install the dependencies, and run our project.', pt: 'Logo depois de criar, entramos na pasta do projeto, instalamos as dependências e rodamos o projeto.' } },
      { type: 'code', code: `cd design-system
yarn
yarn dev` },
      { type: 'p', text: { en: 'Once that’s done, you’ll have an app running on localhost similar to this one:', pt: 'Feito isso, você terá um app rodando no localhost parecido com este:' } },
      { type: 'img', src: '/blog/vue3-part1-app.png', alt: { en: 'The default Vite app running', pt: 'O app padrão do Vite rodando' } },
      { type: 'p', text: { en: 'With the project created, it’s time to install a few tools that will help us build our Design System. The first one will be quasar, the Material library that will help us save time developing components.', pt: 'Com o projeto criado, é hora de instalar algumas ferramentas que vão nos ajudar a construir nosso Design System. A primeira será o quasar, a biblioteca Material que vai nos ajudar a ganhar tempo no desenvolvimento dos componentes.' } },
      { type: 'p', text: { en: 'Note: As we can see in the image above, it’s recommended to have the Volar and TS Volar extensions in your VSCode. (Yes, Vetur is a thing of the past)', pt: 'Nota: Como dá pra ver na imagem acima, é recomendável ter as extensões Volar e TS Volar no seu VSCode. (Sim, o Vetur é coisa do passado)' } },
      { type: 'h3', text: { en: 'Installing quasar', pt: 'Instalando o quasar' } },
      { type: 'code', code: `yarn add quasar @quasar/extras
yarn add -D @quasar/vite-plugin sass@1.32.12` },
      { type: 'p', text: { en: 'These commands are for manually installing quasar; since we’re using Vite to start the project, they’re necessary.', pt: 'Esses comandos são pra instalar o quasar manualmente; como estamos usando Vite pra iniciar o projeto, eles são necessários.' } },
      { type: 'p', text: { en: 'You can choose to use quasar-cli to create your structure, but I ran into a lot of problems getting things to work with their pre-built structure.', pt: 'Você pode optar por usar o quasar-cli pra criar sua estrutura, mas eu tive bastante problema pra fazer as coisas funcionarem com a estrutura pré-montada deles.' } },
      { type: 'p', text: { en: 'After running the quasar installation commands, we need to configure our project’s main.ts file.', pt: 'Depois de rodar os comandos de instalação do quasar, precisamos configurar o arquivo main.ts do projeto.' } },
      { type: 'code', code: `// src/main.ts
import { createApp } from 'vue'
import { Quasar } from 'quasar'

// Import icon libraries
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'
import '@quasar/extras/material-icons-round/material-icons-round.css'
import '@quasar/extras/material-icons-sharp/material-icons-sharp.css'
import '@quasar/extras/material-symbols-outlined/material-symbols-outlined.css'
import '@quasar/extras/material-symbols-rounded/material-symbols-rounded.css'
import '@quasar/extras/material-symbols-sharp/material-symbols-sharp.css'
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css'
import '@quasar/extras/themify/themify.css'
import '@quasar/extras/line-awesome/line-awesome.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

// Assumes your root component is App.vue
// and placed in same folder as main.js
import App from './App.vue'

const myApp = createApp(App)

myApp.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
})

// Assumes you have a <div id="app"></div> in your index.html
myApp.mount('#app')` },
      { type: 'p', text: { en: 'Not all of these imports are mandatory — it really depends on what you’re going to use.', pt: 'Nem todos esses imports são obrigatórios — depende bastante do que você vai usar.' } },
      { type: 'p', text: { en: 'Now let’s go to our Vite configuration file; you should leave it like the code below:', pt: 'Agora vamos ao arquivo de configuração do Vite; deixe ele assim como no código abaixo:' } },
      { type: 'code', code: `// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    quasar({
      sassVariables: 'src/quasar-variables.sass'
    })
  ]
})` },
      { type: 'p', text: { en: 'Notice that we have a src/quasar-variables.sass file being imported in the Vite configuration; our next step will be to create it, since that’s where we’ll configure the variables that control the components’ color palette.', pt: 'Repare que temos um arquivo src/quasar-variables.sass sendo importado na configuração do Vite; nosso próximo passo será criá-lo, já que é ali que vamos configurar as variáveis que controlam a paleta de cores dos componentes.' } },
      { type: 'code', code: `// src/quasar-variables.scss
$primary   : #1976D2
$secondary : #26A69A
$accent    : #9C27B0

$dark      : #1D1D1D

$positive  : #21BA45
$negative  : #C10015
$info      : #31CCEC
$warning   : #F2C037` },
      { type: 'p', text: { en: 'Now that we have quasar installed, we can run a quick test by instantiating any component in our template — you’ll see that everything is working as expected.', pt: 'Agora que temos o quasar instalado, podemos fazer um teste rápido instanciando qualquer componente no template — você vai ver que está tudo funcionando como esperado.' } },
      { type: 'p', text: { en: 'Also, at this point, you can delete the HelloWorld component along with the css, images, and assets created in Vite’s default project — give the structure a good cleanup, since we’ll be creating our own components.', pt: 'Aproveitando, a esta altura você já pode apagar o componente HelloWorld junto com o css, imagens e assets criados no projeto padrão do Vite — dê uma boa limpada na estrutura, já que vamos criar nossos próprios componentes.' } },
      { type: 'p', text: { en: 'But first, let’s install Storybook. For those who’ve never used it, it’s a very powerful tool that lets us view our components in real time, letting us change their props and observe their behavior without actually having to install our library in a real application — it’s a huge help when documenting components.', pt: 'Mas antes, vamos instalar o Storybook. Pra quem nunca usou, é uma ferramenta muito poderosa que permite visualizar nossos componentes em tempo real, mudando suas props e observando o comportamento sem precisar instalar a biblioteca numa aplicação real — ajuda demais na hora de documentar componentes.' } },
      { type: 'h3', text: { en: 'Installing Storybook', pt: 'Instalando o Storybook' } },
      { type: 'p', text: { en: 'Installing Storybook is always an adventure of its own; it depends a lot on which libraries and technology (Angular, React, Vue, Svelte, etc.) you’re using, and the versions of Node and Storybook itself that you chose also affect the process. So you may well run into problems that I won’t cover here.', pt: 'Instalar o Storybook é sempre uma aventura à parte; depende muito de quais bibliotecas e tecnologia (Angular, React, Vue, Svelte, etc.) você usa, e as versões do Node e do próprio Storybook que você escolheu também afetam o processo. Então é bem possível que você esbarre em problemas que não vou cobrir aqui.' } },
      { type: 'p', text: { en: 'My tip in these cases is: don’t give up. Like everything in our beloved field of technology, someone has already been through this struggle before — as master Yoda would say, “If search you desire, find it you will!”', pt: 'Minha dica nesses casos é: não desista. Como tudo na nossa amada área de tecnologia, alguém já passou por essa luta antes — como diria o mestre Yoda: “Se procurar você deseja, encontrar você irá!”' } },
      { type: 'code', code: `npx storybook init` },
      { type: 'p', text: { en: 'After installing it, you need to configure quasar to work together with Storybook.', pt: 'Depois de instalar, você precisa configurar o quasar pra funcionar junto com o Storybook.' } },
      { type: 'p', text: { en: 'Inside the project, a .storybook folder was created; in it you’ll find a preview.js or .cjs file — leave it like this:', pt: 'Dentro do projeto, foi criada uma pasta .storybook; nela você vai encontrar um arquivo preview.js ou .cjs — deixe ele assim:' } },
      { type: 'code', code: `// .storybook/preview.js
import '@quasar/extras/roboto-font/roboto-font.css';
// These are optional
import '@quasar/extras/material-icons/material-icons.css';
import '@quasar/extras/animate/fadeInUp.css';
import '@quasar/extras/animate/fadeOutDown.css';
import '@quasar/extras/animate/fadeInRight.css';
import '@quasar/extras/animate/fadeOutRight.css';
import { Notify } from "quasar";

// Loads the quasar styles and registers quasar functionality with storybook
import 'quasar/dist/quasar.css';
import { setup } from '@storybook/vue3';
import { Quasar } from 'quasar';

setup((app) => {
  app.use(Quasar, {
    plugins: {
      Notify,
    }, // import Quasar plugins and add here
    config: {
      brand: {
        primary: '#1976d2',
        secondary: '#26A69A',
        accent: '#9C27B0',
        dark: '#1d1d1d',
        'dark-page': '#121212',
        positive: '#21BA45',
        negative: '#C10015',
        info: '#31CCEC',
        warning: '#F2C037'
      }
    }
  });
});

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};` },
      { type: 'p', text: { en: 'Also, if you want to set up a custom theme, you can create these files:', pt: 'Além disso, se quiser configurar um tema personalizado, você pode criar estes arquivos:' } },
      { type: 'code', code: `// .storybook/manager.js
import { addons } from '@storybook/addons';
import theme from './theme';

addons.setConfig({
  theme: theme,
});

// .storybook/theme.js
import { create } from '@storybook/theming';

export default create({
  base: 'light',
  brandTitle: 'Design System Components',
  brandUrl: 'URL_REPOSITORIO',
  brandImage: 'URL_LOGO_EMPRESA',
});` },
      { type: 'p', text: { en: 'Now you can create your “.stories.js” files, importing the components and documenting their props and events. I won’t go into much detail about how to use Storybook — the concept to keep in mind is how Storybook works, so it’s worth reading their docs on writing Stories.', pt: 'Agora você pode criar seus arquivos “.stories.js”, importando os componentes e documentando suas props e eventos. Não vou entrar em muitos detalhes sobre como usar o Storybook — o conceito a ter em mente é como o Storybook funciona, então vale a pena ler a documentação deles sobre escrever Stories.' } },
      { type: 'p', text: { en: 'Now that we have Storybook installed and ready to receive our components, I’ll create a basic button component with quasar+Vue3 and a Storybook file as an example.', pt: 'Agora que temos o Storybook instalado e pronto pra receber nossos componentes, vou criar um componente de botão básico com quasar+Vue3 e um arquivo de Storybook como exemplo.' } },
      { type: 'p', text: { en: 'Inside the components folder, I’ll create a buttons folder, and inside the buttons folder, I’ll create a QcButton.vue file.', pt: 'Dentro da pasta components, vou criar uma pasta buttons, e dentro da pasta buttons, vou criar um arquivo QcButton.vue.' } },
      { type: 'code', code: `<template>
  <div class="QcButton__wrapper">
    <q-btn
      :color="color"
      :label="label"
      :icon="icon"
      :outline="outline"
      :round="round"
      :size="size"
      :loading="loading"
      :flat="flat"
      :type="type"
    >
      <template v-slot:loading>
        <q-spinner-facebook />
      </template>
    </q-btn>
  </div>
</template>

<script setup lang="ts">
export interface QcButtonInterface {
  color?: string;
  label?: string;
  outline?: boolean;
  icon?: string;
  round?: boolean;
  size?: string;
  loading?: boolean;
  flat?: boolean;
  type?: string;
}
const props = withDefaults(defineProps<QcButtonInterface>(), {
  color: 'primary',
  label: 'Label',
  outline: false,
  round: false,
  size: 'lg',
  loading: false,
  flat: false,
});
</script>

<style lang="scss" scoped></style>` },
      { type: 'p', text: { en: 'Notice that I’m using Vue3’s composition API and Typescript interfaces, in addition to the <q-btn>, which is a quasar component.', pt: 'Repare que estou usando a composition API do Vue3 e interfaces do Typescript, além do <q-btn>, que é um componente do quasar.' } },
      { type: 'p', text: { en: 'Nothing stops you from creating the button however you find most convenient.', pt: 'Nada te impede de criar o botão da forma que achar mais conveniente.' } },
      { type: 'p', text: { en: 'Now, in the same button folder, I’ll create the QcButton.stories.js file. It’s important that Storybook’s configuration is set up to look inside your project folder, since the default setup keeps .stories.js files inside a stories folder that’s automatically created by the library.', pt: 'Agora, na mesma pasta button, vou criar o arquivo QcButton.stories.js. É importante que a configuração do Storybook esteja preparada pra procurar dentro da pasta do seu projeto, já que o setup padrão mantém os arquivos .stories.js dentro de uma pasta stories criada automaticamente pela biblioteca.' } },
      { type: 'p', text: { en: 'If that’s not the case, you can fix it in the .storybook/main.js file.', pt: 'Se não for o caso, você pode ajustar isso no arquivo .storybook/main.js.' } },
      { type: 'code', code: `// .storybook/main.js
module.exports = {
  "stories": ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  ... // rest of the file
}` },
      { type: 'p', text: { en: 'Now let’s go to our QcButton.stories.js file:', pt: 'Agora vamos ao nosso arquivo QcButton.stories.js:' } },
      { type: 'code', code: `// src/components/buttons/QcButton.stories.js
import QcButton from './QcButton.vue';

export default {
  title: 'Components/Button',
  component: QcButton,
  argTypes: {
    onClick: {},
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    icon: {
      control: { type: 'select' },
      options: ['navigation', 'add_a_photo', 'camera', 'camera_front', 'my_location'],
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'amber', 'brown-5', 'deep-orange', 'purple', 'black'],
    },
  },
};

const Template = (args) => ({
  components: { QcButton },
  setup() {
    return { args };
  },
  template: '<QcButton v-bind="args" @click.capture="onClick" />',
});

export const Primary = Template.bind({});
Primary.args = {
  label: 'Button',
  loading: false,
  round: false,
  outline: false,
  color: 'primary',
  type: 'submit',
};` },
      { type: 'p', text: { en: 'Finally, after running the yarn run storybook command, you’ll get something like this:', pt: 'Por fim, depois de rodar o comando yarn run storybook, você vai ter algo assim:' } },
      { type: 'img', src: '/blog/vue3-part1-storybook.jpg', alt: { en: 'The button component in Storybook', pt: 'O componente de botão no Storybook' } },
      { type: 'p', text: { en: 'With that, we have our Storybook and our first Vue3 + quasar + Typescript component!', pt: 'Com isso, temos nosso Storybook e nosso primeiro componente Vue3 + quasar + Typescript!' } },
      { type: 'p', text: { en: 'Of course, this is a pretty simple component, and you’re probably wondering: why go through all this trouble just to wrap a quasar component inside another .vue component?', pt: 'Claro, este é um componente bem simples, e você provavelmente está se perguntando: por que todo esse trabalho só pra envelopar um componente do quasar dentro de outro componente .vue?' } },
      { type: 'p', text: { en: 'The answer is simple: the way we’re doing it, all the work of building the component is handled by a dev or a team with more technical expertise, encapsulating all the complexity inside that component. For the rest of the squads or tribes, all that’s left is to “copy” and “paste” — just start using a ready-made component, already matching the client’s visual identity.', pt: 'A resposta é simples: do jeito que estamos fazendo, todo o trabalho de construir o componente fica a cargo de um dev ou de um time com mais domínio técnico, encapsulando toda a complexidade dentro daquele componente. Pro resto das squads ou tribos, resta só “copiar” e “colar” — é só começar a usar um componente pronto, já alinhado com a identidade visual do cliente.' } },
      { type: 'p', text: { en: 'Besides, a simple button doesn’t show off the full power this concept can offer — imagine a complex data-table, with date formatting, menu actions, and method after method, ready to use instantly, or a text-field with built-in document, value, zip code formatting and validations.', pt: 'Além disso, um botão simples não mostra todo o poder que esse conceito pode oferecer — imagine um data-table complexo, com formatação de datas, ações de menu e método após método, pronto pra usar na hora, ou um text-field com formatação de documento, valor, CEP e validações embutidas.' } },
      { type: 'p', text: { en: 'Or maybe a video/image upload component built on top of quasar, with its logic and visual identity fully encapsulated, simply receiving props and emitting events once the process is done. The possibilities are huge!', pt: 'Ou quem sabe um componente de upload de vídeo/imagem construído em cima do quasar, com sua lógica e identidade visual totalmente encapsuladas, simplesmente recebendo props e emitindo eventos quando o processo termina. As possibilidades são enormes!' } },
      { type: 'p', text: { en: 'Well, now that we have a basic structure for our components, it’s time to move our project forward a bit. In the next post we’ll talk a little about unit testing with Jest, and setting up Eslint, Prettier, and Husky. One step at a time — remember that Frontend development isn’t a 100-meter dash, it’s a marathon; consistency matters more than speed, and that’s how we go far!', pt: 'Bom, agora que temos uma estrutura básica pros nossos componentes, é hora de avançar um pouco o projeto. No próximo post vamos falar um pouco sobre testes unitários com Jest e sobre configurar Eslint, Prettier e Husky. Um passo de cada vez — lembre-se de que o desenvolvimento Frontend não é uma corrida de 100 metros, é uma maratona; consistência importa mais que velocidade, e é assim que a gente vai longe!' } },
    ],
  },
  {
    slug: 'a-complete-vue3-setup-part-2',
    date: '2023-03-29',
    readingMinutes: 7,
    tags: ['Vue', 'Jest', 'ESLint', 'Prettier', 'Husky'],
    image: '/blog/vue3-part2-cover.jpg',
    category: { en: 'Engineering', pt: 'Engenharia', es: 'Ingeniería', de: 'Engineering', fr: 'Ingénierie', ja: 'エンジニアリング' },
    title: {
      en: 'A Complete Vue 3 Setup — Part II',
      pt: 'Um Setup Completo com Vue 3 — Parte II',
      es: 'Un Setup Completo con Vue 3 — Parte II',
      de: 'Ein komplettes Vue-3-Setup — Teil II',
      fr: 'Un setup complet avec Vue 3 — Partie II',
      ja: '完全な Vue 3 セットアップ — Part II',
    },
    excerpt: {
      en: 'Setting up unit tests with Jest, plus Husky, Prettier and ESLint.',
      pt: 'Configurando testes unitários com Jest, além de Husky, Prettier e ESLint.',
      es: 'Configurando pruebas unitarias con Jest, además de Husky, Prettier y ESLint.',
      de: 'Unit-Tests mit Jest einrichten, dazu Husky, Prettier und ESLint.',
      fr: 'Mettre en place les tests unitaires avec Jest, plus Husky, Prettier et ESLint.',
      ja: 'Jest でユニットテストを設定し、Husky・Prettier・ESLint も整える。',
    },
    quote: {
      en: 'In most cases, it’s crucial to think about tests even before developing our features.',
      pt: 'Na maioria dos casos, é crucial pensar em testes até antes de desenvolver nossas features.',
      es: 'En la mayoría de los casos, es crucial pensar en pruebas incluso antes de desarrollar nuestras features.',
      de: 'In den meisten Fällen ist es entscheidend, an Tests zu denken, noch bevor wir unsere Features entwickeln.',
      fr: 'Dans la plupart des cas, il est crucial de penser aux tests avant même de développer nos fonctionnalités.',
      ja: 'たいていの場合、機能を作る前にテストを考えることが重要だ。',
    },
    blocks: [
      { type: 'p', text: { en: '“Jarvis, sometimes you have to run before you can walk.” — Stark, Tony.', pt: '“Jarvis, às vezes você tem que correr antes de andar.” — Stark, Tony.' } },
      { type: 'p', text: { en: 'We start this post by paraphrasing the famous contemporary thinker, Tony Stark.', pt: 'Começamos este post parafraseando o famoso pensador contemporâneo, Tony Stark.' } },
      { type: 'p', text: { en: 'The concept behind this phrase is that, in the vast majority of cases, it’s crucial to think about tests even before developing our features.', pt: 'O conceito por trás dessa frase é que, na grande maioria dos casos, é crucial pensar em testes até antes de desenvolver nossas features.' } },
      { type: 'p', text: { en: 'Unfortunately in Frontend, tests are usually neglected at many companies. We can only change this reality by emphasizing how important it is to test your web app, so let’s talk a bit about that in this post.', pt: 'Infelizmente no Frontend, os testes costumam ser negligenciados em muitas empresas. Só conseguimos mudar essa realidade reforçando o quanto é importante testar sua web app, então vamos falar um pouco sobre isso neste post.' } },
      { type: 'p', text: { en: '“Tests allow you to isolate specific functionality, detect bugs early, and ensure that changes to one component don’t break other parts of the application.” — Nidhi D.', pt: '“Os testes permitem isolar funcionalidades específicas, detectar bugs cedo e garantir que mudanças em um componente não quebrem outras partes da aplicação.” — Nidhi D.' } },
      { type: 'h2', text: { en: 'Setting up Jest', pt: 'Configurando o Jest' } },
      { type: 'p', text: { en: 'We’ll use Jest, which is currently the most famous library for web applications. Besides that, if we look closely, it’s also superior to the others (Karma, Mocha, etc.) when it comes to performance and concise syntax.', pt: 'Vamos usar o Jest, que atualmente é a biblioteca mais famosa para aplicações web. Além disso, se olharmos de perto, ele também é superior às outras (Karma, Mocha, etc.) quando o assunto é performance e sintaxe concisa.' } },
      { type: 'code', code: `yarn add -D jest @vue/test-utils` },
      { type: 'p', text: { en: 'After the installation, you need to create the jest configuration file. Create a file at the root of the project called .jest.config.json', pt: 'Depois da instalação, você precisa criar o arquivo de configuração do jest. Crie um arquivo na raiz do projeto chamado .jest.config.json' } },
      { type: 'code', code: `// .jest.config.json
{
  "transform": {
    "^.+\\\\.jsx?$": "babel-jest",
    "^.+\\\\.vue$": "@vue/vue3-jest",
    ".+\\\\.(css|scss|png|jpg|svg)$": "jest-transform-stub"
  },
  "testEnvironment": "jsdom",
  "testEnvironmentOptions": {
    "customExportConditions": ["node", "node-addons"]
  },
  "moduleNameMapper": {
    "^@/(.*)$": "<rootDir>/src/$1"
  }
}` },
      { type: 'p', text: { en: 'Now let’s go to our package.json and add this line to the scripts:', pt: 'Agora vamos ao nosso package.json e adicionamos esta linha aos scripts:' } },
      { type: 'code', code: `// package.json
"test": "jest"` },
      { type: 'img', src: '/blog/vue3-part2-err-jsdom.png', alt: { en: 'Validation error: jest-environment-jsdom cannot be found', pt: 'Erro de validação: jest-environment-jsdom não encontrado' } },
      { type: 'img', src: '/blog/vue3-part2-err-vue3jest.png', alt: { en: 'Validation error: @vue/vue3-jest not found', pt: 'Erro de validação: @vue/vue3-jest não encontrado' } },
      { type: 'img', src: '/blog/vue3-part2-err-stub.png', alt: { en: 'Validation error: jest-transform-stub not found', pt: 'Erro de validação: jest-transform-stub não encontrado' } },
      { type: 'p', text: { en: 'When running “yarn run test” you might run into some of the errors above. These are libraries required for the configuration to work, so run this command and the problem will be solved:', pt: 'Ao rodar “yarn run test” você pode esbarrar em alguns dos erros acima. São bibliotecas necessárias para a configuração funcionar, então rode este comando e o problema estará resolvido:' } },
      { type: 'code', code: `yarn add jest-transform-stub @vue/vue3-jest jest-environment-jsdom` },
      { type: 'p', text: { en: 'Now yes! When running “yarn run test”, you’ll see something like this in your terminal:', pt: 'Agora sim! Ao rodar “yarn run test”, você vai ver algo assim no seu terminal:' } },
      { type: 'img', src: '/blog/vue3-part2-notests.png', alt: { en: 'No tests found — 13 files checked', pt: 'Nenhum teste encontrado — 13 arquivos verificados' } },
      { type: 'p', text: { en: 'Even though it looks like an error, it means the configuration worked! We just don’t have any test file in the application yet.', pt: 'Mesmo parecendo um erro, isso significa que a configuração funcionou! Só não temos nenhum arquivo de teste na aplicação ainda.' } },
      { type: 'p', text: { en: 'If you remember the first part of this tutorial, you know we created a button component in the following folder src/components/buttons. What we’ll do next is create a QcButton.test.js file in the same folder.', pt: 'Se você lembra da primeira parte deste tutorial, sabe que criamos um componente de botão na pasta src/components/buttons. O que vamos fazer agora é criar um arquivo QcButton.test.js na mesma pasta.' } },
      { type: 'code', code: `// QcButton.test.js
import QcButton from './QcButton.vue';
import { mount } from '@vue/test-utils';

test('Button Works', () => {
  const wrapper = mount(QcButton);
  expect(wrapper).toBeTruthy();
});` },
      { type: 'p', text: { en: 'Now that we have a valid test, you’ll probably see the following error:', pt: 'Agora que temos um teste válido, você provavelmente vai ver o seguinte erro:' } },
      { type: 'img', src: '/blog/vue3-part2-importerr.png', alt: { en: 'SyntaxError: Cannot use import statement outside a module', pt: 'SyntaxError: Cannot use import statement outside a module' } },
      { type: 'p', text: { en: 'This happens because Jest runs tests in a Node.js environment, which doesn’t support the use of import by default. To fix this we’ll install babel-jest, which will help us by transpiling our javascript.', pt: 'Isso acontece porque o Jest roda os testes num ambiente Node.js, que não suporta o uso de import por padrão. Para resolver, vamos instalar o babel-jest, que vai nos ajudar transpilando nosso javascript.' } },
      { type: 'code', code: `yarn add --dev babel-jest @babel/preset-env` },
      { type: 'p', text: { en: 'In our jest configuration file, I had already set up babel-jest, so we’ll just need to create a .babelrc file at the root of our project.', pt: 'No nosso arquivo de configuração do jest eu já tinha configurado o babel-jest, então só vamos precisar criar um arquivo .babelrc na raiz do projeto.' } },
      { type: 'code', code: `// .babelrc
{
  "presets": ["@babel/preset-env"]
}` },
      { type: 'p', text: { en: 'And now when we run our test script… success!', pt: 'E agora, ao rodar nosso script de teste… sucesso!' } },
      { type: 'img', src: '/blog/vue3-part2-success.png', alt: { en: 'Test Suites: 1 passed, Tests: 1 passed', pt: 'Test Suites: 1 passed, Tests: 1 passed' } },
      { type: 'p', text: { en: 'Of course this is a basic test, it only checks whether the component is being mounted. As your component grows and becomes more complex, the tests for data input/output, methods, and requests will evolve along with it.', pt: 'Claro que este é um teste básico, ele só verifica se o componente está sendo montado. À medida que seu componente cresce e fica mais complexo, os testes de entrada/saída de dados, métodos e requisições vão evoluir junto.' } },
      { type: 'p', text: { en: 'Also, just as we talked about Storybook earlier, the technology (Vue, Angular, React, Svelte, etc.), the global state management library, the material library, and so on — all of this influences how you’ll build your test, because once the component is rendered in the test, it becomes a “mirror” of your real component, thus requiring all the helpers and libraries your real component needs to work.', pt: 'Além disso, assim como falamos do Storybook antes, a tecnologia (Vue, Angular, React, Svelte, etc.), a biblioteca de estado global, a biblioteca material e por aí vai — tudo isso influencia como você vai construir seu teste, porque uma vez que o componente é renderizado no teste, ele vira um “espelho” do seu componente real, exigindo todos os helpers e bibliotecas que o componente real precisa pra funcionar.' } },
      { type: 'p', text: { en: 'That’s why it’s not uncommon for tests to blow up due to missing dependencies in the Jest file. Each case is different, and third-party libraries usually provide, in their documentation, methods for working together with Jest.', pt: 'É por isso que não é incomum os testes explodirem por causa de dependências faltando no arquivo do Jest. Cada caso é diferente, e as bibliotecas de terceiros geralmente fornecem, na documentação, formas de trabalhar em conjunto com o Jest.' } },
      { type: 'p', text: { en: 'Bonus: You can run the command below to generate a coverage folder in your project. It works like a snapshot, showing which files and lines of code are covered by tests and which aren’t. Besides that, we can link the Frontend coverage with the sonarqube of the deploy pipeline, setting a minimum coverage percentage for the pipeline to deploy successfully.', pt: 'Bônus: você pode rodar o comando abaixo para gerar uma pasta de coverage no seu projeto. Funciona como um snapshot, mostrando quais arquivos e linhas de código estão cobertos por testes e quais não estão. Além disso, dá pra ligar o coverage do Frontend ao sonarqube da pipeline de deploy, definindo uma porcentagem mínima de cobertura para a pipeline conseguir subir.' } },
      { type: 'code', code: `yarn run test --coverage` },
      { type: 'img', src: '/blog/vue3-part2-coverage.png', alt: { en: 'A test coverage report', pt: 'Um relatório de cobertura de testes' } },
      { type: 'h2', text: { en: 'Lint, Prettier, Husky, a screwdriver and a wire', pt: 'Lint, Prettier, Husky, uma chave de fenda e um arame' } },
      { type: 'img', src: '/blog/vue3-part2-beetle.jpg', alt: { en: 'A Beetle’s spare-tire compartment full of tools', pt: 'O compartimento do estepe de um Fusca cheio de ferramentas' } },
      { type: 'p', text: { en: 'For those who’ve never had a Beetle (like me), they say that with a screwdriver and a piece of wire you can fix any kind of problem it might have on the road.', pt: 'Pra quem nunca teve um Fusca (como eu), dizem que com uma chave de fenda e um pedaço de arame dá pra resolver qualquer tipo de problema que ele tenha na estrada.' } },
      { type: 'p', text: { en: 'That’s the concept behind these three tools that help a lot in the day-to-day of modern Frontend. So without further ado, let’s talk about them — I’ll leave the definitions for each below.', pt: 'Esse é o conceito por trás dessas três ferramentas que ajudam muito no dia a dia do Frontend moderno. Então sem mais delongas, vamos falar delas — deixo abaixo a definição de cada uma.' } },
      { type: 'p', text: { en: 'ESLint statically analyzes your code to quickly find problems. It’s integrated into most text editors and you can run ESLint as part of your continuous integration pipeline.', pt: 'O ESLint analisa seu código estaticamente para encontrar problemas rapidamente. Ele é integrado à maioria dos editores de texto e você pode rodar o ESLint como parte da sua pipeline de integração contínua.' } },
      { type: 'p', text: { en: 'In short, we use ESLint in Frontend projects so it can show us possible errors in our code, whether they’re syntax errors, logic errors, etc. It also helps us standardize the way the code is written, defining spacing, commas, quotes, line breaks, and much more!', pt: 'Resumindo, usamos o ESLint em projetos Frontend para que ele nos mostre possíveis erros no código, sejam erros de sintaxe, de lógica, etc. Ele também ajuda a padronizar a forma como o código é escrito, definindo espaçamento, vírgulas, aspas, quebras de linha e muito mais!' } },
      { type: 'p', text: { en: 'Prettier is a code formatter that supports several file types such as JavaScript, JSX, Angular, Vue, TypeScript, HTML, CSS, SCSS, and JSON.', pt: 'O Prettier é um formatador de código que suporta vários tipos de arquivo como JavaScript, JSX, Angular, Vue, TypeScript, HTML, CSS, SCSS e JSON.' } },
      { type: 'p', text: { en: 'Basically, Prettier will help us by formatting our code so you don’t have to indent your html, css, js line by line the way the Incas used to do in the past.', pt: 'Basicamente, o Prettier vai nos ajudar formatando o código pra você não ter que indentar seu html, css, js linha por linha como os incas faziam antigamente.' } },
      { type: 'p', text: { en: 'Husky is a tool that lets us easily configure Git hooks and run scripts we want at certain stages. In other words, when you’re about to commit a change, or on any other Git hook, we can run commands like ESLint and Prettier, or even tests to ensure coverage.', pt: 'O Husky é uma ferramenta que permite configurar facilmente Git hooks e rodar scripts que a gente quiser em certas etapas. Ou seja, quando você está prestes a commitar uma mudança, ou em qualquer outro Git hook, podemos rodar comandos como ESLint e Prettier, ou até testes para garantir a cobertura.' } },
      { type: 'h3', text: { en: 'Installing and configuring Eslint + Prettier', pt: 'Instalando e configurando Eslint + Prettier' } },
      { type: 'code', code: `yarn add --dev eslint eslint-config-prettier eslint-plugin-prettier prettier eslint-plugin-vue @typescript-eslint/eslint-plugin @typescript-eslint/parser` },
      { type: 'p', text: { en: 'After installing all these dependencies, let’s start configuring. We’ll create a .eslintrc.cjs file at the root of the project.', pt: 'Depois de instalar todas essas dependências, vamos começar a configurar. Vamos criar um arquivo .eslintrc.cjs na raiz do projeto.' } },
      { type: 'p', text: { en: 'Note: Not all of these libraries and configurations are necessary if you’re not going to use Typescript.', pt: 'Nota: nem todas essas bibliotecas e configurações são necessárias se você não for usar Typescript.' } },
      { type: 'code', code: `// .eslintrc.cjs
module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:vue/vue3-essential",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "overrides": [
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "vue",
    "@typescript-eslint",
    "prettier"
  ],
  "rules": {
  }
}` },
      { type: 'p', text: { en: 'NOTE: One of the readers and a personal friend shared that he had some problems using the basic Typescript and Prettier plugin. It might be a good idea to use the Vue-specific ones in case you run into any kind of problem:', pt: 'NOTA: um dos leitores e amigo pessoal contou que teve alguns problemas usando o plugin básico de Typescript e Prettier. Pode ser uma boa ideia usar os específicos do Vue caso você esbarre em algum tipo de problema:' } },
      { type: 'code', code: `"extends": [
  ...
  "@vue/typescript/recommended",
  "@vue/prettier",
  "@vue/prettier/@typescript-eslint"
],
...` },
      { type: 'p', text: { en: 'Now let’s add the following scripts to our package.json', pt: 'Agora vamos adicionar os seguintes scripts ao nosso package.json' } },
      { type: 'code', code: `"lint": "eslint src --ext \\"**/*.{ts,tsx,vue}\\" --no-error-on-unmatched-pattern",
"lint:fix": "eslint src --ext \\"**/*.{ts,tsx,vue}\\" --fix --no-error-on-unmatched-pattern",
"format": "npx prettier \\"src/**/*.{js,jsx,ts,tsx,html,css,scss,vue}\\" --write"` },
      { type: 'p', text: { en: 'Besides that, we need to create a .prettierrc.json file at the root of the project. I’ll leave some default configurations, but both in the Prettier file and in ESLint, the rules can be customized in whatever way best suits your project.', pt: 'Além disso, precisamos criar um arquivo .prettierrc.json na raiz do projeto. Vou deixar algumas configurações padrão, mas tanto no arquivo do Prettier quanto no ESLint, as regras podem ser customizadas da forma que melhor servir ao seu projeto.' } },
      { type: 'code', code: `// .prettierrc.json
{
  "trailingComma": "es5",
  "printWidth": 80,
  "singleQuote": true,
  "useTabs": false,
  "tabWidth": 2,
  "semi": true,
  "bracketSpacing": true
}` },
      { type: 'p', text: { en: 'With that, we have our entire environment configured and we can run the commands below to format or fix our code.', pt: 'Com isso, temos todo o nosso ambiente configurado e podemos rodar os comandos abaixo para formatar ou corrigir nosso código.' } },
      { type: 'code', code: `// Prettier
yarn run format

// ESLint
yarn run lint:fix` },
      { type: 'h3', text: { en: 'Installing and configuring Husky 🐺', pt: 'Instalando e configurando o Husky 🐺' } },
      { type: 'p', text: { en: 'Prerequisite: make sure you’ve initialized your project with git init.', pt: 'Pré-requisito: garanta que você inicializou seu projeto com git init.' } },
      { type: 'code', code: `npx husky-init && yarn
npx husky install
npx husky add .husky/pre-commit "npm run lint:fix"
npx husky add .husky/pre-commit "npm run format"` },
      { type: 'p', text: { en: 'Running these commands in sequence, we’ll have our husky installed and configured to run ESLint and Prettier on every commit! There are many other hooks and you can use them in whatever way works best for your project.', pt: 'Rodando esses comandos em sequência, teremos nosso husky instalado e configurado para rodar ESLint e Prettier a cada commit! Existem muitos outros hooks e você pode usá-los da forma que funcionar melhor pro seu projeto.' } },
      { type: 'h2', text: { en: 'Conclusion', pt: 'Conclusão' } },
      { type: 'p', text: { en: 'It’s a lot of tools, I know! Frontend is a tangle of pieces that in the end become a beautiful unicorn, or in this case, a project.', pt: 'É bastante ferramenta, eu sei! Frontend é um emaranhado de peças que no fim viram um lindo unicórnio, ou neste caso, um projeto.' } },
      { type: 'p', text: { en: 'Over time everything gets easier and you start working organically with all of it, and trust me, your productivity will increase in a crazy way, your code tested with Jest will be less buggy, and the quality of your web apps will be elevated. Like any change, it can be hard at the beginning, but don’t forget: practice makes perfect.', pt: 'Com o tempo tudo fica mais fácil e você começa a trabalhar com tudo isso de forma orgânica e, confie em mim, sua produtividade vai aumentar de um jeito absurdo, seu código testado com Jest vai ter menos bugs e a qualidade das suas web apps vai subir. Como toda mudança, pode ser difícil no começo, mas não esqueça: a prática leva à perfeição.' } },
      { type: 'p', text: { en: 'In the next post we’ll talk a bit about how to provide our component library using NPM and Github Packages, so stay tuned so you don’t miss it.', pt: 'No próximo post vamos falar um pouco sobre como disponibilizar nossa biblioteca de componentes usando NPM e Github Packages, então fica ligado pra não perder.' } },
    ],
  },
  {
    slug: 'blip-flutter-group',
    date: '2026-07-29',
    readingMinutes: 2,
    tags: ['Life', 'Career', 'Blip', 'Flutter'],
    image: '/blog/blip-team.jpg',
    images: ['/blog/blip-team.jpg', '/blog/blip-bowling.jpg', '/blog/blip-snack.jpg'],
    category: { en: 'Career', pt: 'Carreira', es: 'Carrera', de: 'Karriere', fr: 'Carrière', ja: 'キャリア' },
    title: {
      en: 'Blip Flutter Group: Short Time, Deep Mark',
      pt: 'Blip Flutter Group: Pouco Tempo, Marca Profunda',
      es: 'Blip Flutter Group: Poco Tiempo, Huella Profunda',
      de: 'Blip Flutter Group: kurze Zeit, tiefe Spur',
      fr: 'Blip Flutter Group : peu de temps, une empreinte profonde',
      ja: 'Blip Flutter Group：短い時間、深い刻印',
    },
    excerpt: {
      en: "My time with the Blip Flutter Group wasn't long — but it was deeply enriching. On how much I learned, and the incredible people I'll always carry with me.",
      pt: "O tempo que passei no Blip Flutter Group não foi tão longo — mas foi muito enriquecedor. Sobre o quanto aprendi e as pessoas incríveis que levarei sempre comigo.",
      es: "El tiempo que pasé en el Blip Flutter Group no fue tan largo — pero fue muy enriquecedor. Sobre lo mucho que aprendí y las personas increíbles que llevaré siempre conmigo.",
      de: "Meine Zeit bei der Blip Flutter Group war nicht lang — aber zutiefst bereichernd. Darüber, wie viel ich gelernt habe, und über die unglaublichen Menschen, die ich immer bei mir tragen werde.",
      fr: "Mon passage au sein du Blip Flutter Group n'a pas été long — mais profondément enrichissant. Sur tout ce que j'ai appris et les personnes incroyables que je garderai toujours avec moi.",
      ja: "Blip Flutter Group で過ごした時間は長くはなかった——けれど、とても豊かなものでした。どれだけ学んだか、そしていつも心に留めておく素晴らしい人々について。",
    },
    quote: {
      en: "An incredible group I'll always keep in my heart.",
      pt: "Um grupo incrível que guardarei sempre no meu coração.",
      es: "Un grupo increíble que guardaré siempre en mi corazón.",
      de: "Eine unglaubliche Gruppe, die ich für immer in meinem Herzen bewahre.",
      fr: "Un groupe incroyable que je garderai toujours dans mon cœur.",
      ja: "いつまでも心に留めておく、素晴らしいグループ。",
    },
    body: {
      en: [
        "My time with the Blip Flutter Group wasn't especially long — but it was tremendously enriching.",
        "I learned an enormous amount: about Flutter and the craft of building mobile, yes, but also about how a healthy, high-trust team actually works, day to day.",
        "Most of all, I got to work alongside incredible people. A special thank-you goes to my manager, Luís Rocha — always willing to help, and deeply human in the way he leads.",
        "And to the whole team: what an incredible group you are. The kind of people I'll always keep in my heart. Thank you.",
      ],
      pt: [
        "O tempo que passei no Blip Flutter Group não foi tão longo — mas foi muito enriquecedor.",
        "Aprendi imensamente: sobre Flutter e o ofício de construir para mobile, sim, mas também sobre como um time saudável e de alta confiança realmente funciona no dia a dia.",
        "Acima de tudo, pude trabalhar ao lado de pessoas incríveis. Um agradecimento especial ao meu manager, Luís Rocha — sempre disposto a ajudar e muito humano na forma como lidera.",
        "E a todo o time: que grupo incrível vocês são. O tipo de pessoas que guardarei sempre no meu coração. Obrigado.",
      ],
      es: [
        "El tiempo que pasé en el Blip Flutter Group no fue tan largo — pero fue muy enriquecedor.",
        "Aprendí muchísimo: sobre Flutter y el oficio de construir para mobile, sí, pero también sobre cómo un equipo sano y de alta confianza funciona de verdad, día a día.",
        "Por encima de todo, pude trabajar junto a personas increíbles. Un agradecimiento especial a mi manager, Luís Rocha — siempre dispuesto a ayudar y muy humano en su forma de liderar.",
        "Y a todo el equipo: qué grupo tan increíble sois. El tipo de personas que guardaré siempre en mi corazón. Gracias.",
      ],
      de: [
        "Meine Zeit bei der Blip Flutter Group war nicht besonders lang — aber ungemein bereichernd.",
        "Ich habe enorm viel gelernt: über Flutter und das Handwerk der Mobile-Entwicklung, ja, aber auch darüber, wie ein gesundes Team mit hohem Vertrauen tatsächlich Tag für Tag funktioniert.",
        "Vor allem durfte ich an der Seite unglaublicher Menschen arbeiten. Ein besonderer Dank geht an meinen Manager, Luís Rocha — stets hilfsbereit und zutiefst menschlich in seiner Art zu führen.",
        "Und an das ganze Team: was für eine unglaubliche Gruppe ihr seid. Die Art von Menschen, die ich für immer in meinem Herzen bewahre. Danke.",
      ],
      fr: [
        "Mon passage au sein du Blip Flutter Group n'a pas été particulièrement long — mais il a été extrêmement enrichissant.",
        "J'ai énormément appris : sur Flutter et le métier du développement mobile, oui, mais aussi sur la façon dont une équipe saine, fondée sur la confiance, fonctionne réellement au quotidien.",
        "Par-dessus tout, j'ai eu la chance de travailler aux côtés de personnes incroyables. Un merci tout particulier à mon manager, Luís Rocha — toujours prêt à aider et profondément humain dans sa manière de diriger.",
        "Et à toute l'équipe : quel groupe incroyable vous êtes. Le genre de personnes que je garderai toujours dans mon cœur. Merci.",
      ],
      ja: [
        "Blip Flutter Group で過ごした時間は、とりわけ長くはありませんでした——けれど、この上なく豊かなものでした。",
        "学んだことは計り知れません。Flutter やモバイル開発の技についてはもちろん、健全で信頼の厚いチームが日々どう機能するのかについても。",
        "何よりも、素晴らしい人々と共に働けました。とりわけ、マネージャーの Luís Rocha に特別な感謝を——いつでも力を貸してくれ、その導き方はとても人間味にあふれていました。",
        "そしてチームのみんなへ。あなたたちは本当に素晴らしいグループです。いつまでも心に留めておく人たち。ありがとう。",
      ],
    },
  },
  {
    slug: 'ewor-operators-day',
    date: '2025-11-20',
    readingMinutes: 3,
    tags: ['Events', 'Startups', 'Networking'],
    image: '/blog/ewor.jpeg',
    category: { en: 'Career', pt: 'Carreira', es: 'Carrera', de: 'Karriere', fr: 'Carrière', ja: 'キャリア' },
    title: {
      en: 'Inside the First EWOR Operators Day',
      pt: 'Por Dentro do Primeiro EWOR Operators Day',
      es: 'Dentro del Primer EWOR Operators Day',
      de: 'Beim ersten EWOR Operators Day',
      fr: 'Au cœur du premier EWOR Operators Day',
      ja: '第1回 EWOR Operators Day の現場から',
    },
    excerpt: {
      en: "Six hundred people out of thousands, fourteen fellows, sixty founder-level opportunities — and a reminder that the first hires make or break a startup.",
      pt: "Seiscentas pessoas entre milhares, catorze fellows, sessenta oportunidades de nível founder — e um lembrete de que os primeiros contratados fazem ou desfazem uma startup.",
      es: "Seiscientas personas entre miles, catorce fellows, sesenta oportunidades de nivel founder — y un recordatorio de que los primeros fichajes hacen o deshacen una startup.",
      de: "Sechshundert Menschen aus Tausenden, vierzehn Fellows, sechzig Chancen auf Founder-Niveau — und die Erinnerung, dass die ersten Hires über ein Startup entscheiden.",
      fr: "Six cents personnes parmi des milliers, quatorze fellows, soixante opportunités de niveau founder — et un rappel : les premières recrues font ou défont une startup.",
      ja: "数千人の中から600人、14人のフェロー、60を超えるファウンダー級の機会——そして、最初の採用がスタートアップの成否を分けるという再確認。",
    },
    quote: {
      en: "The first members of a team are one of a startup's biggest success factors.",
      pt: "Os primeiros membros de uma equipe são um dos maiores fatores de sucesso de uma startup.",
      es: "Los primeros miembros de un equipo son uno de los mayores factores de éxito de una startup.",
      de: "Die ersten Mitglieder eines Teams sind einer der größten Erfolgsfaktoren eines Startups.",
      fr: "Les premiers membres d'une équipe sont l'un des plus grands facteurs de succès d'une startup.",
      ja: "チームの最初のメンバーは、スタートアップの成功を左右する最大の要因のひとつだ。",
    },
    body: {
      en: [
        "What an incredible experience it was to take part in the first EWOR Operators Day.",
        "Out of thousands of applications, only 600 people made it through — and being part of that selection already says a lot about the level of the event.",
        "It was inspiring to watch 14 EWOR fellows present more than 60 founder-level opportunities to a room full of brilliant people: C-level leaders who have been through IPOs, folks from OpenAI, Palantir, Amazon, Google and Microsoft, serial founders with big exits, maths-olympiad winners, hackathon champions — people who genuinely move the machine.",
        "More than pitches, it was about connections.",
        "The event drives home a point the ecosystem often underrates: the first members of a team are one of a startup's biggest success factors. Operators Day exists to bring those two worlds together — visionary founders and the professionals who can build the future.",
        "A special thank-you goes to Stefano Angelero, for the connection with such incredible people and for opening the doors that make experiences like this possible.",
      ],
      pt: [
        "Que experiência incrível participar do primeiro EWOR Operators Day.",
        "Em meio a milhares de aplicações, apenas 600 talentos chegaram até aqui — e poder fazer parte dessa seleção já diz muito sobre o nível do evento.",
        "Foi inspirador ver 14 EWOR fellows apresentando mais de 60 oportunidades de nível founder, diante de uma sala repleta de pessoas brilhantes: líderes C-level que já passaram por IPOs, profissionais de OpenAI, Palantir, Amazon, Google e Microsoft, fundadores seriais com grandes exits, vencedores de olimpíadas de matemática, campeões de hackathons — gente que realmente move a engrenagem.",
        "Mais do que pitches, foi sobre conexões.",
        "O evento reforça um ponto muitas vezes subestimado no ecossistema: os primeiros membros de uma equipe são um dos maiores fatores de sucesso de uma startup. E o Operators Day existe para aproximar esses dois mundos — founders visionários e profissionais capazes de construir o futuro.",
        "E aqui vai meu agradecimento especial ao Stefano Angelero, pela conexão com pessoas tão incríveis e por abrir portas que tornam experiências assim possíveis.",
      ],
      es: [
        "Qué experiencia tan increíble participar en el primer EWOR Operators Day.",
        "Entre miles de solicitudes, solo 600 personas llegaron hasta aquí — y formar parte de esa selección ya dice mucho del nivel del evento.",
        "Fue inspirador ver a 14 EWOR fellows presentar más de 60 oportunidades de nivel founder ante una sala repleta de gente brillante: líderes C-level que han pasado por IPOs, profesionales de OpenAI, Palantir, Amazon, Google y Microsoft, fundadores seriales con grandes exits, ganadores de olimpiadas de matemáticas, campeones de hackathons — gente que de verdad mueve la maquinaria.",
        "Más que pitches, fue sobre conexiones.",
        "El evento refuerza un punto que el ecosistema suele subestimar: los primeros miembros de un equipo son uno de los mayores factores de éxito de una startup. Y el Operators Day existe para acercar esos dos mundos — founders visionarios y profesionales capaces de construir el futuro.",
        "Y va un agradecimiento especial a Stefano Angelero, por la conexión con personas tan increíbles y por abrir las puertas que hacen posibles experiencias como esta.",
      ],
      de: [
        "Was für eine unglaubliche Erfahrung, am ersten EWOR Operators Day teilzunehmen.",
        "Aus Tausenden Bewerbungen schafften es nur 600 Menschen — und Teil dieser Auswahl zu sein, sagt schon viel über das Niveau des Events.",
        "Es war inspirierend, 14 EWOR Fellows dabei zuzusehen, wie sie über 60 Chancen auf Founder-Niveau vor einem Raum voller brillanter Menschen präsentierten: C-Level-Führungskräfte mit IPO-Erfahrung, Leute von OpenAI, Palantir, Amazon, Google und Microsoft, Serien-Gründer mit großen Exits, Mathematik-Olympiade-Sieger, Hackathon-Champions — Menschen, die das Getriebe wirklich bewegen.",
        "Mehr als um Pitches ging es um Verbindungen.",
        "Das Event bringt einen im Ökosystem oft unterschätzten Punkt auf den Punkt: Die ersten Mitglieder eines Teams sind einer der größten Erfolgsfaktoren eines Startups. Und der Operators Day existiert, um diese zwei Welten zusammenzubringen — visionäre Gründer und die Fachleute, die die Zukunft bauen können.",
        "Ein besonderer Dank geht an Stefano Angelero für die Verbindung zu so großartigen Menschen und dafür, dass er die Türen öffnet, die solche Erfahrungen möglich machen.",
      ],
      fr: [
        "Quelle expérience incroyable de participer au premier EWOR Operators Day.",
        "Parmi des milliers de candidatures, seules 600 personnes sont arrivées jusqu'ici — et faire partie de cette sélection en dit déjà long sur le niveau de l'événement.",
        "Il était inspirant de voir 14 EWOR fellows présenter plus de 60 opportunités de niveau founder devant une salle remplie de gens brillants : des dirigeants C-level passés par des IPO, des profils d'OpenAI, Palantir, Amazon, Google et Microsoft, des fondateurs en série aux grands exits, des lauréats d'olympiades de mathématiques, des champions de hackathons — des gens qui font vraiment tourner la machine.",
        "Plus que des pitchs, il s'agissait de connexions.",
        "L'événement souligne un point souvent sous-estimé dans l'écosystème : les premiers membres d'une équipe sont l'un des plus grands facteurs de succès d'une startup. Et l'Operators Day existe pour rapprocher ces deux mondes — des fondateurs visionnaires et les professionnels capables de bâtir l'avenir.",
        "Un merci tout particulier à Stefano Angelero, pour la mise en relation avec des personnes aussi incroyables et pour l'ouverture des portes qui rendent de telles expériences possibles.",
      ],
      ja: [
        "第1回 EWOR Operators Day に参加できたのは、本当に素晴らしい経験でした。",
        "数千件の応募の中から、たどり着いたのはわずか600人——その選考の一員であること自体が、このイベントの水準を物語っています。",
        "14人の EWOR フェローが、60を超えるファウンダー級の機会を、聡明な人々で埋まった会場に向けて発表する様子は刺激的でした。IPO を経験した C レベルの経営陣、OpenAI・Palantir・Amazon・Google・Microsoft の人材、大きなイグジットを持つ連続起業家、数学オリンピックの受賞者、ハッカソンの優勝者——まさに歯車を動かす人たちです。",
        "ピッチ以上に、それはつながりの場でした。",
        "このイベントは、エコシステムでしばしば過小評価される点を突きます。チームの最初のメンバーは、スタートアップの成功を左右する最大の要因のひとつだということ。Operators Day は、その二つの世界——先見の明を持つファウンダーと、未来を築ける専門家——を近づけるために存在します。",
        "そして、これほど素晴らしい人々とのつながりをくれ、こうした経験を可能にする扉を開いてくれた Stefano Angelero に、特別な感謝を。",
      ],
    },
  },
  {
    slug: 'vue-computed-watch-onmounted',
    date: '2025-10-22',
    readingMinutes: 4,
    tags: ['Vue', 'Reactivity', 'Frontend'],
    image: '/blog/vue-reactivity.jpg',
    category: { en: 'Engineering', pt: 'Engenharia', es: 'Ingeniería', de: 'Engineering', fr: 'Ingénierie', ja: 'エンジニアリング' },
    title: {
      en: 'computed, watch, onMounted: Know the Difference',
      pt: 'computed, watch, onMounted: Saiba a Diferença',
      es: 'computed, watch, onMounted: Conoce la Diferencia',
      de: 'computed, watch, onMounted: Kenne den Unterschied',
      fr: 'computed, watch, onMounted : connaître la différence',
      ja: 'computed・watch・onMounted の違いを押さえる',
    },
    excerpt: {
      en: "Three Vue 3 tools people constantly mix up — and the one clear rule that tells them apart.",
      pt: "Três recursos do Vue 3 que muita gente confunde — e a regra clara que os separa.",
      es: "Tres recursos de Vue 3 que mucha gente confunde — y la regla clara que los distingue.",
      de: "Drei Vue-3-Werkzeuge, die ständig verwechselt werden — und die eine klare Regel, die sie unterscheidet.",
      fr: "Trois outils de Vue 3 souvent confondus — et la règle claire qui les distingue.",
      ja: "混同されがちな Vue 3 の3つの機能——そして、それらを見分ける明快なルール。",
    },
    quote: {
      en: "computed for values, watch to react, onMounted to begin.",
      pt: "computed para valores, watch para reagir, onMounted para começar.",
      es: "computed para valores, watch para reaccionar, onMounted para empezar.",
      de: "computed für Werte, watch zum Reagieren, onMounted zum Beginnen.",
      fr: "computed pour les valeurs, watch pour réagir, onMounted pour démarrer.",
      ja: "値には computed、反応には watch、開始には onMounted。",
    },
    body: {
      en: [
        "Plenty of developers mix up computed, watch and onMounted in Vue 3, yet each one has a very clear purpose.",
        "computed creates derived values automatically and reactively. It is cached, so it only recalculates when its dependencies change — perfect for declarative logic and for displaying data in the template.",
        "watch is for reacting to changes and running side effects: API calls, logging, syncing data. Reach for it when you need to do something in response to a change.",
        "onMounted is a lifecycle hook that runs once, when the component is mounted — ideal for fetching initial data or touching the DOM.",
        "In short: computed for automatic, reactive values; watch to react and trigger side effects; onMounted to initialise the component. A simple distinction, but essential for writing clean, efficient Vue.",
      ],
      pt: [
        "Muita gente confunde computed, watch e onMounted no Vue 3, mas cada um tem um propósito bem claro.",
        "computed cria valores derivados de forma automática e reativa. É cacheado, ou seja, só recalcula quando as dependências mudam — ideal para lógica declarativa e para exibir dados no template.",
        "watch serve para reagir a mudanças e executar efeitos colaterais: chamadas de API, logs, sincronização de dados. Use quando você precisa 'fazer algo' em resposta a uma alteração.",
        "onMounted é um hook de ciclo de vida, executado uma vez quando o componente é montado — perfeito para buscar dados iniciais ou interagir com o DOM.",
        "Em resumo: computed para valores automáticos e reativos; watch para reagir e disparar efeitos; onMounted para inicializar o componente. Um conceito simples, mas essencial para escrever código Vue limpo e eficiente.",
      ],
      es: [
        "Mucha gente confunde computed, watch y onMounted en Vue 3, pero cada uno tiene un propósito muy claro.",
        "computed crea valores derivados de forma automática y reactiva. Está cacheado, así que solo recalcula cuando cambian sus dependencias — ideal para lógica declarativa y para mostrar datos en el template.",
        "watch sirve para reaccionar a cambios y ejecutar efectos secundarios: llamadas a API, logs, sincronización de datos. Úsalo cuando necesitas 'hacer algo' en respuesta a un cambio.",
        "onMounted es un hook de ciclo de vida que se ejecuta una vez, cuando el componente se monta — perfecto para obtener datos iniciales o interactuar con el DOM.",
        "En resumen: computed para valores automáticos y reactivos; watch para reaccionar y disparar efectos; onMounted para inicializar el componente. Un concepto simple, pero esencial para escribir código Vue limpio y eficiente.",
      ],
      de: [
        "Viele Entwickler verwechseln computed, watch und onMounted in Vue 3, dabei hat jedes einen sehr klaren Zweck.",
        "computed erzeugt abgeleitete Werte automatisch und reaktiv. Es ist gecacht und berechnet nur neu, wenn sich seine Abhängigkeiten ändern — perfekt für deklarative Logik und die Anzeige im Template.",
        "watch dient dazu, auf Änderungen zu reagieren und Seiteneffekte auszuführen: API-Aufrufe, Logging, Datenabgleich. Greife dazu, wenn du als Reaktion auf eine Änderung 'etwas tun' musst.",
        "onMounted ist ein Lifecycle-Hook, der einmal ausgeführt wird, wenn die Komponente gemountet ist — ideal, um initiale Daten zu laden oder mit dem DOM zu arbeiten.",
        "Kurz gesagt: computed für automatische, reaktive Werte; watch zum Reagieren und Auslösen von Effekten; onMounted zum Initialisieren der Komponente. Ein einfaches, aber wesentliches Konzept für sauberen, effizienten Vue-Code.",
      ],
      fr: [
        "Beaucoup de développeurs confondent computed, watch et onMounted dans Vue 3, alors que chacun a un rôle très clair.",
        "computed crée des valeurs dérivées de façon automatique et réactive. Il est mis en cache et ne recalcule que lorsque ses dépendances changent — parfait pour la logique déclarative et l'affichage dans le template.",
        "watch sert à réagir aux changements et à exécuter des effets de bord : appels d'API, logs, synchronisation de données. À utiliser quand vous devez 'faire quelque chose' en réponse à un changement.",
        "onMounted est un hook de cycle de vie exécuté une seule fois, au montage du composant — idéal pour charger les données initiales ou manipuler le DOM.",
        "En résumé : computed pour des valeurs automatiques et réactives ; watch pour réagir et déclencher des effets ; onMounted pour initialiser le composant. Un concept simple, mais essentiel pour écrire du Vue propre et efficace.",
      ],
      ja: [
        "Vue 3 では computed・watch・onMounted を混同する人が多いですが、それぞれの役割は非常に明確です。",
        "computed は派生した値を自動的かつリアクティブに作ります。キャッシュされ、依存する値が変わったときだけ再計算されます——宣言的なロジックや、テンプレートでの表示に最適です。",
        "watch は変化に反応して副作用を実行するためのものです。API 呼び出し、ログ、データの同期など。変化に応じて「何かをする」必要があるときに使います。",
        "onMounted はライフサイクルフックで、コンポーネントがマウントされたときに一度だけ実行されます——初期データの取得や DOM 操作に最適です。",
        "まとめると、自動でリアクティブな値には computed、反応して副作用を起こすには watch、コンポーネントの初期化には onMounted。単純ですが、クリーンで効率的な Vue コードを書くうえで欠かせない考え方です。",
      ],
    },
  },
  {
    slug: 'hollow-knight-silksong-lean-teams',
    date: '2025-10-15',
    readingMinutes: 5,
    tags: ['Teams', 'Craft', 'Product'],
    image: '/blog/hollow-knight-silksong.jpg',
    video: '/blog/hollow-knight-silksong.mp4',
    category: { en: 'Career', pt: 'Carreira', es: 'Carrera', de: 'Karriere', fr: 'Carrière', ja: 'キャリア' },
    title: {
      en: 'Silksong: Time, Community and the Power of Lean Teams',
      pt: 'Silksong: Tempo, Comunidade e o Poder das Equipes Enxutas',
      es: 'Silksong: Tiempo, Comunidad y el Poder de los Equipos Reducidos',
      de: 'Silksong: Zeit, Community und die Kraft kleiner Teams',
      fr: 'Silksong : le temps, la communauté et la force des petites équipes',
      ja: 'Silksong：時間、コミュニティ、そして少人数チームの力',
    },
    excerpt: {
      en: "Hollow Knight: Silksong hit a 100 on Metacritic — built by three people over seven years. A lesson in patience, trust and lean teams.",
      pt: "Hollow Knight: Silksong atingiu 100 no Metacritic — feito por três pessoas em sete anos. Uma lição sobre paciência, confiança e equipes enxutas.",
      es: "Hollow Knight: Silksong alcanzó un 100 en Metacritic — hecho por tres personas en siete años. Una lección sobre paciencia, confianza y equipos reducidos.",
      de: "Hollow Knight: Silksong erreichte 100 auf Metacritic — von drei Menschen in sieben Jahren gebaut. Eine Lektion über Geduld, Vertrauen und kleine Teams.",
      fr: "Hollow Knight: Silksong a décroché un 100 sur Metacritic — créé par trois personnes en sept ans. Une leçon de patience, de confiance et de petites équipes.",
      ja: "Hollow Knight: Silksong が Metacritic で100点を達成——3人が7年かけて作り上げた。忍耐と信頼、そして少人数チームについての教訓。",
    },
    quote: {
      en: "Sometimes it's not about how fast you ship, but who you ship with — and why.",
      pt: "Às vezes, não é sobre quão rápido você entrega, mas com quem você entrega — e com que propósito.",
      es: "A veces no se trata de qué tan rápido entregas, sino con quién entregas — y con qué propósito.",
      de: "Manchmal geht es nicht darum, wie schnell du lieferst, sondern mit wem — und wozu.",
      fr: "Parfois, ce n'est pas la vitesse de livraison qui compte, mais avec qui l'on livre — et pourquoi.",
      ja: "大切なのは、どれだけ速く出すかではなく、誰と、何のために出すかだ。",
    },
    body: {
      en: [
        "Recently, Hollow Knight: Silksong reached a 100 on Metacritic — extraordinary for any game. What makes the feat even more striking is that it was built by just three people: Ari Gibson, William Pellen and Jack Vine, who make up Team Cherry.",
        "That success carries a legacy, too. Its predecessor, Hollow Knight (2017), had already built a solid fan base and sold millions of copies — which helped sustain the expectations for the sequel.",
        "But another point caught my attention: the development time. Silksong took around seven years to finish — a long stretch, especially for such a small team.",
        "Even so, the studio never seemed pressured by artificially short deadlines. The creators say the project 'never stalled', and that progress was steady — if slow — thanks to the lean nature of the team and its creative ambition.",
        "That time was not an obstacle — it was an investment. And the results speak for themselves: on Steam alone, Silksong sold more than 3.2 million copies in under two weeks; within days it had passed 5 million players across all platforms; and estimates suggested it could move over 5 million units in its first months, generating around US$100 million in revenue.",
        "These numbers show that when you have an engaged community, an established reputation and trust in your delivery, longer timelines can be absorbed — as long as you don't sacrifice the pillars of quality and consistency.",
        "A small team, taking years to build something with excellence — yet able to rally a legion of fans at launch. That leads me to a powerful reflection: sometimes it's not about how fast you ship, but who you ship with — and why.",
        "And you? Have you ever been part of a lean team that was given the time it needed to mature a product, and made a huge impact because of it?",
      ],
      pt: [
        "Recentemente, Hollow Knight: Silksong atingiu 100 no Metacritic — algo extraordinário para qualquer jogo. O que torna esse feito ainda mais impressionante é saber que ele foi desenvolvido por apenas três pessoas: Ari Gibson, William Pellen e Jack Vine, que compõem a Team Cherry.",
        "Esse sucesso também carrega herança: seu predecessor, Hollow Knight (2017), já havia conquistado uma base sólida de fãs e vendido milhões de cópias — o que ajudou a sustentar as expectativas para a sequência.",
        "Mas há outro ponto que me chamou atenção: o tempo de desenvolvimento. Silksong levou cerca de sete anos para ficar pronto — um prazo longo, especialmente para um time tão pequeno.",
        "Apesar disso, o estúdio nunca pareceu pressionado por prazos artificialmente curtos. Os criadores afirmam que o projeto 'nunca travou', e que o progresso foi constante — mesmo que demorado — por conta da natureza enxuta da equipe e da ambição criativa.",
        "Esse tempo não foi um obstáculo — foi um investimento. E os resultados falam por si: só na Steam, Silksong vendeu mais de 3,2 milhões de cópias em menos de duas semanas; em poucos dias, já havia ultrapassado 5 milhões de jogadores entre todas as plataformas; e estima-se que nos primeiros meses poderia movimentar mais de 5 milhões de unidades, gerando algo em torno de US$ 100 milhões em receita.",
        "Esses números mostram que quando você tem uma comunidade engajada, reputação consolidada e confiança nas entregas, prazos maiores podem ser absorvíveis — desde que não se sacrifiquem os pilares de qualidade e consistência.",
        "Uma equipe pequena, levando anos para construir algo com excelência — mas que consegue ativar uma legião de fãs no lançamento. Isso me leva a uma reflexão poderosa: às vezes, não é sobre quão rápido você entrega, mas com quem você entrega — e com que propósito.",
        "E você? Já fez parte de um time enxuto que teve o tempo necessário para maturar um produto e, por conta disso, obteve um impacto gigante?",
      ],
      es: [
        "Hace poco, Hollow Knight: Silksong alcanzó un 100 en Metacritic — algo extraordinario para cualquier juego. Lo que hace la hazaña aún más impresionante es saber que fue desarrollado por solo tres personas: Ari Gibson, William Pellen y Jack Vine, que forman Team Cherry.",
        "Ese éxito también carga una herencia: su predecesor, Hollow Knight (2017), ya había conquistado una base sólida de fans y vendido millones de copias — lo que ayudó a sostener las expectativas para la secuela.",
        "Pero hay otro punto que me llamó la atención: el tiempo de desarrollo. Silksong tardó cerca de siete años en estar listo — un plazo largo, sobre todo para un equipo tan pequeño.",
        "Aun así, el estudio nunca pareció presionado por plazos artificialmente cortos. Los creadores afirman que el proyecto 'nunca se estancó', y que el progreso fue constante — aunque lento — por la naturaleza reducida del equipo y su ambición creativa.",
        "Ese tiempo no fue un obstáculo — fue una inversión. Y los resultados hablan por sí solos: solo en Steam, Silksong vendió más de 3,2 millones de copias en menos de dos semanas; en pocos días ya había superado los 5 millones de jugadores en todas las plataformas; y se estima que en los primeros meses podría mover más de 5 millones de unidades, generando en torno a 100 millones de dólares en ingresos.",
        "Estos números muestran que cuando tienes una comunidad comprometida, una reputación consolidada y confianza en tus entregas, los plazos más largos pueden absorberse — siempre que no se sacrifiquen los pilares de calidad y consistencia.",
        "Un equipo pequeño, tardando años en construir algo con excelencia — pero capaz de activar a una legión de fans en el lanzamiento. Eso me lleva a una reflexión poderosa: a veces no se trata de qué tan rápido entregas, sino con quién entregas — y con qué propósito.",
        "¿Y tú? ¿Alguna vez formaste parte de un equipo reducido que tuvo el tiempo necesario para madurar un producto y, por eso, logró un impacto enorme?",
      ],
      de: [
        "Vor Kurzem erreichte Hollow Knight: Silksong 100 auf Metacritic — außergewöhnlich für jedes Spiel. Noch beeindruckender wird die Leistung, wenn man weiß, dass sie von nur drei Menschen stammt: Ari Gibson, William Pellen und Jack Vine, die Team Cherry bilden.",
        "Dieser Erfolg trägt auch ein Erbe: Der Vorgänger Hollow Knight (2017) hatte bereits eine solide Fangemeinde aufgebaut und Millionen Exemplare verkauft — was die Erwartungen an den Nachfolger stützte.",
        "Doch ein anderer Punkt fiel mir auf: die Entwicklungszeit. Silksong brauchte rund sieben Jahre bis zur Fertigstellung — eine lange Spanne, besonders für ein so kleines Team.",
        "Trotzdem wirkte das Studio nie von künstlich kurzen Deadlines getrieben. Die Macher sagen, das Projekt sei 'nie ins Stocken geraten', und der Fortschritt sei stetig gewesen — wenn auch langsam — dank der schlanken Teamstruktur und des kreativen Anspruchs.",
        "Diese Zeit war kein Hindernis — sie war eine Investition. Und die Ergebnisse sprechen für sich: Allein auf Steam verkaufte sich Silksong in weniger als zwei Wochen über 3,2 Millionen Mal; innerhalb weniger Tage überschritt es plattformübergreifend 5 Millionen Spieler; und Schätzungen zufolge könnte es in den ersten Monaten über 5 Millionen Einheiten bewegen und rund 100 Millionen US-Dollar Umsatz erzielen.",
        "Diese Zahlen zeigen: Mit einer engagierten Community, einem gefestigten Ruf und Vertrauen in die Lieferung lassen sich längere Zeiträume verkraften — solange man die Säulen Qualität und Konsistenz nicht opfert.",
        "Ein kleines Team, das Jahre braucht, um etwas mit Exzellenz zu bauen — und doch beim Launch eine Legion von Fans mobilisiert. Das führt mich zu einer starken Überlegung: Manchmal geht es nicht darum, wie schnell du lieferst, sondern mit wem — und wozu.",
        "Und du? Warst du schon einmal Teil eines schlanken Teams, das die nötige Zeit bekam, ein Produkt reifen zu lassen, und gerade deshalb enorme Wirkung erzielte?",
      ],
      fr: [
        "Récemment, Hollow Knight: Silksong a atteint un 100 sur Metacritic — extraordinaire pour n'importe quel jeu. Ce qui rend l'exploit encore plus frappant, c'est de savoir qu'il a été développé par seulement trois personnes : Ari Gibson, William Pellen et Jack Vine, qui composent Team Cherry.",
        "Ce succès porte aussi un héritage : son prédécesseur, Hollow Knight (2017), avait déjà conquis une base de fans solide et vendu des millions d'exemplaires — ce qui a aidé à soutenir les attentes pour la suite.",
        "Mais un autre point a retenu mon attention : le temps de développement. Silksong a mis environ sept ans à voir le jour — un délai long, surtout pour une si petite équipe.",
        "Malgré cela, le studio n'a jamais semblé pressé par des délais artificiellement courts. Les créateurs affirment que le projet « n'a jamais calé », et que la progression a été constante — quoique lente — grâce à la nature réduite de l'équipe et à son ambition créative.",
        "Ce temps n'a pas été un obstacle — c'était un investissement. Et les résultats parlent d'eux-mêmes : rien que sur Steam, Silksong s'est vendu à plus de 3,2 millions d'exemplaires en moins de deux semaines ; en quelques jours, il avait dépassé 5 millions de joueurs toutes plateformes confondues ; et selon les estimations, il pourrait écouler plus de 5 millions d'unités dans ses premiers mois, générant environ 100 millions de dollars de revenus.",
        "Ces chiffres montrent qu'avec une communauté engagée, une réputation établie et la confiance dans vos livraisons, des délais plus longs peuvent être absorbés — tant que l'on ne sacrifie pas les piliers de qualité et de cohérence.",
        "Une petite équipe, mettant des années à construire quelque chose d'excellence — mais capable de mobiliser une légion de fans au lancement. Cela m'amène à une réflexion forte : parfois, ce n'est pas la vitesse de livraison qui compte, mais avec qui l'on livre — et pourquoi.",
        "Et vous ? Avez-vous déjà fait partie d'une petite équipe à qui l'on a laissé le temps nécessaire pour mûrir un produit, et qui a eu, pour cette raison, un impact énorme ?",
      ],
      ja: [
        "先日、Hollow Knight: Silksong が Metacritic で100点を達成しました——どんなゲームにとっても並外れたことです。この偉業をさらに際立たせるのは、それがわずか3人——Team Cherry を構成する Ari Gibson、William Pellen、Jack Vine——によって作られたという事実です。",
        "この成功には受け継がれたものもあります。前作 Hollow Knight（2017）はすでに堅固なファン層を築き、数百万本を売り上げており——それが続編への期待を支えました。",
        "しかし、もうひとつ私の目を引いた点があります。開発期間です。Silksong は完成までにおよそ7年——とりわけこれほど小さなチームにとっては長い年月です。",
        "それでも、スタジオが人為的に短い納期に追われている様子はありませんでした。制作陣は、プロジェクトは『一度も止まらなかった』とし、進行は——遅くとも——着実だったと語ります。少人数という性質と、創造的な野心のおかげです。",
        "その時間は障害ではなく、投資でした。そして結果が物語っています。Steam だけでも、Silksong は2週間足らずで320万本以上を販売し、数日のうちに全プラットフォーム合計で500万人を超えるプレイヤーに達し、最初の数か月で500万本以上を動かし、約1億ドルの収益を生む可能性があると見積もられました。",
        "これらの数字が示すのは、熱量のあるコミュニティ、確立された評判、そして納品への信頼があれば——品質と一貫性という柱を犠牲にしない限り——長い期間は吸収できるということです。",
        "小さなチームが、卓越したものを築くのに何年もかけ、それでいて発売時に大勢のファンを動かす。ここから、私は強い問いにたどり着きます。大切なのは、どれだけ速く出すかではなく、誰と、何のために出すか、なのだと。",
        "あなたはどうでしょう。製品を成熟させるのに必要な時間を与えられた少人数チームの一員となり、そのおかげで大きなインパクトを生んだ経験はありますか？",
      ],
    },
  },
  {
    slug: 'rebuilding-airbnb-design-system',
    date: '2025-10-10',
    readingMinutes: 4,
    tags: ['Design System', 'AI', 'React'],
    image: '/projects/airbnb/home.png',
    category: { en: 'Engineering', pt: 'Engenharia', es: 'Ingeniería', de: 'Engineering', fr: 'Ingénierie', ja: 'エンジニアリング' },
    title: {
      en: 'Rebuilding Airbnb From Scratch — Starting With the Design System',
      pt: 'Recriando o Airbnb do Zero — Começando pelo Design System',
      es: 'Recreando Airbnb desde Cero — Empezando por el Design System',
      de: 'Airbnb von Grund auf neu bauen — beginnend beim Design-System',
      fr: 'Reconstruire Airbnb de zéro — en commençant par le design system',
      ja: 'Airbnb をゼロから作り直す——デザインシステムから始める',
    },
    excerpt: {
      en: "A personal experiment: how much does AI really boost productivity without sacrificing code quality? I'm rebuilding Airbnb, foundation first.",
      pt: "Um experimento pessoal: até que ponto a IA realmente aumenta a produtividade sem comprometer a qualidade do código? Estou recriando o Airbnb, começando pela base.",
      es: "Un experimento personal: ¿hasta qué punto la IA realmente aumenta la productividad sin sacrificar la calidad del código? Estoy recreando Airbnb, empezando por la base.",
      de: "Ein persönliches Experiment: Wie stark steigert KI wirklich die Produktivität, ohne die Codequalität zu opfern? Ich baue Airbnb neu — Fundament zuerst.",
      fr: "Une expérience personnelle : dans quelle mesure l'IA augmente-t-elle vraiment la productivité sans sacrifier la qualité du code ? Je reconstruis Airbnb, la base d'abord.",
      ja: "個人的な実験：AI はコード品質を犠牲にせず、どこまで生産性を高めるのか？ Airbnb を、まず土台から作り直しています。",
    },
    quote: {
      en: "AI generates the code fast; turning it into something scalable is the real work.",
      pt: "A IA gera o código rápido; transformá-lo em algo escalável é o trabalho de verdade.",
      es: "La IA genera el código rápido; convertirlo en algo escalable es el trabajo de verdad.",
      de: "KI generiert den Code schnell; ihn skalierbar zu machen ist die eigentliche Arbeit.",
      fr: "L'IA génère le code vite ; le rendre scalable, c'est le vrai travail.",
      ja: "AI はコードを速く生成する。それをスケーラブルにすることこそ本当の仕事だ。",
    },
    body: {
      en: [
        "I've started an experimental project to explore a question that's been on my mind lately: how much does AI really boost productivity without sacrificing code quality?",
        "The idea is to build an Airbnb clone, starting from the foundation — a complete Design System that will serve as the base for replicating the app's main visual and functional components.",
        "What makes this project unique is the method: I'm using AI aggressively to generate components, structure styles and suggest code patterns through prompts.",
        "With this, I want to understand how much it actually speeds up development; which standards and best practices are followed (or ignored); and how much effort it takes to transform AI-generated code — often unstructured and inconsistent — into something scalable, maintainable and production-ready.",
        "The component library is documented in Storybook, and it's a work in progress. It's less about the destination and more about measuring, honestly, where AI helps and where taste and structure still have to step in.",
      ],
      pt: [
        "Iniciei um projeto experimental para investigar uma questão que vem me chamando cada vez mais atenção: até que ponto a IA realmente aumenta a produtividade sem comprometer a qualidade do código?",
        "A proposta é construir um clone do Airbnb, começando pela base — um Design System completo, que servirá para replicar os principais componentes visuais e funcionais da aplicação.",
        "O diferencial está no método: estou usando IA de forma agressiva para gerar componentes, estruturar estilos e sugerir padrões via prompts.",
        "Com isso, quero entender o quanto isso realmente acelera o desenvolvimento; quais padrões e boas práticas são respeitados (ou ignorados); e o esforço necessário para transformar o código gerado — muitas vezes sem estrutura e inconsistente — em algo escalável, sustentável e pronto para produção.",
        "A biblioteca de componentes está documentada em Storybook, e é um trabalho em evolução. Menos sobre o destino e mais sobre medir, com honestidade, onde a IA ajuda e onde critério e estrutura ainda precisam entrar.",
      ],
      es: [
        "Inicié un proyecto experimental para investigar una pregunta que me llama cada vez más la atención: ¿hasta qué punto la IA realmente aumenta la productividad sin sacrificar la calidad del código?",
        "La propuesta es construir un clon de Airbnb, empezando por la base — un Design System completo, que servirá para replicar los principales componentes visuales y funcionales de la aplicación.",
        "El diferencial está en el método: estoy usando IA de forma agresiva para generar componentes, estructurar estilos y sugerir patrones vía prompts.",
        "Con esto quiero entender cuánto acelera realmente el desarrollo; qué estándares y buenas prácticas se respetan (o se ignoran); y el esfuerzo necesario para transformar el código generado — muchas veces sin estructura e inconsistente — en algo escalable, mantenible y listo para producción.",
        "La biblioteca de componentes está documentada en Storybook, y es un trabajo en evolución. Menos sobre el destino y más sobre medir, con honestidad, dónde ayuda la IA y dónde el criterio y la estructura todavía tienen que entrar.",
      ],
      de: [
        "Ich habe ein experimentelles Projekt gestartet, um einer Frage nachzugehen, die mich in letzter Zeit beschäftigt: Wie stark steigert KI wirklich die Produktivität, ohne die Codequalität zu opfern?",
        "Die Idee ist, einen Airbnb-Klon zu bauen — beginnend beim Fundament: einem vollständigen Design-System, das als Basis dient, um die zentralen visuellen und funktionalen Komponenten der App nachzubilden.",
        "Das Besondere ist die Methode: Ich nutze KI aggressiv, um Komponenten zu generieren, Styles zu strukturieren und Code-Patterns per Prompt vorzuschlagen.",
        "Damit will ich verstehen, wie sehr das die Entwicklung tatsächlich beschleunigt; welche Standards und Best Practices befolgt (oder ignoriert) werden; und wie viel Aufwand es kostet, KI-generierten Code — oft unstrukturiert und inkonsistent — in etwas Skalierbares, Wartbares und Produktionsreifes zu verwandeln.",
        "Die Komponentenbibliothek ist in Storybook dokumentiert und in Arbeit. Es geht weniger um das Ziel als darum, ehrlich zu messen, wo KI hilft und wo Geschmack und Struktur weiterhin einspringen müssen.",
      ],
      fr: [
        "J'ai lancé un projet expérimental pour explorer une question qui me travaille depuis quelque temps : dans quelle mesure l'IA augmente-t-elle vraiment la productivité sans sacrifier la qualité du code ?",
        "L'idée est de construire un clone d'Airbnb, en partant de la base — un Design System complet qui servira à répliquer les principaux composants visuels et fonctionnels de l'application.",
        "Ce qui rend ce projet unique, c'est la méthode : j'utilise l'IA de façon agressive pour générer des composants, structurer les styles et suggérer des patterns via des prompts.",
        "Avec cela, je veux comprendre à quel point cela accélère réellement le développement ; quels standards et bonnes pratiques sont respectés (ou ignorés) ; et l'effort nécessaire pour transformer un code généré par l'IA — souvent non structuré et incohérent — en quelque chose de scalable, maintenable et prêt pour la production.",
        "La bibliothèque de composants est documentée dans Storybook, et c'est un travail en cours. Moins une question de destination que de mesurer, honnêtement, là où l'IA aide et là où le goût et la structure doivent encore intervenir.",
      ],
      ja: [
        "最近ずっと気になっている問いを探るため、実験的なプロジェクトを始めました——AI はコード品質を犠牲にせず、どこまで本当に生産性を高めるのか？",
        "アイデアは Airbnb のクローンを作ることです。土台から始めます——アプリの主要なビジュアル・機能コンポーネントを再現する基盤となる、完全なデザインシステムです。",
        "このプロジェクトを特別にしているのは手法です。AI を積極的に使い、プロンプトでコンポーネントを生成し、スタイルを構造化し、コードパターンを提案させています。",
        "これを通じて理解したいのは、開発が実際にどれだけ速くなるか、どの標準やベストプラクティスが守られる（あるいは無視される）か、そして往々にして無構造で一貫性のない AI 生成コードを、スケーラブルで保守可能・本番対応のものへ変えるのにどれだけの労力がかかるか、です。",
        "コンポーネントライブラリは Storybook で文書化しており、進行中です。ゴールそのものより、AI が助けになる場所と、審美眼や構造がなお必要な場所を、正直に測ることが目的です。",
      ],
    },
  },
  {
    slug: 'vuelynx-vue-native',
    date: '2025-03-12',
    readingMinutes: 3,
    tags: ['Vue', 'Lynx', 'Mobile'],
    image: '/blog/vue-amsterdam.jpeg',
    category: { en: 'Engineering', pt: 'Engenharia', es: 'Ingeniería', de: 'Engineering', fr: 'Ingénierie', ja: 'エンジニアリング' },
    title: {
      en: "VueLynx: A First Step Toward 'Vue Native'",
      pt: "VueLynx: Um Primeiro Passo Rumo ao 'Vue Native'",
      es: "VueLynx: Un Primer Paso hacia el 'Vue Native'",
      de: 'VueLynx: ein erster Schritt zu „Vue Native“',
      fr: 'VueLynx : un premier pas vers le « Vue Native »',
      ja: 'VueLynx：「Vue Native」への第一歩',
    },
    excerpt: {
      en: "Hot from Vuejs Amsterdam: the first VueLynx prototype is here — bringing Vue and Nuxt a step closer to truly native apps.",
      pt: "Direto do Vuejs Amsterdam: o primeiro protótipo do VueLynx chegou — aproximando Vue e Nuxt de apps verdadeiramente nativos.",
      es: "Directo desde Vuejs Amsterdam: llegó el primer prototipo de VueLynx — acercando Vue y Nuxt a apps verdaderamente nativas.",
      de: "Frisch von der Vuejs Amsterdam: Der erste VueLynx-Prototyp ist da — und bringt Vue und Nuxt näher an wirklich native Apps.",
      fr: "Tout droit de Vuejs Amsterdam : le premier prototype de VueLynx est là — rapprochant Vue et Nuxt d'applications vraiment natives.",
      ja: "Vuejs Amsterdam から届いたばかり：VueLynx の最初のプロトタイプが登場——Vue と Nuxt を、真にネイティブなアプリへ一歩近づけます。",
    },
    quote: {
      en: "It's still a prototype — but the community is already building on it.",
      pt: "Ainda é um protótipo — mas a comunidade já está construindo em cima dele.",
      es: "Todavía es un prototipo — pero la comunidad ya está construyendo sobre él.",
      de: "Noch ein Prototyp — doch die Community baut bereits darauf auf.",
      fr: "Ce n'est encore qu'un prototype — mais la communauté construit déjà dessus.",
      ja: "まだプロトタイプ——しかしコミュニティはすでにその上で作り始めています。",
    },
    body: {
      en: [
        "Hot update straight from Vuejs Amsterdam: the first VueLynx prototype is now available.",
        "During the conference, Evan You shared exciting news about Vue's integration with LynxStack. Rahul Vashishtha announced that the initial version of VueLynx can already be tested and improved by the community.",
        "The project promises to be a big step toward finally having a 'Vue Native' solution — making it even easier to build native apps with Vue and Nuxt.",
        "It's still a prototype, but the community is already engaged in evolving and consolidating this integration.",
        "Who else is excited to try it out?",
      ],
      pt: [
        "Atualização quente direto do Vuejs Amsterdam: o primeiro protótipo do VueLynx já está disponível.",
        "Durante a conferência, Evan You compartilhou novidades empolgantes sobre a integração do Vue com o LynxStack. Rahul Vashishtha anunciou que a versão inicial do VueLynx já pode ser testada e melhorada pela comunidade.",
        "O projeto promete ser um grande passo para termos, finalmente, uma solução 'Vue Native', facilitando ainda mais o desenvolvimento de apps nativos com Vue e Nuxt.",
        "Ainda é um protótipo, mas a comunidade já está engajada para evoluir e consolidar essa integração.",
        "Quem mais está animado para experimentar?",
      ],
      es: [
        "Actualización caliente directo desde Vuejs Amsterdam: el primer prototipo de VueLynx ya está disponible.",
        "Durante la conferencia, Evan You compartió novedades emocionantes sobre la integración de Vue con LynxStack. Rahul Vashishtha anunció que la versión inicial de VueLynx ya puede ser probada y mejorada por la comunidad.",
        "El proyecto promete ser un gran paso para tener, por fin, una solución 'Vue Native', facilitando aún más el desarrollo de apps nativas con Vue y Nuxt.",
        "Todavía es un prototipo, pero la comunidad ya está comprometida en evolucionar y consolidar esta integración.",
        "¿Quién más está animado a probarlo?",
      ],
      de: [
        "Heiße Neuigkeit direkt von der Vuejs Amsterdam: Der erste VueLynx-Prototyp ist jetzt verfügbar.",
        "Während der Konferenz teilte Evan You spannende Neuigkeiten zur Integration von Vue mit LynxStack. Rahul Vashishtha kündigte an, dass die erste Version von VueLynx bereits von der Community getestet und verbessert werden kann.",
        "Das Projekt verspricht einen großen Schritt hin zu einer endlich vorhandenen 'Vue Native'-Lösung — und macht die Entwicklung nativer Apps mit Vue und Nuxt noch einfacher.",
        "Es ist noch ein Prototyp, doch die Community engagiert sich bereits, diese Integration weiterzuentwickeln und zu festigen.",
        "Wer freut sich noch, es auszuprobieren?",
      ],
      fr: [
        "Nouvelle à chaud tout droit de Vuejs Amsterdam : le premier prototype de VueLynx est désormais disponible.",
        "Pendant la conférence, Evan You a partagé des nouvelles enthousiasmantes sur l'intégration de Vue avec LynxStack. Rahul Vashishtha a annoncé que la version initiale de VueLynx peut déjà être testée et améliorée par la communauté.",
        "Le projet promet d'être un grand pas vers une solution « Vue Native » enfin disponible — rendant encore plus simple le développement d'applications natives avec Vue et Nuxt.",
        "Ce n'est encore qu'un prototype, mais la communauté est déjà engagée pour faire évoluer et consolider cette intégration.",
        "Qui d'autre a hâte de l'essayer ?",
      ],
      ja: [
        "Vuejs Amsterdam から届いたばかりの熱いアップデート：VueLynx の最初のプロトタイプが利用可能になりました。",
        "カンファレンスでは、Evan You が Vue と LynxStack の統合について心躍る情報を共有しました。Rahul Vashishtha は、VueLynx の初期バージョンがすでにコミュニティによってテストと改善が可能であることを発表しました。",
        "このプロジェクトは、ついに『Vue Native』と呼べるソリューションへの大きな一歩になると期待され、Vue と Nuxt によるネイティブアプリ開発をさらに容易にします。",
        "まだプロトタイプですが、コミュニティはすでにこの統合を発展・定着させようと動き出しています。",
        "他に、試すのを楽しみにしている人はいますか？",
      ],
    },
  },
  {
    slug: 'vue-lynx-mobile-future',
    date: '2025-07-10',
    readingMinutes: 3,
    tags: ['Vue', 'Lynx', 'Mobile', 'React Native'],
    image: '/blog/vue-linx.jpeg',
    category: { en: 'Engineering', pt: 'Engenharia', es: 'Ingeniería', de: 'Engineering', fr: 'Ingénierie', ja: 'エンジニアリング' },
    title: {
      en: 'Vue + Lynx: A New Future for Mobile Apps?',
      pt: 'Vue + Lynx: Um Novo Futuro para Apps Mobile?',
      es: 'Vue + Lynx: ¿Un Nuevo Futuro para las Apps Móviles?',
      de: 'Vue + Lynx: eine neue Zukunft für mobile Apps?',
      fr: 'Vue + Lynx : un nouvel avenir pour les apps mobiles ?',
      ja: 'Vue + Lynx：モバイルアプリの新しい未来か？',
    },
    excerpt: {
      en: "Evan You says the Vue team is open to integrating with Lynx — a new engine positioning itself as a serious alternative to React Native.",
      pt: "Evan You afirma que o time do Vue está aberto a integrar com o Lynx — um novo motor que se posiciona como alternativa séria ao React Native.",
      es: "Evan You afirma que el equipo de Vue está abierto a integrarse con Lynx — un nuevo motor que se posiciona como alternativa seria a React Native.",
      de: "Evan You sagt, das Vue-Team sei offen für eine Integration mit Lynx — einer neuen Engine, die sich als ernsthafte Alternative zu React Native positioniert.",
      fr: "Evan You affirme que l'équipe Vue est ouverte à une intégration avec Lynx — un nouveau moteur qui se pose en alternative sérieuse à React Native.",
      ja: "Vue チームは Lynx との統合に前向きだと Evan You。React Native の有力な代替を目指す新しいエンジンだ。",
    },
    quote: {
      en: "Are we witnessing the beginning of a new era in app development?",
      pt: "Estaremos assistindo ao começo de uma nova era no desenvolvimento de apps?",
      es: "¿Estamos presenciando el comienzo de una nueva era en el desarrollo de apps?",
      de: "Erleben wir den Beginn einer neuen Ära der App-Entwicklung?",
      fr: "Assistons-nous au début d'une nouvelle ère du développement d'applications ?",
      ja: "私たちはアプリ開発の新時代の幕開けを目にしているのだろうか？",
    },
    body: {
      en: [
        "Evan You, the creator of Vue.js, recently mentioned that the framework's team is open to collaborating on an integration with Lynx — a new engine for building mobile applications that aims to be a strong alternative to React Native.",
        "Lynx's goal is to democratize cross-platform development, and Xuan Huang, one of the key figures behind the project, confirmed that they are fully supporting the Vue community in this integration.",
        "This opens up exciting possibilities for developers already using Vue.js who want to explore mobile development in a more seamless and native way.",
        "Are we witnessing the beginning of a new era in app development? What are your thoughts on this potential integration?",
      ],
      pt: [
        "Evan You, criador do Vue.js, mencionou recentemente que o time do framework está aberto a colaborar numa integração com o Lynx — um novo motor para construir aplicações mobile que pretende ser uma alternativa forte ao React Native.",
        "O objetivo do Lynx é democratizar o desenvolvimento cross-platform, e Xuan Huang, uma das figuras-chave por trás do projeto, confirmou que estão apoiando totalmente a comunidade Vue nessa integração.",
        "Isso abre possibilidades empolgantes para quem já usa Vue.js e quer explorar o desenvolvimento mobile de uma forma mais fluida e nativa.",
        "Estaremos assistindo ao começo de uma nova era no desenvolvimento de apps? O que você acha dessa possível integração?",
      ],
      es: [
        "Evan You, creador de Vue.js, mencionó recientemente que el equipo del framework está abierto a colaborar en una integración con Lynx — un nuevo motor para construir aplicaciones móviles que pretende ser una alternativa fuerte a React Native.",
        "El objetivo de Lynx es democratizar el desarrollo cross-platform, y Xuan Huang, una de las figuras clave detrás del proyecto, confirmó que están apoyando totalmente a la comunidad Vue en esta integración.",
        "Esto abre posibilidades emocionantes para quienes ya usan Vue.js y quieren explorar el desarrollo móvil de una forma más fluida y nativa.",
        "¿Estamos presenciando el comienzo de una nueva era en el desarrollo de apps? ¿Qué opinas de esta posible integración?",
      ],
      de: [
        "Evan You, der Schöpfer von Vue.js, erwähnte kürzlich, dass das Team des Frameworks offen für eine Zusammenarbeit an einer Integration mit Lynx ist — einer neuen Engine für mobile Anwendungen, die eine starke Alternative zu React Native sein will.",
        "Ziel von Lynx ist es, die plattformübergreifende Entwicklung zu demokratisieren, und Xuan Huang, eine der Schlüsselfiguren hinter dem Projekt, bestätigte, dass sie die Vue-Community bei dieser Integration voll unterstützen.",
        "Das eröffnet spannende Möglichkeiten für alle, die bereits Vue.js nutzen und die mobile Entwicklung nahtloser und nativer erkunden wollen.",
        "Erleben wir den Beginn einer neuen Ära der App-Entwicklung? Was hältst du von dieser möglichen Integration?",
      ],
      fr: [
        "Evan You, le créateur de Vue.js, a récemment indiqué que l'équipe du framework est ouverte à collaborer sur une intégration avec Lynx — un nouveau moteur pour construire des applications mobiles qui ambitionne d'être une alternative sérieuse à React Native.",
        "L'objectif de Lynx est de démocratiser le développement cross-platform, et Xuan Huang, l'une des figures clés du projet, a confirmé qu'ils soutiennent pleinement la communauté Vue dans cette intégration.",
        "Cela ouvre des possibilités enthousiasmantes pour ceux qui utilisent déjà Vue.js et veulent explorer le développement mobile de façon plus fluide et native.",
        "Assistons-nous au début d'une nouvelle ère du développement d'applications ? Que pensez-vous de cette intégration potentielle ?",
      ],
      ja: [
        "Vue.js の作者 Evan You は最近、フレームワークのチームが Lynx との統合での協力に前向きだと述べました。Lynx は、React Native の有力な代替を目指すモバイルアプリ構築のための新しいエンジンです。",
        "Lynx の目標はクロスプラットフォーム開発の民主化であり、プロジェクトの中心人物のひとりである Xuan Huang は、この統合において Vue コミュニティを全面的に支援すると認めました。",
        "これは、すでに Vue.js を使っていて、よりシームレスでネイティブな形でモバイル開発を探求したい開発者に、心躍る可能性を開きます。",
        "私たちはアプリ開発の新時代の幕開けを目にしているのでしょうか？ この統合の可能性について、あなたはどう考えますか？",
      ],
    },
  },
  {
    slug: 'vueflix-netflix-clone',
    date: '2025-06-20',
    readingMinutes: 2,
    tags: ['Vue', 'TypeScript', 'Vite', 'Pinia'],
    image: '/blog/vueflix.jpeg',
    category: { en: 'Engineering', pt: 'Engenharia', es: 'Ingeniería', de: 'Engineering', fr: 'Ingénierie', ja: 'エンジニアリング' },
    title: {
      en: 'VueFlix: A Netflix Clone Study',
      pt: 'VueFlix: Um Estudo de Clone da Netflix',
      es: 'VueFlix: Un Estudio de Clon de Netflix',
      de: 'VueFlix: eine Netflix-Klon-Studie',
      fr: 'VueFlix : une étude de clone Netflix',
      ja: 'VueFlix：Netflix クローンのスタディ',
    },
    excerpt: {
      en: "A study rebuilding Netflix's interface — TUDUMMM! Vue, TypeScript, Vite and Pinia, plus the patterns of modern frontend.",
      pt: "Um estudo recriando a interface da Netflix — TUDUMMM! Vue, TypeScript, Vite e Pinia, além dos patterns do frontend moderno.",
      es: "Un estudio recreando la interfaz de Netflix — ¡TUDUMMM! Vue, TypeScript, Vite y Pinia, además de los patterns del frontend moderno.",
      de: "Eine Studie, die Netflix' Oberfläche nachbaut — TUDUMMM! Vue, TypeScript, Vite und Pinia, plus die Patterns des modernen Frontends.",
      fr: "Une étude qui reconstruit l'interface de Netflix — TUDUMMM ! Vue, TypeScript, Vite et Pinia, plus les patterns du frontend moderne.",
      ja: "Netflix のインターフェースを作り直すスタディ——TUDUMMM！ Vue、TypeScript、Vite、Pinia、そしてモダンフロントエンドのパターン。",
    },
    quote: {
      en: "The best way to learn a stack is to rebuild something you already love.",
      pt: "A melhor forma de aprender uma stack é reconstruir algo que você já ama.",
      es: "La mejor forma de aprender un stack es reconstruir algo que ya amas.",
      de: "Der beste Weg, einen Stack zu lernen, ist, etwas nachzubauen, das man schon liebt.",
      fr: "La meilleure façon d'apprendre une stack est de reconstruire quelque chose qu'on aime déjà.",
      ja: "スタックを学ぶ最良の方法は、すでに好きなものを作り直すことだ。",
    },
    body: {
      en: [
        "I want to share a study where I built a 'clone' of Netflix — TUDUMMM!",
        "For this project I used Vue as the base framework, along with TypeScript, Vite and Pinia, plus other tools, best practices and patterns common to modern frontend.",
        "It's a compact but complete playground: routing, state, componentization and a UI that mirrors the real thing closely enough to make the details matter.",
      ],
      pt: [
        "Gostaria de compartilhar esse estudo onde fiz um 'clone' da Netflix — TUDUMMM!",
        "Nesse projeto, utilizei Vue como framework base, além de TypeScript, Vite e Pinia, e outras ferramentas, boas práticas e patterns comuns ao frontend moderno.",
        "É um playground compacto, mas completo: rotas, estado, componentização e uma UI que espelha a original o suficiente para os detalhes fazerem diferença.",
      ],
      es: [
        "Quiero compartir este estudio donde hice un 'clon' de Netflix — ¡TUDUMMM!",
        "Para este proyecto usé Vue como framework base, junto con TypeScript, Vite y Pinia, además de otras herramientas, buenas prácticas y patterns comunes al frontend moderno.",
        "Es un playground compacto pero completo: rutas, estado, componentización y una UI que refleja la original lo suficiente para que los detalles importen.",
      ],
      de: [
        "Ich möchte eine Studie teilen, in der ich einen 'Klon' von Netflix gebaut habe — TUDUMMM!",
        "Für dieses Projekt nutzte ich Vue als Basis-Framework, zusammen mit TypeScript, Vite und Pinia, dazu weitere Werkzeuge, Best Practices und Patterns des modernen Frontends.",
        "Es ist ein kompakter, aber vollständiger Spielplatz: Routing, State, Komponentisierung und eine UI, die das Original nah genug spiegelt, damit die Details zählen.",
      ],
      fr: [
        "Je veux partager une étude où j'ai construit un 'clone' de Netflix — TUDUMMM !",
        "Pour ce projet, j'ai utilisé Vue comme framework de base, avec TypeScript, Vite et Pinia, plus d'autres outils, bonnes pratiques et patterns du frontend moderne.",
        "C'est un terrain de jeu compact mais complet : routing, state, componentisation et une UI qui reflète l'original d'assez près pour que les détails comptent.",
      ],
      ja: [
        "Netflix の『クローン』を作ったスタディを共有したいと思います——TUDUMMM！",
        "このプロジェクトでは、ベースのフレームワークに Vue を採用し、TypeScript・Vite・Pinia、そしてモダンフロントエンドに共通する各種ツール・ベストプラクティス・パターンを使いました。",
        "コンパクトながら完結した遊び場です。ルーティング、状態管理、コンポーネント化、そして細部が意味を持つほど本物に近い UI。",
      ],
    },
  },
  {
    slug: 'leiria-run-pushing-limits',
    date: '2024-08-15',
    readingMinutes: 4,
    tags: ['Life', 'Mindset', 'Running'],
    image: '/blog/run-leiria.jpeg',
    images: [
      '/blog/run-leiria.jpeg',
      '/blog/run-leiria-2.jpeg',
      '/blog/run-leiria-3.jpeg',
      '/blog/run-leiria-4.jpeg',
      '/blog/run-leiria-5.jpeg',
      '/blog/run-leiria-6.jpeg',
    ],
    category: { en: 'Life', pt: 'Vida', es: 'Vida', de: 'Leben', fr: 'Vie', ja: '人生' },
    title: {
      en: 'Leiria Run: Aiming at the Impossible',
      pt: 'Leiria Run: Mirando o Impossível',
      es: 'Leiria Run: Apuntando a lo Imposible',
      de: 'Leiria Run: auf das Unmögliche zielen',
      fr: "Leiria Run : viser l'impossible",
      ja: 'Leiria Run：不可能を狙う',
    },
    excerpt: {
      en: "Told all my life that things were impossible, I learned to take that as fuel. 14.7 km through mountains, a monastery and a river proved it again.",
      pt: "Desacreditado a vida toda, aprendi a usar isso como combustível. 14,7 km por montanhas, um mosteiro e um rio provaram de novo.",
      es: "Descreído toda mi vida, aprendí a usar eso como combustible. 14,7 km por montañas, un monasterio y un río lo probaron de nuevo.",
      de: "Mein Leben lang wurde mir gesagt, etwas sei unmöglich — ich lernte, das als Treibstoff zu nutzen. 14,7 km durch Berge, ein Kloster und einen Fluss bewiesen es erneut.",
      fr: "Toute ma vie on m'a dit que c'était impossible — j'ai appris à en faire un carburant. 14,7 km à travers montagnes, un monastère et une rivière l'ont reprouvé.",
      ja: "ずっと『無理だ』と言われ続け、それを燃料に変えることを覚えた。山、修道院、川を抜ける14.7 km がそれを再び証明した。",
    },
    quote: {
      en: "I like the impossible — the competition there is smaller.",
      pt: "Eu gosto do impossível, pois lá a concorrência é menor.",
      es: "Me gusta lo imposible, porque allí la competencia es menor.",
      de: "Ich mag das Unmögliche — dort ist die Konkurrenz kleiner.",
      fr: "J'aime l'impossible — là, la concurrence est plus faible.",
      ja: "私は不可能が好きだ。そこは競争が少ないから。",
    },
    body: {
      en: [
        "All my life, I was constantly doubted by the people around me. That was always a kind of fuel to push my limits further and further.",
        "When someone says one of my dreams or goals is impossible, that I won't make it, or that it's unreachable, I set a target on it — and I know that sooner or later, I'll get there.",
        "It has been like this my whole life: challenging myself to do what many think impossible, aiming at the unreachable. I never did it to prove anything to anyone but myself — that whatever the goal, with focus and will, everything is possible. To paraphrase Walt Disney, I like the impossible, because the competition there is smaller.",
        "That's why running the Leiria Run meant so much to me: it reaffirmed that I CAN — whatever comes, I'll handle it.",
        "A month earlier, the plan was to prepare and arrive in good shape. I was sick for 20 days and couldn't — but I went anyway and finished the course.",
        "It was a unique experience, passing through mountains, a monastery, a castle, descents, climbs, stairs, dense forest, and even through the river.",
        "Along the way, people played instruments and sang, children cheered and elders watched from their balconies — an incredible celebration.",
        "In the end it was 14.7 km in 2:23, finishing 997th out of 1,500 participants — which for me tasted exactly like finishing first. Challenging myself to do what many judge impossible, and pushing past my limits, is the greatest victory of my life.",
      ],
      pt: [
        "Durante toda a minha vida, fui constantemente desacreditado pelas pessoas ao meu redor. Isso sempre foi um tipo de combustível para que eu pudesse ultrapassar cada vez mais os meus limites.",
        "Quando alguém diz que algum dos meus sonhos ou objetivos é impossível, que eu não conseguirei ou que é inalcançável, eu traço uma meta naquele alvo e sei que mais cedo ou mais tarde, eu conseguirei.",
        "Foi assim toda a minha vida, desafiando-me a fazer o que muitos não acreditam ser possível, mirando o inalcançável. Nunca fiz isso para provar a ninguém que não fosse a mim mesmo, que independente do objetivo, com foco e vontade, tudo é possível. Parafraseando Walt Disney, eu gosto do impossível, pois lá, a concorrência é menor.",
        "Por isso, correr o Leiria Run foi tão significativo para mim: serviu para reafirmar que EU CONSIGO, independentemente do que vier, eu dou conta!",
        "Um mês atrás, o plano era me preparar para chegar bem na prova. Fiquei doente por 20 dias, não consegui, mesmo assim fui lá e completei o trajeto.",
        "Foi uma experiência única, passando por montanhas, mosteiro, castelo, declives, aclives, escadas, mata fechada e até dentro do rio!",
        "Por onde passei, pessoas tocavam instrumentos e cantavam, crianças torciam e velhinhos acompanhavam das varandas — uma festa incrível.",
        "No final foram 14,7 km, feitos em 2:23 h, ficando em 997º lugar entre 1500 participantes, o que para mim teve o mesmo sabor de chegar em primeiro. Desafiar-me a fazer aquilo que muitos julgam impossível e ultrapassar meus limites é a maior vitória da minha vida!",
      ],
      es: [
        "Durante toda mi vida, la gente a mi alrededor dudó constantemente de mí. Eso siempre fue una especie de combustible para superar cada vez más mis límites.",
        "Cuando alguien dice que alguno de mis sueños u objetivos es imposible, que no lo lograré o que es inalcanzable, fijo una meta en ese blanco y sé que tarde o temprano lo conseguiré.",
        "Fue así toda mi vida: desafiándome a hacer lo que muchos no creen posible, apuntando a lo inalcanzable. Nunca lo hice para probarle nada a nadie más que a mí mismo — que sea cual sea el objetivo, con foco y voluntad, todo es posible. Parafraseando a Walt Disney, me gusta lo imposible, porque allí la competencia es menor.",
        "Por eso correr el Leiria Run significó tanto para mí: reafirmó que YO PUEDO — pase lo que pase, ¡me las arreglo!",
        "Un mes antes, el plan era prepararme para llegar bien a la prueba. Estuve enfermo 20 días y no pude, aun así fui y completé el recorrido.",
        "Fue una experiencia única, pasando por montañas, un monasterio, un castillo, bajadas, subidas, escaleras, bosque cerrado y hasta dentro del río.",
        "Por donde pasé, la gente tocaba instrumentos y cantaba, los niños animaban y los ancianos miraban desde los balcones — una fiesta increíble.",
        "Al final fueron 14,7 km en 2:23 h, quedando en el puesto 997 entre 1500 participantes, lo que para mí tuvo el mismo sabor que llegar primero. Desafiarme a hacer lo que muchos juzgan imposible y superar mis límites es la mayor victoria de mi vida.",
      ],
      de: [
        "Mein ganzes Leben lang wurde ich von den Menschen um mich herum ständig angezweifelt. Das war immer eine Art Treibstoff, um meine Grenzen weiter und weiter zu verschieben.",
        "Wenn jemand sagt, einer meiner Träume oder Ziele sei unmöglich, ich würde es nicht schaffen oder es sei unerreichbar, dann setze ich mir genau das als Ziel — und ich weiß, früher oder später erreiche ich es.",
        "So war es mein ganzes Leben: mich herauszufordern zu tun, was viele für unmöglich halten, und auf das Unerreichbare zu zielen. Ich tat es nie, um irgendjemandem etwas zu beweisen außer mir selbst — dass, egal welches Ziel, mit Fokus und Willen alles möglich ist. Um Walt Disney zu paraphrasieren: Ich mag das Unmögliche, denn dort ist die Konkurrenz kleiner.",
        "Deshalb bedeutete mir der Leiria Run so viel: Er bestätigte, dass ICH ES KANN — was auch kommt, ich schaffe es!",
        "Einen Monat zuvor war der Plan, mich vorzubereiten, um gut in Form anzukommen. Ich war 20 Tage krank und schaffte es nicht — trotzdem ging ich hin und beendete die Strecke.",
        "Es war eine einzigartige Erfahrung: durch Berge, ein Kloster, eine Burg, Abstiege, Anstiege, Treppen, dichten Wald und sogar durch den Fluss.",
        "Wo ich vorbeikam, spielten Menschen Instrumente und sangen, Kinder jubelten und Ältere schauten von den Balkonen zu — ein unglaubliches Fest.",
        "Am Ende waren es 14,7 km in 2:23 h, Platz 997 von 1500 Teilnehmern — was sich für mich genauso anfühlte wie ein erster Platz. Mich herauszufordern zu tun, was viele für unmöglich halten, und meine Grenzen zu überschreiten, ist der größte Sieg meines Lebens.",
      ],
      fr: [
        "Toute ma vie, les gens autour de moi ont constamment douté de moi. Cela a toujours été une sorte de carburant pour repousser toujours plus loin mes limites.",
        "Quand quelqu'un dit qu'un de mes rêves ou objectifs est impossible, que je n'y arriverai pas ou que c'est inatteignable, j'en fais une cible — et je sais que, tôt ou tard, j'y parviendrai.",
        "Ça a été ainsi toute ma vie : me défier de faire ce que beaucoup croient impossible, viser l'inatteignable. Je ne l'ai jamais fait pour prouver quoi que ce soit à quiconque, sinon à moi-même — que, quel que soit l'objectif, avec de la concentration et de la volonté, tout est possible. Pour paraphraser Walt Disney, j'aime l'impossible, car là, la concurrence est plus faible.",
        "C'est pourquoi courir le Leiria Run a tant compté pour moi : il a réaffirmé que JE PEUX — quoi qu'il arrive, j'assume !",
        "Un mois plus tôt, le plan était de me préparer pour arriver en forme. J'ai été malade 20 jours et je n'ai pas pu — j'y suis quand même allé et j'ai terminé le parcours.",
        "Ce fut une expérience unique : à travers montagnes, un monastère, un château, des descentes, des montées, des escaliers, une forêt dense, et même dans la rivière.",
        "Sur mon passage, des gens jouaient des instruments et chantaient, des enfants encourageaient et des anciens regardaient depuis leurs balcons — une fête incroyable.",
        "Au final, 14,7 km en 2:23, 997e sur 1500 participants — ce qui, pour moi, avait exactement le goût d'une première place. Me défier de faire ce que beaucoup jugent impossible et dépasser mes limites est la plus grande victoire de ma vie.",
      ],
      ja: [
        "私は人生を通じて、周囲の人々から絶えず疑われてきました。それは、自分の限界をさらに押し広げるための一種の燃料でした。",
        "誰かが、私の夢や目標のどれかを『不可能だ』『できっこない』『手が届かない』と言うと、私はそこに標的を定めます。そして、遅かれ早かれ達成できると分かっています。",
        "人生ずっとそうでした。多くの人が不可能だと信じることに挑み、手の届かないものを狙う。誰かに証明するためではなく、自分自身に——目標が何であれ、集中と意志があれば、すべては可能だと。ウォルト・ディズニーを言い換えるなら、私は不可能が好きです。そこは競争が少ないから。",
        "だからこそ、Leiria Run を走ったことは私にとって大きな意味がありました。『私はできる』——何が来ても、やり遂げられると再確認できたのです。",
        "1か月前、計画は本番に良い状態で臨めるよう準備することでした。20日間体調を崩して叶いませんでしたが、それでも行って、コースを完走しました。",
        "山、修道院、城、下り、上り、階段、鬱蒼とした森、そして川の中まで——唯一無二の体験でした。",
        "通り過ぎる先々で、人々が楽器を奏で歌い、子どもたちが声援を送り、お年寄りがバルコニーから見守る——素晴らしいお祭りでした。",
        "最終的に14.7 km を2時間23分で、1500人中997位。私にとっては1位でゴールするのと同じ味わいでした。多くが不可能と断じることに挑み、自分の限界を越えること——それが人生最大の勝利です。",
      ],
    },
  },
  {
    slug: 'the-javascript-that-gave-me',
    date: '2024-07-25',
    readingMinutes: 4,
    tags: ['Life', 'Career', 'Journey'],
    image: '/blog/2022.jpeg',
    images: ['/blog/2017.jpeg', '/blog/2022.jpeg'],
    category: { en: 'Life', pt: 'Vida', es: 'Vida', de: 'Leben', fr: 'Vie', ja: '人生' },
    title: {
      en: 'The JavaScript That Gave Me',
      pt: 'O JavaScript Que Me Deu',
      es: 'El JavaScript Que Me Dio',
      de: 'Das JavaScript, das mir gab',
      fr: "Le JavaScript qui m'a donné",
      ja: '私に与えてくれた JavaScript',
    },
    excerpt: {
      en: "Seven years separate the first photo — a rented house, an old computer — from the second: Jungfraujoch, the top of Europe. A dream eleven years in the making.",
      pt: "Sete anos separam a primeira foto — uma casinha alugada, um computador velho — da segunda: Jungfraujoch, o topo da Europa. Um sonho de onze anos.",
      es: "Siete años separan la primera foto — una casita alquilada, un ordenador viejo — de la segunda: Jungfraujoch, el techo de Europa. Un sueño de once años.",
      de: "Sieben Jahre trennen das erste Foto — ein gemietetes Häuschen, ein alter Computer — vom zweiten: Jungfraujoch, das Dach Europas. Ein Traum von elf Jahren.",
      fr: "Sept ans séparent la première photo — une petite maison louée, un vieil ordinateur — de la seconde : Jungfraujoch, le toit de l'Europe. Un rêve de onze ans.",
      ja: "最初の写真——借家、古いパソコン——と、2枚目：ヨーロッパの頂 Jungfraujoch を、7年が隔てる。11年越しの夢。",
    },
    quote: {
      en: "Every sleepless night and missed celebration finally made sense in that moment.",
      pt: "Cada noite em claro e cada festa deixada de lado enfim fizeram sentido naquele momento.",
      es: "Cada noche en vela y cada fiesta dejada de lado por fin tuvieron sentido en ese momento.",
      de: "Jede schlaflose Nacht und jede verpasste Feier ergaben in diesem Moment endlich einen Sinn.",
      fr: "Chaque nuit blanche et chaque fête manquée ont enfin eu un sens à cet instant.",
      ja: "眠れぬ夜も、諦めたお祝いも、その瞬間ようやく意味を持った。",
    },
    body: {
      en: [
        "Seven years separate the first photo — in a little rented house in Carapicuíba, no sofa, playing Super Nintendo games on an old computer — from the second: Jungfraujoch, the top of Europe.",
        "I want to share something I've always believed, but that took on a special meaning this past year.",
        "Since childhood, I heard stories about my Spanish grandfather, who came from the war and settled in Brazil. I dreamed of seeing the old continent, but it always felt far from my reality.",
        "In Erick Wendel's words, making this dream come true is part of the series 'the JavaScript that gave me'.",
        "The Denis of the last decade, who began this journey, dreamed of visiting his grandfather's country. In 2022, eleven years after writing my first variables, I took my first plane trip — a 36-day Eurotrip through Italy, Greece, France, Switzerland and, finally, Spain. With me were my wife, my two children and my mother.",
        "Near the end of the trip, my cousin took us to the town where my grandfather was born.",
        "Seeing my mother moved to be where her late father had lived, all the effort, the sleepless nights, the missed birthdays and the celebrations set aside finally made sense in that moment.",
      ],
      pt: [
        "Sete anos separam a primeira foto — em uma casinha alugada em Carapicuíba, sem sofá e jogando jogos de Super Nintendo em um computador velho — da segunda: Jungfraujoch, o topo da Europa.",
        "Quero compartilhar algo que sempre acreditei, mas que ganhou um significado especial no último ano.",
        "Desde a infância, ouvia histórias sobre meu avô espanhol que veio da guerra e se estabeleceu no Brasil. Sonhava em conhecer o velho continente, mas sempre pareceu distante da minha realidade.",
        "Nas palavras do Erick Wendel, a realização desse sonho faz parte da série 'o JavaScript que me deu'.",
        "O Denis da década passada, que iniciou essa jornada, sonhava em conhecer o país do avô. Em 2022, onze anos após escrever minhas primeiras variáveis, fiz minha primeira viagem de avião, uma Eurotrip de 36 dias por Itália, Grécia, França, Suíça e, finalmente, Espanha! Comigo estavam minha esposa, meus dois filhos e minha mãe.",
        "Próximo ao fim da viagem, meu primo nos levou à cidade onde meu avô nasceu.",
        "Ao ver minha mãe emocionada por estar onde seu falecido pai viveu, todo esforço, noites em claro, aniversários perdidos e festas deixadas de lado enfim fizeram sentido naquele momento.",
      ],
      es: [
        "Siete años separan la primera foto — en una casita alquilada en Carapicuíba, sin sofá, jugando juegos de Super Nintendo en un ordenador viejo — de la segunda: Jungfraujoch, el techo de Europa.",
        "Quiero compartir algo que siempre creí, pero que cobró un significado especial en el último año.",
        "Desde la infancia oía historias sobre mi abuelo español, que vino de la guerra y se estableció en Brasil. Soñaba con conocer el viejo continente, pero siempre pareció lejano a mi realidad.",
        "En palabras de Erick Wendel, la realización de este sueño es parte de la serie 'el JavaScript que me dio'.",
        "El Denis de la década pasada, que inició esta jornada, soñaba con conocer el país de su abuelo. En 2022, once años después de escribir mis primeras variables, hice mi primer viaje en avión, una Eurotrip de 36 días por Italia, Grecia, Francia, Suiza y, finalmente, ¡España! Conmigo estaban mi esposa, mis dos hijos y mi madre.",
        "Cerca del final del viaje, mi primo nos llevó a la ciudad donde nació mi abuelo.",
        "Al ver a mi madre emocionada por estar donde vivió su difunto padre, todo el esfuerzo, las noches en vela, los cumpleaños perdidos y las fiestas dejadas de lado por fin tuvieron sentido en ese momento.",
      ],
      de: [
        "Sieben Jahre trennen das erste Foto — in einem gemieteten Häuschen in Carapicuíba, ohne Sofa, beim Spielen von Super-Nintendo-Spielen auf einem alten Computer — vom zweiten: Jungfraujoch, das Dach Europas.",
        "Ich möchte etwas teilen, das ich immer geglaubt habe, das aber im vergangenen Jahr eine besondere Bedeutung bekam.",
        "Seit meiner Kindheit hörte ich Geschichten über meinen spanischen Großvater, der aus dem Krieg kam und sich in Brasilien niederließ. Ich träumte davon, den alten Kontinent zu sehen, doch er schien meiner Realität immer fern.",
        "Mit Erick Wendels Worten ist die Erfüllung dieses Traums Teil der Serie 'das JavaScript, das mir gab'.",
        "Der Denis des vergangenen Jahrzehnts, der diese Reise begann, träumte davon, das Land seines Großvaters zu besuchen. 2022, elf Jahre nachdem ich meine ersten Variablen schrieb, machte ich meine erste Flugreise — eine 36-tägige Eurotrip durch Italien, Griechenland, Frankreich, die Schweiz und schließlich Spanien! Bei mir waren meine Frau, meine zwei Kinder und meine Mutter.",
        "Gegen Ende der Reise brachte uns mein Cousin in die Stadt, in der mein Großvater geboren wurde.",
        "Als ich meine Mutter gerührt sah, dort zu sein, wo ihr verstorbener Vater gelebt hatte, ergaben all die Mühe, die schlaflosen Nächte, die verpassten Geburtstage und die beiseitegelegten Feiern in diesem Moment endlich einen Sinn.",
      ],
      fr: [
        "Sept ans séparent la première photo — dans une petite maison louée à Carapicuíba, sans canapé, à jouer à des jeux Super Nintendo sur un vieil ordinateur — de la seconde : Jungfraujoch, le toit de l'Europe.",
        "Je veux partager quelque chose auquel j'ai toujours cru, mais qui a pris un sens particulier cette dernière année.",
        "Depuis l'enfance, j'entendais des histoires sur mon grand-père espagnol, venu de la guerre et installé au Brésil. Je rêvais de voir le vieux continent, mais cela semblait toujours loin de ma réalité.",
        "Selon les mots d'Erick Wendel, la réalisation de ce rêve fait partie de la série 'le JavaScript qui m'a donné'.",
        "Le Denis de la décennie passée, qui a commencé ce voyage, rêvait de connaître le pays de son grand-père. En 2022, onze ans après avoir écrit mes premières variables, j'ai fait mon premier voyage en avion — une Eurotrip de 36 jours à travers l'Italie, la Grèce, la France, la Suisse et, enfin, l'Espagne ! M'accompagnaient ma femme, mes deux enfants et ma mère.",
        "Vers la fin du voyage, mon cousin nous a emmenés dans la ville où mon grand-père est né.",
        "En voyant ma mère émue d'être là où son défunt père avait vécu, tout l'effort, les nuits blanches, les anniversaires manqués et les fêtes mises de côté ont enfin eu un sens à cet instant.",
      ],
      ja: [
        "最初の写真——カラピクイーバの小さな借家、ソファもなく、古いパソコンでスーパーファミコンのゲームを遊んでいた——と、2枚目：ヨーロッパの頂 Jungfraujoch を、7年が隔てています。",
        "ずっと信じてきた、しかしこの1年で特別な意味を持った、あることを共有したいと思います。",
        "子どもの頃から、戦争を経てブラジルに定住したスペイン人の祖父の話を聞いて育ちました。旧大陸を訪れることを夢見ていましたが、いつも自分の現実からは遠く感じていました。",
        "Erick Wendel の言葉を借りれば、この夢の実現は『私に与えてくれた JavaScript』というシリーズの一部です。",
        "この旅を始めた、10年前の Denis は、祖父の国を訪れることを夢見ていました。2022年、初めて変数を書いてから11年後、私は初めて飛行機の旅に出ました——イタリア、ギリシャ、フランス、スイス、そして最後にスペインを巡る36日間のヨーロッパ旅行です。妻、2人の子ども、そして母が一緒でした。",
        "旅の終わり近く、いとこが祖父の生まれた町へ連れて行ってくれました。",
        "亡き父が暮らした場所に立ち、感極まる母を見て、すべての努力、眠れぬ夜、逃した誕生日、脇に置いてきたお祝いが、その瞬間ようやく意味を持ったのです。",
      ],
    },
  },
  {
    slug: 'the-end-of-emit',
    date: '2024-07-10',
    readingMinutes: 3,
    tags: ['Vue', 'defineModel', 'Frontend'],
    image: '/blog/emit.jpeg',
    category: { en: 'Engineering', pt: 'Engenharia', es: 'Ingeniería', de: 'Engineering', fr: 'Ingénierie', ja: 'エンジニアリング' },
    title: {
      en: 'Is This the End of $emit?',
      pt: 'Seria Esse o Fim do $emit?',
      es: '¿Es Este el Fin del $emit?',
      de: 'Ist das das Ende von $emit?',
      fr: "Est-ce la fin du $emit ?",
      ja: 'これが $emit の終わりか？',
    },
    excerpt: {
      en: "For parent-child data flow, we reach for the event emitter. With defineModel, that ceremony largely disappears.",
      pt: "Para transitar dados entre pai e filho, recorremos ao event emitter. Com o defineModel, boa parte dessa cerimônia desaparece.",
      es: "Para el flujo de datos padre-hijo, recurrimos al event emitter. Con defineModel, buena parte de esa ceremonia desaparece.",
      de: "Für den Eltern-Kind-Datenfluss greifen wir zum Event-Emitter. Mit defineModel verschwindet ein Großteil dieser Zeremonie.",
      fr: "Pour le flux de données parent-enfant, on utilise l'event emitter. Avec defineModel, une grande partie de ce cérémonial disparaît.",
      ja: "親子間のデータの受け渡しには event emitter を使う。defineModel を使えば、その儀式の大半が消える。",
    },
    quote: {
      en: "Less ceremony, same intent: a model passed straight from parent to child.",
      pt: "Menos cerimônia, mesma intenção: um model passado direto de pai para filho.",
      es: "Menos ceremonia, misma intención: un model pasado directo de padre a hijo.",
      de: "Weniger Zeremonie, gleiche Absicht: ein Model direkt von Eltern zu Kind.",
      fr: "Moins de cérémonial, même intention : un model passé directement du parent à l'enfant.",
      ja: "儀式は減り、意図は同じ。親から子へそのまま渡す model。",
    },
    body: {
      en: [
        "Anyone working with Vue (or Angular) knows that to move data simply between parent and child components, we use the well-known event emitter.",
        "Here's a neat tip to simplify that kind of communication even further: with defineModel, we can pass a model directly from parent to child, making emitters unnecessary in many cases.",
        "The parent binds a ref with v-model; the child declares defineModel and reads or mutates it as if it were local. Less boilerplate, the same two-way intent — and code that reads exactly like what it does.",
      ],
      pt: [
        "Quem trabalha com Vue (ou Angular) sabe que, para transitar dados de maneira simples entre componentes pai e filho, utilizamos o famoso event emitter.",
        "Aqui vai uma dica super interessante para simplificar ainda mais esse tipo de comunicação: com o defineModel, conseguimos passar diretamente um model de pai para filho, tornando o uso dos emitters desnecessário em muitos casos.",
        "O pai vincula um ref com v-model; o filho declara defineModel e lê ou altera como se fosse local. Menos boilerplate, a mesma intenção de mão dupla — e um código que se lê exatamente como aquilo que faz.",
      ],
      es: [
        "Quien trabaja con Vue (o Angular) sabe que, para transitar datos de manera simple entre componentes padre e hijo, usamos el famoso event emitter.",
        "Aquí va un tip muy interesante para simplificar aún más ese tipo de comunicación: con defineModel podemos pasar directamente un model de padre a hijo, haciendo innecesario el uso de emitters en muchos casos.",
        "El padre vincula un ref con v-model; el hijo declara defineModel y lo lee o modifica como si fuera local. Menos boilerplate, la misma intención bidireccional — y un código que se lee exactamente como lo que hace.",
      ],
      de: [
        "Wer mit Vue (oder Angular) arbeitet, weiß: Um Daten einfach zwischen Eltern- und Kindkomponenten zu bewegen, nutzen wir den bekannten Event-Emitter.",
        "Hier ein sehr interessanter Tipp, um diese Art der Kommunikation noch weiter zu vereinfachen: Mit defineModel können wir ein Model direkt von Eltern zu Kind übergeben und machen Emitter in vielen Fällen überflüssig.",
        "Der Elternteil bindet ein ref mit v-model; das Kind deklariert defineModel und liest oder ändert es, als wäre es lokal. Weniger Boilerplate, dieselbe wechselseitige Absicht — und Code, der sich genau so liest, wie er wirkt.",
      ],
      fr: [
        "Quiconque travaille avec Vue (ou Angular) sait que, pour faire circuler simplement des données entre composants parent et enfant, on utilise le fameux event emitter.",
        "Voici une astuce très intéressante pour simplifier encore ce type de communication : avec defineModel, on peut passer directement un model du parent à l'enfant, rendant les emitters inutiles dans bien des cas.",
        "Le parent lie un ref avec v-model ; l'enfant déclare defineModel et le lit ou le modifie comme s'il était local. Moins de boilerplate, la même intention bidirectionnelle — et un code qui se lit exactement comme ce qu'il fait.",
      ],
      ja: [
        "Vue（や Angular）を触っている人なら、親子コンポーネント間でデータを簡単にやり取りするのに、おなじみの event emitter を使うことをご存じでしょう。",
        "この種の通信をさらに簡潔にする、とても興味深いヒントがあります。defineModel を使えば、親から子へ model を直接渡せるため、多くの場合 emitter が不要になります。",
        "親は v-model で ref をバインドし、子は defineModel を宣言してローカル変数のように読み書きします。ボイラープレートは減り、双方向の意図はそのまま——そして、やっていることがそのまま読めるコードになります。",
      ],
    },
  },
  {
    slug: 'from-zero-to-senior',
    date: '2024-06-20',
    readingMinutes: 2,
    tags: ['Career', 'Podcast', 'Beginners'],
    image: '/blog/0-ao-senior.jpeg',
    category: { en: 'Career', pt: 'Carreira', es: 'Carrera', de: 'Karriere', fr: 'Carrière', ja: 'キャリア' },
    title: {
      en: 'From Zero to Senior: How to Become a Programmer',
      pt: 'Do Zero ao Sênior: Como se Tornar um Programador',
      es: 'De Cero a Sénior: Cómo Convertirse en Programador',
      de: 'Von null zum Senior: wie man Programmierer:in wird',
      fr: 'De zéro à senior : comment devenir programmeur',
      ja: 'ゼロからシニアへ：プログラマーになる方法',
    },
    excerpt: {
      en: "One of the most-voted topics of the week becomes a podcast episode: ten tips to help light part of the road for anyone just starting out.",
      pt: "Um dos temas mais votados da semana virou episódio do podcast: dez dicas para ajudar a iluminar parte do caminho de quem está começando.",
      es: "Uno de los temas más votados de la semana se convirtió en episodio del podcast: diez consejos para iluminar parte del camino de quien empieza.",
      de: "Eines der meistgewählten Themen der Woche wird zur Podcast-Folge: zehn Tipps, um Anfänger:innen ein Stück des Weges zu erhellen.",
      fr: "L'un des sujets les plus votés de la semaine devient un épisode de podcast : dix conseils pour éclairer une partie du chemin des débutants.",
      ja: "先週最も投票が多かったテーマのひとつがポッドキャストのエピソードに。始めたばかりの人の道を少し照らす10のヒント。",
    },
    quote: {
      en: "Ten tips for the start of the journey — I hope they light part of the road.",
      pt: "Dez dicas para o começo da jornada — espero iluminar parte do caminho.",
      es: "Diez consejos para el comienzo del camino — espero iluminar parte de él.",
      de: "Zehn Tipps für den Start der Reise — ich hoffe, sie erhellen ein Stück des Weges.",
      fr: "Dix conseils pour le début du parcours — j'espère éclairer une partie du chemin.",
      ja: "旅の始まりのための10のヒント——道の一部を照らせますように。",
    },
    body: {
      en: [
        "You asked for it — and based on last week's poll, here comes one of the most-voted topics: the episode 'From Zero to Senior — How to Become a Programmer'.",
        "It's ten important tips for anyone starting their journey. I hope they help light part of the road.",
        "Listen on Spotify: https://open.spotify.com/episode/5LyQ4PiPWlTWArgZWaPgbK",
      ],
      pt: [
        "Vocês pediram — e com base na pesquisa feita, chega um dos temas mais votados da semana passada: o episódio 'Do Zero ao Sênior — Como se Tornar um Programador'.",
        "São dez dicas importantes para quem está começando a sua jornada. Espero conseguir ajudar a iluminar parte do caminho.",
        "Ouça no Spotify: https://open.spotify.com/episode/5LyQ4PiPWlTWArgZWaPgbK",
      ],
      es: [
        "Lo pidieron — y con base en la encuesta hecha, llega uno de los temas más votados de la semana pasada: el episodio 'De Cero a Sénior — Cómo Convertirse en Programador'.",
        "Son diez consejos importantes para quien empieza su camino. Espero poder ayudar a iluminar parte de él.",
        "Escúchalo en Spotify: https://open.spotify.com/episode/5LyQ4PiPWlTWArgZWaPgbK",
      ],
      de: [
        "Ihr habt es euch gewünscht — und basierend auf der Umfrage kommt eines der meistgewählten Themen der letzten Woche: die Folge 'Von null zum Senior — Wie man Programmierer:in wird'.",
        "Es sind zehn wichtige Tipps für alle, die ihre Reise beginnen. Ich hoffe, sie erhellen ein Stück des Weges.",
        "Auf Spotify anhören: https://open.spotify.com/episode/5LyQ4PiPWlTWArgZWaPgbK",
      ],
      fr: [
        "Vous l'avez demandé — et d'après le sondage de la semaine dernière, voici l'un des sujets les plus votés : l'épisode 'De zéro à senior — Comment devenir programmeur'.",
        "Ce sont dix conseils importants pour quiconque commence son parcours. J'espère éclairer une partie du chemin.",
        "À écouter sur Spotify : https://open.spotify.com/episode/5LyQ4PiPWlTWArgZWaPgbK",
      ],
      ja: [
        "リクエストにお応えして——先週のアンケートをもとに、最も投票が多かったテーマのひとつをお届けします。エピソード『ゼロからシニアへ——プログラマーになる方法』です。",
        "始めたばかりの人に向けた10の大切なヒントです。道の一部を照らす手助けになればと思います。",
        "Spotify で聴く：https://open.spotify.com/episode/5LyQ4PiPWlTWArgZWaPgbK",
      ],
    },
  },
  {
    slug: 'why-become-a-programmer',
    date: '2024-06-05',
    readingMinutes: 2,
    tags: ['Career', 'Podcast', 'Story'],
    image: '/blog/como-se-tornar-dev.jpeg',
    category: { en: 'Career', pt: 'Carreira', es: 'Carrera', de: 'Karriere', fr: 'Carrière', ja: 'キャリア' },
    title: {
      en: 'Why Become a Programmer?',
      pt: 'Por Que se Tornar um Programador?',
      es: '¿Por Qué Convertirse en Programador?',
      de: 'Warum Programmierer:in werden?',
      fr: 'Pourquoi devenir programmeur ?',
      ja: 'なぜプログラマーになるのか？',
    },
    excerpt: {
      en: "Nearly 20 years in tech, distilled into a new podcast. The pilot episode: how a kid from Carapicuíba became a programmer — and why you might too.",
      pt: "Quase 20 anos de tecnologia num novo podcast. O episódio piloto: como o garoto de Carapicuíba se tornou programador — e por que você também pode.",
      es: "Casi 20 años en tecnología en un nuevo podcast. El episodio piloto: cómo el chico de Carapicuíba se hizo programador — y por qué tú también puedes.",
      de: "Fast 20 Jahre in der Tech, destilliert in einen neuen Podcast. Die Pilotfolge: wie der Junge aus Carapicuíba Programmierer wurde — und warum du es auch könntest.",
      fr: "Près de 20 ans dans la tech, distillés dans un nouveau podcast. L'épisode pilote : comment le gamin de Carapicuíba est devenu programmeur — et pourquoi vous pourriez l'être aussi.",
      ja: "テック業界での約20年を新しいポッドキャストに凝縮。パイロット回：カラピクイーバの少年がいかにプログラマーになったか——そして、あなたもなれる理由。",
    },
    quote: {
      en: "How did a kid from Carapicuíba become a programmer? Start here.",
      pt: "Como o garoto de Carapicuíba se tornou programador? Comece por aqui.",
      es: "¿Cómo el chico de Carapicuíba se hizo programador? Empieza por aquí.",
      de: "Wie wurde der Junge aus Carapicuíba Programmierer? Fang hier an.",
      fr: "Comment le gamin de Carapicuíba est-il devenu programmeur ? Commencez ici.",
      ja: "カラピクイーバの少年は、どうやってプログラマーになったのか？ ここから。",
    },
    body: {
      en: [
        "I'd like to share a bit of what I've learned over these nearly 20 years with technology, along with my point of view on assorted topics from the tech bubble.",
        "So I created a podcast. If you're curious how the kid from Carapicuíba, São Paulo, became a programmer — and want to know the reasons to become one too — you'll enjoy this pilot episode: 'Why Become a Programmer?'.",
        "Listen on Spotify: https://open.spotify.com/episode/6c7qsnTgc97SALnrihoYQS",
      ],
      pt: [
        "Gostaria de compartilhar um pouco do que aprendi ao longo desses quase 20 anos com tecnologia, além de mostrar meu ponto de vista sobre assuntos variados da bolha tech.",
        "Para isso, criei um podcast. Se você tem curiosidade em saber como o garoto de Carapicuíba/SP se tornou programador — e conhecer os motivos para se tornar um também — vai gostar desse episódio piloto chamado 'Por Que se Tornar um Programador?'.",
        "Ouça no Spotify: https://open.spotify.com/episode/6c7qsnTgc97SALnrihoYQS",
      ],
      es: [
        "Me gustaría compartir un poco de lo que aprendí a lo largo de estos casi 20 años con la tecnología, además de mostrar mi punto de vista sobre asuntos variados de la burbuja tech.",
        "Para eso creé un podcast. Si tienes curiosidad por saber cómo el chico de Carapicuíba/SP se hizo programador — y conocer los motivos para hacerte uno también — te gustará este episodio piloto llamado '¿Por Qué Convertirse en Programador?'.",
        "Escúchalo en Spotify: https://open.spotify.com/episode/6c7qsnTgc97SALnrihoYQS",
      ],
      de: [
        "Ich möchte ein wenig von dem teilen, was ich in diesen fast 20 Jahren mit Technologie gelernt habe, und meine Sicht auf verschiedene Themen der Tech-Blase zeigen.",
        "Dafür habe ich einen Podcast erstellt. Wenn du neugierig bist, wie der Junge aus Carapicuíba/SP Programmierer wurde — und die Gründe kennenlernen willst, es auch zu werden — wird dir diese Pilotfolge gefallen: 'Warum Programmierer:in werden?'.",
        "Auf Spotify anhören: https://open.spotify.com/episode/6c7qsnTgc97SALnrihoYQS",
      ],
      fr: [
        "J'aimerais partager un peu de ce que j'ai appris au cours de ces presque 20 ans avec la technologie, ainsi que mon point de vue sur divers sujets de la bulle tech.",
        "Pour cela, j'ai créé un podcast. Si vous êtes curieux de savoir comment le gamin de Carapicuíba/SP est devenu programmeur — et de connaître les raisons de le devenir aussi — vous aimerez cet épisode pilote intitulé 'Pourquoi devenir programmeur ?'.",
        "À écouter sur Spotify : https://open.spotify.com/episode/6c7qsnTgc97SALnrihoYQS",
      ],
      ja: [
        "テクノロジーと歩んだこの約20年で学んだことを少し、そしてテック界隈のさまざまな話題についての私の考えを共有したいと思います。",
        "そのためにポッドキャストを作りました。サンパウロ州カラピクイーバの少年がどうやってプログラマーになったのか気になる方——そして、あなた自身がプログラマーになる理由を知りたい方——には、このパイロット回『なぜプログラマーになるのか？』を楽しんでいただけるはずです。",
        "Spotify で聴く：https://open.spotify.com/episode/6c7qsnTgc97SALnrihoYQS",
      ],
    },
  },
  {
    slug: 'dreamfly-team-day',
    date: '2023-07-15',
    readingMinutes: 1,
    tags: ['Life', 'Team', 'Mindset'],
    image: '/blog/dreamfly.jpg',
    video: '/blog/dreamfly.mp4',
    category: { en: 'Life', pt: 'Vida', es: 'Vida', de: 'Leben', fr: 'Vie', ja: '人生' },
    title: {
      en: "The Bee Doesn't Know It Can't Fly",
      pt: 'A Abelha Não Sabe Que Não Deveria Voar',
      es: 'La Abeja No Sabe Que No Debería Volar',
      de: 'Die Biene weiß nicht, dass sie nicht fliegen dürfte',
      fr: "L'abeille ne sait pas qu'elle ne devrait pas voler",
      ja: 'ハチは自分が飛べないはずだと知らない',
    },
    excerpt: {
      en: "Aerodynamically, a bee's body isn't built to fly — the good thing is the bee doesn't know it. A TeamDay note on flying anyway.",
      pt: "Aerodinamicamente, o corpo de uma abelha não é feito para voar — o bom é que a abelha não sabe. Uma nota de TeamDay sobre voar mesmo assim.",
      es: "Aerodinámicamente, el cuerpo de una abeja no está hecho para volar — lo bueno es que la abeja no lo sabe. Una nota de TeamDay sobre volar de todos modos.",
      de: "Aerodynamisch ist der Körper einer Biene nicht zum Fliegen gebaut — das Gute ist, die Biene weiß es nicht. Eine TeamDay-Notiz übers Trotzdem-Fliegen.",
      fr: "Aérodynamiquement, le corps d'une abeille n'est pas fait pour voler — le bon côté, c'est qu'elle ne le sait pas. Une note de TeamDay sur le fait de voler quand même.",
      ja: "空力学的には、ハチの体は飛ぶようにできていない——良いのは、ハチがそれを知らないこと。それでも飛ぶことについての TeamDay のメモ。",
    },
    quote: {
      en: "Aerodynamically, a bee's body isn't made to fly; the good thing is the bee doesn't know it.",
      pt: 'Aerodinamicamente o corpo de uma abelha não é feito para voar; o bom é que a abelha não sabe.',
      es: 'Aerodinámicamente el cuerpo de una abeja no está hecho para volar; lo bueno es que la abeja no lo sabe.',
      de: 'Aerodynamisch ist der Körper einer Biene nicht zum Fliegen gemacht; das Gute ist, die Biene weiß es nicht.',
      fr: "Aérodynamiquement, le corps d'une abeille n'est pas fait pour voler ; le bon côté, c'est que l'abeille ne le sait pas.",
      ja: '空力学的には、ハチの体は飛ぶようにはできていない。良いのは、ハチがそれを知らないことだ。',
    },
    body: {
      en: [
        "'Aerodynamically, a bee's body isn't made to fly; the good thing is the bee doesn't know it.'",
        "That's what all of us can do: fly and prevail in every moment, in the face of any difficulty and any circumstance, no matter what anyone says.",
        "TeamDay :) #dreamfly",
      ],
      pt: [
        "'Aerodinamicamente o corpo de uma abelha não é feito para voar; o bom é que a abelha não sabe.'",
        "Isso é o que todos nós podemos fazer: voar e prevalecer em cada instante, diante de qualquer dificuldade e diante de qualquer circunstância, apesar do que disserem.",
        "TeamDay :) #dreamfly",
      ],
      es: [
        "'Aerodinámicamente el cuerpo de una abeja no está hecho para volar; lo bueno es que la abeja no lo sabe.'",
        "Eso es lo que todos podemos hacer: volar y prevalecer en cada instante, ante cualquier dificultad y cualquier circunstancia, digan lo que digan.",
        "TeamDay :) #dreamfly",
      ],
      de: [
        "'Aerodynamisch ist der Körper einer Biene nicht zum Fliegen gemacht; das Gute ist, die Biene weiß es nicht.'",
        "Genau das können wir alle: fliegen und in jedem Moment bestehen, jeder Schwierigkeit und jedem Umstand zum Trotz, ganz gleich, was man sagt.",
        "TeamDay :) #dreamfly",
      ],
      fr: [
        "'Aérodynamiquement, le corps d'une abeille n'est pas fait pour voler ; le bon côté, c'est que l'abeille ne le sait pas.'",
        "C'est ce que nous pouvons tous faire : voler et l'emporter à chaque instant, face à n'importe quelle difficulté et n'importe quelle circonstance, quoi qu'on en dise.",
        "TeamDay :) #dreamfly",
      ],
      ja: [
        "「空力学的には、ハチの体は飛ぶようにはできていない。良いのは、ハチがそれを知らないことだ。」",
        "これこそ、私たち誰もができることです。どんな困難にも、どんな状況にも、何を言われようとも、その一瞬一瞬で飛び、乗り越えていく。",
        "TeamDay :) #dreamfly",
      ],
    },
  },
  {
    slug: 'sons-of-fire-fantasy',
    date: '2023-05-05',
    readingMinutes: 2,
    tags: ['Life', 'Writing', 'Fantasy'],
    category: { en: 'Life', pt: 'Vida', es: 'Vida', de: 'Leben', fr: 'Vie', ja: '人生' },
    title: {
      en: 'A Pause From Tech: Sons of Fire',
      pt: 'Pausa no Assunto Tecnologia: Filhos do Fogo',
      es: 'Una Pausa en la Tecnología: Hijos del Fuego',
      de: 'Eine Pause von der Technik: Kinder des Feuers',
      fr: 'Une pause loin de la tech : Fils du Feu',
      ja: 'テクノロジーから一休み：炎の子ら',
    },
    excerpt: {
      en: "Beyond web development, I write fantasy. After a long literary fast, I'm launching a new project — for lovers of viking tales full of battles and raids.",
      pt: "Além do desenvolvimento web, escrevo fantasia. Depois de um longo jejum literário, estou lançando um novo projeto — para quem ama histórias de vikings, cheias de batalhas e incursões.",
      es: "Más allá del desarrollo web, escribo fantasía. Tras un largo ayuno literario, lanzo un nuevo proyecto — para quienes aman las historias de vikingos, llenas de batallas e incursiones.",
      de: "Neben der Webentwicklung schreibe ich Fantasy. Nach einer langen literarischen Fastenzeit starte ich ein neues Projekt — für alle, die Wikingergeschichten voller Schlachten und Raubzüge lieben.",
      fr: "Au-delà du développement web, j'écris de la fantasy. Après un long jeûne littéraire, je lance un nouveau projet — pour les amateurs de récits vikings pleins de batailles et de raids.",
      ja: "ウェブ開発の傍ら、私はファンタジーを書いています。長い文学的断食を経て、新しいプロジェクトを立ち上げます——戦いや襲撃に満ちたヴァイキングの物語を愛する人へ。",
    },
    quote: {
      en: "Beyond a web developer, I'm a fantasy writer — and the fast is over.",
      pt: "Além de desenvolvedor web, sou escritor de fantasia — e o jejum acabou.",
      es: "Más allá de desarrollador web, soy escritor de fantasía — y el ayuno terminó.",
      de: "Neben Webentwickler bin ich Fantasy-Autor — und die Fastenzeit ist vorbei.",
      fr: "Au-delà de développeur web, je suis auteur de fantasy — et le jeûne est terminé.",
      ja: "ウェブ開発者であると同時に、私はファンタジー作家です——そして断食は終わりました。",
    },
    body: {
      en: [
        "A pause from the tech talk!",
        "Hey everyone — as some of you know, beyond being a web developer, I'm a fantasy writer. After a long literary fast, I'm launching a new project.",
        "For those who enjoy viking stories full of battles, raids and more, this is a special invitation to get to know a little more about the universe I created for the Sons of Fire series.",
        "Learn more: https://lnkd.in/dqt-ZyEn",
      ],
      pt: [
        "Pausa no assunto Tecnologia!",
        "Fala pessoal, como alguns sabem, além de desenvolvedor web, sou escritor de fantasia, e depois de um longo jejum literário estou lançando um novo projeto.",
        "Para quem gosta de histórias de vikings, cheias de batalhas, incursões, etc., esse é um convite especial para conhecer um pouco mais sobre o universo que criei para a Série Filhos do Fogo.",
        "Saiba mais: https://lnkd.in/dqt-ZyEn",
      ],
      es: [
        "¡Una pausa en el tema de la tecnología!",
        "Hola a todos — como algunos saben, además de desarrollador web, soy escritor de fantasía, y tras un largo ayuno literario estoy lanzando un nuevo proyecto.",
        "Para quienes disfrutan de historias de vikingos, llenas de batallas, incursiones, etc., esta es una invitación especial a conocer un poco más el universo que creé para la serie Hijos del Fuego.",
        "Más información: https://lnkd.in/dqt-ZyEn",
      ],
      de: [
        "Eine Pause vom Thema Technik!",
        "Hallo zusammen — wie einige wissen, bin ich neben Webentwickler auch Fantasy-Autor, und nach einer langen literarischen Fastenzeit starte ich ein neues Projekt.",
        "Für alle, die Wikingergeschichten voller Schlachten, Raubzüge und mehr mögen, ist dies eine besondere Einladung, das Universum, das ich für die Reihe Kinder des Feuers erschaffen habe, ein wenig näher kennenzulernen.",
        "Mehr erfahren: https://lnkd.in/dqt-ZyEn",
      ],
      fr: [
        "Une pause loin du sujet technique !",
        "Salut à tous — comme certains le savent, au-delà d'être développeur web, je suis auteur de fantasy, et après un long jeûne littéraire, je lance un nouveau projet.",
        "Pour ceux qui aiment les récits vikings pleins de batailles, de raids, etc., voici une invitation spéciale à découvrir un peu plus l'univers que j'ai créé pour la série Fils du Feu.",
        "En savoir plus : https://lnkd.in/dqt-ZyEn",
      ],
      ja: [
        "テクノロジーの話は一休み！",
        "みなさん、こんにちは。ご存じの方もいると思いますが、私はウェブ開発者であると同時にファンタジー作家でもあり、長い文学的断食を経て、新しいプロジェクトを立ち上げます。",
        "戦いや襲撃などに満ちたヴァイキングの物語が好きな方へ。私が『炎の子ら』シリーズのために創り上げた世界を、もう少し知っていただくための特別なお誘いです。",
        "詳しくはこちら：https://lnkd.in/dqt-ZyEn",
      ],
    },
  },
  {
    slug: 'speaking-in-public',
    date: '2023-04-20',
    readingMinutes: 2,
    tags: ['Communication', 'Career', 'Remote'],
    category: { en: 'Career', pt: 'Carreira', es: 'Carrera', de: 'Karriere', fr: 'Carrière', ja: 'キャリア' },
    title: {
      en: 'Speaking in Public, Screen to Screen',
      pt: 'Falar em Público, de Tela em Tela',
      es: 'Hablar en Público, de Pantalla en Pantalla',
      de: 'Öffentlich sprechen, von Bildschirm zu Bildschirm',
      fr: "Parler en public, d'écran à écran",
      ja: '画面越しに、人前で話すこと',
    },
    excerpt: {
      en: "Public speaking is hard — harder still as we shift to a screen-first world. Whatever the medium, the goal stays the same: people, interacting.",
      pt: "Falar em público é difícil — mais ainda na transição para um mundo movido a telas. Seja qual for a forma, o objetivo é o mesmo: pessoas, interagindo.",
      es: "Hablar en público es difícil — más aún en la transición a un mundo movido por pantallas. Sea cual sea la forma, el objetivo es el mismo: personas, interactuando.",
      de: "Öffentlich zu sprechen ist schwer — noch schwerer im Wandel zu einer bildschirmzentrierten Welt. Egal welches Medium, das Ziel bleibt gleich: Menschen, die interagieren.",
      fr: "Parler en public est difficile — plus encore dans le passage à un monde tourné vers les écrans. Quel que soit le média, le but reste le même : des gens qui interagissent.",
      ja: "人前で話すのは難しい——画面中心の世界への移行の中ではなおさら。どんな媒体であれ、目的は同じ。人と人が、関わり合うこと。",
    },
    quote: {
      en: "Whatever the medium, the goal is still the same: people interacting and sharing knowledge.",
      pt: "Seja qual for a forma, o objetivo ainda é o mesmo: pessoas interagindo e compartilhando conhecimento.",
      es: "Sea cual sea la forma, el objetivo sigue siendo el mismo: personas interactuando y compartiendo conocimiento.",
      de: "Egal welches Medium — das Ziel bleibt dasselbe: Menschen, die interagieren und Wissen teilen.",
      fr: "Quel que soit le média, le but reste le même : des personnes qui interagissent et partagent du savoir.",
      ja: "どんな媒体であれ、目的は同じ。人と人が関わり、知識を分かち合うこと。",
    },
    body: {
      en: [
        "Speaking in public can be an especially tough challenge — particularly in a moment when the market and professionals are adapting to a new reality, where being 'in person' is no longer common and we increasingly connect only through screens and assorted devices.",
        "In the middle of a whirlwind of new media, new ways to communicate and work as a group, and new artificial-intelligence tools emerging, I still believe the main goal — whatever form is chosen — is the interaction between people and the sharing of knowledge and information.",
      ],
      pt: [
        "Falar em público pode ser um desafio especialmente difícil, principalmente em um momento de adaptação do mercado e dos profissionais a uma nova realidade onde o 'presencial' já não é algo comum e cada vez mais nos conectamos unicamente por meio de telas e devices diversos.",
        "Em meio a um turbilhão de novas mídias, novas formas de comunicar e trabalhar em grupo, novas ferramentas de inteligência artificial surgindo, continuo achando que o principal objetivo, seja qual for a forma escolhida, ainda é a interação entre pessoas e o compartilhamento de conhecimento e informação.",
      ],
      es: [
        "Hablar en público puede ser un desafío especialmente difícil, sobre todo en un momento de adaptación del mercado y de los profesionales a una nueva realidad donde lo 'presencial' ya no es algo común y cada vez más nos conectamos únicamente por medio de pantallas y dispositivos diversos.",
        "En medio de un torbellino de nuevos medios, nuevas formas de comunicar y trabajar en grupo, y nuevas herramientas de inteligencia artificial surgiendo, sigo creyendo que el principal objetivo, sea cual sea la forma elegida, aún es la interacción entre personas y el compartir conocimiento e información.",
      ],
      de: [
        "Öffentlich zu sprechen kann eine besonders harte Herausforderung sein — vor allem in einem Moment, in dem Markt und Fachleute sich an eine neue Realität anpassen, in der 'Präsenz' nicht mehr üblich ist und wir uns zunehmend nur noch über Bildschirme und diverse Geräte verbinden.",
        "Inmitten eines Wirbelsturms neuer Medien, neuer Arten zu kommunizieren und im Team zu arbeiten und neu auftauchender KI-Werkzeuge glaube ich weiterhin, dass das Hauptziel — welche Form auch gewählt wird — die Interaktion zwischen Menschen und das Teilen von Wissen und Information ist.",
      ],
      fr: [
        "Parler en public peut être un défi particulièrement difficile — surtout à un moment où le marché et les professionnels s'adaptent à une nouvelle réalité où le 'présentiel' n'est plus courant et où nous nous connectons de plus en plus uniquement via des écrans et divers appareils.",
        "Au milieu d'un tourbillon de nouveaux médias, de nouvelles façons de communiquer et de travailler en groupe, et de nouveaux outils d'intelligence artificielle qui émergent, je continue de penser que l'objectif principal — quelle que soit la forme choisie — reste l'interaction entre les personnes et le partage de connaissances et d'informations.",
      ],
      ja: [
        "人前で話すことは、とりわけ難しい挑戦になり得ます。特に、市場も専門家も新しい現実に適応している今——『対面』がもはや当たり前ではなくなり、私たちはますます画面やさまざまなデバイスだけを通じてつながるようになっています。",
        "新しいメディア、新しいコミュニケーションやチームワークの形、そして次々と現れる新しい人工知能ツールという渦の中でも、私は今なお信じています。どの形を選ぼうとも、最も重要な目的は、人と人との関わり合いであり、知識と情報を分かち合うことだ、と。",
      ],
    },
  },
  {
    slug: 'i-started-a-youtube-channel',
    date: '2022-09-15',
    readingMinutes: 1,
    tags: ['Vue', 'YouTube', 'Frontend'],
    image: '/blog/youtube-channel.jpg',
    youtube: 'AB3G7vmEX9o',
    category: { en: 'Engineering', pt: 'Engenharia', es: 'Ingeniería', de: 'Engineering', fr: 'Ingénierie', ja: 'エンジニアリング' },
    title: {
      en: 'I Started a YouTube Channel',
      pt: 'Comecei um Canal no YouTube',
      es: 'Empecé un Canal de YouTube',
      de: 'Ich habe einen YouTube-Kanal gestartet',
      fr: "J'ai lancé une chaîne YouTube",
      ja: 'YouTube チャンネルを始めました',
    },
    excerpt: {
      en: "I've started a channel — still a little shyly — to talk about front-end topics, with a focus on Vue 3.",
      pt: "Comecei um canal — ainda de forma tímida — para falar sobre temas de front-end, com foco em Vue 3.",
      es: "Empecé un canal — todavía de forma tímida — para hablar sobre temas de front-end, con foco en Vue 3.",
      de: "Ich habe einen Kanal gestartet — noch etwas schüchtern — um über Frontend-Themen zu sprechen, mit Fokus auf Vue 3.",
      fr: "J'ai lancé une chaîne — encore un peu timidement — pour parler de sujets front-end, avec un accent sur Vue 3.",
      ja: "フロントエンド全般、とくに Vue 3 について話すチャンネルを——まだ控えめにですが——始めました。",
    },
    quote: {
      en: "More content coming soon — follow along.",
      pt: "Em breve, mais conteúdos — acompanhe por lá.",
      es: "Pronto, más contenidos — acompaña por allí.",
      de: "Bald kommt mehr — bleib dran.",
      fr: "Bientôt plus de contenu — suivez ça.",
      ja: "近いうちにもっと投稿します——ぜひフォローを。",
    },
    body: {
      en: [
        "I've started a channel — still a little shyly — to talk about front-end topics in general.",
        "If you'd like to learn a bit about Vue 3, follow along; I'll be releasing more content soon.",
      ],
      pt: [
        "Comecei um canal — ainda de forma tímida — para falar sobre assuntos voltados ao front-end no geral.",
        "Quem quiser aprender um pouco sobre Vue 3, acompanhe por lá; em breve lançarei mais conteúdos.",
      ],
      es: [
        "Empecé un canal — todavía de forma tímida — para hablar sobre temas de front-end en general.",
        "Quien quiera aprender un poco sobre Vue 3, que acompañe por allí; pronto lanzaré más contenidos.",
      ],
      de: [
        "Ich habe einen Kanal gestartet — noch etwas schüchtern — um allgemein über Frontend-Themen zu sprechen.",
        "Wer ein wenig über Vue 3 lernen möchte, bleibt dort dran; bald veröffentliche ich mehr Inhalte.",
      ],
      fr: [
        "J'ai lancé une chaîne — encore un peu timidement — pour parler de sujets front-end en général.",
        "Si vous voulez apprendre un peu sur Vue 3, suivez ça ; je publierai bientôt plus de contenu.",
      ],
      ja: [
        "フロントエンド全般について話すチャンネルを——まだ控えめにですが——始めました。",
        "Vue 3 を少し学びたい方は、ぜひあちらでフォローを。近いうちにもっとコンテンツを出します。",
      ],
    },
  },
  {
    slug: 'vue-3-routing-video',
    date: '2022-11-10',
    readingMinutes: 1,
    tags: ['Vue', 'Routing', 'YouTube'],
    image: '/blog/vue-routes-video.jpg',
    youtube: '592GPE8uxcI',
    category: { en: 'Engineering', pt: 'Engenharia', es: 'Ingeniería', de: 'Engineering', fr: 'Ingénierie', ja: 'エンジニアリング' },
    title: {
      en: 'Vue 3 Routing, in a Short Video',
      pt: 'Rotas no Vue 3, em um Vídeo Rápido',
      es: 'Rutas en Vue 3, en un Vídeo Corto',
      de: 'Routing in Vue 3, in einem kurzen Video',
      fr: 'Le routing dans Vue 3, en une courte vidéo',
      ja: 'Vue 3 のルーティングを短い動画で',
    },
    excerpt: {
      en: "A new video is out — a short walk through routing in Vue 3.",
      pt: "Saiu mais um vídeo — um passeio rápido pelas rotas no Vue 3.",
      es: "Salió un nuevo vídeo — un recorrido rápido por las rutas en Vue 3.",
      de: "Ein neues Video ist da — ein kurzer Rundgang durch das Routing in Vue 3.",
      fr: "Une nouvelle vidéo est sortie — un tour rapide du routing dans Vue 3.",
      ja: "新しい動画が公開——Vue 3 のルーティングをさっと解説します。",
    },
    quote: {
      en: "Routing, kept simple.",
      pt: "Rotas, de forma simples.",
      es: "Rutas, de forma simple.",
      de: "Routing, einfach gehalten.",
      fr: "Le routing, en simple.",
      ja: "ルーティングを、シンプルに。",
    },
    body: {
      en: [
        "Another one is out!",
        "In this video we talk a little about routing in Vue 3.",
      ],
      pt: [
        "Saiu mais um!",
        "Nesse vídeo falamos um pouco sobre rotas no Vue 3.",
      ],
      es: [
        "¡Salió uno más!",
        "En este vídeo hablamos un poco sobre las rutas en Vue 3.",
      ],
      de: [
        "Noch eines ist da!",
        "In diesem Video sprechen wir ein wenig über Routing in Vue 3.",
      ],
      fr: [
        "Encore une qui sort !",
        "Dans cette vidéo, nous parlons un peu du routing dans Vue 3.",
      ],
      ja: [
        "また一本公開しました！",
        "この動画では、Vue 3 のルーティングについて少し話しています。",
      ],
    },
  },
]
