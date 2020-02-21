let router = require('koa-router')()
let koaJwt = require('jsonwebtoken')
let config = require('../config')

router.prefix('/')
router.get('/', async(ctx, next) => {
    ctx.body = '登录服务器创建成功'
    next()
})

router.post('/login', async (ctx, next) => {
    const req = ctx.request.body
    if(!req.name || !req.password) {
        ctx.response.status = 404
        ctx.response.body = '账户或密码不能为空'
        return
    }
    const data = {
        name: req.name,
        password: req.password
    }
    if(data.name == config.admin.name && data.password == config.admin.password) {
        
        const token = koaJwt.sign(data, config.secret)
        ctx.response.status = 200
        ctx.response.body = JSON.stringify({
            token,
            message: '登录成功',
            user: {
                name: data.name,
                password: data.password
            }
        })
        return
    }
    
    next()
})

router.get('/user', async(ctx) => {
    let data = ctx.state
    console.log( '命名空间内容为', ctx.state)
    if(data.user.name == config.admin.name && data.user.password == config.admin.password) {
        const token = koaJwt.sign(data, config.secret)
        ctx.response.status = 200
        ctx.response.body = JSON.stringify({
            message: '用户' + data.user.name + '登录成功',
            token,
            user: {
                name: data.user.name,
                password: data.user.password
            }
        })
        return
    } else {
        ctx.response.status = 403
        ctx.response.body = JSON.stringify({
            err: '无权限获取信息'
        })
        return
    }
})

module.exports = router