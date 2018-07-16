/*
 * @Author: zaccheus 
 * @Date: 2018-07-13 14:14:57 
 * @Last Modified by: zaccheus
 * @Last Modified time: 2018-07-13 17:04:42
 */

var express = require('express');
var roomMgr = require("./roommgr");
var http = require('../utils/http');
var gameServerInfo = null;
var lastTickTime = 0;
var config = null;
var serverIp = "";

var app = express();

exports.start = function($config){
	config = $config;

	//
	gameServerInfo = {
		id:config.SERVER_ID,
		clientip:config.CLIENT_IP,
		clientport:config.CLIENT_PORT,
		httpPort:config.HTTP_PORT,
		load:roomMgr.getTotalRooms(),
	};

	setInterval(update,1000);
	app.listen(config.HTTP_PORT,config.FOR_HALL_IP);
	console.log("game server is listening on " + config.FOR_HALL_IP + ":" + config.HTTP_PORT);
};

//向大厅服定时心跳
function update(){
	if(lastTickTime + config.HTTP_TICK_TIME < Date.now()){
		lastTickTime = Date.now();
		gameServerInfo.load = roomMgr.getTotalRooms();
		http.get(config.HALL_IP,config.HALL_PORT,"/register_gs",gameServerInfo,function(ret,data){
			if(ret == true){
				if(data.errcode != 0){
					console.log(data.errmsg);
				} 
				
				if(data.ip != null){
					serverIp = data.ip;
				}
			}
			else{
				//
				lastTickTime = 0;
			}
		});
		var mem = process.memoryUsage();
		var format = function(bytes) {  
              return (bytes/1024/1024).toFixed(2)+'MB';  
        }; 
		//console.log('Process: heapTotal '+format(mem.heapTotal) + ' heapUsed ' + format(mem.heapUsed) + ' rss ' + format(mem.rss));
	}
}