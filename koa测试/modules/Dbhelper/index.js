
const { pool } = require('../../config');
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
                // throw err;
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
async function queryAsync(sql, params) {
    return await query(sql, params);
}

module.exports = {
    query,
    queryAsync
}
