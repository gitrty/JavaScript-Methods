const koa2 = require('koa2');
const bodyParser = require('koa-bodyparser');
const cors = require('koa-cors')
const user = require('./routes/user');

let app = new koa2();

app.use(bodyParser());
app.use(cors());

app.listen(5000, () => {
    console.info('服务启动完毕');
})

// 使用路由
app.use(user.routes())