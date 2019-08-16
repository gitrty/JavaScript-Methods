const express = require('express');
const jwt = require('jsonwebtoken');

let app = express();

app.listen("4000", () => {
    console.log('服务启动完毕');
});

let userObj = {
    name: 'abc',
    age: '20'
}

global.keys = 'toyo';
// 创建token
// 参数( 需要进行token编码的对象 , 一个全局的签名 , {expiresIn:"存在时间(默认单位为秒)"} )
let token = jwt.sign(userObj, global.keys, { expiresIn: '1h' });
console.info(token);
// 解析token
// 参数( 需要解析的token , 与编码时对应的签名 ,(错误,成功时返回的对象)=>{} )
jwt.verify(token, global.keys, (err, tokenObj) => {
    if (err) {
        console.info('验证失败');
        return;
    }
    console.info(tokenObj)
})
