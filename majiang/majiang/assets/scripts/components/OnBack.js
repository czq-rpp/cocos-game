/*
 * @Author: zaccheus 
 * @Date: 2018-07-12 14:28:13 
 * @Last Modified by: zaccheus
 * @Last Modified time: 2018-07-12 14:39:11
 */

// 这个脚本的唯一作用就是点击btn_back按钮，弹窗关闭
cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad: function () {
        var btn = this.node.getChildByName("btn_back");
        cc.vv.utils.addClickEvent(btn,this.node,"OnBack","onBtnClicked");        
    },
    
    onBtnClicked:function(event){
        if(event.target.name == "btn_back"){
            this.node.active = false;
        }
    }
});
