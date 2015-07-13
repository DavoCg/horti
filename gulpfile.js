var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source   = require('vinyl-source-stream');
var watch = require('gulp-watch');

var externals = [
    'classnames',
    'lodash',
    'react',
    'react-router',
    'reflux',
    'superagent'];


gulp.task('vendors', function(){
    var bundler = browserify();
    externals.forEach(function(x){bundler.require(x);});
    bundler
        .transform(babelify.configure({sourceMap: false}))
        .bundle()
        .pipe(source('vendors.js'))
        .pipe(gulp.dest('./dist/js'));

});


gulp.task('bundle', function(){
    browserify("./src/js/app.js", { debug: true })
        .transform(babelify.configure({sourceMap: false}))
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./dist/js'));
});


gulp.task('html', function(){
    gulp
        .src('./src/www/*.html')
        .pipe(gulp.dest('./dist'))
});

gulp.task('images', function(){
    gulp
        .src('./src/images/**/*.*')
        .pipe(gulp.dest('./dist/images'))
});

gulp.task('css', function(){
    gulp
        .src('./src/css/*.css')
        .pipe(gulp.dest('./dist/css'))
});

gulp.task('fonts', function(){
    gulp
        .src('./src/fonts/*')
        .pipe(gulp.dest('./dist/fonts'))
});

gulp.task('utils', function(){
    gulp
        .src('./src/utils/*')
        .pipe(gulp.dest('./dist/utils'))
});

gulp.task('watch', function(){
    console.log('Start watching...');

    watch('./src/js/**/*.js', function(){
        gulp.start('bundle');
    }),

    watch('./src/css/*.css', function(){
        gulp.start('css');
    });


});

gulp.task('default', ['vendors', 'bundle', 'utils', 'html', 'images', 'css', 'fonts', 'watch']);
