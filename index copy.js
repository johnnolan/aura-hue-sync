const Hue = require('philips-hue');
const { sleep } = require('./sleep')
const converter = require('./xyToRgb');
const { AuraSDK, Controller } = require('aura-sdk')
const hue = new Hue();
var configFile = __dirname + '/.philips-hue.json';

const auraSDK = new AuraSDK()
//const mbController = auraSDK.createMbController()
//const gpuController = auraSDK.createGPUController()
//const dramController = auraSDK.createDramController()
const leds = Controller.joinControllers([
  auraSDK.createMbController(),
  auraSDK.createGPUController(),
  //auraSDK.createDramController()
])

async function waitLightCheck(light) {
  return await new Promise(resolve => {
    const interval = setInterval(() => {
      light.getInfo()
        .then(function(info){
            const state = info.state;
            const result = converter.xyToRgb(state.xy[0],state.xy[1],state.bri)
            console.log(result)
            console.log(result[0])
            console.log(result[1])
            console.log(result[2])
            for (let led of leds) {
              led.setColorNow('red')
            }
            /*while (true) {
              for(let i = 0; i < 360; i++) {
                mbController.setAllColorNow(`hsl(${i}, 100%, 50%)`)
                gpuController.setAllColorNow(`hsl(${i}, 100%, 50%)`)
                //dramController.setAllColorNow(`hsl(${i}, 100%, 50%)`)
                //await sleep(50)
              }
            }*/
            //gpuController.setAllColorNow(`red`)
            //mbController.setAllColorNow(`red`)
            //mbController.setAllColorNow(`rgb(${result[0]}, ${result[1]}, ${result[2]})`)
            //gpuController.setAllColorNow(`rgb(${result[0]}, ${result[1]}, ${result[2]})`)
           //dramController.setAllColorNow(`rgb(${result[0]}, ${result[1]}, ${result[2]})`)
        });
    }, 5000);
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