Nexmo = require('./nexmo.js');
contacts = require('./contacts.js');
Mantra = require('./mantras.js');

var date = new Date();
var hour = date.getHours();
if (hour >= 8 && hour <= 22)
	Nexmo.send("README", contacts.find_by_name("pa").phone, Mantra.hourly_mantras().join(' / '));