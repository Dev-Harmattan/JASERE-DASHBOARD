// import { CumulativeData } from '@/util/types';
import { useStockData } from '@/store/StockPriceContex';
import React, { useState } from 'react';

type CumulativeData = {
  [key: string]: number;
};

type HeaderProps = {
  cumulativeData: CumulativeData;
};

const Header: React.FC<HeaderProps> = ({ cumulativeData }) => {
  const [highestStock, setHighestStock] = useState<CumulativeData>({});

  const getHighestStock = (data: CumulativeData) => {
    let highestPrice = 0;
    let highestStock = '';

    for (const stock in data) {
      const price = data[stock] as number;
      if (price > highestPrice) {
        highestPrice = price;
        highestStock = stock;
      }
    }

    return { stock: highestStock, price: highestPrice };
  };

  // useState(() => {}, [cumulativeData]);

  return (
    <div className="flex justify-between px-4 pt-4">
      <h1>Dashboard</h1>
      <div className="flex justify-around items-center space-x-4">
        <div className="flex items-center space-x-3">
          <div className="text-orange-600 text-xlg font-bold">Top Stack:</div>
          <div className="text-orange-600 text-lg">
            {' '}
            {getHighestStock(cumulativeData).stock}
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="text-orange-600 text-xlg font-bold">
            Accumulate Price:
          </div>
          <div className="text-orange-600 text-lg">
            {' '}
            ${getHighestStock(cumulativeData).price.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
