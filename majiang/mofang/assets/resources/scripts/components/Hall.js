/*
 * @Author: zaccheus 
 * @Date: 2018-07-11 16:53:42 
 * @Last Modified by: zaccheus
 * @Last Modified time: 2018-07-11 17:17:06
 */

cc.Class({
    extends: cc.Component,

    properties: {
        lblName:cc.Label,
        // lblMoney:cc.Label,
        lblGems:cc.Label,
        lblID:cc.Label,
    },

    onLoad () {
        if(!cc.sys.isNative && cc.sys.isMobile){
            var cvs = this.node.getComponent(cc.Canvas);
            cvs.fitHeight = true;
            cvs.fitWidth = true;
        }
        // 阻止未打开loading场景的情况下先打开hall场景
        if(!cc.vv){
            cc.director.loadScene("loading");
            return;
        }
        // 初始化游客信息
        this.initLabels();
    },


    initLabels:function(){
        this.lblName.string = cc.vv.userMgr.userName;
        // this.lblMoney.string = cc.vv.userMgr.coins;
        this.lblGems.string = cc.vv.userMgr.gems;
        this.lblID.string = "ID:" + cc.vv.userMgr.userId;
    },

    update (dt) {},
});
