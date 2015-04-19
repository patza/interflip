var express = require('express');
var app = express();
var inboundMessage = require('./inbound_message.js');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/interflip', function(req, res) {
	
	var message = inboundMessage(req.query);
	message.save(), message.parse();

	res.statusCode = 200, res.send("OK");
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
