module.exports = (ctx, next) => {
  const { user } = ctx.request;
  if(!user) {
    ctx.status = 401; // Unauthorized
    return null;
  }
  return next();
};