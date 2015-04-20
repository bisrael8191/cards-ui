module.exports = function (config) {
  config.set({
    browsers: ['Chrome'], //run in Chrome
    singleRun: true, //just run once by default
    frameworks: ['jasmine'], //use the mocha test framework
    files: [
      'src/**/*-test.js' //just load this file
    ],
    preprocessors: {
      'src/**/*-test.js': ['webpack', 'sourcemap'] //preprocess with webpack and our sourcemap loader
    },
    reporters: ['dots', 'coverage'], //report results in this format
    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    },
    webpack: { //kind of a copy of your webpack config
      devtool: 'inline-source-map', //just do inline source maps instead of the default
      module: {
        loaders: [
          {
            test: /\.less$/,
            loader: 'style!css!less'
          },
          {
            test: /\.jsx$/,
            loader: 'jsx-loader'
          },
          {
            test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'file-loader?name=[name].[ext]'
          },
          {
            test: /\.html$/,
            loader: 'file-loader?name=[name].[ext]'
          }
        ],
        postLoaders: [
          {
            test: /^((?!test)(?!node_modules).)*\.jsx?$/,
            loader: 'istanbul-instrumenter'
          }
        ]
      }
    },
    webpackServer: {
      noInfo: true //please don't spam the console when running in karma!
    }
  });
};
