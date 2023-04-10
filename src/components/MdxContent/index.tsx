import { MDXRemote } from 'next-mdx-remote/rsc'

import MdxComponents from 'components/MdxComponents'
import mdxRemoteOption from 'libs/mdx-remote-option'

import type { MDXRemoteProps } from 'next-mdx-remote/rsc'

type MdxContentProps = MDXRemoteProps

const MdxContent = ({ source, options, components }: MdxContentProps) => {
  return (
    // https://github.com/hashicorp/next-mdx-remote/issues/307
    /* @ts-expect-error Async Server Component */
    <MDXRemote
      source={source}
      options={{ ...mdxRemoteOption, ...(options || {}) }}
      components={{ ...MdxComponents, ...(components || {}) }}
    />
  )
}

export default MdxContent
