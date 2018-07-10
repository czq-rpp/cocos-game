/*
 * @Author: zaccheus 
 * @Date: 2018-07-09 17:10:52 
 * @Last Modified by: zaccheus
 * @Last Modified time: 2018-07-10 08:29:03
 */
var express = require('express');
var app = express();

exports.start = function(cfg){
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
app.get('/test',function(req,res){
	res.send('test')
});