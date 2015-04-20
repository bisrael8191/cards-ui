var Reflux = require('reflux');

var Actions = Reflux.createActions([
  'getAllCards',    // Called by the component
  'onAllCards',     // Called by API response in the data store
  'onSelectChange'  // Called when the selection array changes
]);

module.exports = Actions;