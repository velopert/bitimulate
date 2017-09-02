import axios from 'axios';

export const getInitialRate = () => axios.get('/api/v1.0/exchange/');