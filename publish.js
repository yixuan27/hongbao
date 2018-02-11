const gulp = require('gulp')
const ossSync = require('gulp-oss-sync')
const axios = require('axios')

gulp.task('server', async () => {
  const {data} = await axios({
    method: 'POST',
    url: 'http://101.132.113.122:3007/publish',
    data: JSON.stringify({
      key: process.env.ELEME_PUBLISH_KEY
    })
  })
  console.log(data)
})

gulp.task('client', ['server'], () => gulp.src('public/**/*').pipe(ossSync({
  connect: {
    region: 'oss-cn-hongkong',
    accessKeyId: process.env.ALIOSS_ACCESS_KEY,
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
      'Cache-Control': 'no-cache'
    }
  }
})))

gulp.task('default', ['client'])
