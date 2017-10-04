import axios from 'axios';


export const createOrder = ({ currencyPair, price, amount, sell }) => axios.post('/api/v1.0/orders', {
  currencyPair, price, amount, sell 
});