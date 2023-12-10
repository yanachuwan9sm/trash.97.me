import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { CustomMDX } from '_components/blog/CustomMDX'
import { getBlogPosts } from '_libs/blog-contents'

function formatDate(date: string) {
  const currentDate = new Date()
  const targetDate = new Date(date)

  const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear()
  const monthsAgo = currentDate.getMonth() - targetDate.getMonth()
  const daysAgo = currentDate.getDate() - targetDate.getDate()

  let relativeTime = ''

  if (yearsAgo > 0) {
    relativeTime = `${yearsAgo}y ago`
  } else if (monthsAgo > 0) {
    relativeTime = `${monthsAgo}mo ago`
  } else if (daysAgo > 0) {
    relativeTime = `${daysAgo}d ago`
  } else {
    // none
  }

  // ex: 2023-11-19 -> November 19, 2023
  const formattedPublishedDate = targetDate.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return {
    formattedPublishedDate,
    relativeTime,
  }
}

// eslint-disable-next-line @typescript-eslint/require-await
export function generateStaticParams() {
  const allPosts = getBlogPosts()

  return allPosts.map((post) => ({
    slug: post.slug,
  }))
}

export default function Page({ params }: { params: { slug: string } }) {
  const post = getBlogPosts().find((post) => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  const { formattedPublishedDate, relativeTime } = formatDate(
    post.metadata.publishedAt,
  )

  return (
    <article className='flex w-full flex-col break-words'>
      <Link
        className='mb-8 flex flex-row items-center gap-x-2 stroke-mauve10/70 text-mauve12/70 transition-colors duration-200 ease-in-out hover:stroke-mauve12/90 hover:text-mauve12/90'
        href='/blog'
      >
        <ArrowLeft className='h-4 w-4' />
        <span className='font-stack tracking-tighter'>Back to overview</span>
      </Link>
      <header className='mb-8 space-y-1'>
        <div className='font-serenityOSEmoji text-3xl'>
          {post.metadata.thumbnail || ''}
        </div>
        <h1 className='text-2xl font-bold'>{post.metadata.title}</h1>
        <p className='font-stack text-sm text-mauve11'>
          <time>{formattedPublishedDate}</time> ({relativeTime})
        </p>
      </header>
      <div className='article prose prose-zinc'>
        <CustomMDX source={post.content} />
      </div>
    </article>
  )
}
