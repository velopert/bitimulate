import axios from 'axios';

export const getOrderBook = (currencyPair) => axios.get(`https://poloniex.com/public?command=returnOrderBook&currencyPair=${currencyPair}&depth=20`);