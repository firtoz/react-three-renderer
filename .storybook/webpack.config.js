
module.exports = {
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.jsx$/, loaders: [ 'babel' ], exclude: /node_modules/, include: __dirname },
    ]
  }
};
