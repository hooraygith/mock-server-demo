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
    .get('/testajax', (ctx, next) => {
        ctx.body = {
            "msg": "dd",
            "errormsg": "wwwww!",
            "resultcode": 200,
            "result": true
        }
    })
    .post('/upload', async (ctx, next) => {


        const files = ctx.request.body.files


        console.log('received： %s -> %s', Object.keys(files));


        await sleep(2000)



        ctx.body = {
            "msg": "",
            "errormsg": "",
            "resultcode": 2002,
            "result": true,
            data: {
                url: 'https://img.hrloo.com/uc/avatar/sys/1_avatar_middle.png'
            }
        }

        await next()


        function sleep(time) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve()
                }, time)
            })
        }
    })


// 跨域
app.use(cors({
    credentials: true
}))

app.use(koaBody({multipart: true}))

app.use(router.routes())


app.listen(7777)
