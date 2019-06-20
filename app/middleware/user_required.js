'use strict';
module.exports = () => {
  /*
   * 需要登录
   */
  return async function(ctx, next) {
    // 校验Token合法性
    const isVerify = await ctx.helper.verifyToken(ctx, ctx.request.body.id);
    console.log(isVerify);
    if (isVerify) {
      await next();
    }
  };
};
