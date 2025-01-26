import Document, { Html, Head, Main, NextScript } from 'next/document'
 
class LuisAlejandro extends Document {
  render() {
    return (
      <Html>
        <Head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@800&family=Roboto:wght@100;300;400;500;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.css"
          rel="stylesheet"
        />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
 
export default LuisAlejandro