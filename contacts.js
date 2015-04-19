var _ = require('underscore')._;

var contacts = [
	{contact_name: "yohan", phone: "0033669143036"},
	{contact_name: "pa", phone: "0033606551967"},
	{contact_name: "simon", phone: "0033603714466"},
	{contact_name: "anneso", phone: "0033686875602"},
	{contact_name: "xav", phone: "0033618168434"},
	{contact_name: "delarue", phone: "0033667320514"},
	{contact_name: "coralie", phone: "0033689997061"},
	{contact_name: "renato", phone: "0033688350778"},
	{contact_name: "lisanne", phone: "0033646082713"},
	{contact_name: "elodie", phone: "0033681750929"},
	{contact_name: "thyda", phone: "0033695195156"},
	{contact_name: "harmo", phone: "0033672983291"},
	{contact_name: "smady", phone: "0033625790562"},
	{contact_name: "majos", phone: "0033619419525"},
	{contact_name: "victoria", phone: "0033643094264"},
	{contact_name: "majospere", phone: "0033614958146"},
	{contact_name: "etienne", phone: "0033634255359"},
	{contact_name: "pd", phone: "0033630590917"}

];

var tableName = "contacts";

var list = function() {
	return contacts;
}

var find_by_name = function(contact_name) {
	return _.find(list(), function(obj) { return obj.contact_name == contact_name });
}

module.exports = {
	list: list,
	find_by_name: find_by_name
}