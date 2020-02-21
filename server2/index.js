'use strict'
const Koa = require('koa')
const koaBody = require('koa-body')
const router = require('koa-router')

const app = new Koa()

app.use(koaBody())

console.log(router)
// router.prefix('/')

app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    await next()
})

app.use(require('koa-static')(__dirname))

app.use((ctx) => {
    if(ctx.request.url === '/') {
        ctx.response.body = '访问成功了，请跳转至：http://localhost:8082/view/index.html'
    }
})



app.listen(8082, () => {
    console.log('app listen on http://localhost:8082')
})