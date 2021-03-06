// pages/_document.js

import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta property="og:title" content="JPO IIM" key="title" />

          <meta name="description" content="Site de la JPO du 06-03-2021" />
          <meta property="og:description" content="Site de la JPO du 06-03-2021" key="description" />

          <meta property="og:url" content="https://code-next.herokuapp.com/" key="url" />
          <meta property="og:type" content="website" key="type" />

          <link rel="icon" href="/images/iim-logo.jpg" />
          <meta property="og:image" content="/images/iim-logo.jpg" key="image" />

          <link href="/css/style.css" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
