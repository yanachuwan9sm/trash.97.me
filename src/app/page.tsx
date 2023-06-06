import * as contentful from 'contentful'
import { format } from 'date-fns'
import Link from 'next/link'

import Twemoji from 'components/Twemoji'
import client from 'libs/client'

import styles from './Home.module.css'

const getBlogPosts = async (): Promise<
  contentful.EntryCollection<Contentful.IBlogPostFields>
> => {
  const blogPosts = await client.getEntries<Contentful.IBlogPostFields>({
    content_type: 'blogPost',
    order: '-sys.createdAt',
  })
  return blogPosts
}

export default async function Page() {
  const postDate = await getBlogPosts()

  const postList = postDate.items.map(
    ({ fields, sys: { createdAt, id, updatedAt } }) => ({
      ...fields,
      id,
      createdAt: format(new Date(createdAt), 'MMM dd, yyyy'),
      updatedAt: format(new Date(updatedAt), 'MMM dd, yyyy'),
    })
  )

  return (
    <div className={styles.container}>
      <header>
        <div className={styles.title}>
          <Link href='/'>My Blog</Link>
        </div>
      </header>
      <main className={styles.main}>
        <h1>記事一覧</h1>
        <ul>
          {postList.map(({ category, createdAt, id, thumbnail, title }) => (
            <li key={id}>
              <article>
                <h2>
                  <Link href={`/blog/${id}`}>{title}</Link>
                </h2>
                <div>
                  <Twemoji emoji={thumbnail || ''} height={42} width={42} />
                  <div>
                    {category?.map(({ fields: { title }, sys: { id } }) => (
                      <div key={id}>{title}</div>
                    ))}
                  </div>
                  <time>{createdAt}</time>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}
