import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Meta tags */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Stock Price Dashboard</title>
        <meta
          name="description"
          content="Track real-time stock prices and market trends with our interactive dashboard."
        />

        {/* Open Graph tags for social sharing */}
        <meta property="og:title" content="Jasere Stock Price Dashboard" />
        <meta
          property="og:description"
          content="Track real-time stock prices and market trends with our interactive dashboard."
        />
        <meta property="og:type" content="website" />
        {/* Real site link */}
        <meta property="og:url" content="https://example.com/dashboard" />
        <meta
          property="og:image"
          content="https://example.com/images/dashboard-preview.jpg"
        />

        {/* Twitter card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Jasere Stock Price Dashboard" />
        <meta
          name="twitter:description"
          content="Track real-time stock prices and market trends with our interactive dashboard."
        />
        <meta
          name="twitter:image"
          content="https://example.com/images/dashboard-preview.jpg"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
