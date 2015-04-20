var Reflux = require('reflux');
var Actions = require('./Actions');

var Store = Reflux.createStore({
  // Listen on all Actions
  listenables: [Actions],
  onSelectChange: function (selectArray) {
    selectArray = selectArray.split(',');
    if (selectArray[0] === '') {
      selectArray = [];
    }

    this.trigger(selectArray);
  },
  // Returns the initial data state for this store
  getInitialState: function () {
    // By default, our data object is empty
    return [];
  }
});

module.exports = Store;
