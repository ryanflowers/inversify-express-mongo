var gulp = require('gulp');
var typescript = require('gulp-typescript');
var clean = require('gulp-clean');

gulp.task('clean', function() {
    return gulp.src('build/')
         .pipe(clean());
});

gulp.task('scripts', ['clean'], function() {
    gulp.src('src/**/*.js')
        .pipe(gulp.dest('build/'));

    gulp.src(['src/**/*.ts'])
        .pipe(typescript({
            noImplicitAny: true,
            target: "es6",
            module: "commonjs",
            lib: ["es6", "dom"],
            types: ["reflect-metadata"],
            moduleResolution: "node",
            experimentalDecorators: true,
            emitDecoratorMetadata: true,
            alwaysStrict: true,
        }))
        .pipe(gulp.dest('build/'));
});

gulp.task('build', ['clean', 'scripts']);
