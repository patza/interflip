var amazonDB = require('./db.js');

var Joke = require('./joke-service.js')
var Bus = require('./bus-service.js');
var Idea = require('./idea-service.js');
var tableName = "messages";

module.exports = function(message) {
	return {
		save: function() {
			
			
			msg = {
				"id": {"N" : parseInt(message.messageId).toString()},  
				"keyword": {"S" : message.keyword},
				"body": {"S" : message.text},
				"timestamp" : {"S" : message['message-timestamp'] || message.message_timestamp},
				"phone" : {"S" : message.msisdn}
			};

			amazonDB.db().putItem({
				"TableName": tableName,
				"Item": msg
			}, function(err, data) {
				console.log(err);
				console.log(data);
			});				
		},
		parse: function() {
			if (message.keyword == "JOKE") {
				Joke.new(message);
			} else if (message.keyword == "BUS") {
				Bus.new(message);
			} else if (message.keyword == "IDEA") {
				console.log("idea new");
				Idea.new(message);
			} else if (message.keyword == "MANTRA") {
				// Mantra.new(message);
			} else if (message.keyword == "CONTACT") {
				// Contact.new(message)
			} else {
				// Contact.new(message);
			}

		}
	}
}