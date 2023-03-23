import { compileMDX } from 'next-mdx-remote/rsc'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'

const compile = async (source: string) => {
  return await compileMDX({
    source,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkBreaks],
      },
      parseFrontmatter: false,
    },
  })
}

export default compile
