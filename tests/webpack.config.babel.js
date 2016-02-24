import path from 'path';

const babelLoaderConfig = {
  loader: 'babel',
  exclude: [
    /node_modules/,
    path.join(__dirname, '..', 'lib'),
  ],
  test: /\.js$/,
  query: {},
};

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
};

if (process.env.KARMA_COVERAGE === 'true') {
  const srcResolve = path.resolve('src');

  babelLoaderConfig.exclude.push(srcResolve);

  webpackConfig.module.preLoaders = [{
    test: /.js/,
    include: srcResolve,
    loader: 'isparta',
  }];
}

export default webpackConfig;
