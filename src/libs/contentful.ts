import * as contentful from 'contentful'

import client from './client'

export type BlogPost = Contentful.IBlogPostFields &
  Pick<contentful.Sys, 'id' | 'createdAt' | 'updatedAt'>

export const getBlogPosts = async (): Promise<
  contentful.EntryCollection<Contentful.IBlogPostFields>
> => {
  const blogPosts = await client.getEntries<Contentful.IBlogPostFields>({
    content_type: 'blogPost',
    order: '-sys.createdAt',
  })
  return blogPosts
}
