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
let animate_banner = (el, attr, target,cb) => {
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
            if(typeof(cb)=='function'){  //判断是否有回调函数,有则执行
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
let animate_ease = (el, attr, target,cb) => {
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
            if(typeof(cb)=='function'){  //判断是否有回调函数,有则执行
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