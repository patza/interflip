Nexmo = require('./nexmo.js');
contacts = require('./contacts.js');
Mantra = require('./mantras.js');


var date = new Date();
day = (date.getMonth() + 1) + '_' + date.getDate();

fs.readFile('mantras_stay_positive/' + day + '.txt', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }

  Nexmo.send("LOVEYOU", contacts.find_by_name("pa").phone, data);
  // Nexmo.send("LOVEYOU", contacts.find_by_name("coralie").phone, data);
});


