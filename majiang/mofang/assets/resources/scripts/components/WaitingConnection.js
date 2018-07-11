/*
 * @Author: zaccheus 
 * @Date: 2018-07-10 15:42:56 
 * @Last Modified by: zaccheus
 * @Last Modified time: 2018-07-11 08:56:47
 */

cc.Class({
    extends: cc.Component,

    properties: {
        target:cc.Node,// loading图
        _isShow:false,// 预制资源是否显示
        lblContent:cc.Label,// 弹窗显示的文字
    },

    onLoad () {
        if(cc.vv == null){
            return null;
        }
        // 加载资源的时候把这个模块赋值给cc.vv这个大对象的wc属性，以后就可以在别的模块中用cc.vv.wc来访问这个模块
        cc.vv.wc = this;
        this.node.active = this._isShow;
    },

    // 显示弹窗预制资源
    show:function(content){
        this._isShow = true;
        if(this.node){
            this.node.active = this._isShow;   
        }
        if(this.lblContent){
            if(content == null){
                content = "";
            }
            this.lblContent.string = content;
        }
    },
    
    // 隐藏弹窗预制资源
    hide:function(){
        this._isShow = false;
        if(this.node){
            this.node.active = this._isShow;   
        }
    },

    update (dt) {
        // 这个使loading图一直旋转
        this.target.rotation = this.target.rotation - dt*45;
    },
});
