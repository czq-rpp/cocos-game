/*
 * @Author: zaccheus 
 * @Date: 2018-07-09 09:58:58 
 * @Last Modified by: zaccheus
 * @Last Modified time: 2018-07-10 13:48:39
 */

cc.Class({
    extends: cc.Component,

    //静态变量或静态方法可以在原型对象的 statics 中声明：
    statics: {
        handlers:{},
        // 封装的事件监听，传入一个事件名、传入一个回调函数
        // 即往handers这个对象里面塞东西：1、属性名：对应——事件名；2、属性：对应——函数包裹的运行回调函数
        addHandler(event, fn) {
            var handler = function (data) {
                fn(data);
            };
            this.handlers[event] = handler; 
        }
    }
});