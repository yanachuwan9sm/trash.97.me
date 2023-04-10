import Image from 'next/image'
import Link from 'next/link'

import type { ImageProps } from 'next/image'

type NextFigureImageProps = Omit<
  ImageProps,
  'src' | 'width' | 'height' | 'blurDataURL' | 'alt'
> & {
  src: string
  alt?: string
  aspectRatio: string
  blurDataURL: string
}

const NextFigureImage = ({
  src,
  alt,
  aspectRatio,
  blurDataURL,
}: NextFigureImageProps) => {
  return (
    <figure>
      <Link href={src} scroll={false}>
        <div
          style={{
            position: 'relative',
            display: 'flex',
            aspectRatio: aspectRatio,
          }}
        >
          <Image
            style={{ objectFit: 'contain' }}
            src={src}
            alt={alt || src}
            fill={true}
            placeholder='blur'
            blurDataURL={blurDataURL}
          />
        </div>
      </Link>
      <figcaption>{alt}</figcaption>
    </figure>
  )
}

export default NextFigureImage
