var gulp = require('gulp');
var typescript = require('gulp-typescript');

// TODO copy , 'src/**/*.js' over to build dir

gulp.task('build', function() {
    gulp.src('build/')
        .pipe(clean());

    gulp.src('src/**/*.js', {cwd: bases.app})
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