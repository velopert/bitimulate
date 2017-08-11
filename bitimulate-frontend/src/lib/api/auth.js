import axios from 'axios';

export const checkEmail = (email) => axios.get('/api/v1.0/auth/exists/email/' + email);
export const checkDisplayName = (displayName) => axios.get('/api/v1.0/auth/exists/display-name/' + displayName);
export const localRegister = ({
  displayName,
  email,
  password,
  initialMoney: { currency, index }
}) => axios.post('/api/v1.0/auth/register/local', {
  displayName,
  email,
  password,
  initialMoney: { currency, index }
})