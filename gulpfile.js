var gulp = require('gulp');
var compass = require('gulp-sass');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');

//error notification settings for plumber
var errorHandler = function (err) {
    console.log(err);
    this.emit('end');
};

gulp.task('compass', function () {
    gulp.src('scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(plumber(errorHandler))
        .pipe(compass({
            outputStyle: 'compressed'
        }))
        .pipe(autoprefixer({
            browsers: ['last 15 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write(''))
        .pipe(gulp.dest('css'))
});

// manual page reload.
gulp.task('compass-watch', function () {
    gulp.watch('scss/*.scss', ['compass']);
});