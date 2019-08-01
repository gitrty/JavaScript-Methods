const express = require('express');
// 引入中间件 bodyParser (插件) , 可直接访问子路径 , 不需要 next
const bodyParser = require('body-parser');

let server = express();

// 注册中间件
server.use(bodyParser({
    extended: false     //不开启body-parser 的拓展模式
}))
// 配置中间件使用表单体
server.use(bodyParser.urlencoded());   // 解析表单体

let userList = [];    // 模拟数据库
// 注册
server.post('/api/reg', (request, response, next) => {
    // ********************引入中间件后 request.body 为前端传来的参数 , 默认为对象类型********************
    let userObj = request.body;
    // console.info(userObj);
    let flag = userList.some(el => el.uname == userObj.uname)  //验证用户名是否存在
    let resultObj = {
        msg: "用户名已存在",
        status: -1
    }
    if (!flag) {
        resultObj.msg = "注册成功";
        resultObj.status = 1;
        userList.push(userObj);
    }
    response.json(resultObj);
})
// 登录
server.post('/api/login', (request, response, next) => {
    let userObj = request.body;
    // 登录验证
    let flag = userList.some(el => el.uname == userObj.uname && el.upwd == userObj.upwd);
    let resultObj = {
        msg: '登录失败',
        status: -1
    }
    let rtObj = Object.assign({}, resultObj);  //浅克隆 => 返回前端的数据
    if (flag) {
        rtObj.msg = '登录成功';
        rtObj.status = 1;
        rtObj.uname = userObj.uname;   //增加字段
    }
    response.json(rtObj);
})

server.listen(8084, () => {
    console.info('服务器启动完毕');
})