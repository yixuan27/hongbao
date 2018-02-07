const express = require('express')
const router = express.Router()
const eleme = require('../services/eleme')

router.post('/', async (req, res, next) => {
  res.json(await eleme(req.body))
})

module.exports = router
