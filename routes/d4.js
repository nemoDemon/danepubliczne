const fetch = require("node-fetch");

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
	}

};

exports.modules = methods;
