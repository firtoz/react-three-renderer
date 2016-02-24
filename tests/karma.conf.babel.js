// Karma configuration

import webpackConfig from './webpack.config.babel.js';

const isCoverage = process.env.KARMA_COVERAGE === 'true';

if (isCoverage) {
  console.warn('Coverage enabled.'); // eslint-disable-line
}

const testFiles = [
  'src/meta/MockConsole.js',
  'src/tests-src.js',
];

if (!isCoverage && !process.env.KARMA_TDD) {
  testFiles.push('src/tests-lib.js');
}

export default (config) => {
  const configuration = {
    browsers: [
      'Chrome',
    ],

    files: [
      ...testFiles,
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
    ].concat(isCoverage ? ['coverage'] : []),

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
    ].concat(isCoverage ? [
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

    // http://swizec.com/blog/how-to-run-javascript-tests-in-chrome-on-travis/swizec/6647
    configuration.browsers = ['Chrome_travis_ci'];
  } else {
    configuration.client = {
      mocha: {
        reporter: 'html', // debug
      },
    };
  }

  config.set(configuration);
};
