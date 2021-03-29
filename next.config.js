const path = require('path')

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  env: {
    BASE_URL: process.env.BASE_URL
  }
}