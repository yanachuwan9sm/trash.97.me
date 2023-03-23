import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'

const compile = async (source: string) => {
  return await compileMDX({
    source,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
      parseFrontmatter: false,
    },
  })
}

export default compile
