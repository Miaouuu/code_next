// components/Header.js

import Head from "next/head";

function Header() {
  return (
    <div>
      <Head>
        <title>JPO</title>
        <meta property="og:title" content="JPO" key="title" />

        <link href="/css/style.css" rel="stylesheet" />
      </Head>
    </div>
  );
}

export default Header;
