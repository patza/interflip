http = require('http');
cheerio = require('cheerio');
contacts = require('./contacts.js');
Nexmo = require('./nexmo.js');



exports.new = function(request) {
	// console.log(request);


	bus_capture_regex = /BUS ([0-9]+) ([a-z]+)/;

	bus = bus_capture_regex.exec(request.text);
	bus = {
		nb: bus[1],
		station: bus[2]
	}

	if (bus.nb == "213" && bus.station == "noisy")
		ratp = "http://www.ratp.fr/horaires/fr/ratp/bus/prochains_passages/PP/B213/213_21_54/R";
	else if (bus.nb == "213" && bus.station == "churchill")
		ratp = "http://www.ratp.fr/horaires/fr/ratp/bus/prochains_passages/PP/B213/213_11_63/A";
	else if (bus.nb == "220" && bus.station == "bry")
		ratp = "http://www.ratp.fr/horaires/fr/ratp/bus/prochains_passages/PP/B220/220_4/A";
	else if (bus.nb == "220" && bus.station == "churchill")
		ratp = "http://www.ratp.fr/horaires/fr/ratp/bus/prochains_passages/PP/B220/220_25_82/R";
	


	var str = "";
	callback = function(response) {
	  response.on('data', function(chunk) {
	  	str += chunk;
	  });

	  response.on('end', function() {
	  	
	  	$ = cheerio.load(str);
			times = $('#prochains_passages table tbody td').next().text();

			
			result = bus.nb + ' ' + bus.station + ' : ' + times;
			console.log(result);
	  	Nexmo.send("INTERFLIP", contacts.find_by_name("pa").phone, result);
	  });
	}


	req = http.get(ratp, callback).end();
}
