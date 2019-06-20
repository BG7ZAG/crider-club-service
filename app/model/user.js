'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    username: { type: String },
    password: { type: String },
    email: { type: String },
    avatar: { type: String },

    loginIp: { type: String },
    lastLoginIp: { type: String },
    score: { type: Number, default: 0 },
    createdTime: { type: Date, default: Date.now },
    updatedTime: { type: Date, default: Date.now },
    lastTime: { type: Date },
    level: { type: String },
    active: { type: Boolean, default: false },

    accessToken: { type: String },
  });

  UserSchema.index({ name: 1 }, { unique: true });
  UserSchema.index({ email: 1 }, { unique: true });
  UserSchema.index({ score: -1 });
  UserSchema.index({ accessToken: 1 });

  UserSchema.pre('save', function(next) {
    const now = new Date();
    this.updatedTime = now;
    next();
  });

  return mongoose.model('User', UserSchema);
};
