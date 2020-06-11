const { task, src, series, dest, watch, parallel } = require('gulp');

const responsive = require('gulp-responsive');
const newer = require('gulp-newer');

const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const packageImporter = require('node-sass-package-importer');
const purgecss = require('gulp-purgecss')
const sourcemaps = require('gulp-sourcemaps');

const concat = require('gulp-concat');
const terser = require('gulp-terser');
const gulpif = require('gulp-if');
const babel = require('gulp-babel');

// 
// Image Pipeline
// 

// Resize images to 700px and copy to _site/../img/
task('limit', () =>
    src('src/assets/img/*.{jpg,png,jpeg}')
        .pipe(newer('_site/_includes/assets/img/'))
        .pipe(responsive(
            {
                '*': [{
                    width: 700,
                    withoutEnlargement: true,
                }]
            },
            {
                quality: 80,
                progressive: true,
                compressionLevel: 6,
                withMetadata: false,
                errorOnEnlargement: false,
                errorOnUnusedImage: false,
                errorOnUnusedConfig: false
            }))
        .pipe(dest('_site/_includes/assets/img/')),
)

// Passthrough files other than image
task('passthrough', () =>
    src('src/assets/img/*', '!src/assets/img/*.{jpg,png,jpeg}')
        .pipe(newer('_site/_includes/assets/img/'))
        .pipe(dest('_site/_includes/assets/img/'))
)

// Resize images to 300px and copy to _site/../img/thumb/
task('thumb', () =>
    src('src/assets/img/*.{jpg,png,jpeg}')
        .pipe(newer('_site/_includes/assets/img/thumb/'))
        .pipe(responsive(
            {
                '*': [{
                    width: 300,
                    withoutEnlargement: true,
                }]
            },
            {
                quality: 80,
                progressive: true,
                compressionLevel: 6,
                withMetadata: false,
                errorOnEnlargement: false,
                errorOnUnusedImage: false,
                errorOnUnusedConfig: false
            }))
        .pipe(dest('_site/_includes/assets/img/thumb/'))
)

//
// CSS Pipeline
//

// Compile CSS and reduce the file with purge
task('sass', () =>
    src('src/assets/css/main.scss')
        .pipe(sass({
            outputStyle: 'compressed',
            importer: packageImporter()
        }).on('error', sass.logError))
        .pipe(purgecss({
            content: [
                'src/**/*.{njk,js}',
            ],
            whitelistPatterns: [/^(zoom|fade|slide)/],
        }))
        .pipe(dest('src/_includes/assets/css/'))
)

// Compile CSS and create sourcemaps for development
task('sass:dev', () =>
    src('src/assets/css/main.scss')
        .pipe(sass({
            outputStyle: 'compressed',
            importer: packageImporter()
        }).on('error', sass.logError))
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(dest('src/_includes/assets/css/'))
)


//
// JS Pipeline
//

// Transpile javascript with Babel, minify and concatenate
task('js', () =>
    src([
        // dependency
        'src/assets/js/vendor/axios.min.js',
        'src/assets/js/vendor/cleave.min.js',
        'src/assets/js/vendor/vue.min.js',
        'src/assets/js/vendor/vue-cleave.min.js',
        'src/assets/js/vendor/steps.min.js',
        // Vue Application
        'src/assets/js/app.js',
        // Other javascript
        'src/assets/js/widgets.js'
    ])
        .pipe(gulpif(/(?<!\.min)\.(js)$/gm,
            babel({ presets: ['@babel/env'] }),
            terser()))
        .pipe(concat('main.js'))
        .pipe(dest('src/_includes/assets/js/'))
)

// Only concatenate javascript for development
task('js:dev', () =>
    src([
        // dependency
        'src/assets/js/vendor/axios.js',
        'src/assets/js/vendor/cleave.js',
        'src/assets/js/vendor/vue.js',
        'src/assets/js/vendor/vue-cleave.js',
        'src/assets/js/vendor/steps.js',
        // Vue Application
        'src/assets/js/app.js',
        // Other javascript
        'src/assets/js/widgets.js'
    ])
        .pipe(concat('main.js'))
        .pipe(dest('src/_includes/assets/js/'))
)

// Watcher
task('sass:watch', () => {
    watch('src/assets/css/**/*.scss', series('sass:dev'));
});

task('img:watch', () => {
    watch('src/assets/img/**/*', parallel('limit', 'passthrough', 'thumb'));
});

task('js:watch', () => {
    watch('src/assets/js/**/*.js', series('js:dev'));
});