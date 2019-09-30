const request = require('request')

const reverseGeocode = (latitude, longitude, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + longitude + ',' + latitude +'.json?access_token=pk.eyJ1IjoiYWRpcGFkaTMiLCJhIjoiY2p1ODlkZ21hMXc5bjQzbnJ6c2czMmtpNCJ9.xxlqr7q4SmGnQdnSuPw8Cg'

    request({url, json: true}, (error, {body} = {}) => {
        if (body == undefined) {
            callback('Unable to connect to location service', undefined)
        } else { 
            callback(undefined, {
                latitude,
                longitude,
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = reverseGeocode