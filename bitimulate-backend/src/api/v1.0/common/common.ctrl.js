const currencyInfo = require('lib/poloniex/currencyInfo');
const { getExchangeRate } = require('lib/common');
const User = require('db/models/User');

exports.getCurrencyInfo = async (ctx) => {
  // ctx.set('Last-Modified', 'Sun, 03 Sep 2017 16:04:24 GMT');
  // ctx.set('Cache-Control', 'public, max-age=31536000');
  ctx.body = currencyInfo;
};

exports.getKrwRate = async (ctx) => {
  try {
    const cached = await getExchangeRate();
    ctx.body = cached;
  } catch (e) {
    ctx.throw(e, 500);
  }
};

exports.getRanking = async (ctx) => {
  const { type } = ctx.query;
  const { user } = ctx.request;

  let myRank = null;
  const monthly = type === 'monthly' || !type;

  try {
    const count = await User.count().exec();
    const ranking = await User.getTopRanking(monthly);
    if(user) {
      const u = await User.findById(user._id).exec();
      myRank = await u.getRank(monthly);
    }
    ctx.body = {
      count, ranking, me: user && (myRank + 1)
    };
  } catch (e) {
    ctx.throw(e, 500);
  }
};