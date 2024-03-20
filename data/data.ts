function getRandomMinutesAgo() {
  const minutes = Math.floor(Math.random() * 60 + 1);
  return minutes;
}

export const stockPrices = [
  { symbol: 'AAPL', price: 150.45, timestamp: getRandomMinutesAgo() },
  { symbol: 'GOOGL', price: 2750.3, timestamp: getRandomMinutesAgo() },
  { symbol: 'MSFT', price: 297.0, timestamp: getRandomMinutesAgo() },
  { symbol: 'AMZN', price: 3470.0, timestamp: getRandomMinutesAgo() },
  { symbol: 'TSLA', price: 702.2, timestamp: getRandomMinutesAgo() },
  { symbol: 'NFLX', price: 551.75, timestamp: getRandomMinutesAgo() },
  { symbol: 'IBM', price: 140.0, timestamp: getRandomMinutesAgo() },
  { symbol: 'FB', price: 320.45, timestamp: getRandomMinutesAgo() },
  { symbol: 'INTC', price: 52.45, timestamp: getRandomMinutesAgo() },
  { symbol: 'PYPL', price: 235.0, timestamp: getRandomMinutesAgo() },
  { symbol: 'CRM', price: 225.45, timestamp: getRandomMinutesAgo() },
];
