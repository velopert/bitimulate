import axios from 'axios';

export const getOrderBook = (currencyPair) => axios.get(`https://poloniex.com/public?command=returnOrderBook&currencyPair=${currencyPair}&depth=20`);
export const getTradeHistory = ({currencyPair, start, end}) => axios.get(`https://poloniex.com/public?command=returnTradeHistory&currencyPair=${currencyPair}${start ? `&start=${start}&end=${end}` : ''}`)