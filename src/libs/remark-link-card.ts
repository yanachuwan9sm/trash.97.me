import fetchSiteMetadata from 'fetch-site-metadata'
import { Paragraph, Link } from 'mdast'
import { Node, Parent, Data } from 'unist'
import { visit } from 'unist-util-visit'

import type { Metadata } from 'fetch-site-metadata'
import type { Pluggable } from 'unified'
import type { VFileCompatible } from 'vfile'

const isObject = (target: unknown): target is { [key: string]: unknown } =>
  typeof target === 'object' && target !== null

// https://github.com/syntax-tree/unist#node
const isNode = (node: unknown): node is Node => isObject(node) && 'type' in node

// https://github.com/syntax-tree/unist#parent
const isParent = (node: unknown): node is Parent =>
  isObject(node) && Array.isArray(node.children)

// https://github.com/syntax-tree/mdast#paragraph
const isParagraph = (node: unknown): node is Paragraph =>
  isNode(node) && isParent(node) && node.type === 'paragraph'

// https://github.com/syntax-tree/mdast#list
const isLink = (node: unknown): node is Link =>
  isNode(node) && isParent(node) && node.type === 'link'

const DIRECT_URL_BEGINNNIG = 'http'

// 直リンクを探す関数
const isDirectLink = (node: unknown): node is Paragraph => {
  if (!isParagraph(node)) return false

  const { children } = node

  if (children.length !== 1) return false

  const linkChildNode = children[0]

  // 子ノードの一番最初がテキストであり、httpで始まっているかどうか
  return (
    isLink(linkChildNode) &&
    linkChildNode.children[0].type === 'text' &&
    linkChildNode.url.startsWith(DIRECT_URL_BEGINNNIG)
  )
}

const getMetadataFromWebsite = (url: string) => {
  return fetchSiteMetadata(url).then(
    ({ title, description, image, icon }: Metadata) => ({
      url,
      title: title ?? 'No title',
      description: description ?? '',
      ogImage: image?.src?.startsWith('https') ? image?.src : undefined,
      favicon: icon?.startsWith('https') ? icon : undefined,
    })
  )
}

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

// httpから始まる直リンクと判断した箇所を directLink ノードへ変換する
const remarkLinkCard: Pluggable =
  () => async (tree: Node, _file: VFileCompatible) => {
    const promiseFuncs: (() => Promise<void>)[] = []

    visit(
      tree,
      isDirectLink,
      (node: Paragraph, index: number, parent: Parent | undefined) => {
        if (!isParent(parent)) return
        if (!isLink(node.children[0])) return

        const childNode = node.children[0]

        promiseFuncs.push(async () => {
          if (!isParent(parent)) return
          const metaData = await getMetadataFromWebsite(childNode.url)
          parent.children[index] = {
            type: 'directLink',
            meta: metaData,
          } as DirectLink
        })
      }
    )

    if (!promiseFuncs.length) return
    await Promise.all(promiseFuncs.map((func) => func()))
  }

export default remarkLinkCard
