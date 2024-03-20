import { StockData, SymbolData, UpdateSymbolDataAction } from '@/util/types';
import React, { createContext, useReducer, useContext } from 'react';

const data = {
  AAPL: [{ symbol: 'AAPL', price: 150.45, date: 17 }],
  GOOGL: [{ symbol: 'GOOGL', price: 2750.3, date: 42 }],
  MSFT: [{ symbol: 'MSFT', price: 297.0, date: 33 }],
  AMZN: [{ symbol: 'AMZN', price: 3470.0, date: 25 }],
  TSLA: [{ symbol: 'TSLA', price: 702.2, date: 5 }],
  NFLX: [{ symbol: 'NFLX', price: 551.75, date: 9 }],
  IBM: [{ symbol: 'IBM', price: 140.0, date: 18 }],
  FB: [{ symbol: 'FB', price: 320.45, date: 50 }],
  INTC: [{ symbol: 'INTC', price: 52.45, date: 13 }],
  PYPL: [{ symbol: 'PYPL', price: 235.0, date: 38 }],
  CRM: [{ symbol: 'CRM', price: 225.45, date: 58 }],
};

type Action = UpdateSymbolDataAction;

interface ContextState {
  symbolData: SymbolData;
  dispatch: React.Dispatch<Action>;
  updateStock: (data: StockData) => void;
}

const initialState: SymbolData = data;

const reducer = (state: SymbolData, action: Action): SymbolData => {
  switch (action.type) {
    case 'UPDATE_SYMBOL_DATA': {
      const { symbol, price, date } = action.payload;
      return {
        ...state,
        [symbol]: state[symbol]
          ? [...state[symbol], { symbol, price, date }]
          : [{ symbol, price, date }],
      };
    }
    default:
      return state;
  }
};

const StockDataContext = createContext<ContextState | undefined>(undefined);

export const StockDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [symbolData, dispatch] = useReducer(reducer, initialState);

  const updateStock = (data: StockData) => {
    dispatch({ type: 'UPDATE_SYMBOL_DATA', payload: data });
  };

  const value = { symbolData, dispatch, updateStock };

  return (
    <StockDataContext.Provider value={value}>
      {children}
    </StockDataContext.Provider>
  );
};

export const useStockData = () => {
  const context = useContext(StockDataContext);
  if (context === undefined) {
    throw new Error('useStockData must be used within a StockDataProvider');
  }
  return context;
};
