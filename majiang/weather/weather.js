/*
 * @Author: zaccheus 
 * @Date: 2018-07-05 16:15:45 
 * @Last Modified by: zaccheus
 * @Last Modified time: 2018-07-05 16:40:57
 */
var request = require('request');

class Weather {
  constructor() {}
  search(cityName) {
    Weather.searchNumber += 1;
    if(Weather.notifyNumEvent && typeof Weather.notifyNumEvent === "function") {
      Weather.notifyNumEvent(Weather.searchNumber);
    }
    return new Promise(function (resolve, reject) {
      request(`https://www.sojson.com/open/api/weather/json.shtml?city=${encodeURI(cityName)}`, function (error, response, body) {
        if (response && response.statusCode === 200) {
          var data = JSON.parse(body);
          resolve(data);
        } else {
          reject('接口填写错误，或者接口崩溃');
        }
      });
    });
  }
}

Weather.searchNumber = 0;//静态变量，计数器
Weather.notifyNumEvent = null;//一定数量的通知事件 

module.exports = Weather;