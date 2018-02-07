const express = require('express')
const router = express.Router()
const request = require('../services/request')

router.post('/', async (req, res, next) => {
  const {url, mobile} = req.body
  if (!url || !mobile) {
    return res.json({message: '请将信息填写完整'})
  }

  if (!/^1\d{10}$/.test(mobile)) {
    return res.json({message: '请填写 11 位手机号码'})
  }

  if (url.indexOf('https://h5.ele.me/hongbao/') === -1) {
    return res.json({message: '请填写正确的饿了么红包链接'})
  }

  try {
    console.log(url, mobile)
    // 有时候领取成功了，但是没有返回 lucky，再调一次就可以了
    const lucky = await request({url, mobile}) || await request({url, mobile})
    res.json({
      message: lucky
        ? `红包领取完毕\n\n最佳手气：${lucky.sns_username}\n红包金额：${lucky.amount}`
        : '服务器繁忙 或 红包被别人抢完'
    })
  } catch (err) {
    console.error(err)
    res.json({message: err.message})
  }
})

module.exports = router
