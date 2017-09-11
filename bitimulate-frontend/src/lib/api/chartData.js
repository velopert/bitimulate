import axios from 'axios';

export const getChartData = ({name, type}) => axios.get(`/api/v1.0/chart-data/${name}?type=${type}`);