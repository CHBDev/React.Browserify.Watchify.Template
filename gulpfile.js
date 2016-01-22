/***************************************************

* Use:
  $: gulp dev
  $: gulp prod

* A purposfully verbose gulpfile for building a Node.js / ReactJS project
* incorporating a local server, and a build pipeline that:
* 1. Transpiles all .jsx files into valid javascript.
* 2. Transpile/Polyfill all ES6 javascript to ES5 (currently always does this)
* 3. Browserifies all CommonJS modules along APP_NAME require chain
* 4. Then for both dev and prod paths:
*    a. places an index.html file with correct relative paths to dev or prod
*    b. places bundle.js into dev, or if prod, then it uglifies to bundle.min.js
* 5. CLI:
*    a. 'gulp prod' or 'gulp dev' will execute all of the above
*    b. and then launch a local file server with a watchified wrapper
*
* Global Package Dependancies:
* -Gulp
***************************************************/


var gulp = require('gulp');
var uglify = require('gulp-uglify');
var browserify = require('browserify');
var watchify = require('watchify');
//var reactify = require('reactify');
//var streamify = require('gulp-streamify');
var htmlreplace = require('gulp-html-replace');
var replace = require('gulp-replace');
var sourcestream = require('vinyl-source-stream');
var sourcebuffer = require('vinyl-buffer');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
// var connect = require('gulp-connect');
var sync = require('browser-sync').create();
var notify = require('gulp-notify');
var babelify = require('babelify');
var rimraf = require('rimraf');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var sassdoc = require('sassdoc');
var mocha = require('gulp-mocha-co');
var exit = require('gulp-exit');
var fs = require('fs');
var del = require('del');
var runSequence = require('run-sequence');
var locs = {};

// ============= CONFIG ======================

locs.INDEX_NAME = "index.html";
locs.APP_NAME = 'App.jsx';
locs.BUNDLE_NAME = 'bundle';
locs.JS_NAME = 'js';
locs.CSS_NAME = 'css';

locs.BUNDLE_PROD_NAME = locs.BUNDLE_NAME + '.min.js';
locs.BUNDLE_DEV_NAME = locs.BUNDLE_NAME + '.js';

locs.PROD_FOLDER = 'public';
locs.SRC_FOLDER = 'src';
locs.BUILD_FOLDER = 'build';
locs.DEV_FOLDER = 'dev';

locs.BUILD_DEV_FOLDER = locs.BUILD_FOLDER + '/' + locs.DEV_FOLDER;
locs.BUILD_DEV_JS_FOLDER = locs.BUILD_DEV_FOLDER + '/' + locs.JS_NAME;
locs.BUILD_DEV_CSS_FOLDER = locs.BUILD_DEV_FOLDER + '/' + locs.CSS_NAME;
locs.BUILD_PROD_FOLDER = locs.BUILD_FOLDER + '/' + locs.PROD_FOLDER;
locs.BUILD_PROD_JS_FOLDER = locs.BUILD_PROD_FOLDER + '/' + locs.JS_NAME;
locs.BUILD_PROD_CSS_FOLDER = locs.BUILD_PROD_FOLDER + '/' + locs.CSS_NAME;

locs.BUNDLE_PROD_FILE = locs.BUILD_PUBLIC_JS_FOLDER + '/' + locs.BUNDLE_PUBLIC_NAME;
locs.BUNDLE_DEV_FILE = locs.BUILD_DEV_JS_FOLDER + '/' + locs.BUNDLE_DEV_NAME;
locs.INDEX_FILE = locs.SRC_FOLDER + '/' + locs.INDEX_NAME;
locs.SRC_JS_FOLDER = locs.SRC_FOLDER + '/' + locs.JS_NAME;
locs.APP_FILE = locs.SRC_JS_FOLDER + '/' + locs.APP_NAME;

locs.SCSS_ALL = './' + locs.SRC_FOLDER + '/scss/**/*.scss';

locs.FILE_SERVE_COMMAND = 'python -m SimpleHTTPServer';
locs.testType = 'spec'; //spec, list, tap

// ============== PRODUCTION ===================

gulp.task('clean_prod', function(cb){
  return rimraf('./' + locs.BUILD_PROD_FOLDER, cb );

});

gulp.task('build_prod_html', function(){
  console.log('START PROD HTML BUILD');
  return gulp.src(locs.INDEX_FILE)
    .pipe(htmlreplace({
      'js': locs.JS_NAME + '/' + locs.BUNDLE_PROD_NAME //NOTE: this is the relative file path referenced from server root
    }))
    .pipe(gulp.dest(locs.BUILD_PROD_FOLDER))
    .pipe(sync.stream())
});

var browserify_prod_props = {
        entries: [locs.APP_FILE],
        extensions: ['.js','.jsx'],
        insertGlobals: false,
        transform: [babelify.configure({presets:["es2015", "react"]})],
        global: true,
        debug: false,
        cache: {},
        packageCache: {},
        fullPaths: false
};

var bundler_prod = browserify(browserify_prod_props);

gulp.task('build_prod_js', function(){
  return build_prod_js();
});

var build_prod_js = function(){
  console.log('START PROD JS BUILD');
  return bundler_prod.bundle()
    .on('error', dontHangOnErrors)
    .pipe(sourcestream(locs.BUNDLE_PROD_NAME))
    .pipe(sourcebuffer())
    .pipe(uglify())
    .pipe(gulp.dest(locs.BUILD_PROD_JS_FOLDER))

};

gulp.task('watch_prod', function() {

  gulp.watch(locs.INDEX_FILE, ['build_prod_html']);

  gulp.watch(locs.SCSS_ALL, ['build_prod_scss']);

  bundler_prod.on('update', function(){
    build_prod_js();
  });

  gulp.watch(locs.BUNDLE_PROD_FILE, ['reload']);
});

gulp.task('build_prod_js_and_reload', ['build_prod_js'], sync.reload);

var sass_prod_options = {
  outputStyle: 'compressed',
  errLogToConsole: true
};

gulp.task('build_prod_scss', function(){
  console.log(locs.SCSS_ALL);
  return gulp
      .src(locs.SCSS_ALL)
      .pipe(sass(sass_prod_options).on('error', sass.logError))
      .pipe(autoprefixer())
      .pipe(gulp.dest(locs.BUILD_PROD_CSS_FOLDER))
      .pipe(sync.stream())

});

gulp.task('build_prod', ['build_prod_html', 'build_prod_scss', 'build_prod_js']);

gulp.task('serve_prod', ['build_prod', 'watch_prod'], function(){
  console.log("Production Server Start");
  return sync.init({
    server: {
      baseDir: locs.BUILD_FOLDER + '/' + locs.PROD_FOLDER
    }
  });
});

//The standard gulp dev runs a local watched file server, this is just a shortcut to run the latest added koa server, but files won't be watched, or built
gulp.task('koa', function(){
  exec('node server.js');
});

gulp.task('jsdoc', function(cb){
  
  exec('jsdoc ./' + locs.SRC_JS_FOLDER + ' -c ./jsdoc.json -r -d ' + locs.BUILD_PROD_FOLDER + '/docs', undefined, cb);
  
});

//TODO: this is the implementation required for the koa mounting app tooling around. Have to repath all the files.
gulp.task('docs', function(cb){
  runSequence('jsdoc','jsdoc_temp', 'jsdoc_del', 'jsdoc_move', 'jsdoc_final' );
});

//Yes, this is rediculous that I'm moving the files before changing them, and then moving them back. Talk to gulp-replace about it.
gulp.task('jsdoc_temp', function(cb){
   return gulp.src("./build/public/docs/*.html")
    .pipe(replace('src="', 'src="./docs/'))
    .pipe(replace('href="', 'href="./docs/'))
    .pipe(replace('src="./docs/http', 'src="http'))
    .pipe(replace('href="./docs/http', 'href="http'))
    .pipe(gulp.dest("./build/public/docs/temp"));
   
});

gulp.task('jsdoc_del', function(cb){
  del("./build/public/docs/*.html");
  cb();
});

gulp.task('jsdoc_move', function(cb){
  return gulp.src("./build/public/docs/temp/*.html")
     .pipe(gulp.dest("./build/public/docs/"));
});

gulp.task('jsdoc_final', function(cb){
  del("./build/public/docs/temp/*.html");
  cb();
});

gulp.task('prod', ['serve_prod']);

// =============== DEV =====================
gulp.task('default', ['dev']);

gulp.task('test', function(cb){
  //spawn('mocha', [], {stdio: 'inherit'});
  gulp.src(['test/*.js'])
    .pipe(mocha({
      reporter: locs.testType

    }))
    .pipe(exit());
});

gulp.task('clean_dev', function(cb){
  return rimraf('./' + locs.BUILD_DEV_FOLDER, cb );
});

var dontHangOnErrors = function(){
  var args = Array.prototype.slice.call(arguments);
   notify.onError({
      title: 'Error in gulp stream process',
      message: '<%= error.message %>'
    }).apply(this, args);
   this.emit('end');
};

gulp.task('build_dev_html', function(){
  console.log('START DEV HTML BUILD');
  return gulp.src(locs.INDEX_FILE)
    .pipe(htmlreplace({
      'js': locs.JS_NAME + '/' + locs.BUNDLE_DEV_NAME //NOTE: this is the relative file path referenced from server root
    }))
    .pipe(gulp.dest(locs.BUILD_DEV_FOLDER))
    .pipe(sync.stream())
});

var browserify_dev_props = {
        entries: [locs.APP_FILE],
        extensions: ['.js','.jsx'],
        insertGlobals: true,
        transform: [babelify.configure({presets:["es2015", "react"]})],
        global: true,
        debug: true,
        cache: {},
        packageCache: {},
        fullPaths: true
};

var bundler_dev = watchify(browserify(browserify_dev_props));

gulp.task('build_dev_js', function(){
  return build_dev_js();
});

var build_dev_js = function(){
  console.log('START DEV JS BUILD');
  return bundler_dev.bundle()
    .on('error', dontHangOnErrors)
    .pipe(sourcestream(locs.BUNDLE_DEV_NAME))
    .pipe(gulp.dest(locs.BUILD_DEV_JS_FOLDER))
    .pipe(sync.stream())
};

gulp.task('reload', function(){
  console.log("SERVER RESTART");
  sync.reload();
});

gulp.task('watch_dev', function() {

  gulp.watch(locs.INDEX_FILE, ['build_dev_html']);

  gulp.watch(locs.SCSS_ALL, ['build_dev_scss']);

  bundler_dev.on('update', function(){
    build_dev_js();
  });

  gulp.watch(locs.BUNDLE_DEV_FILE, ['reload']);
});

gulp.task('build_dev_js_and_reload', ['build_dev_js'], sync.reload);

var sass_dev_options = {
  outputStyle: 'expanded',
  errLogToConsole: true
};

gulp.task('build_dev_scss', function(){
  console.log(locs.SCSS_ALL);
  return gulp
      .src(locs.SCSS_ALL)
      .pipe(sass(sass_dev_options).on('error', sass.logError))
      .pipe(sourcemaps.init())
      .pipe(sourcemaps.write())
      .pipe(autoprefixer())
      .pipe(gulp.dest(locs.BUILD_DEV_CSS_FOLDER))
      .pipe(sync.stream())

});

gulp.task('build_dev', ['build_dev_html', 'build_dev_scss', 'build_dev_js']);

gulp.task('serve_dev', ['build_dev', 'watch_dev'], function(){
  console.log("Development Server Start");
  return sync.init({
    server: {
      baseDir: locs.BUILD_FOLDER + '/' + locs.DEV_FOLDER
    }
  });
});

gulp.task('dev', ['serve_dev']);



