import { calculatePercentage, getTotalMarketValue } from '@/util/common';
import { StockPrice, Cumulative } from '../../util/types';
import React, { useEffect, useState } from 'react';

type CumulativeData = {
  [key: string]: number;
};

type TopCardProps = {
  cumulativeData: CumulativeData;
};

const TopCard: React.FC<TopCardProps> = ({ cumulativeData }) => {
  const [totalMarketValue, setTotalMarketValue] = useState<string>();
  const [marketValuePercentage, setTotalMarketValuePercentage] =
    useState<number>();

  useEffect(() => {
    let totalValue: string = getTotalMarketValue(cumulativeData).toFixed(2);
    let totalPercentage = calculatePercentage(totalValue, 20 * 10);
    setTotalMarketValue(totalValue);
    setTotalMarketValuePercentage(totalPercentage);
  }, [cumulativeData]);

  return (
    <div className="grid lg:grid-cols-5 gap-4 p-4">
      <div className="lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
        <div className="flex flex-col w-full pb-4">
          <p className="text-2xl font-bold">${totalMarketValue}</p>
          <p className="text-gray-600">Total Market Value</p>
        </div>
        <p className="bg-violet-200 flex justify-center items-center p-2 rounded-lg">
          <span className="text-violet-700 text-lg">
            {marketValuePercentage}%
          </span>
        </p>
      </div>
      <div className="lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
        <div className="flex flex-col w-full pb-4">
          <p className="text-2xl font-bold">$1,437,876</p>
          <p className="text-gray-600">Portfolio Return</p>
        </div>
        <p className="bg-violet-200 flex justify-center items-center p-2 rounded-lg">
          <span className="text-violet-700 text-lg">+11%</span>
        </p>
      </div>
      <div className="bg-white flex justify-between w-full border p-4 rounded-lg">
        <div className="flex flex-col w-full pb-4">
          <p className="text-2xl font-bold">11,437</p>
          <p className="text-gray-600">Sharpe Ratio</p>
        </div>
        <p className="bg-violet-200 flex justify-center items-center p-2 rounded-lg">
          <span className="text-violet-700 text-lg">+17%</span>
        </p>
      </div>
    </div>
  );
};

export default TopCard;
