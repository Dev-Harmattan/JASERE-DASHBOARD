import React, { useState, useEffect, useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import { StockData } from '@/util/types';
import { getMinutesAgo } from '@/util/common';
import { useStockData } from '@/store/StockPriceContex';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

type DetailChartProps = {
  stocks: StockData[];
  stockName: string | undefined;
};

interface Dataset {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
}

interface ChartData {
  labels: string[] | [];
  datasets: Dataset[] | [];
}

const DetailsChart: React.FC<DetailChartProps> = ({ stocks, stockName }) => {
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });
  const [chartOptions, setChartOptions] = useState({});
  const { symbolData } = useStockData();

  const dates: string[] = [];
  const prices: number[] = [];

  useEffect(() => {
    stocks?.forEach((stock) => {
      dates.push(getMinutesAgo(stock.date));
      prices.push(stock.price);
    });
  }, [stocks]);

  useEffect(() => {
    setChartData({
      labels: dates.slice(
        dates.length > dates.length * 2 ? dates.length - 10 : 0
      ),
      datasets: [
        {
          label: `${stockName} Details`,
          data: prices.slice(
            prices.length > prices.length * 2 ? prices.length - 10 : 0
          ),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    });

    setChartOptions({
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const,
        },
        title: {
          display: true,
          text: stockName,
        },
      },
    });
  }, [stocks]);

  return (
    <>
      <div className="w-full md:col-span-3 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white">
        <Line options={chartOptions} data={chartData} />
      </div>
    </>
  );
};

export default DetailsChart;
