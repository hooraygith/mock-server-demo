const Koa = require('koa')
const cors = require('@koa/cors')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()

let timer = 0

router
    .get('/v1/ucenter/wechat_qrcode/', (ctx, next) => {
        timer += 1
        if (timer > 2) {
            ctx.body = {
                "msg": "",
                "errormsg": "账号已绑定过微信!",
                "resultcode": 11406,
                "data": {},
                "result": false
            }
        } else {
            ctx.body = {
                "data": {
                    "url": "https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=gQFm7zwAAAAAAAAAAS5odHRwO"
                },
                "errormsg": "",
                "msg": "",
                "result": true,
                "resultcode": 200
            }
        }

    })
    .post('/op/api/prize_receive/', (ctx, next) => {
        ctx.body = {
            "msg": "",
            "errormsg": "wwwww!",
            "resultcode": 200,
            "data": {is_success: true},
            "result": true
        }
    })


// 跨域
app.use(cors());

app.use(router.routes())

app.listen(7777)
