const mysql = require('mysql');
// 配置连接
let pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'wangzhe',
    port: 3306
})

module.exports = {
    pool
}