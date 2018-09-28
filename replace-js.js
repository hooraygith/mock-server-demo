const fs = require('fs')
const Koa = require('koa')
const cors = require('@koa/cors')
const Router = require('koa-router')
const koaBody = require('koa-body')
const {promisify} = require('util')
const readFileAsync = promisify(fs.readFile)
const app = new Koa()
const router = new Router()

router
    .get('/*', async (ctx, next) => {
        const js = await readFileAsync('./new-js.js', {encoding: 'utf-8'})
        ctx.set('Content-Type', 'application/javascript')
        ctx.body = js

        await next()
    })

// 跨域
app.use(cors({
    credentials: true
}))
app.use(koaBody({multipart: true}))
app.use(router.routes())

app.listen(7777)
