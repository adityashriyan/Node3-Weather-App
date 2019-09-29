const request = require('request')

const reverseGeocode = (latitude, longitude, callback) => {
    const url = 'https://api.opencagedata.com/geocode/v1/json?key=9854d0c971b541ec8c29349d08389c52&q=' + latitude + '%2C' + longitude +'&pretty=1'

    request({url, json: true}, (error, {body} = {}) => {
        if (body == undefined) {
            callback('Unable to connect to location service', undefined)
        } else { 
            callback(undefined, {
                latitude,
                longitude,
                location: body.results[0].formatted
            })
        }
    })
}

module.exports = reverseGeocode