/*
 * @Author: zaccheus 
 * @Date: 2018-07-12 15:59:46 
 * @Last Modified by: zaccheus
 * @Last Modified time: 2018-07-13 13:41:15
 */

cc.Class({
    extends: cc.Component,

    properties: {
        _difenxuanze:null,
        _zimo:null,
        _wanfaxuanze:null,
        _zuidafanshu:null,
        _jushuxuanze:null,
        _dianganghua:null,
        _leixingxuanze:null,
    },

    onLoad () {
        // 每一个都是脚本组件的数组！！！！
        this._leixingxuanze = [];
        var t = this.node.getChildByName("leixingxuanze");
        for(var i = 0; i < t.childrenCount; ++i){
            var n = t.children[i].getComponent("RadioButton");
            if(n != null){
                this._leixingxuanze.push(n);
            }
        }

        this._difenxuanze = [];
        var t = this.node.getChildByName("difenxuanze");
        for(var i = 0; i < t.childrenCount; ++i){
            var n = t.children[i].getComponent("RadioButton");
            if(n != null){
                this._difenxuanze.push(n);
            }
        }

        this._zimo = [];
        var t = this.node.getChildByName("zimojiacheng");
        for(var i = 0; i < t.childrenCount; ++i){
            var n = t.children[i].getComponent("RadioButton");
            if(n != null){
                this._zimo.push(n);
            }
        }

        this._wanfaxuanze = [];
        var t = this.node.getChildByName("wanfaxuanze");
        for(var i = 0; i < t.childrenCount; ++i){
            var n = t.children[i].getComponent("CheckBox");
            if(n != null){
                this._wanfaxuanze.push(n);
            }
        }

        this._zuidafanshu = [];
        var t = this.node.getChildByName("zuidafanshu");
        for(var i = 0; i < t.childrenCount; ++i){
            var n = t.children[i].getComponent("RadioButton");
            if(n != null){
                this._zuidafanshu.push(n);
            }
        }

        this._jushuxuanze = [];
        var t = this.node.getChildByName("xuanzejushu");
        for(var i = 0; i < t.childrenCount; ++i){
            var n = t.children[i].getComponent("RadioButton");
            if(n != null){
                this._jushuxuanze.push(n);
            }
        }
        
        this._dianganghua = [];
        var t = this.node.getChildByName("dianganghua");
        for(var i = 0; i < t.childrenCount; ++i){
            var n = t.children[i].getComponent("RadioButton");
            if(n != null){
                this._dianganghua.push(n);
            }
        }
    },

    // 返回按钮
    onBtnBack:function(){
        this.node.active = false;
    },

    // 确定按钮
    onBtnOK:function(){
        this.node.active = false;
        this.createRoom();
    },

    // 创建房间
    createRoom:function(){
        var self = this;
        // 后端接口/create_private_room的回调
        var onCreate = function(ret){
            if(ret.errcode !== 0){
                cc.vv.wc.hide();
                //console.log(ret.errmsg);
                if(ret.errcode == 2222){
                    cc.vv.alert.show("提示","房卡不足，创建房间失败!");  
                }
                else{
                    cc.vv.alert.show("提示","创建房间失败,错误码:" + ret.errcode);
                }
            }
            else{
                cc.vv.gameNetMgr.connectGameServer(ret);
            }
        };
        
        // 获取底分
        var difen = 0;
        for(var i = 0; i < self._difenxuanze.length; ++i){
            if(self._difenxuanze[i].checked){
                difen = i;
                break;
            }
        }
        
        // 自摸加底or自摸加番
        var zimo = 0;
        for(var i = 0; i < self._zimo.length; ++i){
            if(self._zimo[i].checked){
                zimo = i;
                break;
            }     
        }


        // 这四个是checkbox，值为true或false
        var huansanzhang = self._wanfaxuanze[0].checked;        
        var jiangdui = self._wanfaxuanze[1].checked;
        var menqing = self._wanfaxuanze[2].checked;
        var tiandihu = self._wanfaxuanze[3].checked;
        

        // 麻将类型：xlch和xzdd
        var type = 0;
        for(var i = 0; i < self._leixingxuanze.length; ++i){
            if(self._leixingxuanze[i].checked){
                type = i;
                break;
            }     
        }
        if(type == 0){
            type = "xzdd";
        }
        else{
            type = "xlch";
        }
        
        // 最大番数（3个选择3番4番5番分别对应数组中的0、1、2）
        var zuidafanshu = 0;
        for(var i = 0; i < self._zuidafanshu.length; ++i){
            if(self._zuidafanshu[i].checked){
                zuidafanshu = i;
                break;
            }     
        }
        
        // 局数选择（2个选择4局和8局分别对应数组中的0、1）
        var jushuxuanze = 0;
        for(var i = 0; i < self._jushuxuanze.length; ++i){
            if(self._jushuxuanze[i].checked){
                jushuxuanze = i;
                break;
            }     
        }
        
        // 点杠花（2个选择点炮和自摸分别对应数组的0、1）
        var dianganghua = 0;
        for(var i = 0; i < self._dianganghua.length; ++i){
            if(self._dianganghua[i].checked){
                dianganghua = i;
                break;
            }     
        }
        
        var conf = {
            type:type,// 麻将类型：xlch和xzdd
            difen:difen,// 底分选择（现在没有做这个扩展，后面可以加上）三个选择：1分、2分、5分
            zimo:zimo,// 自摸的选择：自摸加底和自摸加番两个选择
            zuidafanshu:zuidafanshu,// 最大番数（3个选择3番4番5番分别对应数组中的0、1、2）
            jushuxuanze:jushuxuanze,// 局数选择（2个选择4局和8局分别对应数组中的0、1）
            dianganghua:dianganghua,// 点杠花（2个选择点炮和自摸分别对应数组的0、1）
            // 这四个是checkbox，值为true或false
            menqing:menqing,
            tiandihu:tiandihu,   
            huansanzhang:huansanzhang,
            jiangdui:jiangdui,
        }; 
        
        var data = {
            account:cc.vv.userMgr.account,
            sign:cc.vv.userMgr.sign,
            conf:JSON.stringify(conf)
        };
        console.log(data);
        cc.vv.wc.show("正在创建房间");
        cc.vv.http.sendRequest("/create_private_room",data,onCreate,"http://192.168.21.75:9001");   
    }

});
