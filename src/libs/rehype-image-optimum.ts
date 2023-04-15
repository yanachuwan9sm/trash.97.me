import { getPlaiceholder } from 'plaiceholder'
import { Node } from 'unist'
import { visit } from 'unist-util-visit'

import type { Element } from 'hast'
import type { Pluggable } from 'unified'
import type { VFileCompatible } from 'vfile'

const rehypeImageOptimum: Pluggable =
  () => async (tree: Node, _file: VFileCompatible) => {
    const promiseFuncs: (() => Promise<void>)[] = []

    visit(tree, 'element', (node: Element) => {
      if (node.tagName !== 'img' && typeof node?.properties?.src !== 'string') {
        return
      }
      promiseFuncs.push(async () => {
        if (!node.properties) return
        const {
          img: { width, height, src },
          base64,
        } = await getPlaiceholder(`https:${node.properties.src}`)
        node.properties.src = src
        node.properties.width = width
        node.properties.height = height
        node.properties.aspectRatio = `${width} / ${height}`
        node.properties.blurDataURL = base64
      })
    })

    await Promise.all(promiseFuncs.map((func) => func()))
  }

export default rehypeImageOptimum
