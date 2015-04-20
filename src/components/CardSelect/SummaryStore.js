var Reflux = require('reflux');
var _ = require('lodash');
var Actions = require('./Actions');
var Api = require('../../ServerApi');

var Store = Reflux.createStore({
  // Listen on all Actions
  listenables: [Actions],
  // Invoked by the component to query for data
  getAllCards: function () {
    // Query the server for data
    Api.getAllCards(function (err, res) {
      if (err) {
        console.log(err);
      } else {
        Actions.onAllCards(res);
      }
    });
  },
  // Invoked by this data store
  onAllCards: function (cardList) {
    // Server has responded, so trigger an update
    // with the newly received data
    _.forEach(cardList, function(card) {
      card.value = card.id;
      card.label = card.company + ' ' + card.name;
    });
    this.trigger(_.sortByOrder(cardList, ['label'], [true]));
  },
  // Returns the initial data state for this store
  getInitialState: function () {
    // By default, our data object is empty
    return [];
  }
});

module.exports = Store;
