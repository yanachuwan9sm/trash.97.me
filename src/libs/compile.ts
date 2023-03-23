import { compileMDX } from 'next-mdx-remote/rsc'

const compile = async (source: string) => {
  return await compileMDX({
    source,
    options: {
      parseFrontmatter: false,
    },
  })
}

export default compile
