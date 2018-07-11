/*
 * @Author: zaccheus 
 * @Date: 2018-07-09 09:56:26 
 * @Last Modified by: zaccheus
 * @Last Modified time: 2018-07-09 10:09:47
 */

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    initHandlers() {
        cc.vv.net.addHandler("login_result", function(data){
            console.log(data)
        })
    }
});
