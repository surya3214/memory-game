const gulp = require('gulp'),
      jade = require('gulp-jade'),
      jshint = require('gulp-jshint'),
      sass = require('gulp-sass'),
      useref = require('gulp-useref'),
      uglify = require('gulp-uglify'),
      gulpIf = require('gulp-if'),
      cssnano = require('gulp-cssnano'),
      del = require('del'),
      runSequence = require('run-sequence'),
      browserSync = require('browser-sync').create()

const js_src = 'src/js/**/*.js',
      css_src = 'src/css/**/*.scss',
      jade_src = 'src/jade/**/*.jade'

const js_p_dist = 'pre-dist/js',
      css_p_dist = 'pre-dist/css',
      jade_p_dist = 'pre-dist'

let preBuild = ['jade', 'build-css', 'jshint']

gulp.task('jade', function() {
  return gulp.src(jade_src)
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(jade_p_dist))
})

gulp.task('jshint', function() {
  return gulp.src(js_src)
    .pipe(jshint({
      asi: true,
      esversion: 6
    }))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(gulp.dest(js_p_dist))
})

gulp.task('build-css', function() {
  return gulp.src(css_src)
    .pipe(sass())
    .pipe(gulp.dest(css_p_dist))
})

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'dist/'
    }
  })
})

gulp.task('useref', function() {
  return gulp.src('pre-dist/*.html')
    .pipe(useref())
    // minifies only if it a js file
    // .pipe(gulpIf('*.js', uglify())) // TODO: Find why uglify() is not working
    // minify css files
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.reload({ stream: true }))
})

gulp.task('clean-dist', function() {
  return del.sync('dist')
})

gulp.task('clean-predist', function() {
  return del.sync('pre-dist')
})

gulp.task('watch', function(callback) {
  gulp.watch([js_src, jade_src, css_src], ['build'])
})

gulp.task('pre-build', preBuild)

gulp.task('build', function(callback) {
  runSequence('pre-build', 'useref', 'clean-predist', callback)
})

gulp.task('default', function(callback) {
  runSequence('clean-dist', 'build', ['browserSync', 'watch'], callback)
})
