const Joi = require('joi');
const User = require('db/models/User');
const Order = require('db/models/Order');
const EarningsHistory = require('db/models/EarningsHistory');
const ObjectId = require('mongoose').Types.ObjectId;
const queryString = require('query-string');

exports.getMetaInfo = async (ctx) => {
  const { user } = ctx.request;
  const { _id } = user;

  try {
    const userData = await User.findById(_id).exec();
    if(!userData) {
      ctx.status = 403;
      return;
    }
    ctx.body = userData.metaInfo;
  } catch (e) {
    ctx.throw(e, 500);
  }
};

exports.patchMetaInfo = async (ctx) => {
  const { user } = ctx.request;
  const { _id } = user;

  const availableFields = {
    pinned: true,
    rewardWallet: true
  };
  
  const schema = Joi.object({
    pinned: Joi.array().items(Joi.string()),
    rewardWallet: Joi.object({
      address: Joi.string(),
      destinationTag: Joi.string()
    })
  });

  const { body: patchData } = ctx.request;

  const result = Joi.validate(patchData, schema);
  if(result.error) {
    ctx.body = {
      msg: 'failed to validate patchData'
    };
    ctx.status = 400;
    return;
  };  

  for(let field in patchData) {
    if(!availableFields[field]) {
      ctx.status = 403;
      ctx.body = {
        msg: 'unsupported field'
      };
      return;
    }
  }

  try {
    const userData = await User.findById(_id).exec();

    if(!userData) {
      ctx.status = 403;
      return;
    }

    userData.metaInfo = {
      ...userData.metaInfo.toObject(),
      ...patchData
    };

    await userData.update({ metaInfo: userData.metaInfo }).exec();
    ctx.body = userData.metaInfo;
  } catch (e) {
    ctx.throw(e, 500);
  }
};

exports.getEarningsHistory = async (ctx) => {
  const { user } = ctx.request;
  const { _id } = user;
  
  try {
    const history = await EarningsHistory.find({ userId: _id }, { userId: false, updatedAt: false, _id: false }).lean().exec();
    ctx.body = history;
  } catch (e) {
    ctx.throw(500, e);
  }
};

exports.checkUserExists = async (ctx, next) => {
  const { displayName } = ctx.params;
  try {
    const user = await User.findOne({displayName}).exec();
    if(!user) {
      ctx.status = 404;
      ctx.body = {
        name: 'NO_USER',
        msg: 'user does not exist'
      };
      return;
    }
    ctx.selectedUser = user;
    return next();
  } catch (e) {
    ctx.throw(500, e);
  }
};

exports.getWalletOfUser = async (ctx) => {
  const { selectedUser } = ctx;
  const { wallet, walletOnOrder, metaInfo } = selectedUser;

  ctx.body = {
    wallet,
    walletOnOrder,
    initial: metaInfo.initial
  };
};

exports.getOrdersOfUser = async (ctx) => {
  const { selectedUser } = ctx;
  const { cursor } = ctx.query;
  // check user existancy
  try {
    const orders = await Order.findOrders(selectedUser._id, cursor);
    ctx.body = orders;

    if (orders.length === 20) {
      const { path } = ctx;
      const query = queryString.stringify({
        cursor: orders[orders.length - 1]._id
      });
      const nextUrl = `${path}?${query}`;
      ctx.response.set('Link', `<${nextUrl}>; rel="next"`);
    }
  } catch (e) {
    ctx.throw(e, 500);
  }
};