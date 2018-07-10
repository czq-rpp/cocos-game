/*
 * @Author: zaccheus 
 * @Date: 2018-07-09 17:10:52 
 * @Last Modified by: zaccheus
 * @Last Modified time: 2018-07-10 11:17:04
 */
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

//测试
// app.get('/test',function(req,res){
// 	res.send('test')
// });

// get_serverinfo接口主要是返回游戏版本号、hall、appweb
app.get('/get_serverinfo',function(req,res){
	var ret = {
		version:config.VERSION,
		hall:hallAddr,
		appweb:config.APP_WEB,
	}
	send(res,ret);
});