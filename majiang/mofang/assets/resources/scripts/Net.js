/*
 * @Author: zaccheus 
 * @Date: 2018-07-09 09:58:58 
 * @Last Modified by: zaccheus
 * @Last Modified time: 2018-07-09 10:20:20
 */

cc.Class({
    extends: cc.Component,

    //静态变量或静态方法可以在原型对象的 statics 中声明：
    statics: {
        handlers:{},
        addHandler(event, fn) {
            var handler = function (data) {
                fn(data);
            };
            this.handlers[event] = handler; 
        }
    }
});