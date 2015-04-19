var amazonDB = require('./db.js');

var Joke = require('./joke-service.js')
var Bus = require('./bus-service.js');

var tableName = "inboud_messages";

module.exports = function(message) {
	return {
		save: function() {
			msg = {
				'Message ID': {'N' : message.msisdn},
				'text': {"S" : message.text}
			};

			amazonDB.db().putItem({
				"TableName": tableName,
				"Item": msg
			}, function(err, data) {
				
			});				
		},
		parse: function() {
			if (message.keyword == "JOKE") {
				Joke.new(message);
			} else if (message.keyword == "BUS") {
				Bus.new(message);
			} else if (message.keyboard == "IDEA") {
				// Idea.new(message);
			} else if (message.keyboard == "MANTRA") {
				// Mantra.new(message);
			} else if (message.keyboard == "CONTACT") {
				// Contact.new(message)
			} else {
				// Contact.new(message);
			}

		}
	}
}