import Document, {
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="pt-BR">
        <Head>
          <meta charSet="utf-8" />

          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
            rel="stylesheet"
          />
          <link
            rel="shortcut icon"
            href="/static/favicon.ico"
            type="image/icon"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}