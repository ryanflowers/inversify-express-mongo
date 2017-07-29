var gulp = require('gulp');
var typescript = require('gulp-typescript');

gulp.task('build', function() {
    gulp.src(['src/**/*.ts'])
        .pipe(typescript({
            noImplicitAny: true,
            module: "commonjs"
        }))
        .pipe(gulp.dest('build/'));
});