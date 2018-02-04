var express = require('express')
var router = express.Router()
var request = require('../../拼手气红包/src/request')

/* GET users listing. */
router.post('/', async (req, res, next) => {
  const {
    url,
    mobile
  } = req.body
  if (!url || !mobile) {
    res.json({
      message: '请将信息填写完整'
    })
  }
  if (!/^1\d{10}$/.test(mobile)) {
    res.json({
      message: '请填写 11 位手机号码'
    })
  }
  try {
    await request({
      url,
      mobile
    })
    res.json({
      message: '领取完毕，打开饿了么 APP 查看红包是否到账'
    })
  } catch (e) {
    res.json({
      message: e.message
    })
  }
})

module.exports = router
