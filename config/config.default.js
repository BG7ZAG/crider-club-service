/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1560758361733_5728';

  config.default_limit = 30;


  config.name = 'crider.club';
  config.description = 'crider.club';
  config.host = 'https://crider.club';
  config.api = 'http://criderapi.huangliangbo.com';
  config.session_secret = 'crider_club_secret'; // 务必修改

  // add your middleware config here
  config.middleware = [];

  config.alinode = {
    // 从 `Node.js 性能平台` 获取对应的接入参数
    appid: '80358',
    secret: '90bdcc58ed02fe76ab4918eb624b2d72e79246d2',
  };

  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1/crider',
      options: {},
    },
  };

  config.jwt = {
    enable: false,
    secret: 'xxxxxxxxxxxxx',
  };


  config.security = {
    csrf: {
      useSession: true, // 默认为 false，当设置为 true 时，将会把 csrf token 保存到 Session 中
      // cookieName: 'csrfToken', // Cookie 中的字段名，默认为 csrfToken
      // sessionName: 'csrfToken', // Session 中的字段名，默认为 csrfToken
      // enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: [ 'localhost:3000', 'crider.club' ],
  };
  config.cors = {
    credentials: true,
    origin: 'http://localhost:3000',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  // 邮箱配置
  config.mail_opts = {
    host: 'smtp.qiye.aliyun.com',
    port: 465,
    auth: {
      user: 'test@crider.club',
      pass: 'crider123456.',
    },
    ignoreTLS: true,
  };


  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
