var gulp = require('gulp');
var server = require('gulp-express');

gulp.task('default', function () {
  // Start the server at the beginning of the task 
  server.run(['server/server.js'], {}, 7777);

  // Restart the server when file changes 
  gulp.watch(['client/**/*.html'], server.notify);
  gulp.watch(['client/js/**/*'], server.notify);
  gulp.watch(['server/**/*.js'], [server.run]);
});