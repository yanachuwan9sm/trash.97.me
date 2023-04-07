import { MDXRemote } from 'next-mdx-remote/rsc'

import type { MDXRemoteProps } from 'next-mdx-remote/rsc'

const MdxContent = (props: MDXRemoteProps) => {
  return (
    // https://github.com/hashicorp/next-mdx-remote/issues/307
    /* @ts-expect-error Async Server Component */
    <MDXRemote {...props} />
  )
}

export default MdxContent
