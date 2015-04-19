var AWS = require('aws-sdk');

AWS.config.region = 'eu-west-1';

var db = new AWS.DynamoDB();

exports.db = function() {
	return db;
}

// db.listTables(function(err, data) {
//   console.log(data.TableNames);
// });




// var contactItem = {
// 	'id': {"N" : "3"},
// 	'contactName' : {"S" : "Andre"},
// 	'contactPhone' : {"S" : "0606551967"}
// }

// PUT ITEM
// db.putItem({
// 	"TableName": tableName,
// 	"Item":contactItem
// }, function(err, data) {
// 	console.log(err);
// 	console.log(data);
// });

// GET ITEM
// db.getItem({
// 	"TableName": tableName,
// 	"Key": {
// 		"id" : {"N" : "1"}
// 	}
// }, function(err, data) {
// 	console.log(err);
// 	console.log(data);
// })

// GET ALL ITEM