import Link from 'next/link'

import { BlogPost, getBlogPosts } from 'libs/contentful'

import styles from '../styles/Home.module.css'

export default async function Home() {
  const post = await getBlogPosts()

  const postList = post.items.map((item) => {
    const { id, createdAt, updatedAt } = item.sys
    return {
      id,
      createdAt: new Date(createdAt).toLocaleDateString(),
      updatedAt: new Date(updatedAt).toLocaleDateString(),
      ...item.fields,
    }
  })

  return (
    <div className={styles.container}>
      <header>
        <h1 className={styles.title}>My Blog</h1>
      </header>
      <main className={styles.main}>
        <p>BlogPosts</p>
        <ul>
          {postList.map(({ id, title, category, createdAt }: BlogPost) => (
            <>
              <li key={id}>
                <article>
                  <h2>
                    <Link href={`/blog/${id}`}>{title}</Link>
                  </h2>
                  <p>作成日時 : {createdAt}</p>
                  <p>
                    カテゴリー :
                    {category?.map(
                      ({ fields }: Contentful.ITag) => fields.title
                    )}
                  </p>
                </article>
              </li>
            </>
          ))}
        </ul>
      </main>
    </div>
  )
}
