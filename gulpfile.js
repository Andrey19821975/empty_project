'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const min = require('gulp-minify-css');

sass.compiler = require('node-sass');

function styles() {
    return gulp.src('./src/sass/**/*.sass')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./src/css'));
};

gulp.task('default', function () {
    gulp.watch('./src/sass/**/*.sass', styles);
});