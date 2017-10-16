import axios from 'axios';

export const getCurrencyInfo = () => axios.get('/api/v1.0/common/currency-info');
export const getKrwRate = () => axios.get('/api/v1.0/common/krw-rate');
export const getNext = (url) => axios.get(url);