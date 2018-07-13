/*
 * @Author: zaccheus 
 * @Date: 2018-07-13 15:21:39 
 * @Last Modified by: zaccheus
 * @Last Modified time: 2018-07-13 15:22:44
 */

var express = require('express');

var app = express();

exports.start = function(config){
	app.listen(config.DEALDER_API_PORT,config.DEALDER_API_IP);
	console.log("dealer api is listening on " + config.DEALDER_API_IP + ":" + config.DEALDER_API_PORT);
};