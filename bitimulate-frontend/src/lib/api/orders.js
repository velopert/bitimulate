import axios from 'axios';
import queryString from 'query-string';


export const createOrder = ({ currencyPair, price, amount, sell }) => axios.post('/api/v1.0/orders', {
  currencyPair, price, amount, sell 
});

export const getOrders = ({currencyPair, status}) => {
  return  axios.get(`/api/v1.0/orders?${queryString.stringify({currencyPair, status})}`);
}
export const cancelOrder = (id) => axios.post(`/api/v1.0/orders/${id}/cancel`);
