import express from "express";
import cookieSession from "cookie-session";
import bodyParser from 'body-parser';

let app = express();

// 注册session中间件
app.use(cookieSession({
    keys: ['abc'],     //必须填写参数 keys , 为一个数组 ,内容任意 
    maxAge: 1000 * 60 * 20        // 若20分钟 , 没有访问服务器 , 则服务器与浏览器断开session
}));
// 注册中间件
app.use(bodyParser({
    extended: false
}));
// 开启服务器
app.listen(8088, () => {
    console.info('服务器启动完毕');
})
// 拦截器 => 设置编码
app.use('/api', (request, response, next) => {
    response.setHeader("Content-Type", "application/json;charset=utf-8");
    // next()  =>  使用后才可以访问下一级路径
    next();
})
// 模拟数据库
let userList = [
    { uname: 'abc123', upwd: 123 },
    { uname: 'abc111', upwd: 111 }
]
// 登录接口验证
app.post('/api/login', (request, response, next) => {
    let userObj = request.body;
    let flag = userList.some(el => {
        return el.uname == userObj.uname && el.upwd == userObj.upwd;
    })
    if (flag) {
        // 如果登录验证成功 , 则将登录用户信息保存到后台 session 中
        request.session['userInfo'] = userObj;
        response.json({
            msg: '登录成功',
            status: 1
        });
    } else {
        response.json({
            msg: '用户名或密码错误',
            status: -1
        });
    }
})
// 验证是否已登录
app.post('/api/index', (request, response, next) => {
    if (request.session['userInfo'] == undefined) {
        response.json({
            msg: '未登录',
            status: -1
        })
    } else {
        let username = request.session["userInfo"].uname;
        response.json({
            msg: '已登录',
            status: 1,
            uname: username,
            // data: request.session["userInfo"]
        })
    }
})