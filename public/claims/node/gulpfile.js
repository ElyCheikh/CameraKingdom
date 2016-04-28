var gulp = require('gulp')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var ngAnnotate = require('gulp-ng-annotate')
var sourcemaps = require('gulp-sourcemaps')
var fs = require('fs')


fs.readdirSync(__dirname + '/gulp')
	.forEach (function (task){
		require('./gulp/' + task)
})

gulp.task('hello',['welcome'], function () {
	console.log('hello world')
})

gulp.task('welcome', function(){
	console.log('Welcome to gulp .. !')
})

gulp.task('js',function () {
	gulp.src(['ng/module.js','ng/**/*.js'])
	.pipe(sourcemaps.init())
		.pipe(concat('app.js'))
		.pipe(ngAnnotate())
		.pipe(uglify())
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('assets'))
})

gulp.task('watch:js',['js'], function (){
	gulp.watch('ng/**/*.js',['js'])
})

gulp.task('watch:css', function (){
	gulp.watch('css/**/*.styl', ['css'])
})

gulp.task('dev',['watch:js','watch:css','dev:server'])