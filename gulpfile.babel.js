import gulp from 'gulp';
import babel from 'gulp-babel';
import del from 'del';

gulp.task('clean-lib', () => {
  return del(['lib/']);
});

gulp.task('babel', ['clean-lib'], () => {
  return gulp.src('src/**/*.js')
    .pipe(babel({
      optional: ['runtime'],
      stage: 0,
    }))
    .pipe(gulp.dest('lib/'));
});
