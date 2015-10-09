import path from 'path';
import webpack from 'webpack';

const outPath = path.join(__dirname, 'build');

export default {
  entry: {
    app: [
      './src/index.js',
    ],
  },
  output: {
    path: outPath,
    filename: path.join('js', 'bundle.js'),
  },
  'module': {
    'loaders': [
      {
        exclude: /(node_modules|bower_components)/,
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          optional: ['runtime'],
          stage: 0,
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
    hot: true,
    inline: true,
    stats: {colors: true},
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"',
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      mangle: true,
    }),
  ],
};
