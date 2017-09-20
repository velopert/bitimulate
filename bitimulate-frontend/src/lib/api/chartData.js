import axios from 'axios';

export const getChartData = ({name, type, timebase}) => axios.get(`/api/v1.0/chart-data/${name}?type=${type}`, {
  headers: {
    'x-timebase': timebase
  }
});