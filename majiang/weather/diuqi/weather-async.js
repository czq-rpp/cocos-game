var request = require('request');

class Weather {
  constructor() {
    // 成员变量
    this.cityName = "";
  }
  search(cityName) {
    this.cityName = cityName;
    return new Promise(function (resolve, reject) {
      request(`https://www.sojson.com/open/api/weather/json.shtml?city=${encodeURI(cityName)}`, function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.

        Weather.callNumber += 1;
        if(Weather.notifyNumEvent && typeof Weather.notifyNumEvent === "function") {
          Weather.notifyNumEvent(Weather.callNumber);
        }
        if(response.statusCode === 200) {
          var data = JSON.parse(body);
          var forecast = data.data.forecast;
          resolve(forecast);
        } else {
          reject('发生错误了');
        }
      });
    })
  }
}

Weather.callNumber = 0;//静态变量
Weather.notifyNumEvent = null;//一定数量的通知事件

module.exports = Weather;