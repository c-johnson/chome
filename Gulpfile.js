var gulp = require('gulp');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');


var paths = {
  scripts: ['app/assets/js/**/*.js'],
  style: ['app/assets/style/**/*.scss'],
  fonts: ['app/assets/fonts/**'],
  images: ['app/assets/img/**'],
  manifest: ['app/assets/posts/manifest.json'],
  rss: ['app/assets/feed.rss']
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

gulp.task('fonts', function () {
  return gulp.src(paths.fonts)
    .pipe(gulp.dest('public/fonts'));
});

gulp.task('rss', function () {
  return gulp.src(paths.rss)
    .pipe(gulp.dest('public'));
});

gulp.task('manifest', function () {
  return gulp.src(paths.manifest)
    .pipe(gulp.dest('public/posts'));
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.style, ['style']);
  gulp.watch(paths.images, ['images']);
  gulp.watch(paths.fonts, ['fonts']);
  gulp.watch(paths.rss, ['rss']);
  gulp.watch(paths.manifest, ['manifest']);

  // var server = livereload();
  // gulp.watch('public/js/**/*.js').on('change', function(file) {
  //   server.changed(file.path);
  // });
  // gulp.watch('public/css/**/*.css').on('change', function(file) {
  //   console.log('scss is being compileedd1!!!!');

  //   // The gulp.watch api is kind of silly here.  It gives you an absolute path for a css file on your system that has changed.  However, the livereload server wants to know the path the web server will serve the file at.  

  //   // file.path looks like:
  //   // /Users/chris/ciqss/gowrk/src/github.com/c-johnson/chome/public/css/main/home.css
  //   // |_____________________________________________________________|________________|
  //   //                            |                                           |
  //   //              Preceding file path, discard                        web server 
  //   //                9 tokens (+ leading slash)

  //   var webPath = file.path.split("/").slice(10).join("/");
  //   console.log(webPath);
  //   server.changed(webPath);
  // });
  // gulp.watch('public/img/**').on('change', function(file) {
  //   server.changed(file.path);
  // });
  // gulp.watch('public/fonts/**').on('change', function(file) {
  //   server.changed(file.path);
  // });
});

// gulp.task('server', function(next) {
//   var connect = require('connect'),
//       server = connect();
//   server.use(connect.static("public")).listen(process.env.PORT || 8000, next);
// });

gulp.task('default', ['scripts', 'style', 'images', 'fonts', 'rss', 'manifest']);