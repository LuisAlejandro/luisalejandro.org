import { GoogleAnalytics } from "@next/third-parties/google";
import { Metadata } from "next";
import { League_Gothic, Poppins, Roboto } from "next/font/google";
import Script from "next/script";

import {
  ADSENSE_PUBLISHER_ID,
  ENV_NAME,
  GA_MEASUREMENT_ID,
  config,
} from "@constants/constants";

import CookieConsentWrapper from "@side-effects/CookieConsentWrapper";

import "@styles/tailwind.css";
import "yet-another-react-lightbox/styles.css";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

const leagueGothic = League_Gothic({
  subsets: ["latin"],
  variable: "--font-league-gothic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Luis Alejandro | Remote Full Stack Developer & Open Source Expert",
  description:
    "Venezuelan software engineer with 16+ years experience. TypeScript, Python, Go expert. 220K+ downloads, 190+ GitHub stars. Remote work specialist.",
  keywords: [
    "Venezuelan software engineer",
    "remote full stack developer",
    "TypeScript developer",
    "Python developer",
    "Golang developer",
    "open source contributor",
    "remote work specialist",
    "Next.js developer",
    "Docker expert",
    "AWS developer",
    "software architect",
    "web development",
    "API development",
    "DevOps engineer",
    "Latin American developer",
    "freelance developer",
    "software consultant",
    "GitHub developer",
    "React developer",
    "Node.js developer",
  ],
  authors: [{ name: config.author.name }],
  generator: config.generator,
  applicationName: config.app_name,
  robots: {
    index: true,
    follow: true,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    title: "Luis Alejandro | Remote Full Stack Developer & Open Source Expert",
    description:
      "Venezuelan software engineer with 16+ years experience. TypeScript, Python, Go expert. 220K+ downloads, 190+ GitHub stars. Remote work specialist.",
    url: config.url,
    siteName: "Luis Alejandro Martínez Faneyth",
    images: [
      {
        url: `${config.url}/favicon/android-chrome-512x512.png`,
        width: 512,
        height: 512,
        alt: config.app_name,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luis Alejandro | Remote Full Stack Developer & Open Source Expert",
    description:
      "Venezuelan software engineer with 16+ years experience. TypeScript, Python, Go expert. 220K+ downloads, 190+ GitHub stars. Remote work specialist.",
    images: [`${config.url}/images/banner.png`],
    site: `@${config.blog.twitter}`,
    creator: `@${config.author.twitter}`,
  },
  icons: {
    icon: [
      {
        url: `${config.url}/favicon/favicon.svg`,
        type: "image/svg+xml",
      },
      {
        url: `${config.url}/favicon/favicon.png`,
        type: "image/png",
      },
      {
        url: `${config.url}/favicon/favicon.ico`,
        type: "image/x-icon",
      },
      {
        url: `${config.url}/favicon/favicon-32x32.png`,
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: `${config.url}/favicon/favicon-16x16.png`,
        sizes: "16x16",
        type: "image/png",
      },
    ],
    shortcut: `${config.url}/favicon/favicon.ico`,
    apple: [
      {
        url: `${config.url}/favicon/apple-touch-icon.png`,
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "mask-icon",
        url: `${config.url}/favicon/safari-pinned-tab.svg`,
        color: "#000000",
      },
    ],
  },
  manifest: `${config.url}/favicon/site.webmanifest`,
  alternates: {
    canonical: config.url,
    types: {
      "application/rss+xml": [
        {
          url: `${config.url}/blog/posts/feed.xml`,
          title: "RSS feed",
        },
      ],
      "application/atom+xml": [
        {
          url: `${config.url}/blog/posts/atom.xml`,
          title: "Atom feed",
        },
      ],
      "application/feed+json": [
        {
          url: `${config.url}/blog/posts/feed.json`,
          title: "JSON feed",
        },
      ],
      "application/xml": [
        {
          url: `${config.url}/sitemap.xml`,
          title: "Sitemap",
        },
      ],
    },
  },
  other: {
    // Google AdSense verification
    "google-adsense-account": ADSENSE_PUBLISHER_ID || "",

    // Sitemap reference
    sitemap: `${config.url}/sitemap.xml`,

    // Dublin Core metadata
    "dcterms.title":
      "Luis Alejandro | Remote Full Stack Developer & Open Source Expert",
    "dcterms.description":
      "Venezuelan software engineer with 16+ years experience. TypeScript, Python, Go expert. 220K+ downloads, 190+ GitHub stars. Remote work specialist.",
    "dcterms.language": "en",
    "dcterms.type": "Collection",
    "dcterms.source": config.url,
    "dcterms.creator": config.author.name,
    "dcterms.publisher": config.author.name,

    // Microsoft Application metadata
    "msapplication-starturl": config.url,
    "msapplication-tooltip": config.app_name,
    "msapplication-window": "width=1024;height=768",
    "msapplication-task": `name=${config.app_name};action-uri=${config.url};icon-uri=${config.url}/favicon/favicon.ico`,
    "msapplication-square70x70logo": `${config.url}/favicon/mstile-70x70.png`,
    "msapplication-square144x144logo": `${config.url}/favicon/mstile-144x144.png`,
    "msapplication-square150x150logo": `${config.url}/favicon/mstile-150x150.png`,
    "msapplication-square310x310logo": `${config.url}/favicon/mstile-310x310.png`,
    "msapplication-wide310x150logo": `${config.url}/favicon/mstile-310x150.png`,
    "msapplication-TileImage": `${config.url}/favicon/mstile-310x310.png`,
    "msapplication-TileColor": "#f8d983",
    "msapplication-config": `${config.url}/favicon/browserconfig.xml`,

    // Facebook metadata
    "fb:admins": config.author.fb_profile_id,
    "fb:profile_id": config.author.fb_profile_id,
    "fb:app_id": config.blog.fb_app_id,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
  userScalable: true,
  themeColor: "#f8d983",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} ${poppins.variable} ${leagueGothic.variable}`}
      prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# dcterms: http://purl.org/dc/terms/#"
    >
      <body className="bg-bright-gold text-gray-2 cursor-default overflow-x-hidden text-2xl font-main">
        {children}
        {GA_MEASUREMENT_ID && ENV_NAME !== "local" && (
          <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
        )}
        {ADSENSE_PUBLISHER_ID && ENV_NAME !== "local" && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUBLISHER_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
        <CookieConsentWrapper />
      </body>
    </html>
  );
}
