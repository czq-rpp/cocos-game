/*
 * @Author: zaccheus 
 * @Date: 2018-07-10 15:42:56 
 * @Last Modified by: zaccheus
 * @Last Modified time: 2018-07-10 15:51:40
 */

cc.Class({
    extends: cc.Component,

    properties: {
        target:cc.Node,
        _isShow:false,
        lblContent:cc.Label,
    },

    onLoad () {
        if(cc.vv == null){
            return null;
        }
        
        cc.vv.wc = this;
        this.node.active = this._isShow;
    },

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
    
    hide:function(){
        this._isShow = false;
        if(this.node){
            this.node.active = this._isShow;   
        }
    },

    update (dt) {
        this.target.rotation = this.target.rotation - dt*45;
    },
});
