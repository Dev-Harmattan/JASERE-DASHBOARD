import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Sidebar from './components/Sidebar';
import { StockDataProvider } from '@/store/StockPriceContex';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StockDataProvider>
      <Sidebar>
        <Component {...pageProps} />
      </Sidebar>
    </StockDataProvider>
  );
}
