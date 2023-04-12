import * as contentful from "contentful";
import { format } from "date-fns";
import MdxContent from "components/MdxContent";
import client from "libs/client";

const getBlogPosts = async (): Promise<
  contentful.EntryCollection<Contentful.IBlogPostFields>
> => {
  const blogPosts = await client.getEntries<Contentful.IBlogPostFields>({
    content_type: "blogPost",
    order: "-sys.createdAt",
  });

  return blogPosts;
};
const getBlogPost = async (
  slug: string
): Promise<contentful.Entry<Contentful.IBlogPostFields>> => {
  const postData = await client.getEntry<Contentful.IBlogPostFields>(slug);

  return postData;
};

type StaticParam = {
  slug: string;
};

export async function generateStaticParams(): Promise<StaticParam[]> {
  const post = await getBlogPosts();

  return post.items.map(({ sys: { id } }) => ({
    slug: id,
  }));
}

export default async function Page({
  params: { slug },
}: {
  params: { slug: string };
}): Promise<JSX.Element> {
  const {
    fields: { content, title },
    sys: { createdAt },
  } = await getBlogPost(slug);
  const createDate = format(new Date(createdAt), "MMM dd, yyyy");

  return (
    <div>
      <article>
        <header>
          <h1>{title}</h1>
          <div>
            <time>{createDate}</time>
          </div>
        </header>
        <MdxContent source={content} />
      </article>
    </div>
  );
}
