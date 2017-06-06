var path = require('path');

var gulp = require('gulp');
var gulpWebpack = require('webpack-stream'); // https://github.com/shama/webpack-stream
var webpack = require('webpack');

var aureliaSrc = './src/aurelia/';
var aureliaDest = './wwwroot/dist/';
var aureliaWebpackConfig = require('./webpack.aurelia.config.js');

var aureliaWebpackConfigPath = path.resolve(__dirname, './webpack.aurelia.config.js');
console.log(`aureliaWebpackConfigPath: '${aureliaWebpackConfigPath}'`);

gulp.task('default', ['build']);

gulp.task('build', ['build.aurelia']);

gulp.task('watch', ['watch.aurelia']);

gulp.task('build.aurelia',
    function() {
        return gulp.src(aureliaSrc)
            .pipe(gulpWebpack(aureliaWebpackConfig, webpack))
            .pipe(gulp.dest(aureliaDest));
    });

gulp.task('watch.aurelia',
    function() {
        var watchPaths = [aureliaWebpackConfigPath, `${aureliaSrc}**/*.*`];
        gulp.watch(watchPaths, ['build.aurelia']);
    });