const Router = require('koa-router')
const { getFactoryNaInfo } = require('../controller/factory.controller')

const router = new Router({ prefix: '/factory' })

// 注册接口
router.get('/naInfo', getFactoryNaInfo)



module.exports = router