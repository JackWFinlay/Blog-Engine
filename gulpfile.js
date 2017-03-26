// gulpfile.js
'use strict';

var gulp = require("gulp");
var babel = require("gulp-babel");

gulp.task("default", function () {
  return gulp.src("public/js/app.js")
    .pipe(babel())
    .pipe(gulp.dest("public/dist"));
});