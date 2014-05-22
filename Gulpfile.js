var gulp = require('gulp');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');


var paths = {
  scripts: ['app/assets/js/**/*.js'],
  style: ['app/assets/style/**/*.scss'],
  images: ['app/assets/img/**/*.scss']
};

gulp.task('scripts', function () {
  return gulp.src(paths.scripts)
    .pipe(gulp.dest('public/js'));
});

gulp.task('style', function () {
  return gulp.src(paths.style)
    .pipe(sass({
      includePaths: [
        "public/bowerc",
        "app/assets/style"
      ]}))
    .pipe(gulp.dest('public/css'));
});

gulp.task('images', function () {
  return gulp.src(paths.images)
    .pipe(gulp.dest('public/img'));
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.style, ['style']);
  gulp.watch(paths.images, ['images']);
  var server = livereload();
  gulp.watch('public/js/**.js').on('change', function(file) {
      server.changed(file.path);
  });
  gulp.watch('public/style/**.css').on('change', function(file) {
      server.changed(file.path);
  });
  gulp.watch('public/img/**').on('change', function(file) {
      server.changed(file.path);
  });
});

gulp.task('default', ['scripts', 'style', 'images']);