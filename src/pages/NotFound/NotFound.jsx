var React = require('react');

var NotFound = React.createClass({
  componentDidMount: function() {
    document.title = 'Page not Found';
  },
  render: function () {
    return (
      <h2>404'd! No such page. ^.^</h2>
    );
  }
});

module.exports = NotFound;
