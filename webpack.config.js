import path from 'path';

const outPath = path.join(__dirname, 'build');

import rewruteModules from 'fbjs/'

export default {
  entry: {
    app: ['./src/index.js'],
  },
  output: {
    path: outPath,
    filename: 'bundle.js',
  },
  'module': {
    'loaders': [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          optional: ['runtime'],
          stage: 0,
          plugins: rewruteModules,
        },
      },
    ],
    'resolve': {
      'extensions': ['', '.js', '.jsx'],
    },
  },
  devServer: {
    contentBase: outPath,
    // noInfo: true, //  --no-info option
    // hot: true,
    inline: true,
    stats: {colors: true},
  },
};
