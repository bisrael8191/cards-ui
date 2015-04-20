var Reflux = require('reflux');

var Actions = Reflux.createActions([
  'getCardDetails',    // Called by the component
  'onCardDetails',     // Called by API response in the data store
  'onUpdate'           // Called any time there is an update to the user's selection or calendar
]);

module.exports = Actions;