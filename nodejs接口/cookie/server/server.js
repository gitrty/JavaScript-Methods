const express = require('express');
// 引入模块  => 获取浏览器cookie  系统自带 发送cookie 和 清除浏览器cookie,但获取需要下载插件
const cookieParser = require('cookie-parser');

let app = express();
// 注册 获取cookie组件
app.use(cookieParser());

app.listen(8081, () => {
    console.info('服务启动完毕');
})
// 给浏览器发送一个cookie
app.use('/api/sendcookie', (request, response, next) => {
    response.setHeader("Content-Type", "text/html;charset=utf-8");   //防止中文乱码
    response.cookie('uname', 'abc123', {
        expires: new Date(Date.now() + (1000 * 60 * 20))
    });
    response.end('已发送cookie到浏览器');
})



// 清除浏览器端指定cookie
app.use('/api/clearcookie', (request, response, next) => {
    response.setHeader("Content-Type", "text/html;charset=utf-8");
    response.clearCookie('uname');
    response.end('删除了cookie');
})

// 获取浏览器端所有cookie  =>  需要 下载 注册 cookie-parser 模块
app.use('/api/getcookie', (request, response, next) => {
    response.setHeader("Content-Type", "text/html;charset=utf-8");
    let everycookie = request.cookies;
    console.info(everycookie);
    response.end('已获取cookie');
})