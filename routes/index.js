var express = require('express');
var router = express.Router();

var d4 = require('./d4.js');

/* GET home page. */
router.get('/', async function(req, res) {
	var title = "Lokalizator";
	var text = "Please put address you are searching for in request text box"
	res.render('index', { title: title, text: text });
});

router.post('/', async function(req, res) {
	var addressPosted =  req.body.town;
	var dzieleniePrzezZero = 5/0;
	if(addressPosted == '')
	{
	var title = "Lokalizator";
	var text = "Address cannot be empty..."

	res.render('index', { title: title, text: text, address: address, latitude: latitude, longtitude: longtitude, elevation: elevation, dateAndTime: dateAndTime });

	}
	else
	{
		var adressUrl = "https://maps.googleapis.com/maps/api/geocode/json?address="+addressPosted+"&key=AIzaSyC_R5Bj6peTehs6YEzuXCDPpqa-VndhKaI";
		var adressReturned = await d4.modules.getLocation(adressUrl);
		var adressArray = adressReturned.split(";");

		var address = adressArray[0];
		var latitude = adressArray[1];
		var longtitude = adressArray[2];

		var weatherUrl = "http://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longtitude+"&units=metric&APPID=ec8c7eeb498daedd31d95674436b2f82";
		var weatherReturned = await d4.modules.getWeather(weatherUrl);
		var weatherArray = weatherReturned.split(";");

		var sky = weatherArray[0];
		var temp = weatherArray[1];
		var pressure = weatherArray[2];

		var elevationUrl = "https://maps.googleapis.com/maps/api/elevation/json?locations="+latitude+","+longtitude+"&key=AIzaSyAOCM4z1CH2j0LldnBXPXh91fKlx8ZTMBk";
		var elevation = await d4.modules.getElevation(elevationUrl);

		var title = "Lokalizator";
		var text = "Found details are presented below..."

		var save = await d4.modules.saveData(address.toString(), latitude.toString(), longtitude.toString());

		res.render('index', { title: title, text: text, address: address, latitude: latitude, longtitude: longtitude, elevation: elevation, sky: sky, temp: temp, pressure: pressure });
	}
});


module.exports = router;
