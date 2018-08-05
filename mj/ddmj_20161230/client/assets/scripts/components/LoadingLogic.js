cc.Class({
    //组件
    extends: cc.Component,
    //挂载属性
    properties: {
        tipLabel:cc.Label,//label组价
        _stateStr:'',//表示状态的字符串
        _progress:0.0,//
        _splash:null,//
        _isLoading:false,
    },

    //组件所在节点进行初始化时（节点添加到节点树时）执行
    onLoad: function () {
        //sys==>系统变量
        //isNative和isMobile都是bool类型的变量
        //条件是：1、不要原生2、是移动系统
        if(!cc.sys.isNative && cc.sys.isMobile){
            //获得本节点的canvas组件
            //this代表本脚本组件
            var cvs = this.node.getComponent(cc.Canvas);
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
    
    start:function(){        
        var self = this;
        var SHOW_TIME = 3000;
        var FADE_TIME = 500;
        if(cc.sys.os != cc.sys.OS_IOS || !cc.sys.isNative){
            self._splash.active = true;
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
        }
        else{
            this._splash.active = false;
            this.checkVersion();
        }
    },
    
    initMgr:function(){
        //Cocos 引擎的主要命名空间，引擎代码中所有的类，函数，属性和常量都在这个命名空间中定义。    
        //在cc这个规定的命名空间中定义一个空对象
        cc.vv = {};
        //引用模块化脚本1
        var UserMgr = require("UserMgr");
        cc.vv.userMgr = new UserMgr();
        //引用模块化脚本2
        var ReplayMgr = require("ReplayMgr");
        cc.vv.replayMgr = new ReplayMgr();
        //3个
        cc.vv.http = require("HTTP");
        cc.vv.global = require("Global");
        cc.vv.net = require("Net");
        //
        var GameNetMgr = require("GameNetMgr");
        cc.vv.gameNetMgr = new GameNetMgr();
        cc.vv.gameNetMgr.initHandlers();
        
        var AnysdkMgr = require("AnysdkMgr");
        cc.vv.anysdkMgr = new AnysdkMgr();
        cc.vv.anysdkMgr.init();
        
        var VoiceMgr = require("VoiceMgr");
        cc.vv.voiceMgr = new VoiceMgr();
        cc.vv.voiceMgr.init();
        
        var AudioMgr = require("AudioMgr");
        cc.vv.audioMgr = new AudioMgr();
        cc.vv.audioMgr.init();
        
        var Utils = require("Utils");
        cc.vv.utils = new Utils();
        
        cc.args = this.urlParse();
    },
    
    urlParse:function(){
        var params = {};
        if(window.location == null){
            return params;
        }
        var name,value; 
        var str=window.location.href; //取得整个地址栏
        var num=str.indexOf("?") 
        str=str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]
        
        var arr=str.split("&"); //各个参数放到数组里
        for(var i=0;i < arr.length;i++){ 
            num=arr[i].indexOf("="); 
            if(num>0){ 
                name=arr[i].substring(0,num);
                value=arr[i].substr(num+1);
                params[name]=value;
            } 
        }
        return params;
    },
    
    checkVersion:function(){
        var self = this;
        var onGetVersion = function(ret){
            if(ret.version == null){
                console.log("error.");
            }
            else{
                cc.vv.SI = ret;
                if(ret.version != cc.VERSION){
                    cc.find("Canvas/alert").active = true;
                }
                else{
                    self.startPreloading();
                }
            }
        };
        
        var xhr = null;
        var complete = false;
        var fnRequest = function(){
            self._stateStr = "正在连接服务器";
            xhr = cc.vv.http.sendRequest("/get_serverinfo",null,function(ret){
                xhr = null;
                complete = true;
                onGetVersion(ret);
            });
            setTimeout(fn,5000);            
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
    
    onBtnDownloadClicked:function(){
        cc.sys.openURL(cc.vv.SI.appweb);
    },
    
    startPreloading:function(){
        this._stateStr = "正在加载资源，请稍候";
        this._isLoading = true;
        var self = this;
        
        cc.loader.onProgress = function ( completedCount, totalCount,  item ){
            //console.log("completedCount:" + completedCount + ",totalCount:" + totalCount );
            if(self._isLoading){
                self._progress = completedCount/totalCount;
            }
        };
        
        cc.loader.loadRes("textures", function (err, assets) {
            self.onLoadComplete();
        });      
    },
    
    onLoadComplete:function(){
        this._isLoading = false;
        this._stateStr = "准备登陆";
        cc.director.loadScene("login");
        cc.loader.onComplete = null;
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if(this._stateStr.length == 0){
            return;
        }
        this.tipLabel.string = this._stateStr + ' ';
        if(this._isLoading){
            this.tipLabel.string += Math.floor(this._progress * 100) + "%";   
        }
        else{
            var t = Math.floor(Date.now() / 1000) % 4;
            for(var i = 0; i < t; ++ i){
                this.tipLabel.string += '.';
            }            
        }
    }
});