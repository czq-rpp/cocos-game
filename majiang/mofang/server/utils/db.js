/*
 * @Author: zaccheus 
 * @Date: 2018-07-09 17:09:21 
 * @Last Modified by: zaccheus
 * @Last Modified time: 2018-07-10 17:25:01
 */

var mysql=require("mysql");  
var crypto = require('./crypto');

var pool = null;

function nop(a,b,c,d,e,f,g){

}

// 封装的query方法，连接数据库
function query(sql,callback){  
  pool.getConnection(function(err,conn){  
      if(err){  
          callback(err,null,null);  
      }else{  
          conn.query(sql,function(qerr,vals,fields){  
              //释放连接  
              conn.release();  
              //事件驱动回调  
              callback(qerr,vals,fields);  
          });  
      }  
  });  
};

exports.init = function(config){
  // 创建数据池
  pool = mysql.createPool({  
      host: config.HOST,
      user: config.USER,
      password: config.PSWD,
      database: config.DB,
      port: config.PORT,
  });
};

// 封装数据库方法：1、传入两个参数：account和回调函数
exports.get_user_data = function(account,callback){
  callback = callback == null? nop:callback;
  if(account == null){
      callback(null);
      return;
  }

  var sql = 'SELECT userid,account,name,lv,exp,coins,gems,roomid FROM t_users WHERE account = "' + account + '"';
  query(sql, function(err, rows, fields) {
      if (err) {
          callback(null);
          throw err;
      }

      if(rows.length == 0){
          callback(null);
          return;
      }
      rows[0].name = crypto.fromBase64(rows[0].name);
      callback(rows[0]);
  });
};