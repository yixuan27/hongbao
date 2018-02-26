const nickname = require('./nickname')
const openid = require('./openid')
const crypto = require('./crypto')

module.exports = () => {
  const ewxinfo = {
    imgUrl: '',
    nickname: nickname(),
    openId: openid()
  }
  console.log(ewxinfo)
  return `ewxinfo="${crypto.encrypt(ewxinfo)}"`
}
