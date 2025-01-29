import Script from "next/script";
import { Roboto, Poppins, League_Gothic } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import CookieConsent from "react-cookie-consent";

import { GA_MEASUREMENT_ID } from "@constants/constants";
import Theme from "@styles/theme";

import "@styles/tailwind.css";
import "@styles/cases.scss";
import "@styles/contact.scss";
import "@styles/blog.scss";
import "@styles/blog-post.scss";
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

const league_gothic = League_Gothic({
  subsets: ["latin"],
  variable: "--font-league-gothic",
  display: "swap",
});

export default function App({ Component, pageProps }: any) {
  return (
    <>
      <Theme>
        <Component {...pageProps}></Component>
      </Theme>
      {GA_MEASUREMENT_ID && <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />}
      <CookieConsent
        buttonText="Got it!"
        style={{
          display: "flex",
          background: "#505859",
          color: "#fff",
          padding: "1.2em",
          position: "fixed",
          right: "1em",
          bottom: "1em",
          fontSize: "16px",
          lineHeight: "1.5em",
          maxWidth: "24em",
          borderRadius: "5px",
          zIndex: 9999,
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "baseline",
          opacity: "0.9",
          transition: "opacity 1s ease",
        }}
        contentStyle={{
          margin: "0 0 1em 0",
        }}
        buttonStyle={{
          background: "#6c7777",
          color: "#fff",
          borderColor: "transparent",
          borderRadius: "5px",
          padding: ".4em .8em",
          fontSize: "1em",
          lineHeight: "1.5em",
          fontWeight: "700",
          borderWidth: "2px",
          borderStyle: "solid",
          textAlign: "center",
          margin: "0",
          minWidth: "140px",
        }}
        customButtonWrapperAttributes={{
          style: {
            textAlign: "center",
            display: "inline",
            width: "100%",

          },
        }}
        disableStyles={true}
        location="none"
        hideOnAccept={false}
        onAccept={() => {
          const elm = document.querySelector<HTMLElement>('.CookieConsent')!;
          elm.style.opacity = "0";
        }}
      >
        This website uses cookies to ensure you get the best experience on our
        website.
      </CookieConsent>
    </>
  );
}