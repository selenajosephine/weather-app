const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/399f47b1909ba2f6042da8815e1397ed/' + latitude + ',' + longitude;
    request(
        { url, json: true },
        (error, { body: { error: err, daily, currently: { temperature, precipProbability } } }) => {
            if (error) {
                callback('Unable to connect to location services', undefined);
            }
            else if (err) {
                callback('Unable to find location. Try another search', undefined);
            }
            else {
                callback(undefined,
                    daily.data[0].summary + ' It is currently ' +
                    temperature + ' degress out. There is a ' +
                    precipProbability + '% chance of rain.'
                )
            }
        })
}

module.exports = forecast;