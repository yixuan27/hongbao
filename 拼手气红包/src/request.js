const axios = require('axios')
const querystring = require('querystring')
const cookie = require('./cookie')

const origin = 'https://h5.ele.me'

module.exports = async ({mobile, url}) => {
  let index = 0
  const query = querystring.parse(url)
  const request = axios.create({
    baseURL: origin,
    withCredentials: true,
    headers: {
      origin,
      referer: `${origin}/hongbao/`,
      'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; PRO 6 Build/MRA58K; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/53.0.2785.49 Mobile MQQBrowser/6.2 TBS/043221 Safari/537.36 V1_AND_SQ_7.0.0_676_YYB_D QQ/7.0.0.3135 NetType/WIFI WebP/0.3.0 Pixel/1080'
    },
    transformRequest: [(data, headers) => {
      headers['X-Shard'] = `eosid=${parseInt(query.sn, 16)}`
      return JSON.stringify(data)
    }]
  })

  return (async function lottery (phone) {
    const sns = cookie[index]
    if (!sns) {
      // 如果链接错了，传给饿了么的参数不对，但 index 会不断增加，数组越界
      throw new Error('饿了么红包链接不合法 或 请求饿了么服务器失败')
    }

    phone = phone || `138${String(Math.random() * 10).slice(-8)}`
    // 绑定手机号
    await request.put(`/restapi/v1/weixin/${sns.openid}/phone`, {
      sign: sns.eleme_key,
      phone
    })
    console.log('绑定手机号', phone)

    // 领红包
    const {data: {promotion_records = []}} = await request.post(`/restapi/marketing/promotion/weixin/${sns.openid}`, {
      device_id: '',
      group_sn: query.sn,
      hardware_id: '',
      method: 'phone',
      phone,
      platform: query.platform,
      sign: sns.eleme_key,
      track_id: '',
      unionid: 'fuck',
      weixin_avatar: '',
      weixin_username: ''
    })

    // 计算剩余第几个为最佳红包
    const number = query.lucky_number - promotion_records.length
    if (number <= 0) {
      const lucky = promotion_records.find(r => r.is_lucky)
      console.log('手气最佳红包已被领取', JSON.stringify(lucky))
      return lucky
    }

    console.log(`还要领 ${number} 个红包才是手气最佳`)
    index++
    // 如果这个是最佳红包，换成指定的手机号领取
    return lottery(number === 1 ? mobile : null)
  })()
}
