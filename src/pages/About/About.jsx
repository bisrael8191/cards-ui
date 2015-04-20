var React = require('react');

var About = React.createClass({
  componentDidMount: function() {
    document.title = 'About';
  },
  render: function () {
    return (
      <div>
        <p />This is a demo site that is being used to explore developing, deploying, and scaling a
        web application on a cloud architecture.
        <br />
        <br />
        The code for the UI, server, and supporting projects can be found on Github:
        <br />
        <a href='https://github.com/bisrael8191/cards-ui'><i className='fa fa-github'></i> Cards-UI project</a>
        <br />
        <a href='https://github.com/bisrael8191/cards-server'><i className='fa fa-github'></i> Cards-Server project</a>
        <br />
        <br />
        At some point there will be a series of blog posts about the architecture on <a href='http://www.bisrael8191.com/posts/'> my site</a>
        <br />
        <br />
        <p /> Even though this isn't a "real" site, I do have some site improvement ideas:
        <ul>
          <li>Registration and User Logins</li>
          <li>Oauth login with Google, Facebook, Twitter, Github, etc.</li>
          <li>Signed in users will save their cards</li>
          <li>Signed in users can create/modify cards</li>
          <li>Modify interface to be responsive on mobile devices, the month picker does weird things on small screens</li>
          <li>Async card searching</li>
          <li>Async card details, allow updates from other users</li>
          <li><a href='https://github.com/bisrael8191/cards-ui/issues'><i className='fa fa-github'></i> Cards-UI Issues</a></li>
          <li><a href='https://github.com/bisrael8191/cards-server/issues'><i className='fa fa-github'></i> Cards-Server Issues</a></li>
        </ul>
      </div>
    );
  }
});

module.exports = About;
