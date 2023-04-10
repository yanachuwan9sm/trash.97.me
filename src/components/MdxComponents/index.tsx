import NextFigureImage from 'components/NextFigureImage'

import type { MDXComponents } from 'mdx/types'

type NextFigureImageProps = React.ComponentProps<typeof NextFigureImage>

type ProvidedComponents = MDXComponents & {
  img?: typeof NextFigureImage
}

const MdxComponents = {
  img: (props: NextFigureImageProps) => <NextFigureImage {...props} />,
} as ProvidedComponents

export default MdxComponents
