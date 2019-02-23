var mongo = require("mongoose");
var mongosession = require("passport-local-mongoose");
var schema = new mongo.Schema({
	username: String,
	password: String
});

schema.plugin(mongosession);

module.exports = new mongo.model("signup", schema);
