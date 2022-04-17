const config = require('../config.js')
const weather = require('./weather.js')
const { Switch, AirConditioner, Heater } = require('./smartDevices.js')

class SmartHome {
  availableDevices = ['switch', 'airConditioner', 'heater']
  connectedDevices = []
  switch
  airConditioner
  heater
  homeState = {...config.initialHomeState}

  async init() {
    console.log('SmartHome started!')
    this.showHomeState()
    this.connectDevices()
    this.startMainProcess()
  }

  showHomeState(prefix = 'Current') {
    console.log(`\n------------\n${prefix} home state:\n\nTemperature: ${this.homeState.temperature}\nLight: ${this.lightState}\nHeater: ${this.heaterState}\n------------\n`)
  }

  get displayingHomeState() {
    return `------------\nCurrent home state:\n\nTemperature: ${this.homeState.temperature}\nLight: ${this.lightState}\nHeater: ${this.heaterState}\n------------\n`
  }

  async getWeatherInfo() {
    try {
      const weatherInfo = await weather.getWeather()

      if (weatherInfo.main && weatherInfo.main.temp) {
        return this.analyzeTemperature(weatherInfo.main.temp)
      } else {
        console.log('NO TEMPERATURE FROM API')
      }
    } catch (error) {
      console.log(`ERROR getting weather: ${error}`)
    }
  }

  connectDevices() {
    this.availableDevices.forEach( (device, index) => {
      if (config.smartDevices[device]) {
        switch (device) {
          case config.devicesNames.switch:
            this.switch = new Switch()
            break
          case config.devicesNames.airConditioner:
            this.airConditioner = new AirConditioner()
            break
          case config.devicesNames.heater:
            this.heater = new Heater()
            break
        }

        this.connectedDevices.push(device)
      }
    })

    console.log(`\nAll connected devices - ${this.availableDevices.join(', ')}`)
  }

  async startMainProcess() {
    await this.sendSignalToAllConnectedDevices()

    setTimeout(this.startMainProcess.bind(this), config.updateHomeStateInterval)
  }

  async sendSignalToAllConnectedDevices() {
    const signal = await this.getWeatherInfo()

    if (signal) {
      this.connectedDevices.forEach(device => {
        const updatedState = this[device].sendSignal(signal, this.homeState.temperature)
        this.homeState = {...this.homeState, ...updatedState}
      })
      this.showHomeState('Updated')
    }
  }

  analyzeTemperature(temp) {
    const temperature = Math.round(temp)

    if (temperature > 30) {
      return config.signalNames.hot
    } else if (temperature < 15) {
      return config.signalNames.cold
    } else {
      return config.signalNames.normal
    }
  }

  updateHomeState(updatedState) {
    this.homeState = {...this.homeState, ...updatedState}
  }

  get lightState() {
    return this.homeState.light ? 'ON' : 'OFF';
  }

  get heaterState() {
    return this.homeState.heater ? 'ON' : 'OFF';
  }
}

module.exports = new SmartHome()
