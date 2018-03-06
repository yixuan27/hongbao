const express = require('express')
const router = express.Router()
const redirect = require('../service/redirect')
const eleme = require('../service/eleme')
const elemeYearawards = require('../service/eleme/yearawards')
// const meituan = require('../service/meituan')
const logger = require('../service/logger')

router.post('/', async (req, res, next) => {
  try {
    let {url = '', mobile} = req.body

    // 短链接处理
    if (/^https?:\/\/url\.cn\//i.test(url)) {
      url = await redirect(url)
    }

    // 饿了么年终奖红包 跳过手机号验证
    if (url.indexOf('h5.ele.me/yearawards') !== -1) {
      mobile = '13012345678'
    }

    if (!url || !mobile) {
      throw new Error('请将信息填写完整')
    }

    if (!/^1\d{10}$/.test(mobile)) {
      throw new Error('请填写 11 位手机号码')
    }

    logger.info('开始抢红包', [url, mobile])

    if (url.indexOf('waimai.meituan.com') !== -1) {
      throw new Error('美团辅助已失效，我们正在尝试修复，饿了么或成最大赢家')
      // res.json(await meituan({url, mobile}))
    } else if (url.indexOf('h5.ele.me/hongbao') !== -1) {
      res.json(await eleme({url, mobile}))
    } else if (url.indexOf('h5.ele.me/yearawards') !== -1) {
      res.json(await elemeYearawards({url}))
    } else {
      throw new Error('红包链接不正确')
    }
  } catch ({message}) {
    logger.error(message)
    res.json({message})
  }
})

module.exports = router
