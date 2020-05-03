const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoic2VsZW5ham9zZXBoaW5lIiwiYSI6ImNrNjU3NzN6cjA0eWszZGx2YjRudTlqcDUifQ.OQobJ_TStm-4k7V_cqT8AQ'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services', undefined);
        } else if (body && body.features && body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined);
        }
        else {
            callback(undefined, {
                latitude: body.features[0].geometry.coordinates[0],
                longitude: body.features[0].geometry.coordinates[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;