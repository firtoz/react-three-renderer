/* eslint-disable import/no-extraneous-dependencies */

import gulp from 'gulp';
import babel from 'gulp-babel';
import del from 'del';
import path from 'path';
import eslint from 'gulp-eslint';
import cache from 'gulp-cached';
import { log, PluginError, colors } from 'gulp-util';
import { Server as KarmaServer } from 'karma';
import minimist from 'minimist';
import fs from 'fs';

/* eslint-enable import/no-extraneous-dependencies */

function emptyTask(done) {
  done();
}

gulp.task('clean-lib', () => del(['lib/']));

/* eslint-disable global-require */

gulp.task('babel', gulp.series('clean-lib', () => gulp.src([
  'src/lib/**/*.js',
  'src/lib/**/*.jsx',
])
  .pipe(babel(require('./package.json').babel))
  .pipe(gulp.dest('lib/'))), emptyTask);


// https://stackoverflow.com/a/26038979
// Modified to use streams
// Also not to create extra directory for first target
function copyFile(source, target) {
  let targetFile = target;

  // if target is a directory a new file with the same name will be created
  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isDirectory()) {
      targetFile = path.join(target, path.basename(source));
    }
  }

  fs.createReadStream(source).pipe(fs.createWriteStream(targetFile));
}

function copyFolderRecursiveSync(source, target) {
  // copy
  if (fs.lstatSync(source).isDirectory()) {
    fs.readdirSync(source).forEach((file) => {
      const curSource = path.join(source, file);
      if (fs.lstatSync(curSource).isDirectory()) {
        // check if folder needs to be created or integrated
        const targetFolder = path.join(target, path.basename(curSource));

        if (!fs.existsSync(targetFolder)) {
          fs.mkdirSync(targetFolder);
        }

        // console.log('copying recursive', curSource, targetFolder);
        copyFolderRecursiveSync(curSource, targetFolder);
      } else {
        // console.log('copying file', curSource, target);

        copyFile(curSource, target);
      }
    });
  }
}

gulp.task('doc', (done) => {
  // require the generator here
  const docGenerator = require('./docs/src/Generator');

  docGenerator(() => {
    const wikiPath = path.resolve('../react-three-renderer.wiki/');
    if (fs.existsSync(wikiPath)) {
      copyFolderRecursiveSync(path.resolve('./wiki/'), wikiPath);
    }

    done();
  });
});

/* eslint-enable global-require */

gulp.task('eslint', () => {
  let failures = 0;

  return gulp.src(['./*', './src/**/*', './docs/src/**/*', './tests/**/*'].reduce((result, current) => {
    result.push(`${current}.js`);
    result.push(`${current}.jsx`);

    return result;
  }, []).concat(['!./tests/coverage/**/*']))
    .pipe(cache('eslint'))
    .pipe(eslint({
      cache: true,
      extensions: ['.js', '.jsx'],
    }))
    .pipe(eslint.formatEach())
    .pipe(eslint.result((result) => {
      if (result.warningCount > 0 || result.errorCount > 0) {
        // If a file has errors/warnings remove uncache it
        delete cache.caches.eslint[path.resolve(result.filePath)];

        failures += result.warningCount + result.errorCount;
      }
    }))
    .pipe(eslint.results(() => {
      if (failures > 0) {
        throw new PluginError('gulp-eslint', {
          name: 'ESLintError',
          message: `Failed with ${failures}${failures === 1 ? ' error' : ' errors'}`,
        });
      }
    }));
});

gulp.task('eslint-before-commit', gulp.series((done) => {
  log(colors.bgGreen('Running eslint before commit'));

  done();
}, 'eslint'));


function karma(options) {
  return function karmaTask(done) {
    new KarmaServer({
      configFile: path.resolve('tests/karma.conf.js'),
      options,
    }, done).start();
  };
}

function karmaSingle(options) {
  return function karmaSingleTask(done) {
    new KarmaServer({
      configFile: path.resolve('tests/karma.conf.js'),
      singleRun: true,
      options,
    }, done).start();
  };
}

const originalNodeEnv = process.env.NODE_ENV;

function envProd(done) {
  process.env.NODE_ENV = 'production';

  done();
}

function restoreNodeEnv(done) {
  process.env.NODE_ENV = originalNodeEnv;

  done();
}

gulp.task('karma-src', karmaSingle({
  type: 'src',
}));

gulp.task('karma-lib', karmaSingle({
  type: 'lib',
}));


gulp.task('karma', gulp.series('karma-src', 'karma-lib'), emptyTask);

gulp.task('karma-src-prod', gulp.series(envProd, 'karma-src', restoreNodeEnv), emptyTask);
gulp.task('karma-lib-prod', gulp.series(envProd, 'karma-lib', restoreNodeEnv), emptyTask);
gulp.task('karma-prod', gulp.series('karma-src-prod', 'karma-lib-prod'), emptyTask);

gulp.task('test', gulp.series(
  'eslint',
  'babel',
  'karma',
  'karma-prod'
), emptyTask);

function runTdd(done) {
  const argv = minimist(process.argv.slice(2), {
    grep: '',
  });

  if (argv.grep !== '' && argv.grep !== undefined) {
    log(`Using test filter: '${argv.grep}'`);
  }

  karma({
    tdd: true,
    type: 'src',
    mocha: {
      grep: argv.grep,
    },
  })(done);
}

gulp.task('tdd', runTdd);

gulp.task('tdd-prod', gulp.series(envProd, runTdd, restoreNodeEnv), emptyTask);

gulp.task('cover', karmaSingle({
  type: 'src',
  coverage: true,
}));
