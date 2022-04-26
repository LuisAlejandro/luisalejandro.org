import Head from 'next/head';
import Script from 'next/script';

import Theme from '@/styles/theme';
import { GA_MEASUREMENT_ID } from 'constants/constants';

import '@/styles/tailwind.css';
import '@/styles/fonts.scss';
import '@/styles/cases.scss';
import '@/styles/contact.scss';


export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
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
