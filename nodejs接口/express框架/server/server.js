const express = require('express');
const qs = require('querystring');

let server = express();

// use 同时支持 get和post两种请求方式

let useList = []  //模拟数据库

// 使用 地址+/reg 访问 
server.use('/reg', (request, response, next) => {
    let str = '';
    request.on("data", data => {
        str += data.toString();
    })
    request.on("end", () => {
        let userObj = qs.parse(str);    //将接受到的用户名密码转换为对象形式
        //比较用户名是否存在
        let result = useList.some(el => el.uname == userObj.uname)
        let resultObj = {
            msg: '注册失败',
            status: -1
        }
        if (!result) {
            resultObj.msg = '注册成功';
            result.status = 1;
            useList.push(userObj);
        }
        response.json(resultObj);   //json() 为 express 的 封装的 end() 方法 , 表示返回前端的值
    })
})

server.post('/login', (request, response, next) => {
    let str = '';
    request.on("data", data => {
        str += data.toString();
    });
    request.on("end", () => {
        let userObj = qs.parse(str);    //将接受到的用户名密码转换为对象形式
        //比较用户名是否存在
        let result = useList.some(el => el.uname == userObj.uname && el.upwd == userObj.upwd)
        let resultObj = {
            msg: '登录失败',
            status: -1
        }
        if (!result) {
            resultObj.msg = '登录成功';
            result.status = 1;
            useList.push(userObj);
        }
        response.json(resultObj);
    })
})

server.listen(8083, () => {
    console.info('服务器启动完毕');
})