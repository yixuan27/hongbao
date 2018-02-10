const express = require('express')
const router = express.Router()
const eleme = require('../service/eleme')

router.post('/', async (req, res, next) => {
  res.json(await eleme(req.body))
})

module.exports = router
