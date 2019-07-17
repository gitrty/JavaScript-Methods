// **********************************************************************************
// 1. 利用伪死循环实现暂停效果 
/**
 * @name 暂停效果(浏览器假死状态)
 * @param {Number} ms 
 * @datetime 2019年7月8日14:45:18
 * @returns {null}
 */
// 调用方法 : sleep (ms)   参数为暂停的时间,单位毫秒
// 缺点 : 在执行完之前,页面会一直处于假死状态(即卡住) ( 不建议使用 )
let sleep = ms => {
    let start = (new Date()).getTime();
    while ((new Date()).valueOf() - start < ms) {
        continue;
    }
}

//************************************************************************************
// 2 . 解决ie7 及以下 document.getElementsByClassName() 失效的问题
/**
 * @name getElementsByClassName兼容写法
 * @param {String} cls 
 * @datetime 2019年7月8日14:45:18
 * @returns {Array}
 */
// 调用方法: className(<获取元素的class名>)   ->返回一个数组
let className = cls => {
    let clsArr = [];
    let eles = document.getElementsByTagName('*');
    for (let i = 0; i < eles.length; i++) {
        let tem = eles[i].className.split(" ");
        for (let k = 0; k < tem.length; k++) {
            if (tem[k] == cls) {
                clsArr.push(eles[i]);
                break;
            }
        }
    }
    return clsArr;
}

//************************************************************************************
// 3 . childNodes空节点删除  -> 解决 childNodes 获取到一个元素的子元素节点时,会将换行解析为空格节点的问题;
/**
 * @name childNodes优化(去除空项)
 * @param {String} id 
 * @datetime 2019年7月8日14:45:18
 * @returns {Array}
 */
// 调用方法 : childNode(<父元素id>)   -> 返回一个数组
let childNode = id => {
    let child = document.getElementById(id).childNodes;
    let childArr = [];
    for (let i = 0; i < child.length; i++) {
        if (child[i].nodeType == 1) {
            childArr.push(child[i]);
        }
    }
    return childArr;
}

//************************************************************************************
// 4 . insertAfter 方法封装( 将新节点插入某个节点的后面 )
/**
 * @name 将新节点插入某个节点后面
 * @param {DOM} parentNode 
 * @param {DOM} newNode 
 * @param {DOM} refNode 
 * @datetime 2019年7月8日14:45:18
 * @returns {null}
 */
// 调用方法 : insertAfter( <父元素节点> , <新创建的节点> , <被插入的元素节点> )
let insertAfter = (parentNode, newNode, refNode) => {
    var oNext = refNode.nextElementSibling || refNode.nextSibling;
    parentNode.insertBefore(newNode, oNext)
}

//************************************************************************************
// 5 . 滚动条兼容
/**
 * @name 滚动条兼容写法
 * @datetime 2019年7月8日14:45:18
 * @returns {Object}
 */
// 调用方法  myScroll().top  或  myScroll().left
function myScroll() {
    if (window.pageXOffset != undefined) {
        return {
            left: window.pageXOffset,
            top: window.pageYOffset
        }
    } else if (document.compatMode == "CSS1Compat") {
        return {
            left: document.documentElement.scrollLeft,
            top: document.documentElement.scrollTop,
        }
    }
    return {
        left: document.body.scrollLeft,
        top: document.body.scrollTop,
    }
}

//************************************************************************************
// 6 . 获取css样式值的兼容写法 (获取到的值有单位)
/**
 * @name 获取样式值
 * @param {DOM} el 
 * @param {String} attr 
 * @datetime 2019年7月8日14:45:18
 * @returns {String}  //返回需要获取属性的属性值
 */
// 调用方法 : getStyle(<节点>,<需要获取的css样式>)
let getStyle = (el, attr) => {
    // chrome等浏览器
    if (window.getComputedStyle) {
        return window.getComputedStyle(el, null)[attr];
    }
    // ie 678
    return el.currentStyle[attr];
}

//************************************************************************************
// 6.1动画函数1 => 需要配合以上封装的getStyle(el,attr)方法
/**
 * @name 匀速动画函数 
 * @param {DOM} el 
 * @param {String} attr 
 * @param {Number} target 
 * @param {Function} cb  回调函数
 * @datetime 2019年7月8日14:45:18
 * @returns {null}
 */
// 调用方法 : animate_banner(<节点>,<top或left>,<位移距离(相对最近的有定位的元素)>)
let animate_banner = (el, attr, target, cb) => {
    // 清除之前的定时器
    clearInterval(el.timer);
    // 步长 ( 默认10,可自定义 )
    let steps = target > parseInt(getStyle(el, attr)) ? 10 : -10;
    // 开启一个新的定时器
    el.timer = setInterval(() => {
        // 方向
        el.style[attr] = parseInt(getStyle(el, attr)) + steps + 'px';
        // 判断什么时候结束定时器
        if (Math.abs(target - parseInt(getStyle(el, attr))) <= Math.abs(steps)) {
            clearInterval(el.timer);
            el.style[attr] = target + 'px';
            // 执行完成后执行回调函数
            if (typeof (cb) == 'function') {  //判断是否有回调函数,有则执行
                cb()
            }
        }
    })
}

//************************************************************************************
// 6.2动画函数2 => 需要配合以上封装的getStyle(el,attr)方法
/**
 * @name 缓速动画函数 
 * @param {DOM} el 
 * @param {String} attr 
 * @param {Number} target 
 * @param {Function} cb   回调函数
 * @datetime 2019年7月8日14:45:18
 * @returns {null}
 */
// 调用方法 animate_ease(<节点>,<top或left>,<位移距离(相对最近的有定位的元素)>)
let animate_ease = (el, attr, target, cb) => {
    clearInterval(el.timer);
    el.timer = setInterval(() => {
        // 步长
        let steps = (target - parseInt(getStyle(el, attr))) / 10
        steps = steps > 0 ? Math.ceil(steps) : Math.floor(steps);
        // 新的位置 = 当前位置 + 步长
        el.style[attr] = parseInt(getStyle(el, attr)) + steps + 'px';
        // 判断执行完成后清除定时器
        if (target == parseInt(getStyle(el, attr))) {
            clearInterval(el.timer);
            // 执行完成后执行回调函数
            if (typeof (cb) == 'function') {  //判断是否有回调函数,有则执行
                cb();
            }
        }
        // 动画时间默认30ms ,可自定义
    }, 30)
}

//************************************************************************************
// 6.3 缓动画 兼容封装  => 需要配合以上封装的getStyle(el,attr)方法
/**
 * @name 缓动画--多属性变化
 * @param {DOM} el 
 * @param {Object} json 包含需要改变的 属性:属性值
 * @param {Function} callback 回调函数
 * @datetime 2019年7月9日10:32:36
 * @returns {null}
 */
// 调用方法 例: 
// animate_slow(oBox1,{
//     'left':100,
//     'top':50,
//     'opacity':0.5,
//     'width':100,
// },()=>{})
let animate_slow = (el, json, callback) => {
    // 清除之前的定时器
    clearInterval(el.timer);
    // 创建新的定时器
    el.timer = setInterval(() => {
        let flag = true;
        for (let attr in json) {
            // 当前值
            let current = 0;
            // 目标值
            let target = 0;
            if (attr == 'opacity') {
                current = getStyle(el, attr) * 100;
                target = json[attr] * 100;
            } else {
                current = parseInt(getStyle(el, attr));
                target = parseFloat(json[attr]);
            }
            // 步长 (目标值-当前值)/10  (默认除10,可自定义)
            let steps = (target - current) / 10;
            steps = steps > 0 ? Math.ceil(steps) : Math.floor(steps);
            // 新的位置 = 当前位置 + 步长
            if (attr == 'opacity') {
                el.style[attr] = (current + steps) / 100;
                el.style.filter = "alpha(opacity = " + (current + steps) + ")"
            } else if (attr == 'zIndex') {
                el.style.zIndex = target;
            } else {
                el.style[attr] = current + steps + 'px';
            }
            if (current != target) {
                flag = false;
            }
        }
        if (flag) {
            clearInterval(el.timer);
            if (typeof (callback) == 'function') {
                callback();
            }
        }
        // 默认30ms ,可自定义
    }, 30);
}

//************************************************************************************
// 7.1 ajax 带参数的get/post方式封装
// 调用方法 : ajax_get( type , url , data , cbVal=>{} )
// type:同步/异步(true/false)  url:接口地址  data:需要传递的参数(键值对)  回调函数:参数cbVal为后台返回的数据
/**
 * @name 创建XHR核心对象
 * @returns {Object}
 */
let createXHR = () => {
    if (window.XMLHttpRequest) {
        // 现代浏览器兼容
        return new XMLHttpRequest();
    }
    // IE兼容
    return new ActiveXObject('Microsoft.XMLHttp');
}
/**
 * @name 拼接参数 将键值对拼接为字符串参数
 * @param {obj} json 键值对
 * @returns {String}
 */
let getparams = json => {
    let str = '';
    for (let k of Object.keys(json)) {
        str += k + '=' + json[k] + '&';
    }
    str = str.slice(0, str.length - 1);
    return str;
}
// *********封装*********
/**
 * 
 * @param {boolean} type 
 * @param {String} url 
 * @param {Obj} data 键值对型数据
 * @param {Function} callback 回调函数参数为后台返回数据
 */
let ajax_get = (type, url, data, callback) => {
    let xhr = createXHR();
    xhr.open('get', url + '?' + getparams(data), type);
    xhr.send(null);
    // 当状态改变自动触发这个事件 ↓
    xhr.onreadystatechange = () => {
        if (xhr.status == 200 && xhr.readyState == 4) {
            if (typeof (callback == 'function')) {
                // 回调函数中的参数为后台的返回值
                callback(xhr.responseText);
            }
        }
    }
}
// post方式
let ajax_post = (type, url, data, callback) => {
    let xhr = createXHR();
    xhr.open('post', url, type);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(getparams(data));
    xhr.onreadystatechange = () => {
        if (xhr.status == 200 && xhr.readyState == 4) {
            if (callback) {
                callback(xhr.responseText);
            }
        }
    }
}

//************************************************************************************
// 7.2 模拟Jquery封装 ajax
/**
 * @name 模拟Jquery封装
 * @param {Obj} opts 
 */
// 调用方法 : ↓
// ajax({
//     url:'xxx'  // 必须
//     data: { },  // 参数  默认为空  非必须
//     type: "post",  // 请求方式  默认get  非必须
//     async: true,  // 同步/异步  默认异步  非必须 
//     dataType: 'json', // 回调参数类型  默认json  非必须 
//     success(cbVal) { // 成功后的回调函数  非必须 
//         console.log(cbVal);
//     },
//     error() {  // 状态不为200时的回调函数  非必须 
//         console.info('请求失败');
//     }
// })
let ajax = opts => {
    opts.type = opts.type == undefined ? 'get' : opts.type;   //默认get方式
    opts.async = opts.async == undefined ? 'true' : opts.async;   //默认异步
    opts.dataType = opts.dataType == undefined ? 'json' : opts.dataType;  // 默认使用json格式
    opts.data = opts.data == undefined ? {} : opts.data;

    let xhr = createXHR();
    // 判断请求方式 get/post
    if (opts.type == 'get') {
        xhr.open('get', opts.url + '?' + getparams(opts.data), opts.async);
        xhr.send(null);
    } else {
        xhr.open('post', opts.url, opts.async);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(getparams(opts.data));
    }
    // 判断同步/异步方式
    if (opts.async) {
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                getResult()
            }
        }
    } else {
        getResult();
    }
    // 处理回调数据
    let getResult = () => {
        if (xhr.status == 200) {
            let res;
            // 若回调参数为 json 类型,则将其进行JSON.parse转换
            if (opts.dataType == "json") {
                res = JSON.parse(xhr.responseText); //返回json数据
            } else {
                res = xhr.responseText; //返回纯text
            }
            opts.success(res);
        } else {
            opts.error();
        }
    }
}

//************************************************************************************
// 7.3 JSONP方式封装封装
/**
 * @name JSONP方式封装
 * @param {String} url 
 * @param {Object} data 
 * @param {String} jsonpCallback 
 * @param {Function} success 
 */
// 调用方法 :  jsonp(url, parama,jsonpCallback,data=>{console.info(data)})  
// let url = 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su';
// let parama = {
//     wd:'nihao'
// };
// jsonpCallback = 'cb';// 回调函数的名称  通常为cb或callback
let getparams2 = json => {
    let str = '';
    for (let k of Object.keys(json)) {
        str += k + '=' + json[k] + '&';
    }
    // str = str.slice(0, str.length - 1);
    return str;
}
let jsonp = (url, data, jsonpCallback, success) => {
    //1.随机生成一个函数名称
    let fnName = "toyo_" + Date.now();
    //2.把随机的函数名绑定到window,并绑定函数
    window[fnName] = success;
    //3.创建一个script;
    let oScript = document.createElement("script");
    //4.1给script绑定 src的路径
    url = url + "?" + getparams2(data) + jsonpCallback + "=" + fnName;
    oScript.setAttribute('src', url);
    //4.2 让scriot去加载数据(绑定到body上)
    document.body.appendChild(oScript);
    // 凡是带有 src的标签,都会有一个 onload事件!!!
    oScript.addEventListener("load", function () {
        //5.数据加载完成后,销毁script
        this.remove();
        //6.消除随机函数
        delete (window[fnName]);
    })
}
