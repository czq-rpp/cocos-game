/*
 * @Author: zaccheus 
 * @Date: 2018-07-09 17:10:52 
 * @Last Modified by: zaccheus
 * @Last Modified time: 2018-07-13 15:54:45
 */

var crypto = require('../utils/crypto');

var express = require('express');
var app = express();

var config = null;
var hallAddr = "";

// 封装返回的数据格式为json字符串
function send(res,ret){
	var str = JSON.stringify(ret);
	res.send(str)
}

exports.start = function(cfg){
  // 把这个文件用到的的config对象初始化成入口文件传递的account_server配置对象，并监听传入的配置端口，输出信息
	config = cfg;
	hallAddr = config.HALL_IP  + ":" + config.HALL_CLIENT_PORT;
	app.listen(config.CLIENT_PORT);
	console.log("account server is listening on " + config.CLIENT_PORT);
}

//设置跨域访问
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

// get_serverinfo接口主要是返回游戏版本号、hall、appweb
app.get('/get_serverinfo',function(req,res){
	var ret = {
		version:config.VERSION,
		hall:hallAddr,
		appweb:config.APP_WEB,
	}
	send(res,ret);
});

// guest接口，主要返回errcode、errmsg、account--拼接字符串、halladdr、sign--加密的
app.get('/guest',function(req,res){
	var account = "guest_" + req.query.account;
	var sign = crypto.md5(account + req.ip + config.ACCOUNT_PRI_KEY);
	var ret = {
		errcode:0,
		errmsg:"ok",
		account:account,
		halladdr:hallAddr,
		sign:sign
	}
	send(res,ret);
});