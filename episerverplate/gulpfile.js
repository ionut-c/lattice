// Include gulp
var gulp = require('gulp');

// Include SASS/CSS plugins
var sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    sourceMaps = require('gulp-sourcemaps'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename');

// Settings

var config = {
    sassOptions: {
        outputStyle: 'compressed'
    },
    inputSASS: './Content/sass/**/*.scss',
    outputSASS: './Content/css',
    outputSourceMaps: './',
    inputMinifier: './Content/css/global.css',
    autoprefixerOptions: {
        browsers: ['latest 2 versions']
    }
};

// Compiling sass & generate sourcemaps & add vendor prefixes
gulp.task('sass', function() {
    return gulp.src(config.inputSASS)
        .pipe(sourceMaps.init())
        .pipe(sass(config.sassOptions).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourceMaps.write(config.outputSourceMaps))
        .pipe(gulp.dest(config.outputSASS));
});

gulp.task('minify', ['sass'], function() {
    return gulp.src(config.inputMinifier)
        .pipe(cleanCSS({
                debug: true
            },
            function(details) {
                console.log(details.name + ': ' + details.stats.originalSize);
                console.log(details.name + ': ' + details.stats.minifiedSize);
            })
        )
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(gulp.dest(config.outputSASS));
});

// Watch .scss files for changes
gulp.task('watch', ['sass'], function() {
    gulp.watch(config.inputSASS, ['sass']);
});


gulp.task('dev', ['watch']);
gulp.task('prod', ['minify']);

gulp.task('default', ['watch']);
