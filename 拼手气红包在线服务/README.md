# 拼手气红包在线服务

http://www.elemhb.top/

## 开发与部署

分别安装两个目录的依赖

```bash
# cd 拼手气红包在线服务
npm i
# cd 拼手气红包
# npm i
```

开发环境运行

```bash
npm run dev
```

生产环境先安装 pm2

```bash
npm i pm2 -g
```

生产环境运行

```bash
npm start
```

生产环境更新代码后

```bash
npm run reload
```

