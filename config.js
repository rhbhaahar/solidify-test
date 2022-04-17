module.exports = {
  openWeatherApi: {
    lat: 47.21592513018897,
    lon: 38.861763741844655,  // coordinates of desired place for getting weather
    apiKey: '8676e1e647e83b8ce7d95345a6735001'
  },
  initialHomeState: {
    temperature: 26,
    light: false,
    heater: false
  }, // initial parameters for home
  smartDevices: {
    switch: true,
    airConditioner: true,
    heater: true
  }, // you can turn off some devices by toggle values to false
  updateHomeStateInterval: 3600000, // interval for home state update in milliseconds, you can decrease it for test purposes
  devicesNames: {
    switch: 'switch',
    airConditioner: 'airConditioner',
    heater: 'heater'
  },
  signalNames: {
    hot: 'hot',
    cold: 'cold',
    normal: 'normal'
  },
  homeBackTime: '18:30' // time when owner come back home
}
