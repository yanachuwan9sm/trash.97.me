import { Node } from 'unist'

import type { H } from 'mdast-util-to-hast'

interface DirectLink extends Node {
  type: 'directLink'
  meta: {
    url: string
    title: string
    description: string
    ogImage: string | undefined
    favicon: string | undefined
  }
}

// DirectLinkノード(mdast) から メタデータの属性を持つ directLink ノード(hast)へ変換する関数
const remarkLinkCardHandler = (_h: H, { meta }: DirectLink) => {
  return {
    type: 'element' as const,
    tagName: 'directLink',
    properties: meta,
    children: [],
  }
}

export default remarkLinkCardHandler
