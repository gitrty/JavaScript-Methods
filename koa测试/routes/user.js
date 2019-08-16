const router = require('koa-router')();   //直接调用引入的模块
const db = require('../modules/Dbhelper');


router.get('/api/:name', async (ctx, next) => {
    let name = ctx.params.name;
    ctx.response.body = {
        name: name
    }
})

// 获取所有的用户
router.post('/api/user', async (ctx, next) => {
    let select = `select * from user`;
    // 由于 js 是异步执行 , 所以 sql操作时 需要 await 进行等待 , 否则会导致数据无法返回前端
    await db.query(select, []).then(data => {
        ctx.response.body = data
    })
})

module.exports = router