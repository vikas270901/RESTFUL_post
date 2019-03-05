var mongo = require("mongoose");
var schema = new mongo.Schema({
	text: String,
	author: String
});

module.exports = new mongo.model("user", schema);
