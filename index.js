const Hue = require('philips-hue');
const { sleep } = require('./sleep')
const converter = require('./xyToRgb');
const hue = new Hue();
var configFile = __dirname + '/.philips-hue.json';

async function waitLightCheck(light) {
  return await new Promise(resolve => {
    const interval = setInterval(() => {
      light.getInfo()
        .then(function(info){
            const state = info.state;
            console.log(JSON.stringify(state))
            const result = converter.xyToRgb(state.xy[0],state.xy[1],state.bri)
            console.log('light1', state.xy[0],state.xy[1],state.bri)

            //return {hue: state.hue, sat: state.sat, bri: state.bri}
            
            hue.light(2).setState({hue: state.hue, sat: state.sat, bri: state.bri});
            
        });
    }, 1000);
  });
}

async function whileWatch(light) {
  while (true) {
    return light.getInfo()
        .then(function(info){
            const state = info.state;
            console.log(JSON.stringify(state))
            const result = converter.xyToRgb(state.xy[0],state.xy[1],state.bri)
            console.log('light1', state.xy[0],state.xy[1],state.bri)

            //return {hue: state.hue, sat: state.sat, bri: state.bri}
            
            return hue.light(2).setState({hue: state.hue, sat: state.sat, bri: state.bri})
            .then(function() {
              return sleep(1000)
            })
            
        });
  }
} 
 
async function main() {
hue
  .login(configFile)
  .then(function(){
    var light = hue.light(1);
    //light2.setState({hue: 50000, sat: 200, bri: 90});
    waitLightCheck(light)
    //whileWatch(light)
  })
  .then(function(res){
    console.log(res);
  })
  .catch(function(err){
    console.error(err.stack || err);
  });
}


main()
  .catch(err => console.error(err))