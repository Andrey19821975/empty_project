'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');

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

gulp.task('prod:html', function () {
    return gulp.src('./src/**/*.html').pipe(gulp.dest('./prod'));
});

gulp.task('prod:css', function () {
    return gulp.src('./src/css/*.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('./prod/css'));
});

gulp.task('prod:library', function () {
    return gulp.src('./src/library/**/*.*').pipe(gulp.dest('./prod/library'));
});

gulp.task('prod:js', function () {
    return gulp.src('./src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./prod/js'));
});

gulp.task('prod:font', function () {
    return gulp.src('./src/fonts/**/*.*').pipe(gulp.dest('./prod/fonts'));
});

gulp.task('prod:img', function () {
    return gulp.src('./src/img/**/*.*')
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.jpegtran({ progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: true },
                    { cleanupIDs: false }
                ]
            })
        ]))
        .pipe(gulp.dest('./prod/img'));
});


