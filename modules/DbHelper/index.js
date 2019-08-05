// 下载并引入 mysql 模块
import mysql from "mysql";
// 配置连接
let pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: '0805mysql',
    port: 3306
})

/**
 * 
 * @param {String} sql 
 * @param {Array} params 
 */
function query(sql, params) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err) {
                console.info('连接失败');
                reject(err);
                throw err;
            }
            conn.query(sql, params, (err, result, fields) => {
                if (err) {
                    reject(err);
                    throw err;
                }
                resolve(result);
                conn.release();        //释放连接
            })
        })
    })
}

/**
 * 
 * @param {String} sql 
 * @param {Array} params 
 */
async function queryAsync(sql, params){
    return await query(sql, params);
}

module.exports = {
    query,
    queryAsync
}


//调用方法 1 :
// import db from "../modules/DbHelper";
// router.use('/reg', (req, res, next) => {
//     //参数
//     let sql = "SELECT * FROM userinfo WHERE uname=? AND upwd=?";
//     let params = ['abc12', '456'];
//     //进行查询
//     let result = db.queryAsync(sql, params);
//     result.then(data => { console.info(data) });
//     res.end('admin-reg接口');
// })


//调用方法 2 :
// import db from "../modules/DbHelper";
// router.use('/reg', (req, res, next) => {
//     //参数
//     let sql = "SELECT * FROM userinfo WHERE uname=? AND upwd=?";
//     let params = ['abc1', '123'];
//     //进行查询
//     db.query(sql, params).then(data => { console.info(data) });
//     res.end('router-reg接口');
// })