'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const ObjectId = Schema.ObjectId;

  const PostSchema = new Schema({
    title: { type: String },
    content: { type: String },
    author_id: { type: ObjectId },
    top: { type: Boolean, default: false }, // 置顶帖
    good: { type: Boolean, default: false }, // 精华帖
    lock: { type: Boolean, default: false }, // 被锁定主题
    reply_count: { type: Number, default: 0 }, // 回复
    visit_count: { type: Number, default: 0 }, // 访问
    like: { type: ObjectId }, // 喜欢
    like_count: { type: Number, default: 0 }, // 喜欢数
    createdTime: { type: Date, default: Date.now },
    updatedTime: { type: Date, default: Date.now },
    last_reply: { type: ObjectId }, // 最后回复id
    last_reply_time: { type: Date, default: Date.now },
    category: { type: String }, // 分类
    deleted: { type: Boolean, default: false }, // 是否已被删除
  });

  PostSchema.index({ createdTime: -1 });
  PostSchema.index({ top: -1, last_reply_time: -1 });
  PostSchema.index({ author_id: 1, createdTime: -1 });

  return mongoose.model('Post', PostSchema);
};
