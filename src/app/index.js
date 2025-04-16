// 将app.js中和业务相关的移动到这儿
const Koa = require('koa')

// 中间件-解析body
const koaBody = require('koa-body')
const errHandler = require('./errHandler')

// 路由
const router = require('../router')

const app = new Koa()

const cron = require('node-cron');
const { crawlerInsertCityInfo } = require('../controller/city.controller')
const { crawlerInsertFactoryInfo } = require('../controller/factory.controller')

// 定时任务： 每天上午十点执行一次
cron.schedule('0 10 * * *', () => {
  crawlerInsertCityInfo() 
  crawlerInsertFactoryInfo() 
})

crawlerInsertCityInfo() 
crawlerInsertFactoryInfo() 

 
app.use(koaBody()) //注册这个中间件在路由之前

app.use(router.routes())
// app.use(userRouter.routes())
// app.use(goodsRouter.routes())

// 针对不支持的请求方式（如postman中的lock、link等）返回501 
app.use(router.allowedMethods())  

//进行统一的错误处理，on监听
app.on('error', errHandler)

module.exports = app