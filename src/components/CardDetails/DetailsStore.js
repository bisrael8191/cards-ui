var Reflux = require('reflux');
var _ = require('lodash');

var Actions = require('./Actions');
var SelectStore = require('../CardSelect/SelectStore');
var CalendarStore = require('../CalendarSelect/CalendarStore');
var Api = require('../../ServerApi');

var Store = Reflux.createStore({
  // Listen on all Actions
  listenables: [Actions],
  init: function() {
    // Register SelectStore's changes
    this.listenTo(SelectStore, this.onSelectChange);
    
    // Register CalendarStore's changes
    this.listenTo(CalendarStore, this.onCalendarChange);

    this.selection = [];
    this.cache = {};
    this.month = 1;
  },
  // Invoked by the component to query for data
  getCardDetails: function (id) {
    // Query the server for data
    Api.getCard(id, function (err, res) {
      if (err) {
        console.log(err);
      } else {
        Actions.onCardDetails(res);
      }
    });
  },
  // Invoked by this data store
  onCardDetails: function (cardDetails) {
    // Server has responded, so trigger an update
    // with the newly received data
    
    // Update the cache
    this.cache[cardDetails.id] = cardDetails;
    
    // Trigger an update to the display
    Actions.onUpdate();
  },
  onSelectChange: function (selectArray) {
    // Store the updated selection list
    this.selection = selectArray;
    
    // Get details about any card that isn't cached
    _.forEach(this.selection, function(card) {
      if (!_.includes(this.cache, card)) {
        Actions.getCardDetails(card);
      }
    }, this);
    
    // Trigger an update to the display
    Actions.onUpdate();
  },
  onCalendarChange: function (selectedDate) {
    // Set the month number (1 based)
    this.month = selectedDate + 1;
    
    // Trigger an update to the display
    Actions.onUpdate();
  },
  onUpdate: function () {
    // Loop through each selected card,
    // pull data from the cache (if it exists)
    // create an array that only includes data relevant to the month
    cardList = [];
    _.forEach(this.selection, function(selectedCard) {
      var card = this.cache[selectedCard];
      if (card) {
        details = {
          company: card.company,
          name: card.name,
          categories: []
        };
        
        // Union all rewards for the month into a single array
        _.forEach(card.rewards, function(reward) {
          if (this.month >= reward.startMonth && this.month <= reward.endMonth) {
            details.categories = _.union(details.categories, reward.categories);
          }
        }, this);
        
        // Sort by cash back (descending) and category name
        details.categories = _.sortByOrder(details.categories, ['cashBack', 'category'], [false, true]);
        
        cardList.push(details);
      }
    }, this);
    this.trigger(_.sortByOrder(cardList, ['company', 'name'], [true, true]));
  },
  // Returns the initial data state for this store
  getInitialState: function () {
    // By default, our data object is empty
    return [];
  }
});

module.exports = Store;
