import { notFound } from "next/navigation";

import { getPostAndMorePosts } from "@lib/api";
import markdownToHtml from "@lib/markdownToHtml";

import { Section } from "@components/common/Layout/Section";
import { Layout } from "@components/Post/Layout/Layout";
import PostContent from "@components/Post/post-content";

import "highlight.js/styles/default.css";

interface PostPageProps {
  params: {
    slug: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const data = await getPostAndMorePosts(slug);

  if (!data?.post?.slug) {
    notFound();
  }

  const post = {
    ...data.post,
    metadata: {
      ...data.post?.metadata,
      teaser: await markdownToHtml(data.post?.metadata?.teaser || ""),
      content: await markdownToHtml(data.post?.metadata?.content || ""),
    },
  };

  const morePosts = data.morePosts || [];

  return (
    <>
      <style jsx global>{`
        #post-content > .post > .categories {
          display: inline-block;
          vertical-align: top;
          margin: 5px 0;
        }

        #post-content > .post > .categories > a {
          display: inline-block;
          vertical-align: top;
          font-size: 0.9em;
          text-transform: uppercase;
          height: 28px;
          line-height: 20px;
          padding: 3px 5px 7px 5px;
          margin: 0 5px 24px 0;
          background-color: rgb(210, 210, 210);
          color: rgb(90, 90, 90);
          box-shadow:
            0 -4px 0 rgba(255, 255, 255, 0.3) inset,
            0 -3px 0 rgba(0, 0, 0, 0.3) inset,
            -1px 0 0 rgba(0, 0, 0, 0.3) inset,
            1px 1px 0 rgba(0, 0, 0, 0.3) inset;
          transition: background-color 0.2s ease-in;
        }

        #post-content > .post > .categories > a {
          border-radius: 5px;
        }

        #post-content > .post > .categories > a:hover {
          background-color: rgb(235, 235, 235);
        }

        #post-content > .post > .categories > a:active {
          margin: 4px 5px 20px 0;
          padding: 3px 5px;
          background-color: rgb(235, 235, 235);
          box-shadow: none;
        }

        #post-content > .post,
        #post-content > .post > .header,
        #post-content > .post > .header > h2,
        #post-content > .post > .header > h2 > a {
          display: inline-block;
          vertical-align: top;
          width: 100%;
          margin: 0;
          padding: 0;
        }

        #post-content > .post > .header > h2 > a {
          text-decoration: none;
          color: rgb(0, 0, 0);
        }

        #post-content > .post > .header > h2 > a > span {
          font-size: 3.2em;
          font-weight: 200;
          line-height: 1em;
        }

        #post-content > .post > .header > h2 > a:hover {
          text-decoration: none;
          color: rgb(77, 77, 70);
        }

        #post-content > .post > .social {
          display: inline-block;
          vertical-align: top;
          width: 100%;
          margin: 5px 0;
          padding: 0;
        }

        #post-content > .post > .social > .description {
          float: left;
          width: 100%;
          margin: 5px 0;
          padding: 0;
          color: rgb(102, 102, 102);
          font-size: 1.2em;
          font-weight: 300;
          line-height: 1em;
          text-align: justify;
        }

        #post-content > .post > .social > .description > strong {
          font-weight: 400;
        }

        #post-content > .post > .social > .description > a {
          text-decoration: none;
          color: rgb(26, 188, 156);
          font-weight: 400;
        }

        #post-content > .post > .social > .description > a:hover {
          text-decoration: underline;
        }

        #post-content > .post > .social > .espacio {
          float: left;
          width: 70%;
          height: 70px;
          margin: 20px 0;
        }

        #post-content > .post > .social > .comments {
          float: left;
          width: 12%;
          color: rgb(153, 153, 153);
          margin: 20px 0;
        }

        #post-content > .post > .social > .comments > .n_comments {
          display: inline-block;
          vertical-align: top;
          width: 100%;
          height: 50px;
          font-size: 3em;
          line-height: 50px;
          text-align: center;
          text-transform: uppercase;
          word-wrap: break-word;
        }

        #post-content > .post > .social > .comments > .t_comments {
          display: inline-block;
          vertical-align: top;
          width: 100%;
          height: 20px;
          font-size: 0.7em;
          line-height: 20px;
          text-align: center;
          text-transform: uppercase;
          word-wrap: break-word;
        }

        #post-content > .post > .social > .twitter,
        #post-content > .post > .social > .linkedin,
        #post-content > .post > .social > .facebook {
          float: left;
          width: 6%;
        }

        #post-content > .post > .social > .twitter > a,
        #post-content > .post > .social > .linkedin > a,
        #post-content > .post > .social > .facebook > a {
          display: inline-block;
          vertical-align: top;
          width: 100%;
          height: 60px;
          margin: 25px 0;
        }

        #post-content > .post > .social > .twitter > a > .hide,
        #post-content > .post > .social > .linkedin > a > .hide,
        #post-content > .post > .social > .facebook > a > .hide {
          display: none;
        }

        #post-content > .post > .social > .twitter > a > .sprite,
        #post-content > .post > .social > .linkedin > a > .sprite,
        #post-content > .post > .social > .facebook > a > .sprite {
          display: block;
          width: 60px;
          height: 60px;
          margin: 0 auto;
          background-image: url("/images/sprite.svg");
          background-repeat: no-repeat;
        }

        #post-content > .post > .social > .twitter > a > .sprite {
          background-position: -300px -90px;
        }

        #post-content > .post > .social > .facebook > a > .sprite {
          background-position: -360px -90px;
        }

        #post-content > .post > .social > .linkedin > a > .sprite {
          background-position: -420px -90px;
        }

        #post-content > .post > .social > .twitter > a:hover > .sprite {
          background-position: -300px -30px;
        }

        #post-content > .post > .social > .facebook > a:hover > .sprite {
          background-position: -360px -30px;
        }

        #post-content > .post > .social > .linkedin > a:hover > .sprite {
          background-position: -420px -30px;
        }

        #post-content > .post > .text {
          display: inline-block;
          vertical-align: top;
          width: 100%;
          font-size: 1.3em;
          font-weight: 300;
          line-height: 1.5em;
          text-align: justify;
          word-wrap: break-word;
        }

        #post-content > .post > .text h4,
        #post-content > .post > .text h3,
        #post-content > .post > .text h2,
        #post-content > .post > .text h1 {
          display: block;
          width: 100%;
          margin: 20px 0;
          font-size: 1.8em;
          font-weight: 200;
          line-height: 1.2em;
        }

        #post-content > .post > .text p {
          margin: 0 0 30px 0;
        }

        #post-content > .post > .text strong {
          font-weight: 400;
        }

        #post-content > .post > .text a {
          text-decoration: none;
          color: rgb(26, 188, 156);
          font-weight: 400;
        }

        #post-content > .post > .text a:hover {
          text-decoration: underline;
        }

        #post-content > .post > .text ol {
          list-style: decimal outside;
        }

        #post-content > .post > .text ul {
          list-style: disc outside;
        }

        #post-content > .post > .text ol,
        #post-content > .post > .text ul {
          display: block;
          width: 95%;
          margin: 0 0 30px 5%;
        }

        #post-content > .post > .text ol > li,
        #post-content > .post > .text ul > li {
          margin: 0 0 0 30px;
        }

        #post-content > .post > .text .highlight {
          display: inline-block;
          vertical-align: top;
          width: 100%;
        }

        #post-content > .post > .text .highlight pre {
          display: inline-block;
          vertical-align: top;
          width: 98%;
          margin: 0 0 30px 0;
          padding: 0 1%;
          border-radius: 5px;
          background-color: rgb(230, 230, 211);
          overflow: auto;
        }

        #post-content > .post > .text .highlight pre code {
          display: inline-block;
          vertical-align: baseline;
          font-family: monospace;
          font-size: 1em;
          line-height: 1.2em;
          padding: 2px 5px;
          margin: 5px;
          border-radius: 5px;
          background-color: rgb(238, 238, 238);
        }

        #post-content > .post > .text .highlight pre > code {
          padding: 0;
          margin: 5px 0;
          text-shadow: 0 1px 0 rgb(255, 255, 255);
          background-color: transparent;
          border-radius: 0;
        }

        #post-content > .post > .text blockquote {
          display: inline-block;
          vertical-align: top;
          width: 88%;
          margin: 30px 5%;
          padding: 10px 1%;
          font-style: italic;
          font-size: 1.5em;
          line-height: 1.5em;
          background-color: #f9f6ed;
          border-radius: 20px;
        }

        #post-content > .post > .text blockquote p,
        #post-content > .post > .text blockquote ol,
        #post-content > .post > .text blockquote ul {
          margin: 0 0 30px 0;
        }

        #post-content > .post > .text blockquote:before {
          float: left;
          margin: 0;
          width: 20%;
          height: 100px;
          line-height: 150px;
          font-family: serif;
          font-size: 10em;
          font-weight: 900;
          content: "\\201C";
          color: #888;
        }

        #post-content > .post > .text table,
        #post-content > .post > .text table thead,
        #post-content > .post > .text table tbody,
        #post-content > .post > .text table thead tr,
        #post-content > .post > .text table tbody tr {
          width: 100%;
        }

        #post-content > .post > .text table {
          display: table;
          margin: 30px 0;
        }

        #post-content > .post > .text table thead {
          display: table-header-group;
        }

        #post-content > .post > .text table tbody {
          display: table-row-group;
        }

        #post-content > .post > .text table thead tr,
        #post-content > .post > .text table tbody tr {
          display: table-row;
        }

        #post-content > .post > .text table thead tr th,
        #post-content > .post > .text table tbody tr td {
          display: table-cell;
        }

        #post-content > .post > .text .soundcloud,
        #post-content > .post > .text .youtube {
          display: inline-block;
          position: relative;
          width: 100%;
          height: 0;
          padding: 0 0 56.25% 0;
          border-radius: 10px;
          overflow: hidden;
        }

        #post-content > .post > .text .soundcloud {
          padding: 0 0 16% 0;
        }

        #post-content > .post > .text .soundcloud .player,
        #post-content > .post > .text .youtube .player {
          display: inline-block;
          vertical-align: middle;
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          margin: 0;
          padding: 0;
        }

        #post-content > .post > .text iframe.pdfviewer,
        #post-content > .post > .text iframe.svgviewer {
          display: inline-block;
          vertical-align: top;
          width: 100%;
          height: 600px;
          margin: 0;
          padding: 0;
        }

        .figure-100,
        .figure-right-40,
        .figure-right-30,
        .figure-right-20,
        .figure-left-40,
        .figure-left-30,
        .figure-left-20 {
          display: inline-block;
          vertical-align: top;
          width: 100%;
          margin: 15px 0 60px 0;
          padding: 0;
          overflow: hidden;
          border-radius: 5px;
          cursor: pointer;
        }

        .figure-right-40,
        .figure-left-40 {
          width: 40%;
        }

        .figure-right-30,
        .figure-left-30 {
          width: 30%;
        }

        .figure-right-20,
        .figure-left-20 {
          width: 20%;
        }

        .figure-right-40,
        .figure-right-30,
        .figure-right-20 {
          float: right;
          margin: 30px;
        }

        .figure-left-40,
        .figure-left-30,
        .figure-left-20 {
          float: left;
          margin: 30px;
        }

        .figure-100 > a,
        .figure-right-40 > a,
        .figure-right-30 > a,
        .figure-right-20 > a,
        .figure-left-40 > a,
        .figure-left-30 > a,
        .figure-left-20 > a {
          display: inline-block;
          vertical-align: top;
          width: 100%;
        }

        .figure-100 > a > .figure-container,
        .figure-right-40 > a > .figure-container,
        .figure-right-30 > a > .figure-container,
        .figure-right-20 > a > .figure-container,
        .figure-left-40 > a > .figure-container,
        .figure-left-30 > a > .figure-container,
        .figure-left-20 > a > .figure-container {
          display: inline-block;
          vertical-align: top;
          position: relative;
          width: 100%;
        }

        .figure-100 > a > .figure-container > .image,
        .figure-right-40 > a > .figure-container > .image,
        .figure-right-30 > a > .figure-container > .image,
        .figure-right-20 > a > .figure-container > .image,
        .figure-left-40 > a > .figure-container > .image,
        .figure-left-30 > a > .figure-container > .image,
        .figure-left-20 > a > .figure-container > .image {
          display: inline-block;
          vertical-align: top;
          width: 100%;
          height: auto;
          margin: 0;
          padding: 0;
        }

        .figure-100 > a > .figure-container > .caption,
        .figure-right-40 > a > .figure-container > .caption,
        .figure-right-30 > a > .figure-container > .caption,
        .figure-right-20 > a > .figure-container > .caption,
        .figure-left-40 > a > .figure-container > .caption,
        .figure-left-30 > a > .figure-container > .caption,
        .figure-left-20 > a > .figure-container > .caption {
          display: block;
          position: absolute;
          bottom: 0;
          width: 98%;
          padding: 5px 1%;
          font-size: 1em;
          line-height: 1em;
          text-align: left;
          color: rgb(68, 68, 68);
          background-color: rgb(239, 235, 224);
          opacity: 0.4;
          transition: opacity 0.4s ease-out;
        }

        .figure-100:hover > a > .figure-container > .caption,
        .figure-right-40:hover > a > .figure-container > .caption,
        .figure-right-30:hover > a > .figure-container > .caption,
        .figure-right-20:hover > a > .figure-container > .caption,
        .figure-left-40:hover > a > .figure-container > .caption,
        .figure-left-30:hover > a > .figure-container > .caption,
        .figure-left-20:hover > a > .figure-container > .caption {
          opacity: 0.8;
        }

        #post-content > .post > .text .picasa {
          display: inline-block;
          vertical-align: top;
          width: 100%;
          margin: 15px 0;
        }

        #post-content > .post > .text .picasa > .picasa-album {
          display: inline-block;
          vertical-align: top;
          width: 100%;
          margin: 0;
          padding: 0;
        }

        #post-content > .post > .text .picasa > .picasa-album > .picasa-image {
          float: left;
          list-style: none;
          width: 16%;
          margin: 10px 1%;
          padding: 10px 1%;
          border-radius: 5px;
          background-color: rgb(239, 235, 224);
          transition: background-color 500ms ease-out;
        }

        #post-content
          > .post
          > .text
          .picasa
          > .picasa-album
          > .picasa-image:hover {
          background-color: rgb(26, 188, 156);
        }

        #post-content
          > .post
          > .text
          .picasa
          > .picasa-album
          > .picasa-image
          > .picasa-image-large {
          display: inline-block;
          vertical-align: top;
          width: 100%;
          overflow: hidden;
          border-radius: 5px;
        }

        #post-content
          > .post
          > .text
          .picasa
          > .picasa-album
          > .picasa-image
          > .picasa-image-large
          > .picasa-image-thumb {
          display: inline-block;
          vertical-align: top;
          width: 100%;
        }

        #post-content > .meta {
          display: inline-block;
          vertical-align: top;
          width: 100%;
        }

        #post-content > .meta > .keywords {
          display: inline-block;
          vertical-align: top;
          width: 100%;
          margin: 40px 0 20px 0;
        }

        #post-content > .meta > .keywords > li {
          float: left;
          margin: 5px;
          padding: 0;
        }

        #post-content > .meta > .keywords > li > a {
          color: rgb(136, 136, 136);
          padding: 5px;
          line-height: 1.5em;
          font-size: 1.2em;
          border-radius: 10px;
          background-color: rgb(249, 246, 237);
        }

        #post-content > .meta > .keywords > li > a:hover {
          background: rgb(239, 235, 224);
          text-decoration: none;
        }

        #post-content > .meta > h3 {
          font-size: 1.5em;
          font-weight: 300;
          line-height: 1em;
          margin: 70px 0 10px 0;
        }

        #post-content > .meta > #relatedposts {
          display: inline-block;
          vertical-align: top;
          width: 100%;
          margin: 0 0 70px 0;
        }

        #post-content > .meta > #relatedposts > li {
          float: left;
          padding: 5px 0;
          margin: 5px 1% 5px 0;
          width: 24%;
          list-style: none;
          color: rgb(68, 68, 68);
        }

        #post-content > .meta > #relatedposts > li > a {
          display: inline-block;
          vertical-align: top;
          width: 100%;
          border-radius: 5px;
          background-color: rgb(231, 231, 218);
          overflow: hidden;
        }

        #post-content > .meta > #relatedposts > li > a:hover {
          text-decoration: none;
          background-color: rgb(204, 204, 193);
        }

        #post-content > .meta > #relatedposts > li > a > .thumbnail {
          display: inline-block;
          vertical-align: top;
          width: 100%;
          height: 130px;
          background-size: cover;
        }

        #post-content > .meta > #relatedposts > li > a > .title {
          display: inline-block;
          vertical-align: top;
          width: 98%;
          height: 110px;
          margin: 5px 1%;
          font-size: 1.4em;
          font-weight: 300;
          line-height: 1em;
        }

        #modal-container {
          display: none;
          z-index: 99998;
        }

        #modal-overlay {
          display: inline-block;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(255, 255, 255, 0.8);
          z-index: 99997;
        }

        #modal-vertical-offset {
          display: inline-block;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          width: 80%;
          height: 80%;
          margin: auto;
          z-index: 99998;
          cursor: pointer;
        }

        #modal {
          display: block;
          position: relative;
          width: 100%;
          height: 100%;
          margin: 0;
          padding: 0;
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center center;
        }

        #modal-close {
          display: inline-block;
          position: absolute;
          right: -40px;
          width: 32px;
          height: 32px;
          background-image: url("/images/sprite.svg");
          background-repeat: no-repeat;
          background-position: -624px -32px;
          cursor: pointer;
        }

        #modal-close:hover {
          background-position: -656px -32px;
        }

        #post-content > #comments {
          display: inline-block;
          vertical-align: top;
          width: 100%;
          margin: 30px 0;
        }

        #post-content > #comments > #disqus_thread {
          display: inline-block;
          vertical-align: top;
          width: 100%;
        }

        /* // #extra-content > div {
//   width: 100%;
//   padding: 90px 0 0 0;
//   background-image: url("/images/sprite.svg");
//   background-repeat: no-repeat;
//   background-position: 0px -330px;
//   background-color: rgb(239, 235, 224);
// }

// #extra-content > div > ul {
//   display: inline-block;
//   vertical-align: top;
//   width: 100%;
//   padding: 5px 0;
//   margin: 0;
// }

// #extra-content > div > ul > li {
//   display: inline-block;
//   vertical-align: top;
//   width: 100%;
//   padding: 0;
//   margin: 1px 0;
//   list-style: none;
//   color: rgb(51, 51, 51);
//   text-align: left;
//   border-radius: 5px;
// }

// #extra-content > div > ul > li > a {
//   display: inline-block;
//   vertical-align: bottom;
//   width: 98%;
//   padding: 3px 1%;
//   font-size: 1.2em;
//   line-height: 1;
//   color: rgb(77, 77, 70);
// }

// #extra-content > div > ul > li > a > strong {
//   font-weight: 400;
// }

// #extra-content > div > ul > li > a:hover {
//   color: rgb(0, 0, 0);
//   text-decoration: none;
//   border-radius: 5px;
//   background-color: rgb(223, 219, 207);
// }

// #extra-content > div > ul > li > small {
//   font-size: 0.8em;
// } */
      `}</style>
      <Layout metadata={post}>
        <svg viewBox="0 0 1920 200">
          <path fill="#ddd" d="M960,50l960-50H0L960,50z" />
        </svg>
        <Section grid overflowVisible oneColumn nopadding wide>
          <PostContent
            title={post.title}
            coverImage={post.metadata.hero}
            date={post.created_at}
            id={post.id}
            content={post.metadata.content}
            categories={post.metadata.categories}
            slug={post.slug}
            excerpt={post.metadata.teaser}
            morePosts={morePosts}
          />
        </Section>
      </Layout>
    </>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params;
  const data = await getPostAndMorePosts(slug);

  if (!data?.post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: data.post.title,
    description:
      data.post.metadata?.teaser?.replace(/<[^>]*>/g, "").substring(0, 160) ||
      "",
    openGraph: {
      title: data.post.title,
      description:
        data.post.metadata?.teaser?.replace(/<[^>]*>/g, "").substring(0, 160) ||
        "",
      images: data.post.metadata?.hero ? [data.post.metadata.hero] : [],
    },
  };
}
