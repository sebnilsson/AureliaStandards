var gulp = require('gulp');
var webpack = require('webpack-stream');

var aureliaSrc = './src/aurelia/main.ts';
var aureliaDest = './wwwroot/dist/';
var aureliaWebpackConfig = require('./src/aurelia.webpack.config.js');

gulp.task('default', ['build']);

gulp.task('build', ['build.aurelia']);

gulp.task('watch', ['watch.aurelia']);

gulp.task('build.aurelia',
    function() {
        return gulp.src('./')
            .pipe(webpack(aureliaWebpackConfig))
            .pipe(gulp.dest(aureliaDest));
    });