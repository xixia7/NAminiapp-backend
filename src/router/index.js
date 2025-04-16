const fs = require('fs')

const Router = require('koa-router')
const router = new Router()

// 同步方式，__dirname为当前目录
fs.readdirSync(__dirname).forEach(file => {
    console.log(file)
    if (file !== 'index.js') {
        let r = require('./' + file)
        // 注册
        router.use(r.routes())
    }
})

module.exports = router