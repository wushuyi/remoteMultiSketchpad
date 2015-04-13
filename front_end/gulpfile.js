/**
 * Created by shuyi.wu on 2015/4/1.
 */
'use strict';
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    del = require('del'),
    webpack = require('gulp-webpack');


var conf = {
    jsIndax: './assets/js/index.js',
    nameFunction: 'functions.js',
    nameMinFunction: 'functions.min.js',
    jsFunction: './assets/js/'
};


gulp.task('compileES6', function () {
    return gulp.src(conf.jsIndax)
        .pipe(webpack({
            module: {
                loaders: [
                    {test: /\.js$/, exclude: ['/node_modules/', '/util/'], loader: 'babel-loader'}
                ]
            }
        }))
        .pipe(rename(conf.nameFunction))
        .pipe(gulp.dest(conf.jsFunction));
});

gulp.task('watch-compileES6', function () {
    return gulp.src(conf.jsIndax)
        .pipe(webpack({
            watch: true,
            module: {
                loaders: [
                    {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
                ]
            }
        }))
        .pipe(rename(conf.nameFunction))
        .pipe(gulp.dest(conf.jsFunction));
});

gulp.task('min', ['compileES6'], function () {
    return gulp.src(conf.jsFunction + conf.nameFunction)
        .pipe(uglify())
        .pipe(rename(conf.nameMinFunction))
        .pipe(gulp.dest(conf.jsFunction));
});

gulp.task('clear', function(){
    del(conf.jsFunction + conf.nameMinFunction);
});

gulp.task('default', ['clear', 'min']);