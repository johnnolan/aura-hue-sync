const Hue = require('philips-hue');
const hue = new Hue();

hue.getBridges()
  .then(function(bridges){
    console.log(bridges);
    var bridge = bridges[0]; // use 1st bridge
    console.log("bridge: "+bridge);
    //const auth = hue.auth('192.168.0.102');
    //console.log(auth)
    //return auth
    return hue.auth('192.168.0.102');
  })
  .then(function(username){
    console.log("username: "+username);
 
    // controll Hue lights
    hue.light(1).on();
    hue.light(2).off();
    hue.light(3).setState({hue: 50000, sat: 200, bri: 90});
  })
  .catch(function(err){
    console.error(err.stack || err);
  });