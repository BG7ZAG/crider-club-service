'use strict';

const Service = require('egg').Service;
const utils = require('utility');
const uuid = require('uuid');

class UserService extends Service {
  /*
   * 根据关键字，获取一组用户
   * Callback:
   * - err, 数据库异常
   * - users, 用户列表
   * @param {String} query 关键字
   * @param {Object} opt 选项
   * @return {Promise[users]} 承载用户列表的 Promise 对象
   */
  getUsersByQuery(query, opt) {
    return this.ctx.model.User.find(query, '', opt).exec();
  }

  // 获取gravatar头像
  makeGravatar(email) {
    return (
      'https://cn.gravatar.com/avatar/' +
      utils.md5(email.toLowerCase()) +
      '?size=48'
    );
  }

  getGravatar(user) {
    return user.avatar || this.makeGravatar(user.email);
  }

  /**
   * 注册用户
   * @param {用户名} username 用户名
   * @param {密码} password 密码
   * @param {邮箱} email 邮箱
   * @param {头像} avatar_url 头像
   * @param {激活状态} active 状态
   */
  newAndSave(username, password, email, avatar_url, active) {
    const user = new this.ctx.model.User();
    const token = this.ctx.helper.getAccessToken(this.ctx);
    user.username = username;
    user.password = password;
    user.email = email;
    user.avatar = avatar_url;
    user.active = active || false;
    // user.accessToken = uuid.v4();
    user.accessToken = token;

    return user.save();
  }

  /*
   * 根据邮箱，查找用户
   * @param {String} email 邮箱地址
   * @return {Promise[user]} 承载用户的 Promise 对象
   */
  getUserByMail(email) {
    return this.ctx.model.User.findOne({ email }).exec();
  }

  /*
   * 根据登录名查找用户
   * @param {String} userName 登录名
   * @return {Promise[user]} 承载用户的 Promise 对象
   */
  getUserByUserName(username) {
    const query = { username: new RegExp('^' + username + '$', 'i') };
    return this.ctx.model.User.findOne(query).exec();
  }

  /**
 * 生成 Token
 * @param {Object} data d
 */
  createToken(data) {
    return this.app.jwt.sign(data, this.app.config.jwt.secret, {
      expiresIn: '12h',
    });
  }

  /**
 * 验证token的合法性
 * @param {String} token d
 */
  verifyToken(token) {
    return new Promise(resolve => {
      this.app.jwt.verify(token, this.app.config.jwt.secret, function(err, decoded) {
        const result = {};
        if (err) {
        /*
          err = {
            name: 'TokenExpiredError',
            message: 'jwt expired',
            expiredAt: 1408621000
          }
        */
          result.verify = false;
          result.message = err.message;
        } else {
          result.verify = true;
          result.message = decoded;
        }
        resolve(result);
      });
    });
  }


}

module.exports = UserService;
