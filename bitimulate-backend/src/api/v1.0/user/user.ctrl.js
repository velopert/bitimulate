const Joi = require('joi');
const User = require('db/models/User');

exports.getMetaInfo = async (ctx) => {
  const { user } = ctx.request;
  if(!user) {
    ctx.status = 403;
    return;
  }

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
  // check login status
  const { user } = ctx.request;

  if(!user) {
    ctx.status = 403;
    return;
  }
  
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

    if(!userData) {
      ctx.status = 403;
      return;
    }

    userData.metaInfo = {
      ...userData.metaInfo,
      ...patchData
    };

    await userData.save();
    ctx.body = userData.metaInfo;
  } catch (e) {
    ctx.throw(e, 500);
  }
};