const Joi = require('joi');
const User = require('db/models/User');
const EarningsHistory = require('db/models/EarningsHistory');

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
    pinned: true
  };
  
  const schema = Joi.object({
    pinned: Joi.array().items(Joi.string())
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

    console.log(userData);
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