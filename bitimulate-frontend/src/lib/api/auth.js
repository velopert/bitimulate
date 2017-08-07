import axios from 'axios';

export const checkEmail = (email) => axios.get('/api/v1.0/auth/check-email/' + email);