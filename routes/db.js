const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var locationSchema = new Schema({
	name: {
		type: String,
		require: true
	}
});

const locationModel = mongoose.model('locations', locationSchema);

module.exports = locationModel;

