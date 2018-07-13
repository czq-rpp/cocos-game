/*
 * @Author: zaccheus 
 * @Date: 2018-07-13 08:44:30 
 * @Last Modified by: zaccheus
 * @Last Modified time: 2018-07-13 09:56:55
 */

cc.Class({
    extends: cc.Component,

    properties: {
        _groups:null
    },

    init: function () {
        this._groups = {};
    },

    // 增加buttons数组的成员
    add:function(radioButton){
        // 获取传入的挂载radioButton脚本的节点的groupId
        var groupId = radioButton.groupId; 
        var buttons = this._groups[groupId];// 空对象groups，所以这里的button是undefined
        if(buttons == null){
            buttons = [];
            this._groups[groupId] = buttons; 
            // 这里的_groups不再是空对象，里面塞了一个数组空数组buttons
        }
        buttons.push(radioButton);// 往空数组里面塞了一个节点对象
    },

    // 点击的时候发生，根据传入的脚本组件radioButton的groupId属性，来生成groupId相同的buttons数组；
    // 点击的时候传入的脚本组件对应上则设置check为true
    check:function(radioButton){
        var groupId = radioButton.groupId;
        var buttons = this._groups[groupId];
        if(buttons == null){
            return; 
        }
        for(var i = 0; i < buttons.length; ++i){
            var btn = buttons[i];
            if(btn == radioButton){
                btn.check(true);
            }else{
                btn.check(false);
            }
        }        
    },

    del:function(radioButton){
        var groupId = radioButton.groupId;
        var buttons = this._groups[groupId];
        if(buttons == null){
            return; 
        }
        var idx = buttons.indexOf(radioButton);
        if(idx != -1){
            buttons.splice(idx,1);            
        }
        if(buttons.length == 0){
            delete this._groups[groupId]   
        }
    }
});
