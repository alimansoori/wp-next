const path = require('path')

const {withFrameworkConfig} = require("./framework/common/config")

module.exports = withFrameworkConfig({
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    env: {
        BASE_URL: process.env.BASE_URL
    },
    framework: {
        name: "wp-graphql"
    },
    i18n: {
        locales: ["en-US", "ir"],
        defaultLocale: "en-US"
    }
})

console.log("module.export", JSON.stringify(module.exports, null, 2))