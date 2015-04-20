var React = require('react');
var Reflux = require('reflux');
var _ = require('lodash');
var moment = require('moment');
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var ButtonGroup = require('react-bootstrap').ButtonGroup;
var Button = require('react-bootstrap').Button;

var CalendarStore = require('./CalendarStore');
var Actions = require('./Actions');

var MonthButton = React.createClass({
  render: function() {
    return (
      <Button bsSize='small' bsStyle={this.props.bsStyle} active={this.props.active} onClick={this.props.onClick}>{this.props.label}</Button>
    );
  }
});

// TODO: This component isn't responsive and looks bad on mobile devices, fix!
var CalendarSelect = React.createClass({
  mixins: [
    Reflux.connect(CalendarStore, 'selectedDate')
  ],
  render: function () {
    var cur = this.state.selectedDate;
    var MonthList = _.range(0,12).map(function (monthId) {
      var curMonth = cur === monthId;
      return (
        <MonthButton
          key={monthId}
          bsStyle={curMonth ? 'info' : 'default'}
          active={curMonth}
          label={moment().month(monthId).format('MMM')}
          onClick={Actions.onCalendarChange.bind(this, monthId)} />
      );
    });

    return (
      <div className='row col-xs-offset-3'>
        <ButtonToolbar>
          <ButtonGroup>
            {MonthList}
          </ButtonGroup>
        </ButtonToolbar>
      </div>
    );
  }
});

module.exports = CalendarSelect;
