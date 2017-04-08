import path from 'path';
import webpack from 'webpack';

export default (options) => {
  const babelLoaderConfig = {
    loader: 'babel-loader',
    exclude: [
      /node_modules/,
      path.join(__dirname, '..', 'lib'),
    ],
    test: /\.jsx?$/,
    query: {},
  };

  if (options.tdd) {
    babelLoaderConfig.query.plugins = [
      require.resolve('./utils/babel-test-plugin.js'),
    ];
  }

  function createEnvDefinePlugins(...args) {
    return args.reduce((accumulator, option) => {
      const values = [];

      switch (typeof option) {
        case 'string':

          if (process.env.hasOwnProperty(option)) {
            let wantedValue = process.env[option];
            if (typeof wantedValue === 'string'
              && wantedValue !== 'true'
              && wantedValue !== 'false') {
              wantedValue = `'${wantedValue}'`;
            }

            values.push({
              arg: option,
              value: wantedValue,
            });
          }

          break;
        case 'object':
          Object.keys(option).forEach((key) => {
            const value = option[key];

            if (value === undefined) {
              return;
            }

            values.push({
              arg: key,
              value,
            });
          });
          break;
        default:
          throw new Error('expected arguments for \'createEnvDefinePlugins\' to be strings or objects');
      }

      values.forEach(({ arg, value }) => {
        /* eslint-disable no-console */
        console.log(`Webpack config: creating env define for ${arg}: "${value}"`);
        /* eslint-enable no-console */

        return accumulator.concat([
          new webpack.DefinePlugin({
            [`process.env.${arg}`]: value,
          }),
        ]);
      });


      return accumulator;
    }, []);
  }

  const webpackConfig = {
    devtool: 'inline-source-map',
    module: {
      loaders: [
        babelLoaderConfig,
      ],
    },
    devServer: {
      stats: {
        colors: true,
      },
    },
    plugins: createEnvDefinePlugins(
      'TRAVIS',
      'NODE_ENV',
      {
        KARMA_TDD: options.tdd,
      }
    ),
    resolve: {
      extensions: [
        '.jsx',
        '.js',
        '*',
      ],
    },
  };

  if (options.coverage) {
    const srcResolve = path.resolve('src');

    babelLoaderConfig.exclude.push(srcResolve);

    webpackConfig.module.preLoaders = [{
      test: /\.jsx?$/,
      include: srcResolve,
      loader: 'isparta-loader',
      options: {
        isparta: {
          embedSource: true,
          noAutoWrap: true,
        },
      },
    }];
  }

  return webpackConfig;
};
