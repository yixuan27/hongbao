module.exports = options => ({
  entry: './src/index.js',
  staticFolder: 'public',
  html: {
    template: './src/index.html'
  },
  env: {
    API_URL: options.mode === 'production' ? 'http://101.132.113.122:3007' : 'http://localhost:3007'
  }
})
