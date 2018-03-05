const axios = require('axios')
const querystring = require('querystring')
const cookie = require('./cookie')
const randomPhone = require('../random-phone')
const randomHeadimg = require('../random-headimg')
const randomNickname = require('../random-nickname')
const logger = require('../logger')
const random = require('../random')

const origin = 'https://h5.ele.me'

async function request ({url} = {}) {
  const query = url.match(/\/share\/user_id\/(.*?)\/avatar_hash\//)
  const user_id = query[1]
  logger.info(query)

  let index = 0

  const request = axios.create({
    baseURL: origin,
    withCredentials: true,
    headers: {
      origin,
      referer: `${origin}/yearawards/`,
      'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; PRO 6 Build/MRA58K; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/53.0.2785.49 Mobile MQQBrowser/6.2 TBS/043221 Safari/537.36 V1_AND_SQ_7.0.0_676_YYB_D QQ/7.0.0.3135 NetType/WIFI WebP/0.3.0 Pixel/1080'
    },
    transformRequest: [(data, headers) => {
      const p = 1E6
      headers['X-Shard'] = `loc=${random(120 * p, 123 * p) / p},${random(29 * p, 31 * p) / p}`
      return JSON.stringify(data)
    }]
  })

  return (async function lottery () {
    const sns = cookie[index]

    if (!sns) {
      return '年终奖红包 助力完成\n请自行访问红包链接查看效果'
    }

    const phone = randomPhone()
    // 绑定手机号
    await request.put(`/restapi/v1/weixin/${sns.openid}/phone`, {
      sign: sns.eleme_key,
      phone
    })
    logger.info('绑定手机号', phone)

    // 领红包
    const wardUrl = `/restapi/member/v1/users/${user_id}/annual_reward/invitation`
    const wardParams = {
      avatar: randomHeadimg(),
      name: randomNickname(),
      eleme_key: sns.eleme_key,
      sns_source: 4,
      sns_uid: sns.openid,
      weixin_open_id: sns.openid,
    }
    try {
      logger.info((await request.post(wardUrl, wardParams, {
        headers: {
          'content-type': 'text/plain;charset=UTF-8'
        }
      })).data)
      logger.info((await request.get(wardUrl, {params: wardParams})).data)
    } catch(e) {
      logger.error(e.message)
    }

    index++

    return lottery()
  })()
}

function response (options) {
  return new Promise(async resolve => {
    try {
      resolve({message: await request(options)})
    } catch (e) {
      logger.error(e.message)
      resolve({
        message: e.message
      })
    }
  })
}

module.exports = response
