var gulp = require('gulp');
var karma = require('gulp-karma');
var del = require('del');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var distConfig = require('./webpack-dist.config');
var devConfig = require('./webpack-dev.config');

// Delete the dist directory
gulp.task('clean', function (cb) {
  del(['dist'], cb);
});

// Run Karma in watch mode
gulp.task('test', function () {
  gulp.src('src/**/*-test.js')
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'watch'
    }));
});

// Run karma single run for release build
gulp.task('release-test', function () {
  gulp.src('src/**/*-test.js')
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', function (err) {
      console.error(err);
    });
});

// Run webpack
gulp.task('webpack', ['clean', 'release-test'], function (callback) {
  webpack(distConfig, function (err, stats) {
    console.log(stats.toString());
    callback();
  });
});

// Start the webpack dev server. Run this with 'gulp dev'.
// Proxy to the backend server on port 5555.
gulp.task('dev', function () {
  new WebpackDevServer(webpack(devConfig), {
    publicPath: devConfig.output.publicPath,
    hot: true,
    watchDelay: 50,
    contentBase: "http://127.0.0.1:5555",
    proxy: [
      {
        path: '/v0/*',
        target : 'http://127.0.0.1:5555/'
      }
   ]
  }).listen(5000, '0.0.0.0', function (err) {
      if (err) {
        console.log(err);
      }
      console.log('Listening at localhost:5000');
    });
});

// Build
gulp.task('build', ['webpack']);

// By default, run the dev server
gulp.task('default', ['dev']);
