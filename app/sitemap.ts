import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  
  const blogUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `https://krishoratech.com/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    {
      url: 'https://krishoratech.com',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://krishoratech.com/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...blogUrls,
  ]
}
