import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import NextFigureImage from "components/NextFigureImage";
import options from "libs/options";

const components: MDXRemoteProps["components"] = {
  img: (props) => <NextFigureImage {...props} />,
};

export type MdxContentProps = Pick<
  MDXRemoteProps,
  "components" | "options" | "source"
>;

export default function MdxContent({
  source,
  ...props
}: MdxContentProps): JSX.Element {
  return (
    // https://github.com/hashicorp/next-mdx-remote/issues/307
    /* @ts-expect-error Async Server Component */
    <MDXRemote
      components={{ ...components, ...props.components }}
      options={{ ...options, ...props.options }}
      source={source}
    />
  );
}
