/*
 * @Author: zaccheus 
 * @Date: 2018-07-09 17:09:07 
 * @Last Modified by: zaccheus
 * @Last Modified time: 2018-07-10 11:19:03
 */
var HALL_IP = "192.168.21.75";
var HALL_CLIENT_PORT = 9001;

var ACCOUNT_PRI_KEY = "^&*#$%()@";

var LOCAL_IP = 'localhost';

// mysql数据库配置信息
exports.mysql = function(){
	return {
		HOST:'127.0.0.1',
		USER:'root',
		PSWD:'root',
		DB:'majiang',
		PORT:3306,
	}
}

//账号服配置
exports.account_server = function(){
	return {
		CLIENT_PORT:9000,
		HALL_IP:HALL_IP,
		HALL_CLIENT_PORT:HALL_CLIENT_PORT,
		ACCOUNT_PRI_KEY:ACCOUNT_PRI_KEY,
		
		//
		DEALDER_API_IP:LOCAL_IP,
		DEALDER_API_PORT:12581,
		VERSION:'20161227',
		APP_WEB:'http://fir.im/2f17',
	};
};