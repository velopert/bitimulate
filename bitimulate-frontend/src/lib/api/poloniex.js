import axios from 'axios';

export const getOrderBook = (currencyPair) => axios.get(`//poloniex.com/public?command=returnOrderBook&currencyPair=${currencyPair}&depth=20`);