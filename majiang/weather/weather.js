var request = require('request');

class Weather {
  constructor() {}
  search(cityName) {
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

module.exports = Weather;