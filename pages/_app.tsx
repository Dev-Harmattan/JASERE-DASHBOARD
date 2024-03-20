import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Sidebar from './components/Sidebar';
import { StockDataProvider } from '@/store/StockPriceContex';
import { NextSeo } from 'next-seo';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextSeo
        title="Jasere "
        description="Jasere Stock Price Dashboard"
        openGraph={{
          title: 'Jasere ',
          description: 'Jasere is for real time stock prices monitoring',
          type: 'website',
          url: 'https://jasere.com/your-page-url', // Sample link site for SEO
          images: [
            {
              url: 'https://jasere.com/image.jpg', // Sample image link
              alt: 'Image Alt Text',
            },
          ],
          // Other Open Graph properties
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />
      <StockDataProvider>
        <Sidebar>
          <Component {...pageProps} />
        </Sidebar>
      </StockDataProvider>
    </>
  );
}
