import type { Server as HTTPServer } from 'http';
import type { NextApiResponse } from 'next';
import type { Socket as NetSocket } from 'net';
import type { Server as IOServer } from 'socket.io';

export interface SocketServer extends HTTPServer {
  io?: IOServer | undefined;
}

export interface SocketWithIO extends NetSocket {
  server: SocketServer;
}

export interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO;
}

export type StockPrice = {
  symbol: string;
  price: number;
  date: number;
};

export interface StockData {
  symbol: string;
  price: number;
  date: number;
}

export interface SymbolData {
  [symbol: string]: StockData[];
}

export interface UpdateSymbolDataAction {
  type: 'UPDATE_SYMBOL_DATA';
  payload: StockData;
}

export interface CumulativeData {
  symbol: string;
  price: number;
}

export type Cumulative = {
  [key: string]: number;
};
