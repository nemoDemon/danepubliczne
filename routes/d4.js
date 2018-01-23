const fetch = require("node-fetch");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;

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

	saveData: async function(data)
	{
		try
		{
			mongoose.Promise = global.Promise;
			mongoose.connect('mongodb://user:123@ds113098.mlab.com:13098/danepubliczne');

			/*let locations = mongoose.model('locations',{
    
				name: {
					type: String,
					require: true
				}
			});
			*/
			let newLocation = new locations({
				name: "name1"
			});
			
			newLocation.save().then((result) => {
				console.log('Zapisano', JSON.stringify(result, undefined, 2));
			}, (err) => {console.log('Error', err);}
			);

			mongoose.disconnect();
		}
		catch(error)
		{
			console.log(error);
			return "Error: " + error;
		}
	}

};

exports.modules = methods;
