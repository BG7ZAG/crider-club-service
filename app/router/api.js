'use strict';
module.exports = app => {
  const { router, controller, middleware } = app;
  const apiV1Router = router.namespace('/api/v1');

  const userRequired = middleware.userRequired();

  // 首页
  apiV1Router.get('/', controller.home.index);

  // 验证码
  apiV1Router.get('/verify', controller.base.verify);

  // 登录
  apiV1Router.post('/signin', controller.sign.signin);
  // 注册
  apiV1Router.post('/signup', controller.sign.signup);

  // 邮箱验证
  apiV1Router.get('/active_account', controller.mail.activeAccount);

  // 帖子相关
  apiV1Router.post('/post/add', userRequired, controller.post.add);
  apiV1Router.get('/post/findAll', controller.post.findAll);
  apiV1Router.get('/post/findById', controller.post.findById);


};
