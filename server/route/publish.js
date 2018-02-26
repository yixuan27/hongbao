const express = require('express')
const exec = require('child_process').exec
const router = express.Router()
const path = require('path')

router.post('/', async (req, res, next) => {
  if (JSON.stringify(req.body).indexOf(process.env.ELEME_PUBLISH_KEY) !== -1) {
    exec(path.resolve(__dirname, '..', '..', 'publish.sh'))
    res.json({message: '正在发布中，稍后查看效果'})
  } else {
    res.json({message: '密钥不正确，不执行发布'})
  }
})

module.exports = router
