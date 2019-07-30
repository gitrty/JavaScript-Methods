const http = require('http');
const url = require('url');   // 引入 url 模块

http.createServer((req, res) => {
    // 声明返回的编码, 防止返回值为乱码
    res.setHeader('Content-Type', 'application/json;charset=utf-8');
    // 判断如果发送的为 ico 图标 或 参数为空时 , 则 return
    if (req.url == '/favicon.ico' || req.url == '') {
        return;
    }
    // parse 方法 : 将一个url解析为一个对象 ,      
    // query 为url解析后 的 参数部分 (默认是字符串)    => ?xxx=xx&xxx=xxx
    // parse 方法 第二个参数为true时,将 query 转换为键值对形式的对象  =>  {xxx:xx,xxx:xxx}
    let paramsObj = url.parse(req.url, true).query;
    let result = { msg: '登录失败', status: -1 };
    if (paramsObj.uname == 'abc123' && paramsObj.upwd == '123') {
        result.msg = '登录成功';
        result.status = 1;
    }
    
    res.end(JSON.stringify(result));
    // 设置服务端口 , 并监听服务
}).listen(8082, () => {
    console.info('服务器启动完毕');
})
