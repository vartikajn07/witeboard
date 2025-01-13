import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased">
        <div id="portal"></div>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
