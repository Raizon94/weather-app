const request = require('request')
const geocode = require('./geocode')

const forecast = (lat, lon, callback) => {
  const url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=ea832b5177187c74c93749ec4ab3f8dc&units=metric'

  request({url, json: true}, (error, {body}) => {
    if(error) {
      callback(error, undefined)
    } else if(body.cod == 400) {
      callback(body, undefined)
    } else {
      callback(undefined, body.main)
    }
  })
}

module.exports = forecast
