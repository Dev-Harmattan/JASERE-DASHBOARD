import { StockPrice, SymbolData, Cumulative } from './types';

type CumulativeData = {
  [key: string]: number;
};

export const getTotalMarketValue = (stock: CumulativeData) => {
  return Object.values(stock).reduce((acc, data) => {
    return acc + data;
  }, 0);
};

export const calculatePercentage = (amount: string, percentage: number) => {
  return (percentage / 100) * Number(amount);
};

export const getCumulativeStockData = (data: SymbolData) => {
  const totalPrices: { symbol: string; price: number } | any = {};
  for (const symbol in data) {
    const totalPrice = data[symbol].reduce(
      (total, item) => total + item.price,
      0
    );
    totalPrices[symbol] = totalPrice;
  }
  return totalPrices;
};

export const getMinutesAgo = (date: number) => {
  const stockDate = new Date(date);
  const minutes = stockDate.getMinutes();
  return `${minutes + 1} min ago`;
};
