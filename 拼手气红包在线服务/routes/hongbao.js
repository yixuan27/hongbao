const express = require('express')
const router = express.Router()
const request = require('../../拼手气红包/src/request')

router.post('/', async (req, res, next) => {
  const {
    url,
    mobile
  } = req.body
  if (!url || !mobile) {
    return res.json({
      message: '请将信息填写完整'
    })
  }
  if (!/^1\d{10}$/.test(mobile)) {
    return res.json({
      message: '请填写 11 位手机号码'
    })
  }
  if (url.indexOf('https://h5.ele.me/hongbao/') === -1) {
    return res.json({
      message: '请填写正确的饿了么红包链接'
    })
  }
  try {
    console.log(url)
    const lucky = await request({
      url,
      mobile
    })
    res.json({
      message: lucky.sns_username ? `红包已被领取\n\n最佳手气：${lucky.sns_username}\n红包金额：${lucky.amount}` : '服务器繁忙，请稍后重试'
    })
  } catch (e) {
    res.json({
      message: e.message
    })
  }
})

module.exports = router
