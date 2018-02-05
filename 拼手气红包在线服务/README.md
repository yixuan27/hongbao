# 拼手气红包在线服务

http://eleme.gamehelper.ga/

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

生产环境运行

```bash
npm start
```

生产环境不停机更新

```bash
npm run reload
```

nginx 核心配置

```nginx
server
{
  listen 80;
  server_name eleme.gamehelper.ga;
  index index.html;
  root /www/wwwroot/eleme.gamehelper.ga;

  location / {
    proxy_pass http://127.0.0.1:3007;
  }

  access_log  /www/wwwlogs/eleme.gamehelper.ga.log;
}
```
