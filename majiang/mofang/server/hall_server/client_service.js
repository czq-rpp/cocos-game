/*
 * @Author: zaccheus 
 * @Date: 2018-07-10 16:09:23 
 * @Last Modified by: zaccheus
 * @Last Modified time: 2018-07-11 15:56:22
 */

var crypto = require('../utils/crypto');
var db = require('../utils/db');
var http = require('../utils/http');

var express = require('express');
var app = express();

var config = null;

// 封装函数：检查账户--account和sign，这两个参数不能为空，有返回true，没有返回false
function check_account(req,res){
	var account = req.query.account;
	var sign = req.query.sign;
	if(account == null || sign == null){
		// 这个地方用到了封装的http的send方法，详见http.js（主要目的就是res.end一个带着你想带的一些字段的json字符串）
		http.send(res,1,"unknown error");
		return false;
	}
	/*
	var serverSign = crypto.md5(account + req.ip + config.ACCOUNT_PRI_KEY);
	if(serverSign != sign){
		http.send(res,2,"login failed.");
		return false;
	}
	*/
	return true;
}

// 把这个文件用到的的config对象初始化成入口文件传递的client_service配置对象，并监听传入的配置端口，输出信息
exports.start = function($config){
	config = $config;
	app.listen(config.CLEINT_PORT);
	console.log("client service is listening on port " + config.CLEINT_PORT);
};

//设置跨域访问
app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By",' 3.2.1');
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});

// login接口主要：
app.get('/login',function(req,res){
	// 第一步运行上面封装的check_account函数
	// 两种情况：1、没有account和sign参数返回false，并且已经在上面的函数中处理并返回给前端错误了，这里直接return
	// 2、有account和sign参数返回true，则走不进这里的逻辑，去下一个脚本
	if(!check_account(req,res)){
		return;
	}
  
  // 取出请求的ip地址字符串
  var ip = req.ip;
	if(ip.indexOf("::ffff:") != -1){
    ip = ip.substr(7);
	}
  
  // 取出请求参数account
  var account = req.query.account;
  // 用封装的数据库方法get_user_data，前往db.js
	db.get_user_data(account,function(data){
		// 查无此人，并返回字段给前端
		if(data == null){
			http.send(res,0,"ok");
			return;
		}

		var ret = {
			account:data.account,
			userid:data.userid,
			name:data.name,
			lv:data.lv,
			exp:data.exp,
			coins:data.coins,
			gems:data.gems,
			ip:ip,
			sex:data.sex,
		};
		http.send(res,0,"ok",ret);// 查到此人的信息返回给前端  ————暂用！！！！
		// db.get_room_id_of_user(data.userid,function(roomId){
		// 	//如果用户处于房间中，则需要对其房间进行检查。 如果房间还在，则通知用户进入
		// 	if(roomId != null){
		// 		//检查房间是否存在于数据库中
		// 		db.is_room_exist(roomId,function (retval){
		// 			if(retval){
		// 				ret.roomid = roomId;
		// 			}
		// 			else{
		// 				//如果房间不在了，表示信息不同步，清除掉用户记录
		// 				db.set_room_id_of_user(data.userid,null);
		// 			}
		// 			http.send(res,0,"ok",ret);
		// 		});
		// 	}
		// 	else {
		// 		http.send(res,0,"ok",ret);
		// 	}
		// });
	});
});

app.get('/create_user',function(req,res){
	if(!check_account(req,res)){
		return;
	}
	var account = req.query.account;
	var name = req.query.name;
	var coins = 1000;
	var gems = 21;
	console.log(name);

	db.is_user_exist(account,function(ret){
		if(!ret){
			// 去db库中创造游戏角色，插入数据库！！！
			db.create_user(account,name,coins,gems,0,null,function(ret){
				if (ret == null) {
					http.send(res,2,"system error.");
				}
				else{
					// 插入成功！
					http.send(res,0,"ok");					
				}
			});
		}
		else{
			// true的情况，返回给前端账户已存在，这种情况基本不存在，因为前面的login已经判断过！！！
			http.send(res,1,"account have already exist.");
		}
	});
});
