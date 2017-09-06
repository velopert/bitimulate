import store from 'store';

export function getCurrency(key) {
  const temp = key.indexOf('_') !== -1 ? key.split('_')[1] : key;

  const currencyInfo = store.getState().common.get('currencyInfo');
  const currency = currencyInfo.find(c => c.get('key') === temp);
  return currency;
}