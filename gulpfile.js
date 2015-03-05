'use strict';

var gulp = require('gulp');

var notify = require('gulp-notify');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var uglify = require('gulp-uglify');
var deploy = require('gulp-gh-pages');
var file = require('gulp-file');

var del = require('del');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var pipe = require('multipipe');
var browserify = require('browserify');
var watchify = require('watchify');
var browserSync = require('browser-sync');
var doc = require('./lib/js/document').toString;

var pkg = require('./package.json');

// Browserify needs a leading './'
var indexPath = './lib/js/client.js';

var scripts = [
  'gulpfile.js',

  // This one is for components
  '*/*.js',
  '!output/**/*',

  'lib/**/*.js',
  'test/**/*.js',
  indexPath
];

var outputPath = 'output';

// Error notification handler
var errorNotifier = notify.onError({
  title: function () {
    return pkg.name + ' error';
  },
  message: function (error) {
    console.log(error);
    return error.message || 'A task has reported errors!';
  }
});

var jsFilter = function (path) {
  return path.slice(-3) == '.js';
};

var lint = function (paths) {
  return pipe(
    gulp.src(paths || scripts),
    jshint(),
    jshint.reporter('default'),
    jshint.reporter('fail'),
    jscs()
  );
};

var serve = function (done) {
  browserSync({
    tunnel: 'ragg',
    server: {
      baseDir: [outputPath]
    }
  }, done);
};

gulp.task('clean', function (done) {
  del([outputPath], done);
});

gulp.task('lint', lint.bind(null, undefined));

gulp.task('js', ['clean', 'lint'], function () {
  return browserify(indexPath)
    .transform({global: true}, 'uglifyify')
    .bundle()
    .pipe(source('client.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(outputPath));
});

gulp.task('html', ['clean'], function () {
  return file('index.html', doc(), {src: true})
    .pipe(gulp.dest(outputPath));
});

gulp.task('watchify', ['clean', 'lint'], function () {
  var bundler = watchify(browserify(indexPath, watchify.args));

  var bundle = function (paths) {
    // Filter out package.json.
    paths = paths && paths.filter(jsFilter);
    // The watchify watcher steps over gulp.watch so we need to check JS here.
    if (paths && paths.length) {
      lint(paths).on('error', errorNotifier);
    }

    return bundler.bundle()
      .on('error', errorNotifier)
      .pipe(source('client.js'))
      .pipe(gulp.dest(outputPath))
      .pipe(browserSync.reload({stream: true}));
  };

  bundler.on('update', bundle);
  return bundle();
});

gulp.task('watch', ['watchify', 'html']);

gulp.task('serve', serve);

gulp.task('default', ['watch'], serve);

gulp.task('build', ['js', 'html']);

gulp.task('deploy', function () {
  return gulp.src('./' + outputPath + '/**/*')
    .pipe(deploy());
});
