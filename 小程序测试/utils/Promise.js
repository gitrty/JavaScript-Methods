// get请求 
let get = url => new Promise((resolve, reject) => {
  wx.request({
    url,
    method: get,
    success(res) {
      resolve(res)
      // console.log(res)
    },
    fail(err) {
      console.log(err)
      reject(err)
    }
  })
})

// 获取用户地址
function wxPromisify(fn) {
  return function(obj) {
    obj = obj || {}
    return new Promise(function(resolve, reject) {
      obj.success = function(res) {
        resolve(res)
      }

      obj.fail = function(res) {
        wx.hideLoading()
        reject(res)
      }

      fn(obj)
    })
  }
}

module.exports = {
  get,
  wxPromisify
}