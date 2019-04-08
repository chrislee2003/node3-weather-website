const request = require('request')
//Weather API = https://docs.mapbox.com/api/search/#data-types
//pk.eyJ1IjoiaGluaGluIiwiYSI6ImNqdHRyY2VsNTFlcjY0ZW5zcGNidDdsd2EifQ.12nNhVrJYMCxJvpzGtKnPQ
//API: https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiaGluaGluIiwiYSI6ImNqdHRyY2VsNTFlcjY0ZW5zcGNidDdsd2EifQ.12nNhVrJYMCxJvpzGtKnPQ

// request({
//     'url': 'https://api.mapbox.com/geocoding/v5/mapbox.places/Hongkong.json?access_token=pk.eyJ1IjoiaGluaGluIiwiYSI6ImNqdHRyY2VsNTFlcjY0ZW5zcGNidDdsd2EifQ.12nNhVrJYMCxJvpzGtKnPQ',
//     'method': 'GET',
//     'proxy': 'http://proxy.pccw.com:8080',
//     'json': true
// }, (error, response) => {
//     if (error){
//         console.log('Unable to Collect to local services.')
//     } else if(response.body.features.length === 0){
//         console.log('Unable to find the location. PLease try another search .')
//     }else{
//         const latitude = response.body.features[0].center[1]
//         const longitude = response.body.features[0].center[0]
//         console.log(latitude, longitude)
//     }
// }) 

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiaGluaGluIiwiYSI6ImNqdHRyY2VsNTFlcjY0ZW5zcGNidDdsd2EifQ.12nNhVrJYMCxJvpzGtKnPQ'

    request({url, proxy: 'http://proxy.pccw.com:8080', json: true}, (error, {body}) => {
        if(error){
            callback('Unable to collect location services.', undefined)
        } else if(body.features.length === 0){
            callback('Unable to find the location. PLease try another search.', undefined)
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode