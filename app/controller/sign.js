'use strict';

const Controller = require('egg').Controller;
const validator = require('validator');
const utils = require('utility');

class SignController extends Controller {
  /**
   * 登陆
   */
  async signin() {
    const { ctx, service } = this;
    const username = validator.trim(ctx.request.body.username || '');
    const password = validator.trim(ctx.request.body.password || '');
    const code = validator.trim(ctx.request.body.code || '');

    let msg;
    // 验证信息的正确性
    if ([ username, password, code ].some(item => {
      return item === '';
    })) {
      msg = '信息不完整。';
    } else if (ctx.session.code !== code.toLowerCase()) {
      msg = '验证码错误';
    }
    if (msg) {
      ctx.status = 422;
      ctx.body = {
        code: 0,
        msg,
        data: {
          username,
        },
      };
      return;
    }

    const getUser = username => {
      if (username.indexOf('@') > 0) {
        return service.user.getUserByMail(username);
      }
      return service.user.getUserByUserName(username);
    };
    const existUser = await getUser(username);

    // 用户不存在
    if (!existUser) {
      ctx.body = {
        code: 0,
        msg: '用户不存在',
        data: {
          username,
        },
      };
      return;
    }

    const passhash = existUser.password;
    // TODO: change to async compare
    const equal = ctx.helper.bcompare(password, passhash);
    // 密码不匹配
    if (!equal) {
      ctx.body = {
        code: 0,
        msg: '密码错误',
        data: {
          username,
        },
      };
      return;
    }

    ctx.session = null;

    const token = service.user.createToken({ id: existUser._id });

    ctx.session.token = token;

    ctx.body = {
      code: 1,
      msg: '登陆成功',
      data: {
        token,
        id: existUser._id,
      },
    };

  }

  /**
   * 注册
   */
  async signup() {
    const { ctx, service, config } = this;
    const username = validator.trim(ctx.request.body.username || '');
    const password = validator.trim(ctx.request.body.password || '');
    const rpassword = validator.trim(ctx.request.body.rpassword || '');
    const email = validator.trim(ctx.request.body.email || '');
    const code = validator.trim(ctx.request.body.code || '');
    console.log('------------', this.ctx.session.code);
    let msg;
    // 验证信息的正确性
    if ([ username, password, rpassword, email, code ].some(item => {
      return item === '';
    })) {
      msg = '信息不完整。';
    } else if (username.length < 5) {
      msg = '用户名至少需要5个字符。';
    } else if (!validator.isEmail(email)) {
      msg = '邮箱不合法。';
    } else if (password !== rpassword) {
      msg = '两次密码输入不一致。';
    } else if (password.length < 6) {
      msg = '密码不少于6个字符';
    }
    if (msg) {
      ctx.status = 422;
      ctx.body = {
        code: 0,
        msg,
        data: {
          username, email,
        },
      };
      return;
    }

    // 查询是否有相同用户名或者邮箱
    const users = await service.user.getUsersByQuery({
      $or: [
        { username },
        { email },
      ],
    }, {});
    if (users.length > 0) {
      ctx.status = 422;
      ctx.body = {
        code: 0,
        msg: '用户名或邮箱已被使用',
        data: {
          username, email,
        },
      };
      return;
    }

    const passMd5 = ctx.helper.md5(password);
    const avatarUrl = service.user.makeGravatar(email);
    // 创建用户
    await service.user.newAndSave(username, passMd5, email, avatarUrl, false);
    // 发送激活邮件
    await service.mail.sendActiveMail(email, utils.md5(email + passMd5 + config.session_secret), username);

    ctx.body = {
      code: 1,
      msg: '注册成功',
      data: '欢迎加入 ' + config.name + '！我们已给您的注册邮箱发送了一封邮件，请点击里面的链接来激活您的帐号。',
    };
  }
}

module.exports = SignController;
