const Koa = require('koa')
const cors = require('@koa/cors')
const Router = require('koa-router')
const koaBody = require('koa-body')
const app = new Koa()
const router = new Router()

let timer = 0

router
    .get('/search/', (ctx, next) => {
        const list = Array(20).fill(0).map(item => ({
            name: '姓名' + parseInt(Math.random() * 100),
            id: parseInt(Math.random() * 1000000000)
        }))
        ctx.body = {
            "msg": "",
            "errormsg": "",
            data: {
                objects: list,
                total_count: 50,
                limit: 20,
                p: 1
            },
            "resultcode": 200,
            "result": true
        }

    })
    .get('/op/api/prize_receive/', (ctx, next) => {
        ctx.body = {
            "msg": "",
            "errormsg": "wwwww!",
            "resultcode": 200,
            "result": true
        }
    })
    .post('/upload', (ctx, next) => {



        const file = ctx.request.body.files.key

        console.log('received： %s -> %s', file.name);

        ctx.body = {
            "msg": "",
            "errormsg": "",
            "resultcode": 200,
            "result": true
        }

        next()

    })


// 跨域
app.use(cors())

app.use(koaBody({multipart: true}))

app.use(router.routes())


app.listen(7777)
