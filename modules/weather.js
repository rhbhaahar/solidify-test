const config = require('../config.js')
const https = require('https')

class Weather {
  lat = config.openWeatherApi.lat
  lon = config.openWeatherApi.lon
  apiKey = config.openWeatherApi.apiKey

  async getWeather() {
    return new Promise((resolve, reject) => {
      const req = https.get(`https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&appid=${this.apiKey}&units=metric`, (res) => {
        res.setEncoding('utf8')
        let responseBody = ''

        res.on('data', (chunk) => {
          responseBody += chunk
        })

        res.on('end', () => {
          resolve(JSON.parse(responseBody))
        })
      })

      req.on('error', (err) => {
        reject(err)
      })

      req.end()
    })
  }
}

module.exports = new Weather()
