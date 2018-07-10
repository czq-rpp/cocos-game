/*
 * @Author: zaccheus 
 * @Date: 2018-07-10 10:26:32 
 * @Last Modified by: zaccheus
 * @Last Modified time: 2018-07-10 10:32:12
 */

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad () {
        if(!cc.sys.isNative && cc.sys.isMobile){
            var cvs = this.node.getComponent(cc.Canvas);
            cvs.fitHeight = true;
            cvs.fitWidth = true;
        }
        // 阻止未打开loading场景的情况下先打开登录场景
        if(!cc.vv){
            cc.director.loadScene("loading");
            return;
        }
    },

    start () {

    },

    // update (dt) {},
});
