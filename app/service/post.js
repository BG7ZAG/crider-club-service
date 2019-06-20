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
}

module.exports = PostService;
