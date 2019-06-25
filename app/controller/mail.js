'use strict';

const Controller = require('egg').Controller;

class MailController extends Controller {
  async activeAccount() {
    const { ctx } = this;
    console.log(ctx);
  }
}

module.exports = MailController;
