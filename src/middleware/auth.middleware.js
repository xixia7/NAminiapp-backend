/**
 * 用户授权中间件
 */
 const jwt = require('jsonwebtoken')
 const { JWT_SECRET } = require('../config/config.default')
 const { tokenExpiredError, invalidToken, hasNoAdminPermission } = require('../constant/err.type')
 
 // 【认证】 验证是否登录
 const auth = async (ctx, next) => {
     console.log(89)
     const { authorization = '' } = ctx.request.header //以防并没有带token，所以给一个默认值''
     //去除掉postman里面的Bearer 前缀（Bearer后面有一个空格）
     const token = authorization.replace('Bearer ', '')
     //验证token，jwt.verify()
     try {
         //user中包含payload信息（id，user_name,is_admin）
         const user = jwt.verify(token, JWT_SECRET)
         ctx.state.user = user
     } catch (err) {
         switch (err.name) { // 错误标志信息见：https://www.npmjs.com/package/jsonwebtoken#errors--codes
             case 'TokenExpiredError': //过期
                 console.error('token已过期', err)
                 ctx.app.emit('error', tokenExpiredError, ctx)
                 return
             case 'JsonWebTokenError':
                 console.error('无效的token', err)
                 ctx.app.emit('error', invalidToken, ctx)
                 return
         }
     }
     await next()
 }
 
 // 【授权】 判断是否拥有管理员权限
 const hasAdminPermission = async (ctx, next) => {
     // 0不是管理员，1是管理员
     const { is_admin } = ctx.state.user
 
     if(!is_admin) { //不是管理员
         console.error('该用户没有管理员权限',ctx.state.user)
         ctx.app.emit('error',hasNoAdminPermission, ctx)
         return
     }
     // 有权限就放行
     await next()
 }
 
 module.exports = {
     auth,
     hasAdminPermission
 }