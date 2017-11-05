export const getAggregatedWallet = (wallet, walletOnOrder) => {
  const aggregated = [];
  const walletData = wallet.toJS();
  for(let currency in walletData) {
    aggregated.push({
      valueOnOrder: walletOnOrder.get(currency),
      currency,
      value: wallet.get(currency) + (walletOnOrder.get(currency) || 0)
    })
  }
  return aggregated;
}

export const getCorrespondingRate = (aggregated, rate) => {
  aggregated.forEach(
    w => {
      if(w.currency === 'BTC') {
        w.currencyName = 'Bitcoin';
        w.last = 1;
        return;
      }
      if(w.currency === 'USD') {

        const btcRate = rate.find(r => r.get('currencyKey') === 'BTC');
        if(!btcRate) return w;
        w.currencyName = 'Dollar';
        w.last = 1 / btcRate.get('last');
        return;
      }

      const info = rate.find(r => r.get('currencyKey') === w.currency);
      if(!info) return w;
      w.last = info.get('last'); 
      w.currencyName = info.get('currencyName');
    }
  );
  return aggregated;
}