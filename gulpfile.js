var gulp = require('gulp');
var minify = require('gulp-minify');
var sequence = require('gulp-sequence');
var concat = require('gulp-concat');
var del = require('del');

gulp.task('cleanup', function (done) {
    del(['lib/*']).then(function () { done(); })
        .catch(function (err) { done(err); })
});

gulp.task('minify', function () {
    return gulp.src(['lib/*.js'])
        .pipe(minify({
            ext: {
                min: '.min.js'
            },
            noSource: false,
            output: {
                source_map: true
            }
        }))
        .pipe(gulp.dest('lib'));
});

gulp.task('concat all', function () {
    return gulp.src([
        'src/progress.util.js',
        'src/progress.js',
        'src/progress.session.js',
        'src/auth/progress.auth.js',
        'src/auth/progress.auth.basic.js',
        'src/auth/progress.auth.form.js',
        'src/auth/progress.auth.sso.js',
        'src/progress.data.kendo.js'
    ]).pipe(concat('progress.all.js'))
        .pipe(gulp.dest('lib/'));
});

gulp.task('concat jsdo', function () {
    return gulp.src([
        'src/progress.util.js',
        'src/progress.js',
        'src/progress.session.js',
        'src/auth/progress.auth.js',
        'src/auth/progress.auth.basic.js',
        'src/auth/progress.auth.form.js',
        'src/auth/progress.auth.sso.js'
    ]).pipe(concat('progress.jsdo.js'))
        .pipe(gulp.dest('lib/'));
})


gulp.task('build', sequence('cleanup', 'concat all', 'concat jsdo', 'minify'));

