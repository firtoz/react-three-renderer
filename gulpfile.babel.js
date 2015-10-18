import gulp from 'gulp';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import gutil from 'gulp-util';
import webpackConfig from './webpack.config.babel';
import path from 'path';
import babel from 'gulp-babel';

gulp.task('webpack-dev-server', (callback) => {
  void callback;

  const host = '0.0.0.0';
  const port = 8080;

  webpackConfig.entry.app = [
    `webpack-dev-server/client?http://${host}:${port}`, // WebpackDevServer host and port
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
  ].concat(webpackConfig.entry.app);

  webpackConfig.module.loaders.unshift({
    test: /\.js$/,
    loaders: ['react-hot'],
    include: path.join(__dirname, 'src'),
  });

  webpackConfig.devtool = 'eval-cheap-module-source-map';
  webpackConfig.plugins = [
    new webpack.HotModuleReplacementPlugin(),
  ];

  // Start a webpack-dev-server
  const compiler = webpack(webpackConfig);

  new WebpackDevServer(compiler, webpackConfig.devServer).listen(port, host, (err) => {
    if (err) {
      throw new gutil.PluginError('webpack-dev-server', err);
    }

    // Server listening
    gutil.log('[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/index.html');

    // keep the server alive or continue?
    // callback();
  });
});

gulp.task('babel', () => {
  return gulp.src('src/React3/**/*.js')
    .pipe(babel({
      optional: ['runtime'],
      stage: 0,
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['webpack-dev-server']);
