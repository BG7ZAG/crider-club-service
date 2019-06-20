'use strict';

const Service = require('egg').Service;
const svgCaptcha = require('svg-captcha');

class ToolsService extends Service {
  // 产生验证码
  async captcha() {
    const captcha = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      ignoreChars: '0o1i', // 验证码字符中排除 0o1i
      noise: 2, // 干扰线条的数量
      width: 100,
      height: 40,
      bacground: '#ffffff',
    });
    this.ctx.session.code = captcha.text.toLowerCase();
    console.log(captcha.text.toLowerCase());
    return captcha;
  }
}

module.exports = ToolsService;
