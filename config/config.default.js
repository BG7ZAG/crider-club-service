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
  config.session_secret = 'crider_club_secret'; // 务必修改

  // add your middleware config here
  config.middleware = [];

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

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: [ 'http://localhost:8080' ],
  };

  // 邮箱配置
  config.mail_opts = {
    host: 'smtp.qiye.aliyun.com',
    port: 465,
    auth: {
      user: 'admin@crider.club',
      pass: 'club',
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
