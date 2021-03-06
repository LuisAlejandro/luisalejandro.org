import Head from 'next/head'

import Intro from '@/components/Blog/intro'
import BlogContainer from '@/components/Blog/blog-container'
import MoreStories from '@/components/Blog/more-stories'
import HeroPost from '@/components/Blog/hero-post'
import BlogLayout from '@/components/Blog/blog-layout'
import { getAllPostsForHome } from '@/lib/api'
import { CMS_NAME } from '@/lib/constants'


export default function Blog({ allPosts }) {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);
  return (
    <>
      <BlogLayout>
        <Head>
        </Head>
        <BlogContainer>
          <Intro />
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.metadata.cover_image}
              date={heroPost.created_at}
              author={heroPost.metadata.author}
              slug={heroPost.slug}
              excerpt={heroPost.metadata.excerpt}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </BlogContainer>
      </BlogLayout>
    </>
  )
}

export async function getStaticProps({ preview }) {
  const allPosts = (await getAllPostsForHome(preview)) || []
  return {
    props: { allPosts },
  }
}
