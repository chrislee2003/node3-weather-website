const request = require('request')

//Weather API = darksky.net/dev
//key = a57c6b8e569bdee98ecd971066483e83
// API: https://api.darksky.net/forecast/a57c6b8e569bdee98ecd971066483e83/37.8267,-122.4233

// request({
//     'url': 'https://api.darksky.net/forecast/a57c6b8e569bdee98ecd971066483e83/37.8267,-122.4233?units=si&lang=zh-tw',
//     'method': 'GET',
//     'proxy': 'http://proxy.pccw.com:8080',
//     'json': true
// }, (error, response, body) => {
//     if (!error && response.statusCode == 200){
//         //console.log(response.body.currently)
//         console.log(response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degrees out. There is a '+ body.currently.precipProbability + '% chance of rain.')
//     }
// }) 
const forecast = (latitude, longitude, callback) =>{
    const url = 'https://api.darksky.net/forecast/a57c6b8e569bdee98ecd971066483e83/'+encodeURIComponent(latitude)+','+ encodeURIComponent(longitude)
    request({url, proxy: 'http://proxy.pccw.com:8080', json: true}, (error, {body}) => {
        if(error){
            callback('Can not find location services!', undefined)
        } else if(body.error){
            callback('Data Invalid!', undefined)
        }else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' +body.currently.temperature + ' degrees out. There is a '+ body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast