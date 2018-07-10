/*
 * @Author: zaccheus 
 * @Date: 2018-07-09 17:09:21 
 * @Last Modified by:   zaccheus 
 * @Last Modified time: 2018-07-09 17:09:21 
 */

var mysql=require("mysql");  

var pool = null;

exports.init = function(config){
  pool = mysql.createPool({  
      host: config.HOST,
      user: config.USER,
      password: config.PSWD,
      database: config.DB,
      port: config.PORT,
  });
};