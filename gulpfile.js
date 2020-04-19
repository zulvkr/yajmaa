var gulp = require('gulp')
var responsive = require('gulp-responsive')

gulp.task('limit', function () {
    return gulp
        .src('src/static/img/*.{jpg,png,jpeg}')
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
        .src('src/static/img/*.{jpg,png,jpeg}')
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