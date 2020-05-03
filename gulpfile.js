'use strict';

var gulp = require('gulp');
var responsive = require('gulp-responsive');
var sass = require('gulp-sass');
sass.compiler = require('node-sass');
const purgecss = require('gulp-purgecss')
var sourcemaps = require('gulp-sourcemaps');


gulp.task('limit', function () {
    return gulp
        .src('static/img/*.{jpg,png,jpeg}')
        .pipe(
            responsive(
                {
                    '*': [
                        {
                            width: 700,
                            withoutEnlargement: true,
                        },
                    ]
                },
                {
                    quality: 70,
                    progressive: true,
                    compressionLevel: 6,
                    withMetadata: false,
                    errorOnEnlargement: false,
                    errorOnUnusedImage: false,
                }
            )
        )
        .pipe(gulp.dest('src/static/img/'))
})

gulp.task('thumb', function () {
    return gulp
        .src('static/img/*.{jpg,png,jpeg}')
        .pipe(
            responsive(
                {
                    '*': [
                        {
                            width: 300,
                            withoutEnlargement: true,
                        },
                    ]
                },
                {
                    quality: 70,
                    progressive: true,
                    compressionLevel: 6,
                    withMetadata: false,
                    errorOnEnlargement: false,
                    errorOnUnusedImage: false,
                }
            )
        )
        .pipe(gulp.dest('src/static/img/thumb/'))
})

gulp.task('sass', function () {
    return gulp.src('src/scss/main.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(purgecss({
            content: ['src/**/*.{njk,js}']
        }))
        .pipe(gulp.dest('src/_includes/assets/css/'));
});

gulp.task('sass:dev', function () {
    return gulp.src('src/scss/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('src/_includes/assets/css/'));
});

gulp.task('sass:watch', function () {
    gulp.watch('src/scss/**/*.scss', gulp.series(['sass:dev']));
});