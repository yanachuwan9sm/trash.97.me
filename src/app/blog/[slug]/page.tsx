import * as contentful from 'contentful'
import { format } from 'date-fns'
import serializeMDX from 'libs/compile'

import client from 'libs/client'

type blogPostType = {
  title: string
  source: string
  createDate: string
}

const getBlogPosts = async (): Promise<
  contentful.EntryCollection<Contentful.IBlogPostFields>
> => {
  const blogPosts = await client.getEntries<Contentful.IBlogPostFields>({
    content_type: 'blogPost',
    order: '-sys.createdAt',
  })

  return blogPosts
}

const getBlogPost = async (slug: string): Promise<blogPostType> => {
  const postData = await client.getEntries<Contentful.IBlogPostFields>({
    content_type: 'blogPost',
    'sys.id[match]': slug,
  })

  const {
    sys: { createdAt },
    fields: { title, content },
  } = postData.items[0]

  const createDate = format(new Date(createdAt), 'MMM dd, yyyy')

  return {
    title,
    source: content,
    createDate,
  }
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
