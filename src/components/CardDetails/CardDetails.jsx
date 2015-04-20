var React = require('react');
var Reflux = require('reflux');
var Badge = require('react-bootstrap').Badge;
var Panel = require('react-bootstrap').Panel;
var Table = require('react-bootstrap').Table;

var DetailsStore = require('./DetailsStore');
var Actions = require('./Actions');

var RewardRow = React.createClass({
  render: function () {
    var cat = this.props.category;

    return (
      <tr>
        <td><Badge>{cat.cashBack}%</Badge></td>
        <td>{cat.category}</td>
        <td>{cat.description}</td>
      </tr>
    );
  }
});

var DetailPanel = React.createClass({
  render: function () {
    var card = this.props.card;
    var icon;
    switch (card.company) {
      case 'VISA':
        icon = <i className='fa fa-cc-visa'></i>
        break;
      case 'Mastercard':
        icon = <i className='fa fa-cc-mastercard'></i>
        break;
      case 'Discover':
        icon = <i className='fa fa-cc-discover'></i>
        break;
      case 'AMEX':
        icon = <i className='fa fa-cc-amex'></i>
        break;
      default:
        icon = <i className='fa fa-credit-card'></i>
    }
    
    var rewardRows = card.categories.map(function (cat) {
      return (
        <RewardRow key={cat.category} category={cat} />
      );
    });
    
    return (
      <div className='row'>
        <Panel collapsable defaultExpanded header={<div>{icon} <strong>{card.company}</strong> {card.name}</div>} bsStyle='info'>
          <Table responsive>
            <thead>
              <tr>
                <th>Cash Back</th>
                <th>Category</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {rewardRows}
            </tbody>
          </Table>
        </Panel>
      </div>
    );
  }
})

var CardDetails = React.createClass({
  mixins: [Reflux.connect(DetailsStore, 'detailsList')],
  render: function () {
    var cardPanels = this.state.detailsList.map(function (card) {
      return (
        <DetailPanel key={card.id} card={card} />
      );
    });
    
    return (
      <div>
        {cardPanels}
      </div>
    );
  }
});

module.exports = CardDetails;
