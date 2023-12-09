import { MDXRemote } from 'next-mdx-remote/rsc'

import { LinkCard, LinkCardProps } from '_components/blog/LinkCard'
import mdxRemoteOption from '_libs/mdx-remote-option'

import { BlogFigureImage } from '../BlogFigureImage'
import { NoteCard } from '../NoteCard'

import type { MDXRemoteProps } from 'next-mdx-remote/rsc'

const MdxEmbeddedComponents: MDXRemoteProps['components'] = {
  Image: (props: React.ComponentProps<typeof BlogFigureImage>) => (
    <BlogFigureImage {...props} />
  ),
  NoteCard: (props: React.ComponentProps<typeof NoteCard>) => (
    <NoteCard {...props} />
  ),
  directLink: (props: LinkCardProps) => <LinkCard {...props} />,
}

export const CustomMDX = ({ source, ...props }: MDXRemoteProps) => {
  return (
    // https://github.com/hashicorp/next-mdx-remote/issues/307
    /* @ts-expect-error Async Server Component */
    <MDXRemote
      source={source}
      options={{ ...mdxRemoteOption, ...props.options }}
      components={{ ...MdxEmbeddedComponents, ...props.components }}
    />
  )
}
