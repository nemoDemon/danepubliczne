const fetch = require("node-fetch");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://user:123@ds113098.mlab.com:13098/danepubliczne');

var Schema = mongoose.Schema;

var locationSchema = new Schema({
	address: {
		type: String,
		require: true
	},
	latitude: {
		type: String
	},
	longtitude: {
		type: String
	}

});

const locationModel = mongoose.model('locations', locationSchema);

var methods =
{
	getLocation: async function(addressUrl)
	{
		try
		{
			const response = await fetch(addressUrl);
			const json = await response.json();

			var address = json.results[0].formatted_address;
			var latitude = json.results[0].geometry.location.lat;
			var longtitude = json.results[0].geometry.location.lng;

			console.log("Address: " + address);
			console.log("Latitude: " + latitude);
			console.log("Longtitude: " + longtitude);

			var weatherResponse = await fetch("http://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longtitude+"&units=metric&APPID=ec8c7eeb498daedd31d95674436b2f82");
			var weatherJson = await weatherResponse.json();
			console.log(weatherJson);
			var sky = weatherJson.weather[0].main;
			var temperature = weatherJson.weather[0].temp;
			var pressure = weatherJson.weather[0].pressure;
			console.log(sky);
			console.log(temperature);
			console.log(pressure);
			var returnStr = address + ";" + latitude + ";" + longtitude;
			return returnStr;
		}
		catch(error)
		{
			console.log(error);
			return "Error: " + error;
		}
	},

	getElevation: async function(elevationUrl)
	{
		try
		{
			const response = await fetch(elevationUrl);
			const json = await response.json();

			var elevation = json.results[0].elevation;
	
			console.log("Elevation: " + elevation);

			return elevation;
		}
		catch(error)
		{
			console.log(error);
			return "Error: " + error;
		}
	},

	getDateAndTime: async function(dateAndTimeUrl)
	{
		try
		{
			const response = await fetch(dateAndTimeUrl);
			const json = await response.json();

			var timestamp = new Date().getTime();
			var dstOffset = json.dstOffset;
			var rawOffset = json.rawOffset;
	
			var dateAndTime = new Date(timestamp + dstOffset + rawOffset);
		
			console.log("Date and time: " + dateAndTime);

			return dateAndTime;
		}
		catch(error)
		{
			console.log(error);
			return "Error: " + error;
		}
	},

	saveData: async function(inAddress, inLatitude, inLongtitude)
	{
		try
		{
			let newLocation = new locationModel();
			
			newLocation.address = inAddress;
			newLocation.latitude = inLatitude;
			newLocation.longtitude = inLongtitude;
			
			newLocation.save().then((result) => {
				console.log('Saved', JSON.stringify(result, undefined, 2));
			}, (err) => {console.log('Error', err);}
			);
		}
		catch(error)
		{
			console.log(error);
			return "Error: " + error;
		}
	}

};

exports.modules = methods;
