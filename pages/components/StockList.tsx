import Link from 'next/link';
import React from 'react';
import { CgShutterstock } from 'react-icons/cg';
import { StockPrice } from '@/util/types';

type StockListProps = {
  stockData: StockPrice[];
};

const StockList: React.FC<StockListProps> = ({ stockData }) => {
  return (
    <div className="w-full col-span-1 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white overflow-scroll">
      <h1>Stock Prices</h1>
      <ul>
        {stockData.map((data, id) => (
          <Link key={id} href={`stock/details/${data.symbol}`}>
            <li className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 flex items-center cursor-pointer">
              <div className="bg-purple-100 rounded-lg p-3">
                <CgShutterstock className="text-purple-800" />
              </div>
              <div className="pl-4">
                <p className="text-gray-800 font-bold">${data.price}</p>
                <p className="text-gray-400 text-sm">{data.symbol}</p>
              </div>
              <p className="lg:flex md:hidden absolute right-6 text-sm">
                {data.date} min ago
              </p>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default StockList;
