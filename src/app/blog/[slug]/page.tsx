import * as contentful from 'contentful'
import { format } from 'date-fns'

import client from 'libs/client'
import serializeMDX from 'libs/compile'

const getBlogPosts = async (): Promise<
  contentful.EntryCollection<Contentful.IBlogPostFields>
> => {
  const blogPosts = await client.getEntries<Contentful.IBlogPostFields>({
    content_type: 'blogPost',
    order: '-sys.createdAt',
  })

  return blogPosts
}

const getBlogPost = async (
  slug: string
): Promise<contentful.Entry<Contentful.IBlogPostFields>> => {
  const postData = await client.getEntry<Contentful.IBlogPostFields>(slug)

  return postData
}

export async function generateStaticParams() {
  const post = await getBlogPosts()
  const paths = post.items.map(({ sys: { id } }) => ({
    slug: id,
  }))
  return [...paths]
}

export default async function BlogDetailPage({
  params: { slug },
}: {
  params: { slug: string }
}) {
  const { title, source, createDate } = await getBlogPost(slug)
  const { content } = await serializeMDX(source)

  return (
    <div>
      <article>
        <header>
          <h1>{title}</h1>
          <div>
            <time>{createDate}</time>
          </div>
        </header>
        <div>{content}</div>
      </article>
    </div>
  )
}
