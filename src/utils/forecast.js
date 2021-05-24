
const request = require('postman-request')

const forecast = (latitude, longitude, callback)=>{
	const url = 'http://api.weatherstack.com/current?access_key=84ccbbd3e2f725f753e05cb126c0f65b&query='+ latitude  +',' + longitude +'&units=f'
	request({url, json: true}, (error, {body}={})=>{
		if (error) {
			callback('Unable to connect the weater service!', undefined)

		}else if (body.error) {
			callback('Unable to find location', undefined)

		}else{
			callback(undefined, `Сейчас в ${body.location.name} ${body.current.weather_descriptions[0]} ${body.current.temperature} градусов, ощущается как ${body.current.feelslike}`)

		}

	})
}

module.exports = forecast