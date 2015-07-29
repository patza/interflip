http = require('http');
cheerio = require('cheerio');
Nexmo = require('./nexmo.js');



exports.new = function(request) {
	console.log(request);

	var str = "";

	callback = function(response) {
	  response.on('data', function(chunk) {
	  	str += chunk;
	  });

	  response.on('end', function() {
	  	
	  	$ = cheerio.load(str);
			times = $('#prochains_passages table tbody td').next().text();

	  	Nexmo.send("INTERFLIP", contacts.find_by_name("pa").phone, times);
	  });
	}

	
	req = http.get("http://www.ratp.fr/horaires/fr/ratp/bus/prochains_passages/PP/B213/213_11_63/A", callback).end();

}
