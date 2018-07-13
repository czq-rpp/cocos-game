/*
 * @Author: zaccheus 
 * @Date: 2018-07-12 15:32:16 
 * @Last Modified by: zaccheus
 * @Last Modified time: 2018-07-12 15:49:56
 */

// 这里是封装的普通弹窗组件
cc.Class({
    extends: cc.Component,

    properties: {
        _alert:null,
        _btnOK:null,
        _btnCancel:null,
        _title:null,
        _content:null,
        _onok:null,
    },

    onLoad () {
        if(cc.vv == null){
            return;
        }
        // 找到这个弹窗组件节点的父亲
        this._alert = cc.find("Canvas/alert");
        // 弹窗子节点title的label组件
        this._title = cc.find("Canvas/alert/title").getComponent(cc.Label);
        // 弹窗子节点content的label组件
        this._content = cc.find("Canvas/alert/content").getComponent(cc.Label);
        
        // 确定按钮节点和取消节点按钮
        this._btnOK = cc.find("Canvas/alert/btn_ok");
        this._btnCancel = cc.find("Canvas/alert/btn_cancel");
        
        cc.vv.utils.addClickEvent(this._btnOK,this.node,"Alert","onBtnClicked");
        cc.vv.utils.addClickEvent(this._btnCancel,this.node,"Alert","onBtnClicked");
        
        this._alert.active = false;
        cc.vv.alert = this;
    },

    // 点击确定取消的事件回调
    onBtnClicked:function(event){
        if(event.target.name == "btn_ok"){
            if(this._onok){
                this._onok();
            }
        }
        this._alert.active = false;
        this._onok = null;
    },

    // 参数说明：你想要的title、content，确定按钮点击回调，是否需要取消按钮
    show:function(title,content,onok,needcancel){
        this._alert.active = true;
        this._onok = onok;
        this._title.string = title;
        this._content.string = content;
        if(needcancel){
            this._btnCancel.active = true;
            this._btnOK.x = -150;
            this._btnCancel.x = 150;
        }
        else{
            this._btnCancel.active = false;
            this._btnOK.x = 0;
        }
    },
    
    // 销毁
    onDestory:function(){
        if(cc.vv){
            cc.vv.alert = null;    
        }
    }
});
