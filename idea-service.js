contacts = require('./contacts.js');
Nexmo = require('./nexmo.js');

var amazonDB = require('./db.js');

exports.new = function(idea) {
	if (idea.text == "idea report") {

		// get 5 latest ideas from message.msisdn (phone)
		amazonDB.db().getItem({
			"TableName" : "messages",
			"Key" : {
				"id" : {"N" : "29"},
				// "phone" : {"S" : idea.msisdn},
				"keyword" : {"S" : idea.keyword}
			}
		}, function(err, data) {
			console.log(err);
			console.log(data);
		});
	}
}