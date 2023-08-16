import Script from "next/script";
import { useEffect } from "react";

import { GA_MEASUREMENT_ID } from "@constants/constants";
import Theme from "@styles/theme";

import "@styles/tailwind.css";
import "@styles/fonts.scss";
import "@styles/external.scss";
import "@styles/cases.scss";
import "@styles/contact.scss";
import "@styles/blog.scss";
import "@styles/blog-post.scss";
import "yet-another-react-lightbox/styles.css";

export default function App({ Component, pageProps, router }) {
  useEffect(() => {
    document.documentElement.setAttribute("lang", "en");
    document.documentElement.setAttribute(
      "xmlns",
      "http://www.w3.org/1999/xhtml"
    );
    if (router.state.route === "/blog/posts/[slug]") {
      document.documentElement.setAttribute(
        "prefix",
        "og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http://ogp.me/ns/article# dcterms: http://purl.org/dc/terms/#"
      );
    } else {
      document.documentElement.setAttribute(
        "prefix",
        "og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# dcterms: http://purl.org/dc/terms/#"
      );
    }
  });

  return (
    <>
      {GA_MEASUREMENT_ID && (
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="lazyOnload"
          onLoad={() => {
            window.dataLayer = window.dataLayer || [];
            function gtag() {
              window.dataLayer.push(arguments);
            }
            gtag("js", new Date());
            gtag("config", `${GA_MEASUREMENT_ID}`);
          }}
        />
      )}
      <Script
        src="https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.js"
        strategy="lazyOnload"
        onLoad={() => {
          window.cookieconsent.initialise({
            palette: {
              popup: {
                background: "#505859",
                text: "#fff",
              },
              button: {
                background: "#6c7777",
                text: "#fff",
              },
            },
            position: "bottom-right",
            theme: "classic",
            showLink: false,
          });
        }}
      />
      <Theme>
        <Component {...pageProps}></Component>
      </Theme>
    </>
  );
}
