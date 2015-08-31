var gulp  = require('gulp');
var babel = require('gulp-babel');

gulp.task('default',function(){
  return gulp.src('src/**/*.js')
             .pipe(babel({stage:0}))
             .pipe(gulp.dest('.'));
});
