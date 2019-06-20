'use strict';

const Service = require('egg').Service;

class PostService extends Service {
  /**
     * @param {*} title 标题
     * @param {String} content 正文
     * @param {ObjectId} category 分类
     * @param {*} authorId 作者id
     */
  newAndSave(title, content, category, authorId) {
    const post = new this.ctx.model.Post();
    post.title = title;
    post.content = content;
    post.category = category;
    post.author_id = authorId;
    return post.save();
  }

  /**
   * 查询全部帖子
   * @param {*} opt currentPage, limit
   */
  findAll(opt) {
    return Promise.all([
      this.ctx.model.Post.find().sort({ _id: -1 }).skip(opt.currentPage * opt.limit - opt.limit)
        .limit(opt.limit)
        .exec(),
      this.ctx.model.Post.count().exec(),
    ]);
  }

  /**
   * 根据id查找帖子
   * @param {Object} id id
   */
  findById(id) {
    return this.ctx.model.Post.findOne({ _id: id }).exec();
  }
}

module.exports = PostService;
