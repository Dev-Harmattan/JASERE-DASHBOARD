import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import DetailsChart from '@/pages/components/DetailChart';
import Header from '@/pages/components/Header';
import { useStockData } from '@/store/StockPriceContex';
import { getCumulativeStockData } from '@/util/common';
import DetailTopCard from '@/pages/components/DetailTopCard';
import { ParsedUrlQuery } from 'querystring';
import { IncomingMessage, ServerResponse } from 'http';
import { StockData } from '@/util/types';

type CumulativeData = {
  [key: string]: number;
};

const Details = () => {
  const { symbolData } = useStockData();
  const [cumulativeData, setCumulativeData] = useState<CumulativeData>({});
  const router = useRouter();
  const symbol = router.query.symbol as string;
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [stockName, setStockName] = useState<string>();
  const [stockValue, setStockValue] = useState<number>(0);

  useEffect(() => {
    if (symbol) {
      const currentStock = symbolData[symbol];
      setStocks(currentStock);
      setStockName(symbol);

      if (currentStock) {
        const totalValue = currentStock?.reduce((acc, data) => {
          return acc + data.price;
        }, 0);
        setStockValue(totalValue);
      }
    }
  }, [symbol]);

  useEffect(() => {
    const mappedData = getCumulativeStockData(symbolData);
    setCumulativeData(mappedData);
  }, [symbolData]);
  return (
    <main className="bg-gray-100 min-h-screen">
      <Header cumulativeData={cumulativeData} />
      <DetailTopCard name={stockName} stockValue={stockValue.toFixed(2)} />
      <div className="p-4 grid md:grid-cols-3 grid-cols-1 gap-4">
        <DetailsChart stocks={stocks} stockName={stockName} />
      </div>
    </main>
  );
};
export default Details;
