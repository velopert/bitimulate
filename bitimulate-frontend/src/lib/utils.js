import store from 'store';

export function getCurrency(key) {
  const temp = key.indexOf('_') !== -1 ? key.split('_')[1] : key;

  const currencyInfo = store.getState().common.get('currencyInfo');
  const currency = currencyInfo.find(c => c.get('key') === temp);
  return currency;
}

export function scrollTo(elementY, duration=1000) { 
  var startingY = window.pageYOffset  
  var diff = elementY - startingY  
  var start;
  

  if(!window.requestAnimationFrame || duration === 0) {
      return window.scrollTo(0, elementY);
  }
}

export function waitUntil(fn, timeout) {
  return new Promise((resolve, reject) => {
    if(timeout) {
      setTimeout(() => {
        reject();
      }, timeout);
    }

    const check = () => {
      if(fn()) {
        resolve();
        return;
      }
      setTimeout(check, 0);
    };

    check();
  })
}


export function limitDigit(value, d = 10, showComma, round) {
  const parsedValue = typeof value === 'string' ? parseFloat(value) : value;

  if(!value) return (0).toFixed(10);
  const digits = (d - Math.floor(Math.log10(parsedValue)));
  const fixed = parsedValue.toFixed(digits > d ? d : digits);
  const float = parseFloat(fixed);
  if(!showComma) {
    return fixed;
  }

  if(float > 1000) {
    if(round) {
      return Math.round(float).toLocaleString();
    }
    return float.toLocaleString();
  }

  
  return fixed;
}

export function compare(current, next, names) {
  for(let name of names) {
    if(current[name] !== next[name]) {
      return true;
    }
  }
  return false;
}

export function decimalToPercentString(decimal, toFixedParam = 2) {
  return (Math.round(decimal * 10000) / 100).toFixed(toFixedParam)
}