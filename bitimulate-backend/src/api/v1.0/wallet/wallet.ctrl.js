const User = require('db/models/User');

exports.get = async (ctx) => {
  const { user } = ctx.request;
  
  if(!user) {
    ctx.status = 403;
    return;
  }

  try {
    const userData = await User.findById(user._id);
    ctx.body = userData.wallet;
  } catch (e) {
    ctx.throw(e, 500);
  }  
};