import gulp from 'gulp';
import babel from 'gulp-babel';
import del from 'del';

gulp.task('clean-dist', () => {
  return del(['dist/']);
});

gulp.task('babel', ['clean-dist'], () => {
  return gulp.src('src/**/*.js')
    .pipe(babel({
      optional: ['runtime'],
      stage: 0,
    }))
    .pipe(gulp.dest('dist/'));
});
