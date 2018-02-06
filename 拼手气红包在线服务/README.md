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

### 开发环境

运行

```bash
npm run dev
```

### 生产环境

安装 pm2

```bash
npm i pm2 -g
```

运行

```bash
npm start
```

更新代码

```bash
npm run reload
```

查看日志、内存信息等，请参考 https://www.npmjs.com/package/pm2

