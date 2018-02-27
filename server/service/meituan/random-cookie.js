const randomNickname = require('./random-nickname')
const randomOpenid = require('./random-openid')
const crypto = require('./crypto')

module.exports = (nickname = randomNickname()) => {
  const ewxinfo = {
    nickname,
    imgUrl: '',
    openId: randomOpenid()
  }
  console.log(ewxinfo)
  return `ewxinfo="${crypto.encrypt(ewxinfo)}"`
}
