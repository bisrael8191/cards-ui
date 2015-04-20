/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router');
var Navbar = require('react-bootstrap').Navbar;
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;
var CollapsableNav = require('react-bootstrap').CollapsableNav;
var DropdownButton = require('react-bootstrap').DropdownButton;
var Input = require('react-bootstrap').Input;
var Label = require('react-bootstrap').Label;
var Button = require('react-bootstrap').Button;

// Index page and main CSS styles
require('./main.less');
require('./index.html');

// Require pages
var Home = require('./pages/Home/Home.jsx');
var About = require('./pages/About/About.jsx');
var NotFound = require('./pages/NotFound/NotFound.jsx');

var App = React.createClass({
  render: function () {
    var brand = <Router.Link to='/'><i className='fa fa-credit-card'></i> Cards</Router.Link>
    return (
      <div>
        <Navbar brand={brand} toggleNavKey={0}>
          <CollapsableNav eventKey={0}> {/* This is the eventKey referenced */}
            <Nav navbar>
              <NavItem eventKey={1} href='#/about'>About</NavItem>
            </Nav>
            <Nav navbar right>
              <NavItem eventKey={1} href='#/'><i className='fa fa-plus-square-o'></i> Create Card</NavItem>
              <DropdownButton eventKey={2} title='Login'>
                <Input type="text" placeholder="Username" id="username" name="username"></Input>
                <Input type="password" placeholder="Password" id="Password" name="password"></Input>
                <Button bsStyle='primary' id='sign-in'>Sign In</Button>
              </DropdownButton>
            </Nav>
          </CollapsableNav>
        </Navbar>
      
        <div className="container">
          <Router.RouteHandler/>
        </div>
      </div>
    );
  }
});


// Define application routes
var routes = (
  <Router.Route handler={App} path="/">
    <Router.DefaultRoute handler={Home}/>
    <Router.Route name='about' handler={About} />
    <Router.NotFoundRoute handler={NotFound}/>
  </Router.Route>
);

// Initialize the router
Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});

/** Code for hot module reloading to replace the CSS file when needed.
 * This code is removed for dist build.
 */
if (module.hot) {
  var element = document.getElementById('mainCss');

  if (!element) {
    var fileref = document.createElement('link');
    fileref.setAttribute('rel', 'stylesheet');
    fileref.setAttribute('type', 'text/css');
    fileref.setAttribute('href', 'main.css');
    fileref.setAttribute('id', 'mainCss');
    document.getElementsByTagName('head')[0].appendChild(fileref);
    element = fileref;
  }

  // accept itself
  module.hot.accept();

  // dispose handler
  module.hot.dispose(function () {
    // remove the current stylesheet
    element.parentNode.removeChild(element);
  });
}