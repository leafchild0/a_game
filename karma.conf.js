'use strict';

var path = require('path');
var conf = require('./gulp/conf');

var _ = require('lodash');
var wiredep = require('wiredep');

var pathSrcHtml = [
  path.join(conf.paths.src, '/app/**/*.html')
];

function listFiles() {

  var wiredepOptions = _.extend({}, conf.wiredep, {
    dependencies: true,
    devDependencies: true
  });

  var patterns = wiredep(wiredepOptions).js
    .concat([
      path.join(conf.paths.src, '/app/app.js'),
      path.join(conf.paths.src, '/app/scripts/**/*.js'),
      path.join(conf.paths.tests, '/**/*.js')
    ])
    .concat(pathSrcHtml);

  var files = patterns.map(function (pattern) {
    return {
      pattern: pattern
    };
  });

  return files;
}

module.exports = function(config) {

  var configuration = {
    files: listFiles(),

    singleRun: true,

    autoWatch: false,

    ngHtml2JsPreprocessor: {
      stripPrefix: conf.paths.src + '/',
      moduleName: 'aGame'
    },

    logLevel: 'WARN',

    frameworks: ['jasmine', 'angular-filesort', 'jasmine-matchers'],

    angularFilesort: {
      whitelist: [path.join(conf.paths.src, '/**/!(*.html|*.spec|*.mock).js')]
    },

    browsers : ['PhantomJS2'],

    plugins : [
      'karma-phantomjs2-launcher',
      'karma-angular-filesort',
      'karma-coverage',
      'karma-jasmine',
      'karma-jasmine-matchers',
      'karma-ng-html2js-preprocessor'
    ],

    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },

    reporters: ['progress'],

    // proxies: {
    //   '/assets/': path.join('/base/', conf.paths.src, '/assets/')
    // }
  };

  // This is the default preprocessors configuration for a usage with Karma cli
  // The coverage preprocessor is added in gulp/unit-test.js only for single tests
  // It was not possible to do it there because karma doesn't let us now if we are
  // running a single test or not
  configuration.preprocessors = {};
  pathSrcHtml.forEach(function(path) {
    configuration.preprocessors[path] = ['ng-html2js'];
  });

  config.set(configuration);
};
