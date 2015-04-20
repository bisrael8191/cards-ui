var React = require('react');

var CardSelect = require('../../components/CardSelect/CardSelect.jsx');
var CardDetails = require('../../components/CardDetails/CardDetails.jsx');
var CalendarSelect = require('../../components/CalendarSelect/CalendarSelect.jsx');

var Home = React.createClass({
  componentDidMount: function() {
    document.title = 'Cards';
  },
  render: function () {
    return (
      <div className='card-layout container-fluid'>
        <CardSelect />

        <CalendarSelect />
      
        <CardDetails />
      </div>
    );
  }
});

module.exports = Home;
