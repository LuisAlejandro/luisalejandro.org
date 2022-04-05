import Head from 'next/head'
import Theme from '@/styles/theme';

import '@/styles/tailwind.css'
import '@/styles/fonts.scss'
import '@/styles/cases.scss'


export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title></title>
      </Head>
      <Theme>
        <Component {...pageProps} />
      </Theme>
    </>
  );
}
