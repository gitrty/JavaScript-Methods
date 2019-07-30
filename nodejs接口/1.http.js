//1. 移入http模块
const http = require('http');
// 2 . 创建一个服务
let server = http.createServer((request, response) => {
    response.setHeader('Content-Type', "application/json;charset=utf-8");
    // 判断如果发送的是ico图标,则return
    if (request.url == "/favicon.ico" || request.url == '') {
        return;
    }
    
    // get方式 参数 需要转换对对象的 键值对 形式
    //?uname='abc123'&upwd="123"
    let arr = request.url.split('?')[1].split("&");
    console.info(arr);
    
    let obj = {};
    arr.forEach(el => {
        let temArr = el.split('=');
        obj[temArr[0]] = temArr[1];
    })
    let result = {
        msg: "登录失败",
        status: -1
    }
    console.info(obj);
    
    if (obj.uname == "abc123" && obj.upwd == "123") {
        result.msg = "登录成功";
        result.status = 1;
    }
    // http 只支持字符串,不能输出 json 格式的数据
    response.write(JSON.stringify(result));
    response.end();
})
// 3 . 设置服务器端口 , listen为监听
server.listen(8082, () => {
    console.info('服务器启动完毕');
})

