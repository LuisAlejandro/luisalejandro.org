import Head from "next/head";

import { config } from "@constants/constants";

export default function Meta() {
  return (
    <Head>
      <title>{`${config.app_name} | ${config.description}`}</title>
      <meta charSet="utf-8" />
      <meta name="author" content={config.author.name} />
      <meta name="description" content={config.description} />
      <meta name="keywords" content={config.keywords.join(", ")} />
      <meta name="generator" content={config.generator} />
      <meta name="robots" content="index, follow, noodp, noydir" />

      <meta name="dcterms.title" content={config.app_name} />
      <meta name="dcterms.description" content={config.description} />
      <meta name="dcterms.language" content="en" />
      <meta name="dcterms.type" content="Collection" />
      <meta name="dcterms.source" content={config.url} />
      <meta name="dcterms.creator" content={config.author.name} />
      <meta name="dcterms.publisher" content={config.author.name} />

      <meta name="theme-color" content="#f8d983" />
      <meta name="application-name" content={config.app_name} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, user-scalable=yes"
      />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <link
        rel="apple-touch-icon"
        type="image/png"
        sizes="180x180"
        href={`${config.url}/favicon/apple-touch-icon.png`}
      />
      <link
        rel="mask-icon"
        href={`${config.url}/favicon/safari-pinned-tab.svg`}
        color="#000000"
      />

      <meta name="msapplication-starturl" content={config.url} />
      <meta name="msapplication-tooltip" content={config.app_name} />
      <meta name="msapplication-window" content="width=1024;height=768" />
      <meta
        name="msapplication-task"
        content={`name=${config.app_name};action-uri=${config.url};icon-uri=${config.url}/favicon/favicon.ico`}
      />
      <meta
        name="msapplication-square70x70logo"
        content={`${config.url}/favicon/mstile-70x70.png`}
      />
      <meta
        name="msapplication-square144x144logo"
        content={`${config.url}/favicon/mstile-144x144.png`}
      />
      <meta
        name="msapplication-square150x150logo"
        content={`${config.url}/favicon/mstile-150x150.png`}
      />
      <meta
        name="msapplication-square310x310logo"
        content={`${config.url}/favicon/mstile-310x310.png`}
      />
      <meta
        name="msapplication-wide310x150logo"
        content={`${config.url}/favicon/mstile-310x150.png`}
      />
      <meta
        name="msapplication-TileImage"
        content={`${config.url}/favicon/mstile-310x310.png`}
      />
      <meta name="msapplication-TileColor" content="#f8d983" />
      <meta
        name="msapplication-config"
        content={`${config.url}/favicon/browserconfig.xml`}
      />

      <link
        rel="icon"
        type="image/svg+xml"
        href={`${config.url}/favicon/favicon.svg`}
      />
      <link
        rel="icon"
        type="image/png"
        href={`${config.url}/favicon/favicon.png`}
      />
      <link
        rel="icon"
        type="image/x-icon"
        href={`${config.url}/favicon/favicon.ico`}
      />
      <link
        rel="shortcut icon"
        type="image/x-icon"
        href={`${config.url}/favicon/favicon.ico`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={`${config.url}/favicon/favicon-32x32.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={`${config.url}/favicon/favicon-16x16.png`}
      />

      <meta property="og:title" content={config.app_name} />
      <meta property="og:type" content="website" />
      <meta
        property="og:image"
        content={`${config.url}/favicon/android-chrome-512x512.png`}
      />
      <meta property="og:url" content={config.url} />
      <meta property="og:description" content={config.description} />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={config.url} />
      <meta name="twitter:title" content={config.app_name} />
      <meta name="twitter:description" content={config.description} />
      <meta
        name="twitter:image"
        content={`${config.url}/favicon/android-chrome-512x512.png`}
      />
      <meta name="twitter:site" content={`@${config.blog.twitter}`} />
      <meta name="twitter:creator" content={`@${config.author.twitter}`} />

      <meta property="fb:admins" content={config.author.fb_profile_id} />
      <meta property="fb:profile_id" content={config.author.fb_profile_id} />
      <meta property="fb:app_id" content={config.blog.fb_app_id} />

      <link rel="canonical" href={config.url} />
      <link rel="manifest" href={`${config.url}/favicon/site.webmanifest`} />
      <link
        rel="alternate"
        type="application/rss+xml"
        href={`${config.url}/blog/posts/feed.xml`}
        title="RSS feed"
      />
      <link
        rel="alternate"
        type="application/atom+xml"
        href={`${config.url}/blog/posts/atom.xml`}
        title="Atom feed"
      />
      <link
        rel="alternate"
        type="application/feed+json"
        href={`${config.url}/blog/posts/feed.json`}
        title="JSON feed"
      />
    </Head>
  );
}
