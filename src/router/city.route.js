const Router = require('koa-router')
const { getCityNaInfo } = require('../controller/city.controller')

const router = new Router({ prefix: '/city' })

// 注册接口
router.get('/naInfo', getCityNaInfo)



module.exports = router