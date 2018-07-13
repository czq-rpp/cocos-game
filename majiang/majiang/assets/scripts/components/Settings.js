/*
 * @Author: zaccheus 
 * @Date: 2018-07-12 11:07:35 
 * @Last Modified by: zaccheus
 * @Last Modified time: 2018-07-12 14:08:23
 */

cc.Class({
    extends: cc.Component,

    properties: {
        _btnYXOpen:null,
        _btnYXClose:null,
        _btnYYOpen:null,
        _btnYYClose:null,
    },

    onLoad () {
        if(cc.vv == null){
            return;
        }
        // 分别找到音效开关按钮、音乐开关按钮
        this._btnYXOpen = this.node.getChildByName("yinxiao").getChildByName("btn_yx_open");
        this._btnYXClose = this.node.getChildByName("yinxiao").getChildByName("btn_yx_close");
        
        this._btnYYOpen = this.node.getChildByName("yinyue").getChildByName("btn_yy_open");
        this._btnYYClose = this.node.getChildByName("yinyue").getChildByName("btn_yy_close");

        // 给四个按钮加上叉按钮加上退出登录按钮添加点击事件！！！！
        this.initButtonHandler(this.node.getChildByName("btn_close"));
        this.initButtonHandler(this.node.getChildByName("btn_exit"));
        this.initButtonHandler(this._btnYXOpen);
        this.initButtonHandler(this._btnYXClose);
        this.initButtonHandler(this._btnYYOpen);
        this.initButtonHandler(this._btnYYClose);

        // 获取音效下slider所在的节点
        var slider = this.node.getChildByName("yinxiao").getChildByName("progress");
        // 添加slide事件
        cc.vv.utils.addSlideEvent(slider,this.node,"Settings","onSlided");
        // 获取背景音乐下slider所在的节点
        var slider = this.node.getChildByName("yinyue").getChildByName("progress");
        // 添加slide事件
        cc.vv.utils.addSlideEvent(slider,this.node,"Settings","onSlided");
        
        this.refreshVolume();
    },

    // 同意添加事件onBtnClicked
    initButtonHandler:function(btn){
        cc.vv.utils.addClickEvent(btn,this.node,"Settings","onBtnClicked");    
    },

    // 根据事件触发的target来做不同的判断和事情！！！
    onBtnClicked:function(event){
        // 关闭设置弹窗
        if(event.target.name == "btn_close"){
            this.node.active = false;
        }
        // 退出登录，清除本地存储中的微信登录信息，并跳转场景到login
        // 注意这里并没有清除游客登录信息！！！！
        else if(event.target.name == "btn_exit"){
            cc.sys.localStorage.removeItem("wx_account");
            cc.sys.localStorage.removeItem("wx_sign");
            cc.director.loadScene("login");
        }
        // 播放音效按钮
        else if(event.target.name == "btn_yx_open"){
            cc.vv.audioMgr.setSFXVolume(1.0);
            this.refreshVolume(); 
        }
        // 关闭音效按钮
        else if(event.target.name == "btn_yx_close"){
            cc.vv.audioMgr.setSFXVolume(0);
            this.refreshVolume();
        }
        // 播放背景音乐
        else if(event.target.name == "btn_yy_open"){
            cc.vv.audioMgr.setBGMVolume(1);
            this.refreshVolume();
        }
        // 关闭背景音乐
        else if(event.target.name == "btn_yy_close"){
            cc.vv.audioMgr.setBGMVolume(0);
            this.refreshVolume();
        }
    },

    // onslide事件
    onSlided:function(slider){
        if(slider.node.parent.name == "yinxiao"){
            // 设置音效的大小和slider.progress对应
            cc.vv.audioMgr.setSFXVolume(slider.progress);
        }
        else if(slider.node.parent.name == "yinyue"){
             // 设置背景音乐的大小和slider.progress对应
            cc.vv.audioMgr.setBGMVolume(slider.progress);
        }
        this.refreshVolume();
    },

    refreshVolume:function(){
        // 这两个的作用是显示和隐藏按钮
        // 关闭音效按钮出现的条件：cc.vv.audioMgr.sfxVolume > 0 -- 即sfxVolume > 0
        this._btnYXClose.active = cc.vv.audioMgr.sfxVolume > 0;
        // 开启音效按钮和上面是互斥的，所以：见下
        this._btnYXOpen.active = !this._btnYXClose.active;

        // 这里是展示slider的宽度
        // 获取yinxiao节点
        var yx = this.node.getChildByName("yinxiao");
        // 获取音效值，并乘以430
        var width = 430 * cc.vv.audioMgr.sfxVolume;
        // 获取progress节点
        var progress = yx.getChildByName("progress");
        // 设置组件slider的progress值为上面的音效的大小
        progress.getComponent(cc.Slider).progress = cc.vv.audioMgr.sfxVolume;
        // 设置progress节点的宽度等于上面的width
        progress.getChildByName("progress").width = width;  
        //yx.getChildByName("btn_progress").x = progress.x + width;
        
        
        // 和上面一模一样
        this._btnYYClose.active = cc.vv.audioMgr.bgmVolume > 0;
        this._btnYYOpen.active = !this._btnYYClose.active;
        var yy = this.node.getChildByName("yinyue");
        var width = 430 * cc.vv.audioMgr.bgmVolume;
        var progress = yy.getChildByName("progress");
        progress.getComponent(cc.Slider).progress = cc.vv.audioMgr.bgmVolume; 
        
        progress.getChildByName("progress").width = width;
        //yy.getChildByName("btn_progress").x = progress.x + width;
    },
});
