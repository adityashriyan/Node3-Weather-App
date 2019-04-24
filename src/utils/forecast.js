const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/a813af19395c90a7608369cada86f2fd/'+latitude+','+longitude+'?units=si'

    request({url, json: true}, (error, {body}) => {

        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const forecast_string = body.daily.summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain. If it does rain though (I can\'t see the future na..), it will do so with a ' + body.currently.precipIntensity + '% intensity'
            callback(undefined, forecast_string)
        }
    })
}

module.exports = forecast