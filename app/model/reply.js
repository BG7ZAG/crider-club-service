'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const ObjectId = Schema.ObjectId;

  const ReplySchema = new Schema({
    content: { type: String },
    post_id: { type: ObjectId },
    author_id: { type: ObjectId },
    reply_id: { type: ObjectId },

    createdTime: { type: Date, default: Date.now },
    updatedTime: { type: Date, default: Date.now },
    deleted: { type: Boolean, default: false }, // 是否已被删除
  });

  ReplySchema.index({ post_id: 1 });
  ReplySchema.index({ author_id: 1, createdTime: -1 });

  return mongoose.model('Reply', ReplySchema);
};
