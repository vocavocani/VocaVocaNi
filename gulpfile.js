var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var shell = require('gulp-shell');

// Initialize watch tasks
gulp.task('watch', ['serverStart'], function() {
  gulp.watch(['./client/**/*'], ['clientBuild']);
});

// Webpack Build
gulp.task('clientBuild', shell.task([
  'webpack'
]));

// Node server start
gulp.task('serverStart', function(){
  nodemon({
    script: 'app.js',
    watch: ['./server', 'app.js']
  }).on('restart', function(){
    console.log('restart!');
  });
});

gulp.task('default', ['watch']);