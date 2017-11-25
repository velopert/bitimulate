const currencyInfo = [
  {
    'key': 'AMP',
    'id': 275,
    'name': 'Synereo AMP'
  },
  {
    'key': 'ARDR',
    'id': 285,
    'name': 'Ardor'
  },
  {
    'key': 'BCH',
    'id': 292,
    'name': 'Bitcoin Cash'
  },
  {
    'key': 'BCN',
    'id': 17,
    'name': 'Bytecoin'
  },
  {
    'key': 'BCY',
    'id': 269,
    'name': 'BitCrystals'
  },
  {
    'key': 'BELA',
    'id': 20,
    'name': 'Bela'
  },
  {
    'key': 'BLK',
    'id': 22,
    'name': 'BlackCoin'
  },
  {
    'key': 'BTC',
    'id': 28,
    'name': 'Bitcoin'
  },
  {
    'key': 'BTCD',
    'id': 29,
    'name': 'BitcoinDark'
  },
  {
    'key': 'BTM',
    'id': 31,
    'name': 'Bitmark'
  },
  {
    'key': 'BTS',
    'id': 32,
    'name': 'BitShares'
  },
  {
    'key': 'BURST',
    'id': 34,
    'name': 'Burst'
  },
  {
    'key': 'CLAM',
    'id': 43,
    'name': 'CLAMS'
  },
  {
    'key': 'CVC',
    'id': 294,
    'name': 'Civic'
  },
  {
    'key': 'DASH',
    'id': 60,
    'name': 'Dash'
  },
  {
    'key': 'DCR',
    'id': 277,
    'name': 'Decred'
  },
  {
    'key': 'DGB',
    'id': 53,
    'name': 'DigiByte'
  },
  {
    'key': 'DOGE',
    'id': 59,
    'name': 'Dogecoin'
  },
  {
    'key': 'EMC2',
    'id': 69,
    'name': 'Einsteinium'
  },
  {
    'key': 'ETC',
    'id': 283,
    'name': 'Ethereum Classic'
  },
  {
    'key': 'ETH',
    'id': 267,
    'name': 'Ethereum'
  },
  {
    'key': 'EXP',
    'id': 270,
    'name': 'Expanse'
  },
  {
    'key': 'FCT',
    'id': 271,
    'name': 'Factom'
  },
  {
    'key': 'FLDC',
    'id': 78,
    'name': 'FoldingCoin'
  },
  {
    'key': 'FLO',
    'id': 254,
    'name': 'Florincoin'
  },
  {
    'key': 'GAME',
    'id': 93,
    'name': 'GameCredits'
  },
  {
    'key': 'GAS',
    'id': 296,
    'name': 'Gas'
  },
  {
    'key': 'GNO',
    'id': 291,
    'name': 'Gnosis'
  },
  {
    'key': 'GNT',
    'id': 290,
    'name': 'Golem'
  },
  {
    'key': 'GRC',
    'id': 261,
    'name': 'Gridcoin Research'
  },
  {
    'key': 'HUC',
    'id': 105,
    'name': 'Huntercoin'
  },
  {
    'key': 'LBC',
    'id': 280,
    'name': 'LBRY Credits'
  },
  {
    'key': 'LSK',
    'id': 278,
    'name': 'Lisk'
  },
  {
    'key': 'LTC',
    'id': 125,
    'name': 'Litecoin'
  },
  {
    'key': 'MAID',
    'id': 127,
    'name': 'MaidSafeCoin'
  },
  {
    'key': 'NAV',
    'id': 151,
    'name': 'NAVCoin'
  },
  {
    'key': 'NEOS',
    'id': 153,
    'name': 'Neoscoin'
  },
  {
    'key': 'NMC',
    'id': 155,
    'name': 'Namecoin'
  },
  {
    'key': 'NXC',
    'id': 288,
    'name': 'Nexium'
  },
  {
    'key': 'NXT',
    'id': 162,
    'name': 'NXT'
  },
  {
    'key': 'OMG',
    'id': 295,
    'name': 'OmiseGO'
  },
  {
    'key': 'OMNI',
    'id': 143,
    'name': 'Omni'
  },
  {
    'key': 'PASC',
    'id': 289,
    'name': 'PascalCoin'
  },
  {
    'key': 'PINK',
    'id': 168,
    'name': 'Pinkcoin'
  },
  {
    'key': 'POT',
    'id': 171,
    'name': 'PotCoin'
  },
  {
    'key': 'PPC',
    'id': 172,
    'name': 'Peercoin'
  },
  {
    'key': 'RADS',
    'id': 274,
    'name': 'Radium'
  },
  {
    'key': 'REP',
    'id': 284,
    'name': 'Augur'
  },
  {
    'key': 'RIC',
    'id': 183,
    'name': 'Riecoin'
  },
  {
    'key': 'SBD',
    'id': 282,
    'name': 'Steem Dollars'
  },
  {
    'key': 'SC',
    'id': 268,
    'name': 'Siacoin'
  },
  {
    'key': 'STEEM',
    'id': 281,
    'name': 'STEEM'
  },
  {
    'key': 'STORJ',
    'id': 297,
    'name': 'Storj'
  },
  {
    'key': 'STR',
    'id': 198,
    'name': 'Stellar'
  },
  {
    'key': 'STRAT',
    'id': 287,
    'name': 'Stratis'
  },
  {
    'key': 'SYS',
    'id': 204,
    'name': 'Syscoin'
  },
  {
    'key': 'USDT',
    'id': 214,
    'name': 'Tether USD'
  },
  {
    'key': 'VIA',
    'id': 218,
    'name': 'Viacoin'
  },
  {
    'key': 'VRC',
    'id': 220,
    'name': 'VeriCoin'
  },
  {
    'key': 'VTC',
    'id': 221,
    'name': 'Vertcoin'
  },
  {
    'key': 'XBC',
    'id': 229,
    'name': 'BitcoinPlus'
  },
  {
    'key': 'XCP',
    'id': 233,
    'name': 'Counterparty'
  },
  {
    'key': 'XEM',
    'id': 256,
    'name': 'NEM'
  },
  {
    'key': 'XMR',
    'id': 240,
    'name': 'Monero'
  },
  {
    'key': 'XPM',
    'id': 242,
    'name': 'Primecoin'
  },
  {
    'key': 'XRP',
    'id': 243,
    'name': 'Ripple'
  },
  {
    'key': 'XVC',
    'id': 253,
    'name': 'Vcash'
  },
  {
    'key': 'ZEC',
    'id': 286,
    'name': 'Zcash'
  },
  {
    'key': 'ZRX',
    'id': 293,
    'name': '0x'
  }
];

module.exports = currencyInfo;