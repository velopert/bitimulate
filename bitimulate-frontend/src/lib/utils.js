import store from 'store';

export function getCurrency(key) {
  const currencyInfo = store.getState().common.get('currencyInfo');
  const currency = currencyInfo.find(c => c.get('key') === key);
  return currency;
}