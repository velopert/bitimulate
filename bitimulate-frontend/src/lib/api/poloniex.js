import axios from 'axios';

const poloAxios = axios.create({
  withCredentials: false
});

export const getOrderBook = (currencyPair) => poloAxios.get(`https://poloniex.com/public?command=returnOrderBook&currencyPair=${currencyPair}&depth=20`);
export const getTradeHistory = ({currencyPair, start, end}) => poloAxios.get(`https://poloniex.com/public?command=returnTradeHistory&currencyPair=${currencyPair}${start ? `&start=${start}&end=${end}` : ''}`)