import axios from 'axios';


export const createOrder = ({ currencyPair, price, amount, sell }) => axios.post('/api/v1.0/orders', {
  currencyPair, price, amount, sell 
});

export const getOrders = (currencyPair) => axios.get(`/api/v1.0/orders?currencyPair=${currencyPair}`);
export const cancelOrder = (id) => axios.post(`/api/v1.0/orders/${id}/cancel`);
