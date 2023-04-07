import type { MDXRemoteProps } from 'next-mdx-remote/rsc'

const mdxRemoteOption: MDXRemoteProps['options'] = {
  mdxOptions: {
    format: 'md',
  },
  parseFrontmatter: false,
}

export default mdxRemoteOption
