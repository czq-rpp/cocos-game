/*
 * @Author: zaccheus 
 * @Date: 2018-07-10 10:26:32 
 * @Last Modified by: zaccheus
 * @Last Modified time: 2018-07-10 14:54:06
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
        // console.log(cc.vv.http.url === cc.vv.http.master_url);
        //添加事件监听push_need_create_role，一个事件名、一个回调函数
        cc.vv.net.addHandler('push_need_create_role',function(){
            console.log("onLoad:push_need_create_role");
            cc.director.loadScene("createrole");
        });
        // 播放登录页面的背景音乐
        cc.vv.audioMgr.playBGM("bgMain.mp3");
        // 非原生平台或者windows平台上面增加游客登录
        if(!cc.sys.isNative || cc.sys.os == cc.sys.OS_WINDOWS){
            cc.find("Canvas/btn_yk").active = true;    
        }
    },

    start () {
        // 如果在本地存储中有登录信息
        var account =  cc.sys.localStorage.getItem("wx_account");
        var sign = cc.sys.localStorage.getItem("wx_sign");
        if(account != null && sign != null){
            var ret = {
                errcode:0,
                account:account,
                sign:sign
            }
            cc.vv.userMgr.onAuth(ret);
        }   
    },

    // 游客登录按钮点击事件
    onBtnQuickStartClicked:function(){
        cc.vv.userMgr.guestAuth();
    },

    // update (dt) {},
});
