import { Metadata } from 'next'
import Link from 'next/link'

import { getBlogPosts } from '_libs/blog-contents'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read my thoughts on Frontend engineering, design, and more.',
}

export default function Page() {
  const allPosts = getBlogPosts()

  return (
    <>
      <h2 className='relative mb-4 font-mondwest text-4xl'>
        <span>Read my Blog</span>
        <span className='absolute  left-[2px] w-full text-stroke-mauve1 dark:text-stroke-mauve12'>
          Read my Blog
        </span>
      </h2>
      <ul className='flex w-full flex-1 list-none flex-col'>
        {allPosts
          .sort((a, b) => {
            if (
              new Date(a.metadata.publishedAt) >
              new Date(b.metadata.publishedAt)
            ) {
              return -1
            }
            return 1
          })
          .map(({ metadata: { publishedAt, thumbnail, title }, slug }) => (
            <li className='group relative font-notojp' key={slug}>
              <div className='flex flex-row items-center gap-x-3 px-3 py-2'>
                <Link href={`/blog/${slug}`}>
                  {/* <Twemoji emoji={thumbnail || ''} height={35} width={35} /> */}
                  <div className='font-serenityOSEmoji text-3xl'>
                    {thumbnail}
                  </div>
                </Link>
                <div className='flex h-full w-full flex-1 flex-col space-y-1'>
                  <Link className='w-fit text-base' href={`/blog/${slug}`}>
                    {title}
                  </Link>
                  <time className='dark:text-mauve-10 text-xs text-mauve6'>
                    {new Date(publishedAt).toLocaleString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </time>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </>
  )
}
