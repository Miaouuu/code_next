// components/Header.js

import Head from "next/head";

export default () => (
  <div>
    <Head>
      <title>JPO</title>
      <meta property="og:title" content="JPO" key="title" />

      <meta name="description" content="Site de la JPO du 14-11-2020" />
      <meta property="og:description" content="Site de la JPO du 14-11-2020" key="description" />

      <meta property="og:url" content="#" key="url" />
      <meta property="og:type" content="website" key="type" />

      <link rel="icon" href="/images/favicon-placeholder.png" />
      <meta property="og:image" content="/images/favicon-placeholder.png" key="image" />

      <link href="/css/style.css" rel="stylesheet" />
    </Head>
  </div>
);
