import Head from 'next/head'
import { CMS_NAME, HOME_OG_IMAGE_URL } from '@/lib/constants'

export default function Meta() {
  return (
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
    </Head>
  )
}
