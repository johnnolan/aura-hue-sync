const Hue = require('philips-hue');
const hue = new Hue();
var configFile = __dirname + '/.philips-hue.json';
 
hue
  .login(configFile)
  .then(function(conf){
    return hue.light(1).on();
  })
  .then(function(res){
    console.log(res);
  })
  .catch(function(err){
    console.error(err.stack || err);
  });