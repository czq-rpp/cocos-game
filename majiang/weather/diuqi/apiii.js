var Weather = require('./weather-async');

async function run() {
  var WeInstance = new Weather();
  var data = await WeInstance.search('合肥').catch(
    function(err) {
      console.log(err);
    }
  );
  console.log(data);
}

run();