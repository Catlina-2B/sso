'use strict'
const Koa = require('koa')
const koaBody = require('koa-body')
const api = require('./routes')
const jwtKoa = require('koa-jwt')
const regJWT = require('./common/regtoken')
const config = require('./config')
const cors = require('koa2-cors');

const app = new Koa()

app.use(regJWT())

app.use(koaBody())

app.use(cors())

app.use(jwtKoa({ secret: config.secret }).unless({ path: [/^\/login/, /.html$/] }))

app.use(require('koa-static')(__dirname + '/view/'))

// app.use(jwtKoa({ secret: config.secret }).unless({ path: [/^\/user/] }))

app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (ctx.method == 'OPTIONS') {
      ctx.body = 200;
    } else {
      await next();
    }
})

app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    await next()
})

app.on('error', (err) => {
  console.log('server error', err)
})

app.use(api.routes(), api.allowedMethods())


app.listen(8083, () => {
    console.log('app listen on http://localhost:8083')
})