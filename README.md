Cards UI
=======

A user interface for the credit card rewards demo site.

This project uses the following scripts, frameworks, libraries:

* [React](https://facebook.github.io/react/)
* [React Bootstrap](https://react-bootstrap.github.io/)
* [React Select](https://github.com/JedWatson/react-select)
* [Webpack](https://webpack.github.io/)
* [Gulp](http://gulpjs.com/)
* Many others, check the package.json file

## Getting Started
Always install node modules first. If this is your first Gulp project, install gulp-cli globally in order to run the `gulp` command.

```
  npm install
  npm install -g gulp-cli
```

### Developer Mode
In dev mode, the UI assets will be served using the webpack-dev-server and enable hot reloading of any component/style
changes. All API calls will be proxied to the backend server, which is assumed to be running on the same host on
port 5555.

```
  gulp
```

Open your browser window to: [http://127.0.0.1:5000/](http://127.0.0.1:5000/)

### Testing
Testing is done with a karma server and chrome. Test files must end in "-test.js" and will be automatically run while 
the server is running. Tests can be debugged easily in the Chrome browser by clicking the "debug" button and opening 
the source browser. All files are located under the "webpack" tree item and follow the src directory structure.

```
  gulp test
```

Testing can be run while dev mode is active if executed in a third terminal window.

To run all tests once and generate a coverage report without doing a full build, run:

```
  gulp release-test
```

### Release Build
This project is designed to be deployed inside of a docker container. The Dockerfile is based on the official nginx 
container and serves the static assets built by webpack. [Docker](https://www.docker.com/) must be installed on your 
platform and be in your user's path. Then follow the steps:

* Bump the version number in the package.json file (using sem versioning: major.minor.patch format)
* Build the code and image: `npm run docker-build`
* Test the container: `npm run docker-run`
* *Optional:* Check the container logs: `npm run docker-logs`
* *Optional:* Stop and remove the container: `npm run docker-stop`
* Push the image to a local docker registry: `npm run docker-push`
* Deploy the update on the cluster(TBD)

#### Local build
To build a release for local testing, run the command: `gulp build`

This will build the application with all release optimizations, runs unit tests, and generates a code coverage report. 
Coverage reports can be found in the '/coverage' folder.
