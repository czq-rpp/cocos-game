/*
 * @Author: zaccheus 
 * @Date: 2018-07-10 14:56:09 
 * @Last Modified by: zaccheus
 * @Last Modified time: 2018-07-12 09:25:30
 */

cc.Class({
    extends: cc.Component,

    properties: {
        account:null,
	    userId:null,
		userName:null,
		lv:0,
		exp:0,
		coins:0,
		gems:0,
		sign:0,
        ip:"",
        sex:0,

        oldRoomId:null
    },

    // 游客登录
    guestAuth: function () {
        // 试图从地址栏的account参数里面取值
        var account = cc.args["account"];
        if (account == null) {
            // 试图从本地存储里面取值
            account = cc.sys.localStorage.getItem("account");
        }

        if (account == null) {
            // 如果本地存储和地址栏中都没有，account等于现在的时间戳，并存储于本地存储中
            account = Date.now();
            cc.sys.localStorage.setItem("account", account);
        }

        // 请求后端接口guest，带上时间戳data--account，请求成功后执行回调函数onAuth
        cc.vv.http.sendRequest("/guest", {
            account: account
        }, this.onAuth);
    },

    // 上面请求guest接口后对返回json的handler
    onAuth: function (ret) {
        var self = cc.vv.userMgr;
        if (ret.errcode !== 0) {
            console.log(ret.errmsg);
        } else {
            // console.log(ret)
            // 1、把后端返回的account和sign赋值给这里的2、执行login方法
            self.account = ret.account;
            self.sign = ret.sign;
            // cc.vv.http.url = "http://" + cc.vv.SI.hall;
            self.login();
        }
    },

    login:function(){
        var self = this;
        // 执行login接口返回json后的函数
        var onLogin = function(ret){
            if(ret.errcode !== 0){
                console.log(ret.errmsg);
            }
            else{
                // 如果返回字段中没有userid，跳转到createrole场景
                if(!ret.userid){
                    //jump to register user info.
                    cc.director.loadScene("createrole");
                }
                else{
                    console.log(ret);
                    self.account = ret.account;
        			self.userId = ret.userid;
        			self.userName = ret.name;
        			self.lv = ret.lv;
        			self.exp = ret.exp;
        			self.coins = ret.coins;
        			self.gems = ret.gems;
                    self.roomData = ret.roomid;
                    self.sex = ret.sex;
                    self.ip = ret.ip;
        			cc.director.loadScene("hall");
                }
            }
        };
        // 显示登录弹窗
        cc.vv.wc.show("正在登录游戏");
        // 请求后端接口login
        cc.vv.http.sendRequest("/login",{account:this.account,sign:this.sign},onLogin,"http://192.168.21.75:9001");
    },
    
    // 创建角色，account和sign还是之前的，增加了游戏名字name
    create:function(name){
        var self = this;
        var onCreate = function(ret){
            if(ret.errcode !== 0){
                console.log(ret.errmsg);
            }
            else{
                // 数据库插入数据成功后登录！
                self.login();
            }
        };
        
        var data = {
            account:this.account,
            sign:this.sign,
            name:name
        };
        cc.vv.http.sendRequest("/create_user",data,onCreate,"http://192.168.21.75:9001");    
    },
});