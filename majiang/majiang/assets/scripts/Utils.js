/*
 * @Author: zaccheus 
 * @Date: 2018-07-12 09:56:33 
 * @Last Modified by: zaccheus
 * @Last Modified time: 2018-07-12 10:07:43
 */

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // cc.vv.utils.addClickEvent(this.sprHeadImg.node,this.node,"Hall","onBtnClicked");
    addClickEvent:function(node,target,component,handler){
        console.log(component + ":" + handler);
        var eventHandler = new cc.Component.EventHandler();
        eventHandler.target = target;
        eventHandler.component = component;
        eventHandler.handler = handler;

        var clickEvents = node.getComponent(cc.Button).clickEvents;
        clickEvents.push(eventHandler);
    },
    
    addSlideEvent:function(node,target,component,handler){
        var eventHandler = new cc.Component.EventHandler();
        eventHandler.target = target;
        eventHandler.component = component;
        eventHandler.handler = handler;

        var slideEvents = node.getComponent(cc.Slider).slideEvents;
        slideEvents.push(eventHandler);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

