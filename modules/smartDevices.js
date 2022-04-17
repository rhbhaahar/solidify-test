const config = require('../config.js')
const smartHome = require('./smartHome.js')

class SmartDevice {
  name = 'Basic Smart Device'
  availableSignals = Object.values(config.signalNames)

  displayInfo(msg) {
    console.log(msg)
  }

  sendSignal(signalName, temperature) {
    if (!this.availableSignals.includes(signalName)) {
      console.log(`${this.name} got unexpected signal - ${signalName}, nothing to do`)
      return
    }
    console.log(`${this.name} got ${signalName} signal`)
    return this.doAction(signalName, temperature)
  }

  doAction(signalName) {
    console.log(signalName)
  }
}

class Switch extends SmartDevice {
  name = 'Switch'

  doAction(signalName) {
    switch (signalName) {
      case config.signalNames.hot:
        return { light: false }
      case config.signalNames.cold:
        return { light: true }
    }
  }
}

class AirConditioner extends SmartDevice {
  name = 'AirConditioner'
  state = 'ON'

  doAction(signalName, temperature) {
    switch (signalName) {
      case config.signalNames.hot:
        this.state = 'ON'
        return { temperature: temperature - 10 }
      case config.signalNames.cold:
        this.state = 'ON'
        return { temperature: temperature + 13 }
      case config.signalNames.normal:
        this.state = 'OFF'
        return {}
    }
    this.displayInfo(`${this.name} is ${this.state}`)
  }
}

class Heater extends SmartDevice {
  name = 'Heater'
  state = 'OFF'

  doAction(signalName) {
    if (signalName === config.signalNames.cold && this.calculateOwnerGettingHomeInterval()) {
      this.state = 'ON'
      setTimeout(() => {
        this.state = 'OFF'
        smartHome.updateHomeState({ heater: false })
        this.displayInfo(`${this.name} is ${this.state}`)
      }, 25*60*1000)
      return { heater: true }
    }
    this.displayInfo(`${this.name} is ${this.state}`)
  }

  calculateOwnerGettingHomeInterval() {
    const date = new Date()
    const currentHour = date.getHours()
    const currentMinutes = date.getMinutes()

    const [homeBackHour, homeBackMinutes] = config.homeBackTime.split(':')

    const range = parseInt(homeBackHour)*60 + parseInt(homeBackMinutes) - currentHour*60 - currentMinutes

    return range > 0 && range < 60
  }
}

module.exports = {
  Switch,
  AirConditioner,
  Heater
}
