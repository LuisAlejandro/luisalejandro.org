import { GoogleAnalytics } from "@next/third-parties/google";
import { League_Gothic, Poppins, Roboto } from "next/font/google";

import { GA_MEASUREMENT_ID } from "@constants/constants";

import CookieConsentWrapper from "@side-effects/CookieConsentWrapper";

import "@styles/normalize.scss";
import "@styles/styles.scss";
import "@styles/tailwind.scss";
import "yet-another-react-lightbox/styles.css";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

const poppins = Poppins({
  weight: ["800"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

const leagueGothic = League_Gothic({
  subsets: ["latin"],
  variable: "--font-league-gothic",
  display: "swap",
});

// export const metadata = {
//   title: "Luis Alejandro - Software Engineer",
//   description:
//     "Personal website of Luis Alejandro Martínez Faneyth, a software engineer from Venezuela",
// };

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} ${poppins.variable} ${leagueGothic.variable}`}
      prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http://ogp.me/ns/article# dcterms: http://purl.org/dc/terms/#"
    >
      <body>
        {children}
        {GA_MEASUREMENT_ID && <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />}
        <CookieConsentWrapper />
      </body>
    </html>
  );
}
