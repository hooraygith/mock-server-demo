const fs = require('fs')
const Koa = require('koa')
const cors = require('@koa/cors')
const Router = require('koa-router')
const koaBody = require('koa-body')
const app = new Koa()
const router = new Router()

var proxy = require('http-proxy').createProxyServer()



function getFile() {
    return new Promise((resolve, reject) => {
        fs.readFile('./new-js.js', 'utf-8', async (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

function request(options) {
    return new Promise((resolve, reject) => {
        http.request(options, function(response) {
            let str = ''
            response.on('data', chunk => {
                str += chunk
            })
            response.on('end', function () {
                resolve(str)
            })
        }).on('error', function(e) {
            reject(e)
        })
    })
}

async function proxy(ctx, next) {

    var cReq = ctx.request
    var cRes = ctx.response

    var options = {
        hostname : u.hostname,
        port     : u.port || 80,
        path     : u.path,
        method     : cReq.method,
        headers     : cReq.headers
    }

    const data = await request(options)

    ctx.body = data.body
    ctx.header = data.header

    await next()
}



router
    .get('/*', proxy)
    .get('/search', async (ctx, next) => {
        const js = await getFile()
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
