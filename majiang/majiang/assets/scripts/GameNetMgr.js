/*
 * @Author: zaccheus 
 * @Date: 2018-07-09 09:56:26 
 * @Last Modified by: zaccheus
 * @Last Modified time: 2018-07-12 08:55:50
 */

cc.Class({
    extends: cc.Component,

    properties: {
        roomId:null,
    },

    initHandlers() {
        cc.vv.net.addHandler("login_result", function(data){
            console.log(data)
        })
    }
});
