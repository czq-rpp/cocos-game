/*
 * @Author: zaccheus 
 * @Date: 2018-07-13 13:46:51 
 * @Last Modified by: zaccheus
 * @Last Modified time: 2018-07-13 17:45:19
 */

var express = require('express');
var app = express();
var http = require('../utils/http');
var crypto = require('../utils/crypto');

var serverMap = {};

//设置跨域访问
app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By",' 3.2.1');
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});

exports.start = function($config){
	config = $config;
	app.listen(config.ROOM_PORT,config.FOR_ROOM_IP);
	console.log("room service is listening on " + config.FOR_ROOM_IP + ":" + config.ROOM_PORT);
};

exports.createRoom = function(account,userId,roomConf,fnCallback){
  var serverinfo = chooseServer();
	if(serverinfo == null){
		fnCallback(101,null);
		return;
	}
	
	db.get_gems(account,function(data){
		if(data != null){
			//2、请求创建房间
			var reqdata = {
				userid:userId,
				gems:data.gems,
				conf:roomConf
			};
			reqdata.sign = crypto.md5(userId + roomConf + data.gems + config.ROOM_PRI_KEY);
			http.get(serverinfo.ip,serverinfo.httpPort,"/create_room",reqdata,function(ret,data){
				//console.log(data);
				if(ret){
					if(data.errcode == 0){
						fnCallback(0,data.roomid);
					}
					else{
						fnCallback(data.errcode,null);		
					}
					return;
				}
				fnCallback(102,null);
			});	
		}
		else{
			fnCallback(103,null);
		}
	});
};

function chooseServer(){
	var serverinfo = null;
	for(var s in serverMap){
		var info = serverMap[s];
		if(serverinfo == null){
			serverinfo = info;			
		}
		else{
			if(serverinfo.load > info.load){
				serverinfo = info;
			}
		}
	}	
	return serverinfo;
}


app.get('/register_gs',function(req,res){
	
	var ip = req.ip;
	var clientip = req.query.clientip;
	var clientport = req.query.clientport;
	var httpPort = req.query.httpPort;
	var load = req.query.load;
	var id = clientip + ":" + clientport;
	if(serverMap[id]){
		var info = serverMap[id];
		if(info.clientport != clientport
			|| info.httpPort != httpPort
			|| info.ip != ip
		){
			console.log("duplicate gsid:" + id + ",addr:" + ip + "(" + httpPort + ")");
			http.send(res,1,"duplicate gsid:" + id);
			return;
		}
		info.load = load;
		http.send(res,0,"ok",{ip:ip});
		return;
	}
	serverMap[id] = {
		ip:ip,
		id:id,
		clientip:clientip,
		clientport:clientport,
		httpPort:httpPort,
		load:load
  };
	http.send(res,0,"ok",{ip:ip});
	console.log("game server registered.\n\tid:" + id + "\n\taddr:" + ip + "\n\thttp port:" + httpPort + "\n\tsocket clientport:" + clientport);

	var reqdata = {
		serverid:id,
		sign:crypto.md5(id+config.ROOM_PRI_KEY)
	};
	//获取服务器信息
	http.get(ip,httpPort,"/get_server_info",reqdata,function(ret,data){
		if(ret && data.errcode == 0){
			for(var i = 0; i < data.userroominfo.length; i += 2){
				var userId = data.userroominfo[i];
				var roomId = data.userroominfo[i+1];
			}
		}
		else{
			console.log(data.errmsg);
		}
	});
});