import Head from 'next/head';
import Script from 'next/script';

import Theme from '@/styles/theme';
import { GA_MEASUREMENT_ID } from 'constants/constants';

import '@/styles/tailwind.css';
import '@/styles/cases.scss';
import '@/styles/contact.scss';


export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>

<link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
<link rel="icon" type="image/png" href="/favicon/favicon.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
<link rel="manifest" href="/favicon/site.webmanifest" />
<link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#000000" />
<link rel="shortcut icon" href="/favicon/favicon.ico" />
<meta name="msapplication-TileColor" content="#f8d983" />
<meta name="msapplication-config" content="/favicon/browserconfig.xml" />
<meta name="theme-color" content="#f8d983" />
<link rel="alternate" type="application/rss+xml" href="/feed.xml" />
<link id="preload-sound-sprite" rel="preload" as="audio" type="audio/ogg" href="/sounds/sprite.ogg" />
<meta
  name="description"
  content={`Luis Alejandro Martínez Faneyth`}
/>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@800&family=Roboto:wght@100;300;400;500;700&family=Vollkorn:ital@1&display=swap" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.css" />
{/* <meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="author" content="{{ site.author.name }}" />
<meta name="description" content="{{ head_description }}" />
<meta name="keywords" content="{{ head_keywords }}" />
<meta name="generator" content="{{ site.generator }}" />
<meta name="robots" content="{{ head_robots }}" />

<!-- Dublin Core Metatags -->
<meta name="dc.title" content="{{ head_title }}" />
<meta name="dc.description" content="{{ head_description }}" />
<meta name="dc.language" content="{{ site.lang }}" />
<meta name="dc.type" content="{{ page.layout }}" />
<meta name="dc.identifier" content="{{ page.article_id }}" />
<meta name="dc.source" content="{{ head_url }}" />
<meta name="dc.publisher" content="Collage Labs" />

<!-- Open Graph, Facebook, Twitter & Google+ Social Tags  -->
{%- if head_og_type == 'article' or head_og_type == 'website' -%}
<meta property="og:type" content="{{ head_og_type }}" />
<meta property="og:site_name" content="{{ site.name }}" />
<meta property="og:url" content="{{ head_url }}" />
<meta property="og:title" content="{{ head_title }}" />
<meta property="og:description" content="{{ head_description }}" />
<meta property="og:image" content="{{ page.image }}" />
<meta property="og:locale" content="{{ site.lang_locale }}" />
{%- if head_og_type == 'article' -%}
<meta property="article:author" content="{{ site.facebook.profile_id }}" />
<meta property="article:publisher" content="{{ site.facebook.publisher }}" />
<meta property="article:published_time" content="{{ page.date | date_to_xmlschema }}" />
<meta property="article:section" content="{{ page.categories | first }}" />
{%- for tag in page.tags -%}
<meta property="article:tag" content="{{ tag }}" />
{%- endfor -%}
{%- endif -%}
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:url" content="{{ head_url }}" />
<meta name="twitter:title" content="{{ head_title }}" />
<meta name="twitter:description" content="{{ head_description }}" />
<meta name="twitter:image:src" content="{{ page.image }}" />
<meta name="twitter:site" content="@{{ site.blog.twitter }}" />
<meta name="twitter:creator" content="@{{ site.author.twitter }}" />
<meta property="fb:admins" content="{{ site.facebook.admins }}" />
<meta property="fb:profile_id" content="{{ site.facebook.profile_id }}" />
<meta property="fb:app_id" content="{{ site.facebook.app_id }}" />
{%- endif -%} */}

      </Head>
      {GA_MEASUREMENT_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
          </Script>
        </>
      )}
      <Script
        src="https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.js"
        strategy="afterInteractive"
      />
      <Script id="cookieconsent" strategy="lazyOnload">
      {`
        window.cookieconsent.initialise({
          "palette": {
            "popup": {
              "background": "#505859",
              "text": "#fff"
            },
            "button": {
              "background": "#6c7777",
              "text": "#fff"
            }
          },
          "position": "bottom-right",
          "theme": "classic",
          "showLink": false
        });
      `}
      </Script>
      <Theme>
        <Component {...pageProps} />
      </Theme>
    </>
  );
}
