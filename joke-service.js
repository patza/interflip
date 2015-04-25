
contacts = require('./contacts.js');
Nexmo = require('./nexmo.js');

var excluded_fake_names = ["SFR", "dieu"];

exports.new = function(joke) {
	joke_capture_regex = /.+ ([a-z]+):(.+):(.+)/;

	joke = joke_capture_regex.exec(joke.text);
	
	var joke = {
		contact_name: joke[1],
		fake_name: joke[2],
		text: encodeURIComponent(joke[3])
	}

	
	if (excluded_fake_names.indexOf(joke.fake_name) < 0) {
		Nexmo.send(joke.fake_name, contacts.find_by_name(joke.contact_name).phone, joke.text);
	}
	
}
