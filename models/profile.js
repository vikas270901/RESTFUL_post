var mongo = require("mongoose");

var schema = new mongo.Schema({
		ide: String,
		name: String,
		uzername: String,
		gender: String,
		image:String,
		work: String,
		home: String,
		contact: String,
		dob: String,
		about: String,
		status : {type: Number, default: 1}
});
module.exports = new mongo.model("profile", schema);
