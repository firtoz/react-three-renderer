/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */

import gulp from 'gulp';
import babel from 'gulp-babel';
import del from 'del';

gulp.task('clean-lib', () => del(['lib/']));

gulp.task('babel', ['clean-lib'], () => gulp.src([
  'src/lib/**/*.js',
  'src/lib/**/*.jsx',
])
  .pipe(babel(require('./package.json').babel))
  .pipe(gulp.dest('lib/')));

gulp.task('clean-docs', () => del(['docs/generated']));

gulp.task('doc', (done) => {
  const docGenerator = require('./docs/src/Generator');

  docGenerator(done);
});

/* eslint-enable global-require */
