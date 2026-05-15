import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Krishora Technologies',
    short_name: 'Krishora',
    description: 'Premier AI Automation & LLM Development Studio',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#6c2bd9',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
