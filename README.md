# eleme

[![GPL-3.0](https://img.shields.io/badge/license-GPL--3.0-blue.svg)](LICENSE)
[![Sync Gitee](https://img.shields.io/badge/sync-gitee-green.svg)](https://gitee.com/game-helper/eleme)
[![Build Status](https://travis-ci.org/game-helper/eleme.svg?branch=master)](https://travis-ci.org/game-helper/eleme)

一键领取饿了么手气最佳红包 http://www.elemhb.top/

> 仅供学习交流之用，请勿用于非法用途，否则产生的一切后果自行承担

## 交流群

<table>
  <tr>
    <th>微信群</th>
    <th>QQ 群</th>
  </tr>
  <tr></tr>
  <tr>
    <td align="center" width="300"><img src="public/wx-group-20170301.png"></td>
    <td align="center" width="300"><a href="https://shang.qq.com/wpa/qunwpa?idkey=ce7ff4d1b5050c3bafff8f16c3cae4b1eec37916053865b86527347d680e03ec">246080018</a></td>
  </tr>
</table>

## 开发与部署

建议安装 Node.js 9.x 以上

安装依赖

```bash
npm i
```

开发环境运行

```bash
npm run dev
```

生产环境首次运行

```bash
npm start
```

生产环境代码更新

```bash
npm run reload
```

> 查看日志、内存等更多信息，请参考 https://www.npmjs.com/package/pm2

<details>
  <summary>（非必须）本站使用 Travis CI，当代码 push 到 master 时自动更新网站</summary>
  <br>
  
  客户端上传到阿里云 OSS，服务端通过 POST /publish 触发更新
  
  需提前在开发机、CI、服务器上设置以下环境变量
  
  ```bash
  ELEME_PUBLISH_KEY = 部署密钥 可以是任意的约定值 防止他人刷接口频繁部署
  ALIOSS_ACCESS_KEY_ID = 阿里云 OSS ID
  ALIOSS_ACCESS_KEY_SECRET = 阿里云 OSS SECRET
  ```
  
  给脚本权限
  
  ```bash
  chmod 777 publish.sh
  ```
</details>

## 捐赠

[如果我们的项目对您有帮助，欢迎捐赠](https://github.com/game-helper/donate)
