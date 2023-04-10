import { getPlaiceholder } from 'plaiceholder'
import { Node } from 'unist'
import { visit } from 'unist-util-visit'

import type { Element } from 'hast'
import type { VFileCompatible } from 'vfile'

const rehypeImageOptimum = () => {
  return async (tree: Node, _file: VFileCompatible) => {
    const matches: { node: Element }[] = []

    function visitor(node: Element) {
      if (
        node.tagName === 'img' &&
        node.properties &&
        node.properties.src &&
        typeof node.properties.src === 'string'
      ) {
        matches.push({ node })
      }
    }

    visit(tree, 'element', visitor)

    if (!matches.length) return

    const promises = matches.map(async ({ node }) => {
      if (!node.properties) return

      const src = node.properties.src
      const blur = await getPlaiceholder(`https:${src}`)
      node.properties.src = blur.img.src
      node.properties.width = blur.img.width
      node.properties.height = blur.img.height
      node.properties.aspectRatio = `${blur.img.width} / ${blur.img.height}`
      node.properties.blurDataURL = blur.base64
    })

    await Promise.all(promises)
  }
}

export default rehypeImageOptimum
