import Document, { Html, Head, Main, NextScript } from "next/document";
/*
  É ESCRITO EM CLASSE
  SÓ É EXECUTADO UMA ÚNICA VEZ
  NÃO É ROTEADO PELO NEXT

*/
export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,900&display=swap"
            rel="stylesheet"
          />
          <title>ig.news</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
