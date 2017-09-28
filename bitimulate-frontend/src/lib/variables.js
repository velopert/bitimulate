export const optionsPerCurrency = {
  // 'KRW': {
  //   symbol: '₩',
  //   initialValue: 1000000
  // },
  'USD': {
    symbol: '$',
    initialValue: 1000
  },
  'BTC': {
    symbol: 'Ƀ',
    initialValue: 1
  }
}

export const initialCurrencies = [
  // {
  //   name: 'KRW',
  //   symbol: '₩'
  // },
  {
    name: 'USD',
    symbol: '$'
  },
  {
    name: 'BTC',
    symbol: 'Ƀ'
  }
];

export const chartTypes = [
  {
    name: 'day',
    text: '하루',
    unit: '5분'
  },
  {
    name: 'week',
    text: '일주일',
    unit: '30분'
  },
  {
    name: 'month',
    text: '한달',
    unit: '2시간'
  },
  {
    name: 'year',
    text: '1년',
    unit: '하루'
  },
  {
    name: 'all',
    text: '전체',
    unit: '하루'
  }
];