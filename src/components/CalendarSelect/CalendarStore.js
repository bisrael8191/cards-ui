var Reflux = require('reflux');
var Actions = require('./Actions');

var Store = Reflux.createStore({
  // Listen on all Actions
  listenables: [Actions],
  onCalendarChange: function (selectedDate) {
    this.trigger(selectedDate);
  },
  // Returns the initial data state for this store
  getInitialState: function () {
    // By default, use the current month
    return new Date().getMonth();
  }
});

module.exports = Store;
