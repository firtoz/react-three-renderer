// Karma configuration

import webpackConfigurator from './webpack.config.babel';

export default (config) => {
  const options = config.options;

  if (options.type !== 'src' && options.type !== 'lib') {
    throw new Error(`Unsupported type for karma options, expected 'src' or 'lib' but found '${options.type}'`);
  }

  if (options.coverage) {
    console.warn('Coverage enabled.'); // eslint-disable-line
  }

  if (options.tdd) {
    console.warn('🔧🔧🔧 Test-driven-development 🔧🔧🔧'); // eslint-disable-line
  }

  if (options.coverage && options.type !== 'src') {
    throw new Error('Can run test-driven-development or coverage only config with a \'src\' type');
  }

  const webpackConfig = webpackConfigurator(options);

  const testFiles = [];

  let travisFoldName = 'karma';

  if (options.type === 'src') {
    travisFoldName += '-src';
    testFiles.push('src/meta/MockConsole.js');
    testFiles.push('src/tests-src.js');
  } else if (options.type === 'lib') {
    travisFoldName += '-lib';

    testFiles.push('src/tests-lib.js');
  }

  if (process.env.NODE_ENV === 'production') {
    travisFoldName += '-prod';
  }

  console.log('Current test config: ', travisFoldName);

  const configuration = {
    browsers: [
      'Chrome',
    ],

    files: [
      ...testFiles,
      {
        pattern: 'src/**/*.js',
        included: false,
      },
      {
        pattern: '../src/**/*.js',
        included: false,
      },
      {
        pattern: 'src/**/*.jsx',
        included: false,
      },
      {
        pattern: '../src/**/*.jsx',
        included: false,
      },
      // each file acts as entry point for the webpack configuration

      {
        pattern: 'assets/images/*.png',
        watched: false,
        included: false,
        served: true,
        nocache: false,
      },
    ],

    frameworks: ['mocha'],

    preprocessors: testFiles.reduce((map, file) => {
      map[file] = [
        'webpack',
        'sourcemap',
      ];

      return map;
    }, {}),

    reporters: [
      'spec',
    ].concat(options.coverage ? ['coverage'] : []),

    coverageReporter: {
      type: 'html',
      dir: 'coverage/',
    },

    webpack: {
      ...webpackConfig,
    },

    webpackMiddleware: {
      ...webpackConfig.devServer,
      quiet: true,
      noInfo: true,
    },

    plugins: [
      require('karma-webpack'),
      require('karma-mocha'),
      require('karma-spec-reporter'),
      require('karma-chrome-launcher'),
      require('karma-sourcemap-loader'),
    ].concat(options.coverage ? [
      require('karma-coverage'),
    ] : []),
  };

  if (process.env.TRAVIS) {
    configuration.customLaunchers = {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: [
          '--user-data-dir=~/tmp/x',
          '--no-sandbox',
          '--enable-logging=stderr',
          '--v=1',
          '--no-first-run',
          '--noerrdialogs',
          '--enable-webgl',
          '--ignore-gpu-blacklist',
        ],
      },
    };

    configuration.plugins.push(require('karma-travis-fold-reporter'));

    configuration.reporters.push('travis-fold');
    configuration.travisFoldReporter = {
      foldName: travisFoldName,
    };

    // http://swizec.com/blog/how-to-run-javascript-tests-in-chrome-on-travis/swizec/6647
    configuration.browsers = ['Chrome_travis_ci'];

    // to avoid DISCONNECTED messages
    configuration.browserDisconnectTimeout = 10000; // default 2000
    configuration.browserDisconnectTolerance = 1; // default 0
    configuration.browserNoActivityTimeout = 60000; // default 10000
  } else {
    configuration.client = {
      mocha: {
        reporter: 'html', // debug
      },
    };

    if (options.mocha) {
      configuration.client.mocha = {
        ...configuration.client.mocha,
        ...options.mocha,
      }
    }
  }

  if (options.tdd) {
    configuration.autoWatch = true;
    configuration.autoWatchBatchDelay = 0;
    configuration.usePolling = true;
  }

  config.set(configuration);
};
