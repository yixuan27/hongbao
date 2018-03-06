const axios = require('axios')
const querystring = require('querystring')
const cookie = require('./cookie')
const randomPhone = require('../random-phone')
const randomHeadimg = require('../random-headimg')
const randomNickname = require('../random-nickname')
const logger = require('../logger')
const random = require('../random')

const origin = 'https://h5.ele.me'

function request ({url} = {}) {
  let user_id

  try {
    user_id = url.match(/\/share\/user_id\/(.*?)\/avatar_hash\//)[1]
  } catch (e) {
    return '饿了么年终奖红包 链接不正确'
  }

  // 这里让它慢慢执行，不用等待结束，先返回结果给客户端
  run()

  function run () {
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
        logger.info('助力结束')
        return
      }

      try {
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

        await request.post(wardUrl, wardParams, {
          headers: {
            'content-type': 'text/plain;charset=UTF-8'
          }
        })
        logger.info(JSON.stringify((await request.get(wardUrl, {params: wardParams})).data))
      } catch (e) {
        logger.error(e.message)
      }

      index++

      return lottery()
    })()
  }

  return `将使用 ${cookie.length} 个机器人为您助力饿了么年终奖红包\n请 1 分钟后访问红包链接查看效果\n（此类红包重复领取无效）`
}

module.exports = options => ({message: request(options)})
