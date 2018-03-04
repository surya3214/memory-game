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

const js_dist = 'dist/js/',
      css_dist = 'dist/css/',
      jade_dist = 'dist/'

gulp.task('jade', function() {
  return gulp.src(jade_src)
    .pipe(jade())
    .pipe(gulp.dest(jade_dist))
})

gulp.task('jshint', function() {
  return gulp.src(js_src)
    .pipe(jshint({
      asi: true
    }))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(gulp.dest(js_dist))
})

gulp.task('build-css', function() {
  return gulp.src(css_src)
    .pipe(sass())
    .pipe(gulp.dest(css_dist))
})

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'dist/'
    }
  })
})

gulp.task('useref', function() {
  return gulp.src('dist/*.html')
    .pipe(useref())
    // minifies only if it a js file
    .pipe(gulpIf('*.js', uglify()))
    // minify css files
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
})

gulp.task('clean:dist', function() {
  return del.sync('dist')
})

gulp.task('watch', function() {
  gulp.watch(jade_src, ['jade'])
  gulp.watch(js_src, ['jshint'])
  gulp.watch(css_src, ['build-css'])
  gulp.watch('dist/*.html', ['useref'])
  gulp.watch('dist/*', browserSync.reload)
})

gulp.task('default', function(callback) {
  runSequence('clean:dist', ['jade', 'build-css', 'jshint'], 'useref', ['browserSync', 'watch'], callback)
})
