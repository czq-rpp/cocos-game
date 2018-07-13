/*
 * @Author: zaccheus 
 * @Date: 2018-07-10 16:26:54 
 * @Last Modified by: zaccheus
 * @Last Modified time: 2018-07-13 16:17:49
 */

var http = require('http');
var qs = require('querystring');

// 给字符串类增加一个原型方法
String.prototype.format = function(args) {
	// 这里的result等于this，即字符串string--  String {"INSERT INTO t_users(account,name,coins,gems,sex,headimg) VALUES("{0}","{1}",{2},{3},{4},{5})"}
	var result = this;
	// arguments即传入format函数的参数数组对象，即sql = sql.format(account,name,coins,gems,sex,headimg);中account,name,coins,gems,sex,headimg的值组成的数组对象
	if (arguments.length > 0) {
		if (arguments.length == 1 && typeof (args) == "object") {
			for (var key in args) {
				if(args[key]!=undefined){
					var reg = new RegExp("({" + key + "})", "g");
					result = result.replace(reg, args[key]);
				}
			}
		}
		else {
			// 通过循环把字符串中带{}的值都换成参数arguments的值，其中{}中包裹的代表参数数组的序号！！！！！
			for (var i = 0; i < arguments.length; i++) {
				if (arguments[i] != undefined) {
					//var reg = new RegExp("({[" + i + "]})", "g");//这个在索引大于9时会有问题，谢谢何以笙箫的指出
					var reg = new RegExp("({)" + i + "(})", "g");
					result = result.replace(reg, arguments[i]);
				}
			}
		}
	}
	return result;
};

// 封装函数send，传入res参数、errcode--表示错误数字、errmsg表示错误信息、data返回的数据
// 主要作用就是返回带状态的json字符串
exports.send = function(res,errcode,errmsg,data){
	if(data == null){
		data = {};
	}
	data.errcode = errcode;
	data.errmsg = errmsg;
	var jsonstr = JSON.stringify(data);
	res.send(jsonstr);
};


exports.get = function (host,port,path,data,callback,safe) {
	/*
	localhost、
	9002、
	/register_gs、
	{
		id:config.SERVER_ID,  ———— 001
		clientip:config.CLIENT_IP, ————— localhost
		clientport:config.CLIENT_PORT, —————— 10000
		httpPort:config.HTTP_PORT, —————— 9003
		load:roomMgr.getTotalRooms(), ———————— 0
	}、
	callback、
	null
	*/
	var content = qs.stringify(data);  
	// id=001&clientip=192.168.21.75&clientport=10000&httpPort=9003&load=0
	var options = {  
		hostname: host,  
		path: path + '?' + content,  
		method:'GET'
	};
	if(port){
		options.port = port;
	}
	var proto = http;
	if(safe){
		proto = https;
	}
	var req = proto.request(options, function (res) {  
		//console.log('STATUS: ' + res.statusCode);  
		//console.log('HEADERS: ' + JSON.stringify(res.headers));  
		res.setEncoding('utf8');  
		res.on('data', function (chunk) {  
			//console.log('BODY: ' + chunk);
			var json = JSON.parse(chunk);
			callback(true,json);
		});  
	});
	  
	req.on('error', function (e) {  
		console.log('problem with request: ' + e.message);
		callback(false,e);
	});  
	  
	req.end(); 
};