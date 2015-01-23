'use strict';

var path = require('path');
var join = path.join;

var gulp = require('gulp');

var notify = require('gulp-notify');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var uglify = require('gulp-uglify');
var deploy = require('gulp-gh-pages');
var file = require('gulp-file');

var del = require('del');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var merge = require('merge-stream');
var pipe = require('multipipe');
var browserify = require('browserify');
var watchify = require('watchify');
var browserSync = require('browser-sync');
var svgcss = require('svgcss');
var imageToCss = require('./lib/js/image-to-css');
var doc = require('./lib/js/document').toString;
var vars = require('./lib/js/variables');
var scssVars = require('./lib/js/scss-vars');

var pkg = require('./package.json');

var tmpPath = '.tmp';

// Browserify needs a leading './'
var indexPath = './lib/js/client.js';

var src = {
  scripts: [
    'gulpfile.js',

    // This one is for components
    '*/*.js',
    '!output/**/*',

    'lib/**/*.js',
    'test/**/*.js',
    indexPath
  ],
  styles: ['style.scss', join(tmpPath, 'scss/*.scss')],
  svg: 'images/*.svg',
  includes: ['node_modules', 'lib/scss', join(tmpPath, 'scss')]
};
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

var checkJs = function (paths) {
  return pipe(
    gulp.src(paths || src.scripts),
    jshint(),
    jshint.reporter('default'),
    jshint.reporter('fail'),
    jscs()
  );
};

var serve = function (done) {
  browserSync({
    // tunnel: pkg.name,
    server: {
      baseDir: [outputPath]
    }
  }, done);
};

gulp.task('clean', function (done) {
  del([outputPath, tmpPath], done);
});

gulp.task('checkJs', checkJs.bind(null, undefined));

gulp.task('js', ['clean', 'checkJs'], function () {
  return browserify(indexPath)
    .transform({global: true}, 'uglifyify')
    .bundle()
    .pipe(source('client.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(outputPath));
});

gulp.task('vars', ['clean'], function () {
  return file('_variables.scss', scssVars(vars), {src: true})
    .pipe(gulp.dest(join(tmpPath, 'scss')));
});

gulp.task('css',  ['vars', 'images'], function () {
  return gulp.src(src.styles)
    .pipe(sass({
      outputStyle: 'nested',
      includePaths: src.includes
    }))
    .pipe(autoprefixer(['last 2 versions', 'Android 4', 'IE 8']))
    .pipe(csso())
    .pipe(gulp.dest(outputPath));
});

function images(done) {
  svgcss({

    source: src.svg,
    destination: tmpPath + '/scss/_images.scss',
    fallback: outputPath + '/png.css',
    process: imageToCss.bind(undefined, vars)
  }, done);
}

gulp.task('images', ['clean'], images);

gulp.task('html', ['clean'], function () {
  return file('index.html', doc(), {src: true})
    .pipe(gulp.dest(outputPath));
});

gulp.task('watchify', ['clean'], function () {
  var bundler = watchify(browserify(indexPath, watchify.args));

  var bundle = function (paths) {
    // Filter out package.json.
    paths = paths && paths.filter(jsFilter);
    // The watchify watcher steps over gulp.watch so we need to check JS here.
    if (paths && paths.length) {
      checkJs(paths).on('error', errorNotifier);
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

gulp.task('watch', ['watchify'], function () {
  var stylesTask = function () {
    return gulp.src(src.styles)
      .pipe(sass({
        outputStyle: 'nested',
        includePaths: src.includes,
        onError: errorNotifier
      }))
      .on('error', errorNotifier)
      .pipe(autoprefixer(['last 2 versions', 'Android 4', 'IE 8']))
      .pipe(gulp.dest(outputPath))
      .pipe(browserSync.reload({stream: true}));
  };

  var imagesTask = function () {
    images(function () {
      browserSync.reload();
    });
  };

  gulp.watch(src.scripts).on('change', function (file) {
    checkJs(file.path).on('error', errorNotifier);
  });
  gulp.watch(src.styles).on('change', stylesTask);
  gulp.watch(src.svg).on('change', imagesTask);

  // TODO: iconsTask needs to initially run before stylesTask.
  return merge(checkJs(), stylesTask(), imagesTask());
});

gulp.task('serve', serve);

gulp.task('default', ['watch'], serve);

gulp.task('build', ['js', 'css', 'html']);

gulp.task('deploy', function () {
  return gulp.src('./' + outputPath + '/**/*')
    .pipe(deploy());
});
