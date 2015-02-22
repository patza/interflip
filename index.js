var express = require('express');
var app = express();
var https = require('https');
var querystring = require('querystring');
var _ = require('underscore')._;


var contacts = [
	{contact_name: "yohan", phone: "0033669143036"},
	{contact_name: "pa", phone: "0033606551967"},
	{contact_name: "simon", phone: "0033603714466"},
	{contact_name: "anneso", phone: "0033686875602"},
	{contact_name: "xav", phone: "0033618168434"}
];


var nexmo = {
	host: "https://rest.nexmo.com",
	path: "/sms/json?",
	key: "64081645",
	secret: "5a984cc2"
}


app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/interflip', function(req, res) {
	var parameters = {
		senderId: req.query.msisdn,
		messageId: req.query.messageId,
		text: req.query.text
	};

	
	if (/joke:/.exec(parameters.text)) {
		joke_capture_regex = /joke:([a-z]+):([a-z]+):([a-zA-Z0-9]+)/;
		joke = joke_capture_regex.exec(parameters.text);
		var joke = {
			contact_name: joke[1],
			fake_name: joke[2],
			text: joke[3]
		}


		contact = _.find(contacts, function(obj) { return obj.contact_name == joke.contact_name })
		
		url = nexmo.host + nexmo.path + 'api_key=' + nexmo.key + '&api_secret=' + nexmo.secret + '&from=' + joke.fake_name + "&to=" + contact.phone + "&text=" + joke.text;
	
		https.get(url, function(res_nexmo) {
			res_nexmo.on('data', function(chunk) {
			});
		});
		
	}	
	
	res.statusCode = 200;
	res.send("OK");
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
