import type { Element } from "hast";
import { getPlaiceholder } from "plaiceholder";
import { Pluggable } from "unified";
import { Node } from "unist";
import { visit } from "unist-util-visit";
import type { VFileCompatible } from "vfile";

const rehypeImageOptimum: Pluggable = () => {
  return async (tree: Node, _file: VFileCompatible) => {
    const matches: { node: Element }[] = [];

    function visitor(node: Element): void {
      if (node.tagName !== "img" || typeof node?.properties?.src !== "string") {
        return;
      }

      matches.push({ node });
    }

    visit(tree, "element", visitor);

    if (matches.length === 0) {
      return;
    }

    const promises = matches.map(async ({ node }) => {
      if (typeof node?.properties?.src !== "string") {
        return;
      }

      const {
        base64,
        img: { height, src, width },
      } = await getPlaiceholder(`https:${node.properties.src}`);

      node.properties.aspectRatio = `${width} / ${height}`;
      node.properties.blurDataURL = base64;
      node.properties.height = height;
      node.properties.src = src;
      node.properties.width = width;
    });

    await Promise.all(promises);
  };
};

export default rehypeImageOptimum;
