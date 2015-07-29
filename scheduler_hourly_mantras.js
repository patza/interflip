// scheduler_hourly_mantras.js
// every hour, send mantras to PA's phone.

Nexmo = require('./nexmo.js');
contacts = require('./contacts.js');

mantras = [];
mantras[0] = "You are by what you do. Do More. Stay busy.";
mantras[1] = "Ma parole est impeccable. J'assume mes actions. 0 jugement, 0 critique.";
mantras[2] = "Je peux le faire, je peux rendre ce que je veux une réalité.";
mantras[3] = "Fais quelque chose qui te fait peur. Reste inspiré."


Nexmo.send("README", contacts.find_by_name("pa").phone, mantras.join(' / '));
