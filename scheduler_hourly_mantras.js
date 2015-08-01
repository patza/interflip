Nexmo = require('./nexmo.js');
contacts = require('./contacts.js');
Mantra = require('./mantras.js');

var date = new Date();
var hour = date.getHours();
console.log(hour);
if (hour == 2 || hour == 8 || hour == 14 || hour == 20)
	Nexmo.send("README", contacts.find_by_name("pa").phone, Mantra.hourly_mantras().join(' / '));