var React = require('react');
var Reflux = require('reflux');
var Select = require('react-select');
var SummaryStore = require('./SummaryStore');
var Actions = require('./Actions');

var CardSelect = React.createClass({
  mixins: [
    Reflux.connect(SummaryStore, 'cardList'),
  ],
  componentDidMount: function () {
    // Query the server on load to get the list of cards
    // TODO: The list and filter could be done in an async manner
    Actions.getAllCards();
  },
  render: function () {
    var cardList = this.state.cardList;

    return (
      <div className='row'>
        <Select
          name="card-select-form"
          options={cardList}
          multi={true}
          placeholder="Select your card(s)"
          onChange={Actions.onSelectChange}
        />
      </div>
    );
  }
});

module.exports = CardSelect;
