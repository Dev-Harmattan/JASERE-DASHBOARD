import React, { useState, useEffect, useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { CumulativeData, StockPrice } from '@/util/types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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

type OverviewChartProps = {
  stockData: StockPrice[];
  cumulativeData: CumulativeData | any;
};

const OverviewChart: React.FC<OverviewChartProps> = ({
  stockData,
  cumulativeData,
}) => {
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });
  const [chartOptions, setChartOptions] = useState({});

  const initialLabel = useMemo(() => {
    return stockData.map((item) => item.symbol);
  }, []);

  const initialPrice = useMemo(() => {
    return stockData.map((item) => item.price);
  }, []);

  const updateLabel: string[] = useMemo(() => {
    return Object.keys(cumulativeData);
  }, [cumulativeData]);

  const updatePrice: number[] = useMemo(() => {
    return Object.values(cumulativeData);
  }, [cumulativeData]);

  useEffect(() => {
    setChartData({
      labels: updateLabel ?? initialLabel,
      datasets: [
        {
          label: 'Price Flow in $',
          data: updatePrice ?? initialPrice,
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
          text: 'Jasere Stock Markets',
        },
      },
    });
  }, [stockData, cumulativeData]);

  return (
    <>
      <div className="w-full md:col-span-2 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white">
        <Line options={chartOptions} data={chartData} />
      </div>
    </>
  );
};

export default OverviewChart;
