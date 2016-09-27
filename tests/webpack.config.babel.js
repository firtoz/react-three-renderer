import path from 'path';
import webpack from 'webpack';

const babelLoaderConfig = {
  loader: 'babel',
  exclude: [
    /node_modules/,
    path.join(__dirname, '..', 'lib'),
  ],
  test: /\.jsx?$/,
  query: {},
};

function createEnvDefinePlugins(...args) {
  return args.reduce((accumulator, arg) => {
    if (process.env.hasOwnProperty(arg)) {
      let wantedValue = process.env[arg];
      if (typeof wantedValue === 'string'
        && wantedValue !== 'true'
        && wantedValue !== 'false') {
        wantedValue = `'${wantedValue}'`;
      }

      /* eslint-disable no-console */
      console.log(`Webpack config: creating env define for ${arg}: "${wantedValue}"`);
      /* eslint-enable no-console */

      return accumulator.concat([
        new webpack.DefinePlugin({
          [`process.env.${arg}`]: wantedValue,
        }),
      ]);
    }

    return accumulator;
  }, []);
}

const webpackConfig = {
  devtool: 'inline-source-map',
  // *optional* isparta options: istanbul behind isparta will use it
  isparta: {
    embedSource: true,
    noAutoWrap: true,
    // these babel options will be passed only to isparta and not to babel-loader
    babel: {
      //   presets: ['es2015', 'stage-0', 'react']
    },
  },
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
    'KARMA_TDD'
  ),
  resolve: {
    extensions: [
      '',
      '.js',
      '.jsx',
    ],
  },
};

if (process.env.KARMA_COVERAGE === 'true') {
  const srcResolve = path.resolve('src');

  babelLoaderConfig.exclude.push(srcResolve);

  webpackConfig.module.preLoaders = [{
    test: /\.jsx?$/,
    include: srcResolve,
    loader: 'isparta',
  }];
}

export default webpackConfig;
