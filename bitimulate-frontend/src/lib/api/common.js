import axios from 'axios';

export const getCurrencyInfo = () => axios.get('/api/v1.0/common/currency-info');