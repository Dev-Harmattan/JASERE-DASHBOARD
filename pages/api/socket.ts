import { NextApiResponseWithSocket, StockPrice } from '@/util/types';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs/promises';
import { Server } from 'socket.io';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseWithSocket
) {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);

    io.on('connection', async (socket) => {
      console.log('Client connected');

      const filePath = path.join(process.cwd(), 'data', 'stocks.json');
      const jsonData = await fs.readFile(filePath, 'utf8');
      const data = JSON.parse(jsonData) as StockPrice[];

      let mockSymbols: string[] = [];

      if (data.length > 0) {
        mockSymbols = data.map((stock) => stock.symbol);
      }

      function generateRandomPrice(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      const interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * mockSymbols.length);
        const randomStock = mockSymbols[randomIndex];

        const randomStockData: StockPrice = {
          symbol: randomStock,
          price: generateRandomPrice(20, 200),
          date: Date.now(),
        };
        io.emit('finance', randomStockData);
      }, 8000);

      socket.on('disconnect', () => {
        clearInterval(interval);
        console.log('Client disconnected');
      });
    });

    res.socket.server.io = io;
  }
  res.end();
}
