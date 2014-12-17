/* jshint strict: true, browser: true, devel: true, node: true */
/* global require, console */
'use strict';

/** Build Guidelines
 * - compilation target (start script) must be a single file (no *.(scss|js) in gulp.src)
 * - for every script/style, it's generated:
 *    - a debug version .bundle.(css|js) with EMBEDDED source maps
 *    - a minified version .bundle.min.(css|js) with FILE source maps (.map)
 *    ./styles/main.scss --> main.bundle.css, main.bundle.min.css
 *    ./styles/main.js --> main.bundle.css, main.bundle.min.js
 * - generated files are put in the same directory as source's.
 * - with each grunt task, it's put a command line that does the same action
 * - ...
 */

var pkg = require('./package.json');

var gulp = require('gulp');


var gutil = require('gulp-util');

var argv = require('minimist')(process.argv.slice(2));
var IS_WATCH = !!argv.watch;
if (IS_WATCH) {
  gutil.log(
    gutil.colors.red('--watch:'),
    'Watching for changes...'
  );
}

gulp.doneCallback = function () {
  console.log('Done.');
  IS_WATCH = false;
};


var sourcemaps = require('gulp-sourcemaps');


// var clone = require('gulp-clone');
var es = require('event-stream');


// var gulpIf = require('gulp-if');
var gulpIgnore = require('gulp-ignore');

var rename = require('gulp-rename');

var concat = require('gulp-concat');


var sass = require('gulp-sass');
var concatCss = require('gulp-concat-css');
var cssmin = require('gulp-cssmin');


var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');


gulp.task('default', ['common', 'main']);

gulp.task('styles', ['common-styles']);

gulp.task('scripts', ['common-scripts', 'main-scripts']);


gulp.task('common', ['common-styles', 'common-scripts']);


/**
 * ./app/styles/main.scss --> main.bundle.css, main.bundle.min.css
 * sass ./app/styles/main.scss:app/styles/main.css
 * sass -w ./app/styles/main.scss:app/styles/main.css // watch
 */
gulp.task('common-styles', function () {

  var DIR = './app/styles';

  var stream = gulp.src(DIR + '/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(rename('main.bundle.css'))
    // .pipe(concatCss('main.bundle.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(DIR))
    .pipe(cssmin())
    .pipe(rename('main.bundle.min.css'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(DIR));

  if (IS_WATCH)
    gulp.watch(DIR + '/*.scss', ['common-styles']);

  return stream;

});

/**
 * ./app/scripts/main.js --> main.bundle.js, main.bundle.min.js
 * cat ./app/lib/jquery/dist/jquery.js ./app/lib/bootstrap/dist/js/bootstrap.js > ./app/main.bundle.js
 */
gulp.task('common-scripts', function () {

  var DIR = './app/scripts';

  var stream = gulp.src([
      './app/components/jquery/dist/jquery.js',
      './app/components/bootstrap/dist/js/bootstrap.js'
    ])
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    .pipe(concat('main.bundle.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(DIR))
    .pipe(uglify())
    .pipe(rename('main.bundle.min.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(DIR));

  // if (IS_WATCH)
  //  gulp.watch(['bower.json', DIR + '/*.js', '!*.bundle.js', '!*.min.js'], ['common-scripts']);

  return stream;

});

gulp.task('main', ['main-scripts']);

// gulp.task('main-styles', [
//   'main-main-styles',
// ]);

// gulp.task('main-main-styles', styleTaskFactory('./app/modules/main/styles', 'main', 'main-main-styles'));

gulp.task('main-scripts', scriptTaskFactory('./app/modules/main/scripts', 'main'));

/**
 * DIR/FILENAME.scss --> FILENAME.css, FILENAME.bundle.min.css
 * sass DIR/FILENAME.scss:DIR/FILENAME.css
 * sass -w DIR/FILENAME.scss:DIR/FILENAME.css // watch
 */
function styleTaskFactory(DIR, FILENAME, TASKNAME) {
  return function () {

    var stream = gulp.src(DIR + '/' + FILENAME + '.scss')
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(rename(FILENAME + '.bundle.css'))
      // .pipe(concatCss(FILENAME + '.bundle.css'))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(DIR))
      .pipe(gulpIgnore.exclude('*.map'))
      .pipe(cssmin())
      .pipe(rename(FILENAME + '.bundle.min.css'))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(DIR));

    if (IS_WATCH)
      gulp.watch([DIR + '/' + FILENAME + '.scss', DIR + '/_*.scss'], [TASKNAME]);

    return stream;

  };
}

/**
 * DIR/FILENAME.js --> FILENAME.bundle.js, FILENAME.bundle.min.js
 * browserify -d DIR/FILENAME.js -o DIR/FILENAME.bundle.js
 * watchify -dv DIR/FILENAME.js -o DIR/FILENAME.bundle.js
 */
function scriptTaskFactory(DIR, FILENAME) {
  return function () {

    var bundler = IS_WATCH ? watchify(browserify(DIR + '/' + FILENAME + '.js', {
      cache: {},
      packageCache: {},
      // fullPaths: true,
      debug: true
    })) : browserify(DIR + '/' + FILENAME + '.js', {
      debug: true
    });

    function bundle(files) {

      if (files)
        console.log(files, ' changed. Bundling ...');

      var stream1 = bundler.bundle()
        .pipe(source(FILENAME + '.bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({
          loadMaps: true
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(DIR))
        .pipe(gulpIgnore.exclude('*.map'))
        .pipe(sourcemaps.init({
          loadMaps: true
        }))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(rename(FILENAME + '.bundle.min.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(DIR));

      var stream2 = gulp.src(['./app/scripts/bundle.js', DIR + '/' + FILENAME + '.bundle.js'])
        .pipe(sourcemaps.init({
          loadMaps: true
        }))
        .pipe(rename(FILENAME + '.bundle.all.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(DIR))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(rename(FILENAME + '.bundle.all.min.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(DIR));

      return es.merge(stream1, stream2);

    }

    if (IS_WATCH)
      bundler.on('update', bundle);

    bundler.on('log', gutil.log.bind(gutil, 'Done.'));
    bundler.on('error', gutil.log.bind(gutil, 'Error: '));

    return bundle();

  };
}
