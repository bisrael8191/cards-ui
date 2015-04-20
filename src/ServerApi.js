var Request = require('superagent');

/**
 * This module collects all API calls to the server in one module.
 * This allows us to keep a central location for all URL maintenance
 * and the ability to mock out remote requests for testing.
 */
var e = {};

var apiVersion = '/v0';

// Get a summary of all cards
e.getAllCards = function(callback) {
 Request.get(apiVersion + '/cards/list').end(function(err, res) {
   callback(err, res.body);
 });
}

// Get the details about a specific card
e.getCard = function(cardId, callback) {
 Request.get(apiVersion + '/cards/' + cardId + '/details').end(function(err, res) {
   callback(err, res.body);
 });
}

module.exports = e;
