/* eslint-disable @typescript-eslint/restrict-template-expressions */
import Image from 'next/image'

import { cn } from '_libs/utils'

import type { ImageProps } from 'next/image'

interface BlogFigureImageProps extends ImageProps {
  className?: string
  caption?: string
}

export const BlogFigureImage = (props: BlogFigureImageProps): JSX.Element => {
  return (
    <figure>
      <Image
        {...props}
        className={cn('aspect-auto rounded-lg object-contain', props.className)}
        alt={props.alt}
      />
      {props.caption ? <figcaption>{props.alt}</figcaption> : null}
    </figure>
  )
}
