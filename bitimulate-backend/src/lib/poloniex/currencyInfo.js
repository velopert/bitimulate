const currencyInfo = [
  {
    'id': 275,
    'key': 'AMP',
    'name': 'Synereo AMP',
    'txFee': '5.00000000'
  },
  {
    'id': 285,
    'key': 'ARDR',
    'name': 'Ardor',
    'txFee': '1.00000000'
  },
  {
    'id': 292,
    'key': 'BCH',
    'name': 'Bitcoin Cash',
    'txFee': '0.00010000'
  },
  {
    'id': 17,
    'key': 'BCN',
    'name': 'Bytecoin',
    'txFee': '0.05000000'
  },
  {
    'id': 269,
    'key': 'BCY',
    'name': 'BitCrystals',
    'txFee': '4.00000000'
  },
  {
    'id': 20,
    'key': 'BELA',
    'name': 'Bela',
    'txFee': '0.01000000'
  },
  {
    'id': 22,
    'key': 'BLK',
    'name': 'BlackCoin',
    'txFee': '0.01000000'
  },
  {
    'id': 28,
    'key': 'BTC',
    'name': 'Bitcoin',
    'txFee': '0.00010000'
  },
  {
    'id': 29,
    'key': 'BTCD',
    'name': 'BitcoinDark',
    'txFee': '0.01000000'
  },
  {
    'id': 32,
    'key': 'BTS',
    'name': 'BitShares',
    'txFee': '5.00000000'
  },
  {
    'id': 34,
    'key': 'BURST',
    'name': 'Burst',
    'txFee': '1.00000000'
  },
  {
    'id': 43,
    'key': 'CLAM',
    'name': 'CLAMS',
    'txFee': '0.00100000'
  },
  {
    'id': 60,
    'key': 'DASH',
    'name': 'Dash',
    'txFee': '0.01000000'
  },
  {
    'id': 277,
    'key': 'DCR',
    'name': 'Decred',
    'txFee': '0.05000000'
  },
  {
    'id': 53,
    'key': 'DGB',
    'name': 'DigiByte',
    'txFee': '0.10000000'
  },
  {
    'id': 59,
    'key': 'DOGE',
    'name': 'Dogecoin',
    'txFee': '5.00000000'
  },
  {
    'id': 69,
    'key': 'EMC2',
    'name': 'Einsteinium',
    'txFee': '0.01000000'
  },
  {
    'id': 283,
    'key': 'ETC',
    'name': 'Ethereum Classic',
    'txFee': '0.01000000'
  },
  {
    'id': 267,
    'key': 'ETH',
    'name': 'Ethereum',
    'txFee': '0.00500000'
  },
  {
    'id': 270,
    'key': 'EXP',
    'name': 'Expanse',
    'txFee': '0.01000000'
  },
  {
    'id': 271,
    'key': 'FCT',
    'name': 'Factom',
    'txFee': '0.10000000'
  },
  {
    'id': 78,
    'key': 'FLDC',
    'name': 'FoldingCoin',
    'txFee': '150.00000000'
  },
  {
    'id': 254,
    'key': 'FLO',
    'name': 'Florincoin',
    'txFee': '0.01000000'
  },
  {
    'id': 93,
    'key': 'GAME',
    'name': 'GameCredits',
    'txFee': '0.01000000'
  },
  {
    'id': 291,
    'key': 'GNO',
    'name': 'Gnosis',
    'txFee': '0.00500000'
  },
  {
    'id': 290,
    'key': 'GNT',
    'name': 'Golem',
    'txFee': '0.10000000'
  },
  {
    'id': 105,
    'key': 'HUC',
    'name': 'Huntercoin',
    'txFee': '0.01000000'
  },
  {
    'id': 280,
    'key': 'LBC',
    'name': 'LBRY Credits',
    'txFee': '0.01000000'
  },
  {
    'id': 278,
    'key': 'LSK',
    'name': 'Lisk',
    'txFee': '0.10000000'
  },
  {
    'id': 125,
    'key': 'LTC',
    'name': 'Litecoin',
    'txFee': '0.00100000'
  },
  {
    'id': 127,
    'key': 'MAID',
    'name': 'MaidSafeCoin',
    'txFee': '10.00000000'
  },
  {
    'id': 150,
    'key': 'NAUT',
    'name': 'Nautiluscoin',
    'txFee': '0.00000000'
  },
  {
    'id': 151,
    'key': 'NAV',
    'name': 'NAVCoin',
    'txFee': '0.01000000'
  },
  {
    'id': 153,
    'key': 'NEOS',
    'name': 'Neoscoin',
    'txFee': '0.00010000'
  },
  {
    'id': 155,
    'key': 'NMC',
    'name': 'Namecoin',
    'txFee': '0.01000000'
  },
  {
    'id': 157,
    'key': 'NOTE',
    'name': 'DNotes',
    'txFee': '0.01000000'
  },
  {
    'id': 288,
    'key': 'NXC',
    'name': 'Nexium',
    'txFee': '0.01000000'
  },
  {
    'id': 162,
    'key': 'NXT',
    'name': 'NXT',
    'txFee': '1.00000000'
  },
  {
    'id': 143,
    'key': 'OMNI',
    'name': 'Omni',
    'txFee': '0.10000000'
  },
  {
    'id': 289,
    'key': 'PASC',
    'name': 'PascalCoin',
    'txFee': '0.01000000'
  },
  {
    'id': 168,
    'key': 'PINK',
    'name': 'Pinkcoin',
    'txFee': '0.01000000'
  },
  {
    'id': 171,
    'key': 'POT',
    'name': 'PotCoin',
    'txFee': '0.01000000'
  },
  {
    'id': 172,
    'key': 'PPC',
    'name': 'Peercoin',
    'txFee': '0.01000000'
  },
  {
    'id': 274,
    'key': 'RADS',
    'name': 'Radium',
    'txFee': '0.01000000'
  },
  {
    'id': 284,
    'key': 'REP',
    'name': 'Augur',
    'txFee': '0.01000000'
  },
  {
    'id': 183,
    'key': 'RIC',
    'name': 'Riecoin',
    'txFee': '0.01000000'
  },
  {
    'id': 268,
    'key': 'SC',
    'name': 'Siacoin',
    'txFee': '10.00000000'
  },
  {
    'id': 189,
    'key': 'SJCX',
    'name': 'Storjcoin X',
    'txFee': '3.00000000'
  },
  {
    'id': 198,
    'key': 'STR',
    'name': 'Stellar',
    'txFee': '0.00001000'
  },
  {
    'id': 287,
    'key': 'STRAT',
    'name': 'Stratis',
    'txFee': '0.01000000'
  },
  {
    'id': 204,
    'key': 'SYS',
    'name': 'Syscoin',
    'txFee': '0.01000000'
  },
  {
    'id': 214,
    'key': 'USDT',
    'name': 'Tether USD',
    'txFee': '2.00000000'
  },
  {
    'id': 218,
    'key': 'VIA',
    'name': 'Viacoin',
    'txFee': '0.01000000'
  },
  {
    'id': 220,
    'key': 'VRC',
    'name': 'VeriCoin',
    'txFee': '0.01000000'
  },
  {
    'id': 221,
    'key': 'VTC',
    'name': 'Vertcoin',
    'txFee': '0.00100000'
  },
  {
    'id': 229,
    'key': 'XBC',
    'name': 'BitcoinPlus',
    'txFee': '0.00010000'
  },
  {
    'id': 233,
    'key': 'XCP',
    'name': 'Counterparty',
    'txFee': '0.20000000'
  },
  {
    'id': 256,
    'key': 'XEM',
    'name': 'NEM',
    'txFee': '15.00000000'
  },
  {
    'id': 240,
    'key': 'XMR',
    'name': 'Monero',
    'txFee': '0.05000000'
  },
  {
    'id': 242,
    'key': 'XPM',
    'name': 'Primecoin',
    'txFee': '0.01000000'
  },
  {
    'id': 243,
    'key': 'XRP',
    'name': 'Ripple',
    'txFee': '0.15000000'
  },
  {
    'id': 286,
    'key': 'ZEC',
    'name': 'Zcash',
    'txFee': '0.00100000'
  },
  {
    'id': 293,
    'key': 'ZRX',
    'name': '0x',
    'txFee': '0.00500000'
  }
];

module.exports = currencyInfo;