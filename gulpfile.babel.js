import gulp from 'gulp';
import babel from 'gulp-babel';
import del from 'del';

gulp.task('clean-lib', () => {
  return del(['lib/']);
});

gulp.task('babel', ['clean-lib'], () => {
  return gulp.src('src/**/*.js')
    .pipe(babel({
      plugins: ['transform-runtime', 'transform-decorators-legacy'],
      presets: ['es2015', 'stage-0', 'react']
    }))
    .pipe(gulp.dest('lib/'));
});

gulp.task('clean-docs', () => {
  return del(['docs/generated']);
});

gulp.task('doc', (done) => {
  const docGenerator = require('./docs/src/Generator.js');

  docGenerator(done);
});
