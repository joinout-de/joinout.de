const gulp = require('gulp');
const wiredep = require('wiredep').stream;
const mainBowerFiles = require('main-bower-files');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const filter = require("gulp-filter");
const sass = require('gulp-sass');
const minifyCss = require('gulp-minify-css');
const rename = require('gulp-rename');
const del = require('del');
const useref = require('gulp-useref');
const concat = require('gulp-concat');

const dest = 'dest';
const dist = 'dist';

const files = ['*.html', 'css/*', 'js/*'].concat(mainBowerFiles());
const fonts = ['bower_components/font-awesome/fonts/fontawesome-webfont.*'];

const jsFilter = filter('**/*.js');

gulp.task('default', ['fonts', 'wiredep'], function(){

});
gulp.task('wiredep', function() {
    gulp.src(files, {base: '.'})
    .pipe(wiredep())
    .pipe(gulp.dest(dest));
});

gulp.task('fonts', function(){
    gulp.src(fonts, {base: '.'})
    .pipe(gulp.dest(dest));
})

gulp.task('clean', function() {
    return del.sync(dest);
});

// watch files for changes and reload
gulp.task('serve', ['default'], function() {
  browserSync({
    server: {
      baseDir: dest
    }
  });

  gulp.watch([files].concat(['bower.json']), {cwd: '.'}, ['reload']);
});

gulp.task('reload', ['default'], function() {
    reload();
});

gulp.task('css', function(){
    
    var cssFilter = filter(['**/*.css', '!**/*.min.css'], { restore: true });

    gulp.src(files, { base: '.' })
    .pipe(cssFilter)
    .pipe(minifyCss())
    .pipe(concat('client.min.css'))
    .pipe(gulp.dest(dest))
});
/*
gulp.task('refcompress', ['default'], function(){
    
    var htmlFilter = filter('**slash*.html', { restore: true }),
        cssFilter = filter(['**slash*.css', '!**slash*.min.css'], { restore: true });

    gulp.src(files, { base: '.' })
    .pipe(useref())
    .pipe(cssFilter)
    .pipe(minifyCss())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(cssFilter.restore)
    .pipe(gulp.dest(dest))
});

gulp.task('useref', ['default'], function(){
    gulp.src(files)
    .pipe(useref())
    .pipe(gulp.dest(dest))
});
*/
