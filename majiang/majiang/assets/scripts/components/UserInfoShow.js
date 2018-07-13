/*
 * @Author: zaccheus 
 * @Date: 2018-07-12 10:10:18 
 * @Last Modified by: zaccheus
 * @Last Modified time: 2018-07-12 10:31:05
 */

cc.Class({
    extends: cc.Component,

    properties: {
        _userinfo:null,
    },

    onLoad () {
        if(cc.vv == null){
            return;
        }
        
        this._userinfo = cc.find("Canvas/userinfo");
        this._userinfo.active = false;
        // 给这个节点添加自定义点击事件
        cc.vv.utils.addClickEvent(this._userinfo,this.node,"UserInfoShow","onClicked");
        
        cc.vv.userinfoShow = this;
    },

    // 这个节点点击事件
    onClicked:function(){
        this._userinfo.active = false;
    }
});
