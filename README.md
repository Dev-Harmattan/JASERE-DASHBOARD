This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## State Management - React Context
I use the React Context API to manage the state of the library since it is a small application and to avoid too much boilerplate from the Redux library. I set up both the reducer and dispatch function to update the stock prices in real-time, pushed from a WebSocket. Then, I provide a custom useContext hook to access the data and a Provider that wraps the component to make the data available globally.

## Websocket - Socket.IO
I used Socket.IO along with the client-side socket library. I implemented a function that sends real-time stock data to the client every 8 seconds to simulate a real-time scenario.

## SEO
For the SEO implementation, I set up the necessary metadata, including the description, title, links, and other relevant tags, within the `<head>` section of the HTML document. Additionally, I utilized an external library called NextSEO to enhance SEO optimization by providing the necessary implementation and automatically injecting the metadata into the `<head>` of each page.
