'use strict';

const Controller = require('egg').Controller;
const validator = require('validator');

class PostController extends Controller {
  /**
   * 获取帖子列表
   */
  async index() {
    const { ctx } = this;
    ctx.body = {
      code: 1,
      msg: '获取成功',
      data: [],
    };
  }
  /**
   * 新增
   */
  async add() {
    const { ctx } = this;
    const { id, title, category, content, code } = ctx.request.body;
    let msg;
    // 验证信息的正确性
    if (!id || !title || !category || !content || !code) {
      msg = '参数不完整';
    } else if (ctx.session.code !== validator.trim(code).toLowerCase()) {
      msg = '验证码不正确';
    }
    if (msg) {
      ctx.status = 422;
      ctx.body = {
        code: 0,
        msg,
        data: {
          id,
        },
      };
      return;
    }

    // 储存新主题帖
    await ctx.service.post.newAndSave(
      title,
      content,
      category,
      id
    );

    ctx.body = {
      code: 1,
      msg: '发帖成功',
      data: [],
    };
  }
}

module.exports = PostController;
