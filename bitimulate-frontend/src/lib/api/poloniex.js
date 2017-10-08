import axios from 'axios';

export const getOrderBook = (currencyPair) => axios.get(`https://poloniex.com/public?command=returnOrderBook&currencyPair=${currencyPair}&depth=20`);
export const getTradeHistory = (currencyPair) => {
  const now = new Date() / 1000;
  const before = now - 60 * 15;
  return axios.get(`https://poloniex.com/public?command=returnTradeHistory&currencyPair=${currencyPair}&start=${before}&end=${now}`);
}