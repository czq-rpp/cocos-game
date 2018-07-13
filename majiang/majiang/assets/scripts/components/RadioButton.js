/*
 * @Author: zaccheus 
 * @Date: 2018-07-13 08:35:05 
 * @Last Modified by: zaccheus
 * @Last Modified time: 2018-07-13 09:56:35
 */

cc.Class({
    extends: cc.Component,

    properties: {
        target:cc.Node,// 要换掉背景图片的button
        sprite:cc.SpriteFrame,// 未选中状态的图像
        checkedSprite:cc.SpriteFrame,// 选中状态的图像
        checked:false,// 和下面一样
        groupId:-1,// 可以在cocos编辑器中编辑，这里只是初始化！！！以编辑器为最终数字
    },

    onLoad () {
        if(cc.vv == null){
            return;
        }
        // 详见RadioGroupMgr.js，这里主要的目的是生成一个buttons对象！！！它是一个数组：包含RadioButton.js这个组件的数组！！！！
        if(cc.vv.radiogroupmgr == null){
            var RadioGroupMgr = require("RadioGroupMgr");
            cc.vv.radiogroupmgr = new RadioGroupMgr();
            cc.vv.radiogroupmgr.init();
        }
        cc.vv.radiogroupmgr.add(this);
        //见下
        this.refresh();
    },

    // 根据check的状态选择相应的图片
    refresh:function(){
        var targetSprite = this.target.getComponent(cc.Sprite);
        if(this.checked){
            targetSprite.spriteFrame = this.checkedSprite;
        }
        else{
            targetSprite.spriteFrame = this.sprite;
        }
    },
    
    // 封装check方法
    check:function(value){
        this.checked = value;
        this.refresh();
    },
    
    // button被点击触发的事件
    onClicked:function(){
        cc.vv.radiogroupmgr.check(this);
    },

    onDestroy:function(){
        if(cc.vv && cc.vv.radiogroupmgr){
            cc.vv.radiogroupmgr.del(this);            
        }
    }
});
