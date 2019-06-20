'use strict';

const Controller = require('egg').Controller;
const validator = require('validator');

class PostController extends Controller {
  /**
   * 通过id查帖子
   */
  async findById() {
    const { ctx } = this;
    const { id } = ctx.request.query;
    const content = await ctx.service.post.findById(id);
    ctx.helper.success(ctx, content, '成功');
  }
  /**
   * 获取帖子列表
   */
  async findAll() {
    const { ctx } = this;
    const default_limit = this.config.default_limit;
    let { currentPage = 1, limit = default_limit } = ctx.request.query;
    currentPage = parseInt(currentPage);
    limit = parseInt(limit);
    const [ content, total ] = await ctx.service.post.findAll({ currentPage, limit });
    const data = {
      content,
      currentPage,
      limit,
      total,
    };
    ctx.helper.success(ctx, data, '成功');
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
      ctx.helper.error(ctx, 422, msg);
      // ctx.status = 422;
      // ctx.body = {
      //   code: 0,
      //   msg,
      //   data: {
      //     id,
      //   },
      // };
      return;
    }

    // 储存新主题帖
    await ctx.service.post.newAndSave(
      title,
      content,
      category,
      id
    );

    ctx.helper.success(ctx, [], '发布成功');
  }
}

module.exports = PostController;
