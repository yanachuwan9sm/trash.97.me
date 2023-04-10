import { h } from 'hastscript'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'
import remarkUnwrapImages from 'remark-unwrap-images'

import rehypeImageOptimum from './rehype-image-optimum'

import type { MDXRemoteProps } from 'next-mdx-remote/rsc'
import type { Options as rehypeAutolinkHeadingsOpt } from 'rehype-autolink-headings'
import type { Options as rehypePrettyCodeOpt } from 'rehype-pretty-code'

const rehypeAutolinkHeadingsOpt: rehypeAutolinkHeadingsOpt = {
  behavior: 'prepend',
  properties: {
    class: 'anchor-link',
  },
  content: () => [
    h(
      'span.anchor-iconWrapper',
      h(
        'svg.anchor-icon',
        {
          width: 16,
          height: 16,
          viewBox: '0 0 16 16',
          ariaLabel: '見出しのリンク',
          fill: 'currentcolor',
          xmlns: 'http://www.w3.org/2000/svg',
        },
        h('path', {
          d: 'M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z',
        })
      )
    ),
  ],
}

const rehypePrettyCodeOpt: Partial<rehypePrettyCodeOpt> = {
  theme: 'poimandres',
  keepBackground: true,
}

const mdxRemoteOption: MDXRemoteProps['options'] = {
  mdxOptions: {
    remarkPlugins: [remarkGfm, remarkBreaks, remarkUnwrapImages],
    rehypePlugins: [
      rehypeImageOptimum,
      rehypeSlug,
      [rehypeAutolinkHeadings, rehypeAutolinkHeadingsOpt],
      [rehypePrettyCode, rehypePrettyCodeOpt],
    ],
    format: 'md',
  },
  parseFrontmatter: false,
}

export default mdxRemoteOption
