/*
 * @Author: zaccheus 
 * @Date: 2018-07-09 09:39:39 
 * @Last Modified by: zaccheus
 * @Last Modified time: 2018-07-09 14:21:58
 */

cc.Class({
    extends: cc.Component,
    // 挂在属性
    properties: {
        tipLabel: cc.Label,
        _stateStr: '', //表示状态的字符串
        _splash: null
    },
    //组件所在节点进行初始化时（节点添加到节点树时）执行
    onLoad() {
        //sys判断1、不要原生；2、要移动端
        if (!cc.sys.isNative && cc.sys.isMobile) {
            //this代表本脚本组件，获取canvas节点
            var cvs = this.getComponent(cc.Canvas);
            //canvasUI根节点属性设置
            cvs.fitHeight = true;
            cvs.fitWidth = true;
        }
        //运行本组件脚本的initMgr方法
        this.initMgr();
        //设置label组件的内容
        //等于表示状态的字符串
        this.tipLabel.string = this._stateStr;
        //找到splash节点,当 cc.find 只传入第一个参数时，将从场景根节点开始逐级查找
        this._splash = cc.find("Canvas/splash");
        //设置splash节点的激活状态，其父节点必须激活
        this._splash.active = true;
    },

    start() {
        var self = this;
        var SHOW_TIME = 3000;
        var FADE_TIME = 500;
        //1、非ios平台或者2、非原生平台
        //渐隐效果在非原生的所有平台上面有，在非ios操作系统上全部有！=== ios原生操作系统上面没有
        if(cc.sys.os != cc.sys.OS_IOS || !cc.sys.isNative){
            var t = Date.now();
            var fn = function(){
                var dt = Date.now() - t;
                if(dt < SHOW_TIME){
                    setTimeout(fn,33);
                }
                else {
                    var op = (1 - ((dt - SHOW_TIME) / FADE_TIME)) * 255;
                    if(op < 0){
                        self._splash.opacity = 0;
                        self.checkVersion();    
                    }
                    else{
                        self._splash.opacity = op;
                        setTimeout(fn,33);   
                    }
                }
            };
            setTimeout(fn,33);
        }else {
            this._splash.active = false;
            this.checkVersion();
        }
    },

    checkVersion() {
        var self = this;
        var xhr = null;
        var complete = false;
        var fnRequest = function(){
            self._stateStr = "正在连接服务器";
            xhr = cc.vv.http.sendRequest("/get_serverinfo",null,function(ret){
                xhr = null;
                complete = true;
                // onGetVersion(ret);
            });
            // setTimeout(fn,5000);            
        }
        var fn = function(){
            if(!complete){
                if(xhr){
                    xhr.abort();
                    self._stateStr = "连接失败，即将重试";
                    setTimeout(function(){
                        fnRequest();
                    },5000);
                }
                else{
                    fnRequest();
                }
            }
        };
        fn();
    },

    initMgr() {
        //Cocos 引擎的主要命名空间，引擎代码中所有的类，函数，属性和常量都在这个命名空间中定义。    
        //在cc这个规定的命名空间中定义一个空对象
        cc.vv = {};
        //
        cc.vv.http = require("HTTP");
        cc.vv.net = require("Net");
        //
        var GameNetMgr = require("GameNetMgr");
        cc.vv.gameNetMgr = new GameNetMgr();
        cc.vv.gameNetMgr.initHandlers();
        //
        var VoiceMgr = require("VoiceMgr");
        cc.vv.voiceMgr = new VoiceMgr();
        //
        var AudioMgr = require("AudioMgr");
        cc.vv.audioMgr = new AudioMgr();
        cc.vv.audioMgr.init();
        //params
        cc.args = this.urlParse();
    },

    urlParse() {
        var params = {};
        if (window.location == null) {
            return params;
        }
        var name, value;
        var str = window.location.href; //取得整个地址栏
        var num = str.indexOf("?")
        str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]

        var arr = str.split("&"); //各个参数放到数组里
        for (var i = 0; i < arr.length; i++) {
            num = arr[i].indexOf("=");
            if (num > 0) {
                name = arr[i].substring(0, num);
                value = arr[i].substr(num + 1);
                params[name] = value;
            }
        }
        return params;
    },

    update (dt) {
        if(this._stateStr.length == 0){
            return;
        }
        this.tipLabel.string = this._stateStr + ' ';
    },
});