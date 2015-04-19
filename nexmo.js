var https = require('https');

var nexmo = {
	host: "https://rest.nexmo.com",
	path: "/sms/json?",
	key: "64081645",
	secret: "5a984cc2"
}

exports.send = function(from, to, text) {

	url = nexmo.host + nexmo.path + 'api_key=' + nexmo.key + '&api_secret=' + nexmo.secret + '&from=' + from + "&to=" + to + "&text=" + text;
	console.log(url);
	https.get(url, function(res_nexmo) {
		res_nexmo.on('data', function(chunk) {
		
		});
	});
}