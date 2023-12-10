import { baseUrl, withBaseUrl } from './_libs/utils'
export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
      },
    ],
    sitemap: withBaseUrl('/sitemap.xml'),
    host: baseUrl,
  }
}
