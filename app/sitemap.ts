import { getBlogPosts } from '_libs/blog-contents'
import { withBaseUrl } from '_libs/utils'

export default function sitemap() {
  const routes = ['', '/blog', '/about'].map((route) => ({
    url: withBaseUrl(route),
    lastModified: new Date(),
  }))

  const blogs = getBlogPosts().map((post) => ({
    url: withBaseUrl(`/blog/${post.slug}`),
    lastModified: post.metadata.publishedAt,
  }))

  return [...routes, ...blogs]
}
