import NextFigureImage from 'components/NextFigureImage'

import type { NextFigureImageProps } from 'components/NextFigureImage'
import type { MDXRemoteProps } from 'next-mdx-remote/rsc'

const MdxEmbeddedComponents: MDXRemoteProps['components'] = {
  img: (props: NextFigureImageProps) => <NextFigureImage {...props} />,
}

export default MdxEmbeddedComponents
