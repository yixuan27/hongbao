// N 个小号 QQ 登录饿了么抢红包页面后的 COOKIE 数据（浏览器开发者工具 document.cookie 打印后复制），用于换绑手机号
module.exports = [/* 饿了么辅助已失效 */]
  .map(cookie => ({
    sns: JSON.parse(decodeURIComponent(cookie.split(/;\s+/).find(item => /^snsInfo/.test(item)).split('=').pop())),
    lock: false
  }))
