import { DefaultSeoProps } from 'next-seo'

export const SITE_DESC =
  '立即使用海量的 ChatGPT 应用，或在几秒钟内创建属于自己的应用。'
export const DEFAULT_SEO_CONFIG: DefaultSeoProps = {
  title: 'LetsrunAI - Create AI in seconds',
  titleTemplate: '%s | LetsrunAI',
  defaultTitle: 'LetsrunAI - Create AI in seconds',
  description: 'letsrunrun｜chatgpt|AI｜creteAI｜gpt应用｜个人chatgpt',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://letsrunai.com',
    siteName: 'LetsrunAI',
  },
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.png',
    },
  ],
}
