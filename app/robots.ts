import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/private/', '/api/'],
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'Claude-Web', 'ClaudeBot', 'Anthropic-AI', 'Google-Extended', 'CCBot', 'Omgilibot', 'Omgili', 'FacebookBot', 'Diffbot', 'Bytespider', 'ImagesiftBot', 'PerplexityBot'],
        allow: '/',
      }
    ],
    sitemap: 'https://krishoratech.com/sitemap.xml',
  }
}
