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

		var elevationUrl = "https://maps.googleapis.com/maps/api/elevation/json?locations="+latitude+","+longtitude+"&key=AIzaSyAOCM4z1CH2j0LldnBXPXh91fKlx8ZTMBk";
		var elevation = await d4.modules.getElevation(elevationUrl);

		var timezoneOffset = new Date().getTimezoneOffset();
		var dateAndTimeUrl = "https://maps.googleapis.com/maps/api/timezone/json?location="+latitude+","+longtitude+"&timestamp="+timezoneOffset+"&key=AIzaSyAE2Fap3dFbhYgs7OfhMsCKz97u1fI7Lcs";
		var dateAndTime = await d4.modules.getDateAndTime(dateAndTimeUrl);

		var title = "Lokalizator";
		var text = "Found details are presented below..."

		res.render('index', { title: title, text: text, address: address, latitude: latitude, longtitude: longtitude, elevation: elevation, dateAndTime: dateAndTime });
	}
});


module.exports = router;
