var gulp = require('gulp');
var sass = require('gulp-sass');

// var coffee = require('gulp-coffee');
// var concat = require('gulp-concat');
// var uglify = require('gulp-uglify');
// var imagemin = require('gulp-imagemin');

var paths = {
  scripts: ['app/assets/js/**/*.js'],
  style: ['app/assets/style/**/*.scss'],
  images: ['app/assets/img/**/*.scss']
};

gulp.task('scripts', function () {
  // Minify and copy all JavaScript (except vendor scripts)
  return gulp.src(paths.scripts)
    // .pipe(coffee())
    // .pipe(uglify())
    // .pipe(concat('all.min.js'))
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

// // Copy all static images
// gulp.task('images', function() {
//  return gulp.src(paths.images)
//     // Pass in options to the task
//     .pipe(imagemin({optimizationLevel: 5}))
//     .pipe(gulp.dest('build/img'));
// });

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.style, ['style']);
  gulp.watch(paths.images, ['images']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['scripts', 'watch']);