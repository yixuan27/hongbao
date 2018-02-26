const axios = require('axios')

module.exports = async url => {
  try {
    const res = await axios(url)
    return res.request.res.responseUrl
  } catch (e) {
    throw new Error('红包链接不正确')
  }
}
