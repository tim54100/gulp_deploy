const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

var ghPages = require('gulp-gh-pages');
var pug = require('gulp-pug');
var del = require('del');
var runSequence  = require('run-sequence');
const paths = {
  src: {
    html: './src/html/*.html',
    less  : './src/style/less/*.less',
    css   : './src/style/css/*.css',
    js    : './src/js/*.js',
    pug   : './src/pug/*.pug',
    images: './src/img/*'
  },
  dist: {
    html  : './dist',
    css   : './dist/style',
    js    : './dist/js',
    images: './dist/img',
    font: './dist/font'
  }
};

// gulp.task('pug', () => {
//   gulp.src(paths.src.pug)
//       .pipe($.pug())
//       .pipe(gulp.dest('./dist'));
// })
gulp.task('html', () => {
  gulp.src(paths.src.html)
      .pipe(gulp.dest('./dist'));
})

gulp.task('less', () =>  {
  gulp.src(paths.src.less)
      .pipe($.less())
      .pipe(gulp.dest(paths.dist.css))
})
gulp.task('css', () => {
  gulp.src(paths.src.css)
      .pipe(gulp.dest(paths.dist.css))
})

gulp.task('scripts', () =>  {
  gulp.src(paths.src.js)
      .pipe($.uglify())
      .pipe(gulp.dest(paths.dist.js))
})

gulp.task('images', () =>  {
  gulp.src(paths.src.images)
      .pipe($.imagemin())
      .pipe(gulp.dest(paths.dist.images))
})

gulp.task('webserver', () => {
  gulp
    .src(paths.dist.html)
    .pipe($.webserver({
      port: 8080,
      livereload: true,
      directoryListing: false
    }))
})

// gh-pages
gulp.task('deploy', function() {
  return gulp.src('build/**/*')
    .pipe(ghPages());
});

// index
gulp.task('d_html', function(){
  return gulp.src(['dist/*.html'])
    .pipe(gulp.dest('build/'))

});

gulp.task('d_css', function(){
  return gulp.src(['paths.dist.css/*.css'])
    .pipe(gulp.dest('build/style/'))

});

gulp.task('d_js', function(){
  return gulp.src(['paths.dist.js/*.js'])
    .pipe(gulp.dest('build/js/'))

});
// Cleaning
gulp.task('clean', function(){
  return del(['build/**/*']);
});

gulp.task('watch', function(){
  gulp.watch('app/pug/**/*.pug', ['pug']);
});

gulp.task('watch',() => {
  gulp.watch(paths.src.html, ['html'])
  // gulp.watch(paths.src.pug, ['pug'])
  gulp.watch(paths.src.css, ['css'])
  gulp.watch(paths.src.less, ['less'])
  gulp.watch(paths.src.js, ['scripts'])
})

gulp.task('default', ['html', 'less', 'css', 'scripts', 'webserver', 'watch'])

gulp.task('build', function(){
  runSequence('clean', ['index'], 'deploy');
});