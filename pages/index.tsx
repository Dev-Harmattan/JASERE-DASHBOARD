import { Inter } from 'next/font/google';
import Header from './components/Header';
import TopCard from './components/TopCard';
import OverviewChart from './components/OverviewChart';
import StockList from './components/StockList';
import fs from 'fs/promises';
import path from 'path';
import { StockPrice } from '@/util/types';
import io, { Socket } from 'Socket.IO-client';
import { useEffect, useState } from 'react';
import { useStockData } from '@/store/StockPriceContex';
import { getCumulativeStockData } from '@/util/common';

let socket: Socket;

const inter = Inter({ subsets: ['latin'] });

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'stocks.json');
  const jsonData = await fs.readFile(filePath, 'utf8');
  const data = JSON.parse(jsonData);

  return {
    props: {
      data,
    },
  };
}

type CumulativeData = {
  [key: string]: number;
};

export default function Home({ data }: { data: StockPrice[] }) {
  const { updateStock, symbolData } = useStockData();
  const [cumulativeData, setCumulativeData] = useState<CumulativeData>({});

  useEffect(() => {
    const socketInitializer = async () => {
      try {
        await fetch('/api/socket'); // Ensure the WebSocket server is initialized
        socket = io();

        socket.on('connect', () => {
          console.log('connected');
        });

        socket.on('finance', (data) => {
          updateStock(data);
        });
      } catch (error) {
        console.error('Error initializing socket:', error);
      }
    };

    socketInitializer();

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    const mappedData = getCumulativeStockData(symbolData);
    setCumulativeData(mappedData);
  }, [symbolData]);

  return (
    <main className="bg-gray-100 min-h-screen">
      <Header cumulativeData={cumulativeData} />
      <TopCard cumulativeData={cumulativeData} />
      <div className="p-4 grid md:grid-cols-3 grid-cols-1 gap-4">
        <OverviewChart stockData={data} cumulativeData={cumulativeData} />
        <StockList stockData={data} />
      </div>
    </main>
  );
}
