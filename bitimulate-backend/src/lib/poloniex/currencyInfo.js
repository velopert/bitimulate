const currencyInfo = [
  {
    'key': 'AMP',
    'id': 275,
    'name': 'Synereo AMP',
    'txFee': '5.00000000'
  },
  {
    'key': 'ARDR',
    'id': 285,
    'name': 'Ardor',
    'txFee': '1.00000000'
  },
  {
    'key': 'BCH',
    'id': 292,
    'name': 'Bitcoin Cash',
    'txFee': '0.00010000'
  },
  {
    'key': 'BCN',
    'id': 17,
    'name': 'Bytecoin',
    'txFee': '0.05000000'
  },
  {
    'key': 'BCY',
    'id': 269,
    'name': 'BitCrystals',
    'txFee': '4.00000000'
  },
  {
    'key': 'BELA',
    'id': 20,
    'name': 'Bela',
    'txFee': '0.01000000'
  },
  {
    'key': 'BLK',
    'id': 22,
    'name': 'BlackCoin',
    'txFee': '0.01000000'
  },
  {
    'key': 'BTC',
    'id': 28,
    'name': 'Bitcoin',
    'txFee': '0.00010000'
  },
  {
    'key': 'BTCD',
    'id': 29,
    'name': 'BitcoinDark',
    'txFee': '0.01000000'
  },
  {
    'key': 'BTM',
    'id': 31,
    'name': 'Bitmark',
    'txFee': '0.01000000'
  },
  {
    'key': 'BTS',
    'id': 32,
    'name': 'BitShares',
    'txFee': '5.00000000'
  },
  {
    'key': 'BURST',
    'id': 34,
    'name': 'Burst',
    'txFee': '1.00000000'
  },
  {
    'key': 'CLAM',
    'id': 43,
    'name': 'CLAMS',
    'txFee': '0.00100000'
  },
  {
    'key': 'DASH',
    'id': 60,
    'name': 'Dash',
    'txFee': '0.01000000'
  },
  {
    'key': 'DCR',
    'id': 277,
    'name': 'Decred',
    'txFee': '0.05000000'
  },
  {
    'key': 'DGB',
    'id': 53,
    'name': 'DigiByte',
    'txFee': '0.10000000'
  },
  {
    'key': 'DOGE',
    'id': 59,
    'name': 'Dogecoin',
    'txFee': '5.00000000'
  },
  {
    'key': 'EMC2',
    'id': 69,
    'name': 'Einsteinium',
    'txFee': '0.01000000'
  },
  {
    'key': 'ETC',
    'id': 283,
    'name': 'Ethereum Classic',
    'txFee': '0.01000000'
  },
  {
    'key': 'ETH',
    'id': 267,
    'name': 'Ethereum',
    'txFee': '0.00500000'
  },
  {
    'key': 'EXP',
    'id': 270,
    'name': 'Expanse',
    'txFee': '0.01000000'
  },
  {
    'key': 'FCT',
    'id': 271,
    'name': 'Factom',
    'txFee': '0.10000000'
  },
  {
    'key': 'FLDC',
    'id': 78,
    'name': 'FoldingCoin',
    'txFee': '150.00000000'
  },
  {
    'key': 'FLO',
    'id': 254,
    'name': 'Florincoin',
    'txFee': '0.01000000'
  },
  {
    'key': 'GAME',
    'id': 93,
    'name': 'GameCredits',
    'txFee': '0.01000000'
  },
  {
    'key': 'GNO',
    'id': 291,
    'name': 'Gnosis',
    'txFee': '0.00500000'
  },
  {
    'key': 'GNT',
    'id': 290,
    'name': 'Golem',
    'txFee': '0.10000000'
  },
  {
    'key': 'GRC',
    'id': 261,
    'name': 'Gridcoin Research',
    'txFee': '0.01000000'
  },
  {
    'key': 'HUC',
    'id': 105,
    'name': 'Huntercoin',
    'txFee': '0.01000000'
  },
  {
    'key': 'LBC',
    'id': 280,
    'name': 'LBRY Credits',
    'txFee': '0.01000000'
  },
  {
    'key': 'LSK',
    'id': 278,
    'name': 'Lisk',
    'txFee': '0.10000000'
  },
  {
    'key': 'LTC',
    'id': 125,
    'name': 'Litecoin',
    'txFee': '0.00100000'
  },
  {
    'key': 'MAID',
    'id': 127,
    'name': 'MaidSafeCoin',
    'txFee': '10.00000000'
  },
  {
    'key': 'NAUT',
    'id': 150,
    'name': 'Nautiluscoin',
    'txFee': '0.00000000'
  },
  {
    'key': 'NAV',
    'id': 151,
    'name': 'NAVCoin',
    'txFee': '0.01000000'
  },
  {
    'key': 'NEOS',
    'id': 153,
    'name': 'Neoscoin',
    'txFee': '0.00010000'
  },
  {
    'key': 'NMC',
    'id': 155,
    'name': 'Namecoin',
    'txFee': '0.01000000'
  },
  {
    'key': 'NOTE',
    'id': 157,
    'name': 'DNotes',
    'txFee': '0.01000000'
  },
  {
    'key': 'NXC',
    'id': 288,
    'name': 'Nexium',
    'txFee': '0.01000000'
  },
  {
    'key': 'NXT',
    'id': 162,
    'name': 'NXT',
    'txFee': '1.00000000'
  },
  {
    'key': 'OMNI',
    'id': 143,
    'name': 'Omni',
    'txFee': '0.10000000'
  },
  {
    'key': 'PASC',
    'id': 289,
    'name': 'PascalCoin',
    'txFee': '0.01000000'
  },
  {
    'key': 'PINK',
    'id': 168,
    'name': 'Pinkcoin',
    'txFee': '0.01000000'
  },
  {
    'key': 'POT',
    'id': 171,
    'name': 'PotCoin',
    'txFee': '0.01000000'
  },
  {
    'key': 'PPC',
    'id': 172,
    'name': 'Peercoin',
    'txFee': '0.01000000'
  },
  {
    'key': 'RADS',
    'id': 274,
    'name': 'Radium',
    'txFee': '0.01000000'
  },
  {
    'key': 'REP',
    'id': 284,
    'name': 'Augur',
    'txFee': '0.01000000'
  },
  {
    'key': 'RIC',
    'id': 183,
    'name': 'Riecoin',
    'txFee': '0.01000000'
  },
  {
    'key': 'SBD',
    'id': 282,
    'name': 'Steem Dollars',
    'txFee': '0.01000000'
  },
  {
    'key': 'SC',
    'id': 268,
    'name': 'Siacoin',
    'txFee': '10.00000000'
  },
  {
    'key': 'SJCX',
    'id': 189,
    'name': 'Storjcoin X',
    'txFee': '3.00000000'
  },
  {
    'key': 'STEEM',
    'id': 281,
    'name': 'STEEM',
    'txFee': '0.01000000'
  },
  {
    'key': 'STR',
    'id': 198,
    'name': 'Stellar',
    'txFee': '0.00001000'
  },
  {
    'key': 'STRAT',
    'id': 287,
    'name': 'Stratis',
    'txFee': '0.01000000'
  },
  {
    'key': 'SYS',
    'id': 204,
    'name': 'Syscoin',
    'txFee': '0.01000000'
  },
  {
    'key': 'USDT',
    'id': 214,
    'name': 'Tether USD',
    'txFee': '2.00000000'
  },
  {
    'key': 'VIA',
    'id': 218,
    'name': 'Viacoin',
    'txFee': '0.01000000'
  },
  {
    'key': 'VRC',
    'id': 220,
    'name': 'VeriCoin',
    'txFee': '0.01000000'
  },
  {
    'key': 'VTC',
    'id': 221,
    'name': 'Vertcoin',
    'txFee': '0.00100000'
  },
  {
    'key': 'XBC',
    'id': 229,
    'name': 'BitcoinPlus',
    'txFee': '0.00010000'
  },
  {
    'key': 'XCP',
    'id': 233,
    'name': 'Counterparty',
    'txFee': '0.20000000'
  },
  {
    'key': 'XEM',
    'id': 256,
    'name': 'NEM',
    'txFee': '15.00000000'
  },
  {
    'key': 'XMR',
    'id': 240,
    'name': 'Monero',
    'txFee': '0.05000000'
  },
  {
    'key': 'XPM',
    'id': 242,
    'name': 'Primecoin',
    'txFee': '0.01000000'
  },
  {
    'key': 'XRP',
    'id': 243,
    'name': 'Ripple',
    'txFee': '0.15000000'
  },
  {
    'key': 'XVC',
    'id': 253,
    'name': 'Vcash',
    'txFee': '0.01000000'
  },
  {
    'key': 'ZEC',
    'id': 286,
    'name': 'Zcash',
    'txFee': '0.00100000'
  },
  {
    'key': 'ZRX',
    'id': 293,
    'name': '0x',
    'txFee': '0.00500000'
  }
];

module.exports = currencyInfo;