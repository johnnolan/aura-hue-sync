const Hue = require('philips-hue');
const converter = require('./xyToRgb');
//const { sleep } = require('./sleep')
//const { AuraSDK, Controller } = require('aura-sdk')
const hue = new Hue();
var configFile = __dirname + '/.philips-hue.json';

/*
const auraSDK = new AuraSDK()
const leds = Controller.joinControllers([
  auraSDK.createMbController(),
  auraSDK.createGPUController(),
  auraSDK.createDramController()
])
*/

async function waitLightCheck(light) {
  return await new Promise(resolve => {
    const interval = setInterval(() => {
      light.getInfo()
        .then(function(info){
            const state = info.state;
            const result = converter.xyToRgb(state.xy[0],state.xy[1],state.bri)
            console.log(result)
            //led.setColorNow(color)
        });
    }, 300);
  });
}
 
hue
  .login(configFile)
  .then(function(){
    var light = hue.light(1);
    waitLightCheck(light)
  })
  .then(function(res){
    console.log(res);
  })
  .catch(function(err){
    console.error(err.stack || err);
  });