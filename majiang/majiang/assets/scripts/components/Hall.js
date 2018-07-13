/*
 * @Author: zaccheus 
 * @Date: 2018-07-11 16:53:42 
 * @Last Modified by: zaccheus
 * @Last Modified time: 2018-07-12 17:32:51
 */

cc.Class({
    extends: cc.Component,

    properties: {
        lblName:cc.Label,
        // lblMoney:cc.Label,
        lblGems:cc.Label,
        lblID:cc.Label,
        btnJoinGame:cc.Node,
        btnReturnGame:cc.Node,
        sprHeadImg:cc.Sprite,
        settingsWin:cc.Node,
        helpWin:cc.Node,
        xiaoxiWin:cc.Node,
        lblNotice:cc.Label,
        createRoomWin:cc.Node,
    },

    onLoad () {
        if(!cc.sys.isNative && cc.sys.isMobile){
            var cvs = this.node.getComponent(cc.Canvas);
            cvs.fitHeight = true;
            cvs.fitWidth = true;
        }
        // 阻止未打开loading场景的情况下先打开hall场景
        if(!cc.vv){
            cc.director.loadScene("loading");
            return;
        }
        // 初始化游客信息
        this.initLabels();
        // 是否有roomId
        if(cc.vv.gameNetMgr.roomId == null){
            this.btnJoinGame.active = true;
            this.btnReturnGame.active = false;
        }
        else{
            this.btnJoinGame.active = false;
            this.btnReturnGame.active = true;
        }
        // 是否有oldRoomId
        var params = cc.vv.args;
        var roomId = cc.vv.userMgr.oldRoomId 
        if( roomId != null){
            cc.vv.userMgr.oldRoomId = null;
            cc.vv.userMgr.enterRoom(roomId);
        }
        // 获取头像精灵的脚本并运行它ImageLoader的onload
        var imgLoader = this.sprHeadImg.node.getComponent("ImageLoader");
        // 运行脚本的setUserID方法，原生的东西，后面有时间再看
        imgLoader.setUserID(cc.vv.userMgr.userId);
        // 暂时不知道用处
        cc.vv.utils.addClickEvent(this.sprHeadImg.node,this.node,"Hall","onBtnClicked");
        // 手动给hall添加脚本UserInfoShow
        this.addComponent("UserInfoShow");
        // 初始化右上角三个按钮，给他们三个都添加了onBtnClicked事件
        this.initButtonHandler("Canvas/right_bottom/btn_shezhi");
        this.initButtonHandler("Canvas/right_bottom/btn_help");
        this.initButtonHandler("Canvas/right_bottom/btn_xiaoxi");

        // 给help预制节点增加脚本
        this.helpWin.addComponent("OnBack");
        this.xiaoxiWin.addComponent("OnBack");

        // 增加notice、gemstip属性
        if(!cc.vv.userMgr.notice){
            cc.vv.userMgr.notice = {
                version:null,
                msg:"数据请求中...",
            }
        }
        if(!cc.vv.userMgr.gemstip){
            cc.vv.userMgr.gemstip = {
                version:null,
                msg:"数据请求中...",
            }
        }
        // 跑马灯的内容设置为cc.vv.userMgr.notice.msg
        this.lblNotice.string = cc.vv.userMgr.notice.msg;

        // 刷新gems
        this.refreshInfo();
        // 刷新跑马灯文字notice
        this.refreshNotice();
        // 刷新gems的提醒
        this.refreshGemsTip();

        cc.vv.audioMgr.playBGM("bgMain.mp3");
    },

    // 初始化用户信息
    initLabels:function(){
        this.lblName.string = cc.vv.userMgr.userName;
        // this.lblMoney.string = cc.vv.userMgr.coins;
        this.lblGems.string = cc.vv.userMgr.gems;
        this.lblID.string = "ID:" + cc.vv.userMgr.userId;
    },

    // 初始化右上角三个按钮，给他们三个都添加了onBtnClicked事件
    initButtonHandler:function(btnPath){
        var btn = cc.find(btnPath);
        cc.vv.utils.addClickEvent(btn,this.node,"Hall","onBtnClicked");        
    },

    // 左上角的头像、右上角的三个按钮的点击事件
    onBtnClicked:function(event){
        if(event.target.name == "btn_shezhi"){
            this.settingsWin.active = true;
        }   
        else if(event.target.name == "btn_help"){
            this.helpWin.active = true;
        }
        else if(event.target.name == "btn_xiaoxi"){
            this.xiaoxiWin.active = true;
        }
        else if(event.target.name == "head"){
            cc.vv.userinfoShow.show(cc.vv.userMgr.userName,cc.vv.userMgr.userId,this.sprHeadImg,cc.vv.userMgr.sex,cc.vv.userMgr.ip);
        }
    },

    // 封装请求后端返回gems的方法
    refreshInfo:function(){
        // var self = this;下面bind（this）了
        var onGet = function(ret){
            if(ret.errcode !== 0){
                console.log(ret.errmsg);
            }
            else{
                if(ret.gems != null){
                    this.lblGems.string = ret.gems;   
                }
            }
        };
        
        var data = {
            account:cc.vv.userMgr.account,
            sign:cc.vv.userMgr.sign,
        };
        cc.vv.http.sendRequest("/get_user_status",data,onGet.bind(this),"http://192.168.21.75:9001");
    },

    // 封装请求后端返回msg和version的方法，跑马灯的文字notice=msg
    refreshNotice:function(){
        // var self = this;
        var onGet = function(ret){
            if(ret.errcode !== 0){
                console.log(ret.errmsg);
            }
            else{
                cc.vv.userMgr.notice.version = ret.version;
                cc.vv.userMgr.notice.msg = ret.msg;
                this.lblNotice.string = ret.msg;
            }
        };
        
        var data = {
            account:cc.vv.userMgr.account,
            sign:cc.vv.userMgr.sign,
            type:"notice",
            version:cc.vv.userMgr.notice.version
        };
        cc.vv.http.sendRequest("/get_message",data,onGet.bind(this),"http://192.168.21.75:9001");
    },

    // 封装请求后端返回msg和version的方法，这里的msg和version是和gems相关的内容
    refreshGemsTip:function(){
        var self = this;
        var onGet = function(ret){
            if(ret.errcode !== 0){
                console.log(ret.errmsg);
            }
            else{
                cc.vv.userMgr.gemstip.version = ret.version;
                cc.vv.userMgr.gemstip.msg = ret.msg.replace("<newline>","\n");
            }
        };
        
        var data = {
            account:cc.vv.userMgr.account,
            sign:cc.vv.userMgr.sign,
            type:"fkgm",
            version:cc.vv.userMgr.gemstip.version
        };
        cc.vv.http.sendRequest("/get_message",data,onGet.bind(this),"http://192.168.21.75:9001");
    },

    // 添加gems
    onBtnAddGemsClicked:function(){
        cc.vv.alert.show("提示",cc.vv.userMgr.gemstip.msg);
        this.refreshInfo();
    },

    // 创建房间
    onCreateRoomClicked:function(){
        if(cc.vv.gameNetMgr.roomId != null){
            cc.vv.alert.show("提示","房间已经创建!\n必须解散当前房间才能创建新的房间");
            return;
        }
        console.log("onCreateRoomClicked");
        this.createRoomWin.active = true;   
    },

    update (dt) {
        // 在这里实现跑马灯文字效果！！！！！！
        var x = this.lblNotice.node.x;
        x -= dt*100;
        if(x + this.lblNotice.node.width < -1000){
            x = 500;
        }
        this.lblNotice.node.x = x;
        
        if(cc.vv && cc.vv.userMgr.roomData != null){
            cc.vv.userMgr.enterRoom(cc.vv.userMgr.roomData);
            cc.vv.userMgr.roomData = null;
        }
    },
});
