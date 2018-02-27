const gulp = require('gulp')
const ossSync = require('gulp-oss-sync')
const axios = require('axios')

// 触发服务端部署脚本
gulp.task('server', async () => {
  const {data: {message}} = await axios({
    method: 'POST',
    url: 'http://101.132.113.122:3007/publish',
    data: process.env.ELEME_PUBLISH_KEY
  })
  console.log(message)
})

// 静态资源部署到阿里云 OSS
gulp.task('client', () => gulp.src('client/dist/**/*').pipe(ossSync({
  connect: {
    region: 'oss-cn-hongkong',
    accessKeyId: process.env.ALIOSS_ACCESS_KEY_ID,
    accessKeySecret: process.env.ALIOSS_ACCESS_KEY_SECRET,
    bucket: 'elmhb'
  },
  setting: {
    dir: '',
    noClean: false,
    force: true,
    quiet: true
  },
  controls: {
    headers: {
      'Cache-Control': 'max-age=600'
    }
  }
})))

gulp.task('default', ['server', 'client'])
