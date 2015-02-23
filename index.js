var express = require('express');
var app = express();
var https = require('https');
var querystring = require('querystring');
var _ = require('underscore')._;
var moment = require('moment');

var contacts = [
	{contact_name: "yohan", phone: "0033669143036"},
	{contact_name: "pa", phone: "0033606551967"},
	{contact_name: "simon", phone: "0033603714466"},
	{contact_name: "anneso", phone: "0033686875602"},
	{contact_name: "xav", phone: "0033618168434"},
	{contact_name: "delarue", phone: "0033667320514"},
	{contact_name: "coralie", phone: "0033689997061"},
	{contact_name: "renato", phone: "0033688350778"}
];

var timetables = {
	"213:churchill" : [
		{'hour' : 8, 'minutes' : [0, 5, 10, 15]},
		{'hour' :9, 'minutes' : [0, 5, 10, 15]},
		{'hour' : 16, 'minutes' : [15, 35, 55]},
		{'hour' : 17, 'minutes' : [0, 15, 35, 55]}
	],
	"213:rer" : [
		{'hour' : 8, 'minutes' : [2, 4, 8, 16]},
		{'hour' : 9, 'minutes' : [3, 6, 9, 12]}
	],
	"220:rer" : [
		{'hour' : 17, 'minutes' : [1, 12, 23, 34, 45, 57]},
		{'hour' : 18, 'minutes' : [9, 21, 33, 45, 55]},
		{'hour' : 19, 'minutes' : [6, 16, 28, 39, 52]},
		{'hour' : 20, 'minutes' : [5, 20, 40]},
		{'hour' : 21, 'minutes' : [0, 20, 40]},
		{'hour' : 22, 'minutes' : [0, 20, 40]},
		{'hour' : 23, 'minutes' : [0, 30]},
		{'hour' : 24, 'minutes' : [0, 30]},
		{'hour' : 25, 'minutes' : [0]}
	]
}


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

	if (/bus:/.exec(parameters.text)) {
		bus_capture_regex = /bus:([0-9a-z:]+)/;
		bus = bus_capture_regex.exec(parameters.text);
		bus_timetable = timetables[bus[1]];


		var now = moment();

		timetable = []
		bus_timetable.forEach(function(v) {
			if (v.hour == now.hour() || v.hour == now.hour() + 1) {
				v.minutes.forEach(function(vv) {
					// if (vv >= now.minutes())
					timetable.push(v.hour + 'h' + vv);
				});

			}
				
		});


		sms = {
			'to': "0033606551967",
			'from': "interflip"
		};


		if (timetable.length > 0) {
			sms.text = "Prochain " + bus[1] + " : " + timetable.join(',');
		} else {
			sms.text = "sorry, no timetable"
		}

		console.log(sms);

		url = nexmo.host + nexmo.path + 'api_key=' + nexmo.key + '&api_secret=' + nexmo.secret + '&from=' + sms.from + "&to=" + sms.to + "&text=" + sms.text;
		https.get(url, function(res_nexmo) {
			res_nexmo.on('data', function(chunk) {
			});
		});
		

	}
	
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
